package com.example;

import com.example.common.model.domain.InterfaceInfo;
import com.example.common.model.domain.User;
import com.example.common.service.InnerInterfaceInfoService;
import com.example.common.service.InnerUserInterfaceInfoService;
import com.example.common.service.InnerUserService;

import com.example.sdk.utils.SignUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.dubbo.config.annotation.DubboReference;
import org.bouncycastle.util.IPAddress;
import org.reactivestreams.Publisher;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferFactory;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.http.server.reactive.ServerHttpResponseDecorator;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * 全局过滤
 */
@Slf4j
@Component
public class CustomGlobalFilter implements GlobalFilter, Ordered {
    // -1 表示最高优先级
    @Override
    public int getOrder() {
        return -1;
    }

    //RPC 内部服务调用
    @DubboReference
    private InnerUserService innerUserService;

    @DubboReference
    private InnerInterfaceInfoService innerInterfaceInfoService;

    @DubboReference
    private InnerUserInterfaceInfoService innerUserInterfaceInfoService;

    //IP 白名单
    private static final List<String> IP_WHITE_LIST = Arrays.asList(
            "127.0.0.1", // IPv4:localhost
            "0:0:0:0:0:0:0:1%0" // IPv6:localhost
    );
    //IP 黑名单
    private static final List<String> IP_BLACK_LIST = Arrays.asList();

    //接口 host
//    private static final String INTERFACE_HOST = "http://localhost:8100";
//  这个接口地址不写这里吧（这里只是用来查接口存不存在），新增服务就在网关加一个路由规则指向某个机器（改网关配置如下可以不写死uri启用服务发现负载均衡），
//      - id: interface_route # 请求转发到 api-interface
//          uri: http://localhost:8100  这个需要写死但用负载均衡后只需要知道个服务的名字
//#          uri:lb://interface-server-a 依赖注册中心和Spring Cloud LoadBalancer
//          predicates:
//            - Path=/api/interface/**
    //但这样新加规则网关会down所以平时监听nacos的配置变化从而改变网关配置（网络上获得个json然后进程去改）
//    https://cloud.tencent.com/developer/article/2096938
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        //region 用户中心请求处理
        // 如果是发往用户中心的请求，则不做鉴权处理
        ServerHttpRequest requestForUserCenter = exchange.getRequest();
        String[] array = requestForUserCenter.getPath().value().split("/");
        if (!array[1].equals("api")) {
            log.info("user-center，直接放行");
            return chain.filter(exchange);
        }
        //endregion


//        TODO 完善并稳定运行
        //region 接口调用请求处理
        // 请求日志
        ServerHttpRequest request = exchange.getRequest();
        String url = request.getURI().toString();
//        request.getURI() 包含了url和查询参数
        String method = request.getMethod().toString();
        log.info("请求唯一标识：" + request.getId());
        log.info("请求URI：" + url);
        log.info("请求方法：" + method);
        log.info("请求参数：" + request.getQueryParams());
        String sourceAddress = request.getLocalAddress().getHostString();
        log.info("请求来源地址：" + sourceAddress);
        log.info("请求来源地址：" + request.getRemoteAddress());
        ServerHttpResponse response = exchange.getResponse();

        // 访问控制 - 黑白名单
        //  if (!IP_WHITE_LIST.contains(sourceAddress)) {
        if (IP_BLACK_LIST.contains(sourceAddress)) {
            log.info(sourceAddress + "在黑名单中，拒绝访问");
            response.setStatusCode(HttpStatus.FORBIDDEN);
            return response.setComplete();
        }

        //region 请求合法性验证
        // 用户鉴权（判断 ak、sk 是否合法）
        HttpHeaders headers = request.getHeaders();
        String accessKey = headers.getFirst("accessKey");
        String nonce = headers.getFirst("nonce");
        String timestamp = headers.getFirst("timestamp");
        String sign = headers.getFirst("sign");
        String body = headers.getFirst("body");


        System.out.println("-----------------------");
        System.out.println("请求头：");
        System.out.println("accessKey: " + accessKey);
        System.out.println("nonce: " + nonce);
        System.out.println("timestamp: " + timestamp);
        System.out.println("sign: " + sign);
        System.out.println("body: " + body);
        System.out.println("-----------------------");

        
        //根据 accessKey 查 user，进而得到 userId 和 secretKey
        User invokeUser = null;
        try {
            invokeUser = innerUserService.getInvokeUser(accessKey);
            System.out.println("--------------------");
            System.out.println("接口调用者的用户信息：");
            System.out.println(invokeUser);
            System.out.println("--------------------");
        } catch (Exception e) {
            log.error("getInvokeUser error", e);
        }
        if (invokeUser == null) {
            return handleNoAuth(response);
        }

        //保证是 client-sdk 中限定的信息格式
        //client-sdk 中产生的 nonce 是 4 位随机数字
        if (Long.parseLong(nonce) > 10000L) {
            log.info("信息格式错误");
            return handleNoAuth(response);
        }

        // 时间和当前时间不能超过 5 分钟
        Long currentTime = System.currentTimeMillis() / 1000;
        final Long FIVE_MINUTES = 60 * 5L;
        if ((currentTime - Long.parseLong(timestamp)) >= FIVE_MINUTES) {
            log.info("请求超时");
            return handleNoAuth(response);
        }

        // 从数据库中查出 secretKey
        String secretKey = invokeUser.getSecretKey();

        // 利用 body 和 secretKey 生成签名，比对请求中携带的签名和生成的签名
        String serverSign = SignUtils.genSign(body, nonce, timestamp, secretKey);
        // 单独实现签名，写两份
//        Digester md5 = new Digester(DigestAlgorithm.SHA256);
//        // 将请求体和密钥拼接起来以生成待签名的内容
//        String content =   body + nonce + timestamp + secretKey; //null拼接字符串会转
//        // 使用消息摘要器计算内容的哈希值，并以十六进制形式返回
//        String serverSign = md5.digestHex(content);
        if (sign == null || !sign.equals(serverSign)) {
            log.info("签名不一致");
            return handleNoAuth(response);
        }

        // 判断请求的模拟接口是否存在 → 得到 interfaceId，以及请求方法是否匹配
        InterfaceInfo interfaceInfo = null;
        try {
            // 使用 getScheme, getHost, getPort 和 getPath 构建不带查询字符串的 URL
            String scheme = request.getURI().getScheme();
            String host = request.getURI().getHost();
            int port = request.getURI().getPort();
            String path = request.getURI().getPath();
            // 构建不含查询字符串的 URL
            StringBuilder urlWithoutQuery = new StringBuilder();
            urlWithoutQuery.append(scheme).append("://").append(host);
            if (port != -1 && port != 80 && port != 443) {
                urlWithoutQuery.append(":").append(port);
            }
            urlWithoutQuery.append(path);
            System.out.println("--------------------");
            System.out.println("URI: " + url);
            System.out.println("URLWithoutQuery: " + urlWithoutQuery);
            System.out.println("method: " + method);
            System.out.println("--------------------");
            interfaceInfo = innerInterfaceInfoService.getInterfaceInfo(url);
            System.out.println("--------------------");
            System.out.println("被调接口：");
            System.out.println(interfaceInfo);
            System.out.println("--------------------");
        } catch (Exception e) {
            log.error("getInterfaceInfo error", e);
        }
        if (interfaceInfo == null) {
            return handleNoAuth(response);
        }

        // 利用 userId 和 interfaceId
        // 在【调用信息表】中查是否已将接口分配给用户并判断是否还有调用次数
        boolean canInvoke = innerUserInterfaceInfoService
                .canInvoke(interfaceInfo.getId(), invokeUser.getId());
        if (!canInvoke) {
            log.info("剩余调用次数不足");
            return handleNoAuth(response);
        }


        //endregion

//        请求转发，调用模拟接口 + 响应日志
//         理想做法：
//          Mono<Void> filter = chain.filter(exchange);
//          return filter;
//         预期是等模拟接口调用完成，才记录响应日志、统计调用次数。
//         但现实是 chain.filter 方法立刻返回了，直到 filter 过滤器 return 后才调用了模拟接口。
//         原因是: chain.filter是个异步操作，理解为前端的 promise
//         解决方案:利用 response 装饰者，增强原有 response 的处理能力
        return handleResponse(exchange, chain, interfaceInfo.getId(), invokeUser.getId());
        //endregion
    }

    /**
     * 处理响应
     * 固定套路
     *
     * @param exchange
     * @param chain
     * @return
     */
    public Mono<Void> handleResponse(ServerWebExchange exchange, GatewayFilterChain chain, long interfaceInfoId, long userId) {
        try {
            ServerHttpResponse originalResponse = exchange.getResponse();
            // 缓存数据的工厂
            DataBufferFactory bufferFactory = originalResponse.bufferFactory();
            // 拿到响应码
            HttpStatus statusCode = originalResponse.getStatusCode();
            if (statusCode == HttpStatus.OK) {
                // 装饰，增强能力
                ServerHttpResponseDecorator decoratedResponse = new ServerHttpResponseDecorator(originalResponse) {
                    // 等调用完转发的接口后才会执行
                    @Override
                    public Mono<Void> writeWith(Publisher<? extends DataBuffer> body) {
                        log.info("body instanceof Flux: {}", (body instanceof Flux));
                        if (body instanceof Flux) {
                            Flux<? extends DataBuffer> fluxBody = Flux.from(body);
                            // 往返回值里写数据
                            // 拼接字符串
                            return super.writeWith(
                                    fluxBody.map(dataBuffer -> {
                                        // 调用成功，接口调用次数 + 1 invokeCount
                                        try {
                                            innerUserInterfaceInfoService.invokeCount(interfaceInfoId, userId);
                                        } catch (Exception e) {
                                            log.error("invokeCount error", e);
                                        }
                                        byte[] content = new byte[dataBuffer.readableByteCount()];
                                        dataBuffer.read(content);
                                        DataBufferUtils.release(dataBuffer);//释放掉内存
                                        // 构建日志
                                        StringBuilder sb2 = new StringBuilder(200);
                                        List<Object> rspArgs = new ArrayList<>();
                                        rspArgs.add(originalResponse.getStatusCode());
                                        String data = new String(content, StandardCharsets.UTF_8); //data
                                        sb2.append(data);
                                        // 打印日志
                                        log.info("响应结果：" + data);
                                        return bufferFactory.wrap(content);
                                    }));
                        } else {
                            // 8. 调用失败，返回一个规范的错误码
                            log.error("<--- {} 响应code异常", getStatusCode());
                        }
                        return super.writeWith(body);
                    }
                };
                // 设置 response 对象为装饰过的
                return chain.filter(exchange.mutate().response(decoratedResponse).build());
            }
            return chain.filter(exchange); // 降级处理返回数据
        } catch (Exception e) {
            log.error("网关处理响应异常" + e);
            return chain.filter(exchange);
        }
    }

    //设置响应异常
    public Mono<Void> handleNoAuth(ServerHttpResponse response) {
        response.setStatusCode(HttpStatus.FORBIDDEN);
        return response.setComplete();
    }

    public Mono<Void> handleInvokeError(ServerHttpResponse response) {
        response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR);
        return response.setComplete();
    }
}