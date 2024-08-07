package com.example.sdk.client;

import cn.hutool.core.net.URLEncoder;
import cn.hutool.core.util.RandomUtil;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONUtil;
import com.example.sdk.utils.SignUtils;
import lombok.extern.slf4j.Slf4j;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;

import static com.example.sdk.utils.SignUtils.genSign;


/**
 * 调用第三方接口的客户端
 *
 * 具体功能：这里查看阿里api的功能仿照，包括异步的操作
 * https://api.aliyun.com/api/ocr/2019-12-30/RecognizeCharacter?useCommon=true
 * 1.HttpClient的能力（hutool）-几个call方法，用户当然可以只使用enhanceHeaders，也可以直接调用方法
 * 2.增加请求头信息（待传输内容 + 用户身份验证信息 + 时间戳）和签名生成算法
 * 3.提供网关地址
 *
 */
@Slf4j
public class ApiClient {

//    private static final String DEFAULT_GATEWAY_HOST = "http://localhost:8090";

    private final String accessKey;

    private final String secretKey;

    //配置用户的公钥私钥，相当于账号密码
    public ApiClient(String accessKey, String secretKey) {
        this.accessKey = accessKey;
        this.secretKey = secretKey;
    }

    /**
     * 增强请求头信息，增加必要的认证和标识信息 请求头参数（访问密钥，请求标识，请求体，时间戳，生成的签名）
     *
     * @param headers 原始请求头信息
     * @param body 请求体内容，用于生成签名，可以为空
     * @return 增强后的请求头信息
     */
    public Map<String, String> enhanceHeaders(Map<String, String> headers, String body) {
        if (headers == null) {
            headers = new HashMap<>();
        }
        // 访问密钥，即公钥
        headers.put("accessKey", accessKey);
        // 就算是密文传输也一定不能直接发送
        // hashMap.put("secretKey", secretKey);
        // Nonce 是 Number once 的缩写，用于标记请求
        // 在密码学中 Nonce 是一个只被使用一次的任意或非重复的随机数值
        headers.put("nonce", RandomUtil.randomNumbers(4));
        // 请求内容
        headers.put("body", body);
        // 时间戳
        headers.put("timestamp", String.valueOf(System.currentTimeMillis() / 1000));
        // 签名
        headers.put("sign", SignUtils.genSign(body, headers.get("nonce"), headers.get("timestamp"), secretKey));
        return headers;
    }

    /**
     * 增强请求头信息，增加必要的认证和标识信息
     *
     * @param headers 原始请求头信息
     * @return 增强后的请求头信息
     */
    public Map<String, String> enhanceHeaders(Map<String, String> headers) {
        return enhanceHeaders(headers, null);
    }

//    public String getEncodedGatewayHost() {
//        return encode(this.gatewayHost);
//    }
//
//    public static String encode(String text) {
//        byte[] encodedBytes = Base64.getEncoder().encode(text.getBytes());
//        return new String(encodedBytes);
//    }
//
//    public static String decode(String text) {
//        byte[] decodedBytes = Base64.getDecoder().decode(text);
//        return new String(decodedBytes);
//    }


    /**
     * hutool请求的封装
     * const response = await axios.post('/api/v1/resourcePath', data, {
     * headers: headers
     * params: params,
     * })
     * 这个请求用hutool工具封装类似的http请求方法，需要url、bodyString、HeaderString、ParamsString这几个参数
     *
     * @param headers 原始请求头信息
     * @return 增强后的请求头信息
     */
    public HttpResponse callApiByGet(String url, String headers, String params) throws Exception {
        // 解析 headerString 为 Map
        Map<String, String> headerMap = new HashMap<>();
        if (headers != null && !headers.isEmpty() && JSONUtil.isTypeJSON(headers)) {
            headerMap = JSONUtil.toBean(headers, Map.class);
        }
        Map<String, String> enhanceHeadersheaderMap = enhanceHeaders(headerMap);

        Map<String, Object> paramsMap = new HashMap<>();
        if (params != null && !params.isEmpty() && JSONUtil.isTypeJSON(params)) {
            paramsMap = JSONUtil.toBean(params, Map.class);
        }
//        // 解析 paramsString 为 Map 再用&加到url
//        Map<String, Object> queryParams = new HashMap<>();
//        if (params != null && !params.isEmpty()) {
//            queryParams = JSONUtil.toBean(params, Map.class);
//        }
//        // 构造 URL 并附加查询参数
//        StringBuilder urlWithParams = new StringBuilder(url);

        try (HttpResponse response = HttpUtil.createGet(url)
                .addHeaders(enhanceHeadersheaderMap)
                .form(params) //GET 请求在请求体中携带参数不符合规范
                .execute()) {
            return response;
        }
        // 看了下源码form会变为一个map字段，execute在请求时如果为get会判断，封装有点大了，和语意规范不一
//        if(null != this.body) {query.parse(body) } else query=form
//        HttpRequest.get(url).addHeaders(enhanceHeadersheaderMap).form(paramsMap).execute()
    }

    // 这里默认没有params
    public HttpResponse callApiByPost(String url, String headers, String body) throws Exception {
        // 解析 headerString 为 Map
        Map<String, String> headerMap = new HashMap<>();
        if (headers != null && !headers.isEmpty() && JSONUtil.isTypeJSON(headers)) {
            headerMap = JSONUtil.toBean(headers, Map.class);
        }
        Map<String, String> enhanceHeadersheaderMap = enhanceHeaders(headerMap, body);

        try (HttpResponse response = HttpUtil.createPost(url)
                .addHeaders(enhanceHeadersheaderMap)
                .body(body)
//                .form(params)  // 添加参数，好像也是在请求体中，Post请求的form和body请求体有何区别？
                .execute()) {
            return response;
        }
    }
    // 异步调用API接口，返回CompletableFuture
    public CompletableFuture<HttpResponse> callApiAsync(String url, String headers, String params) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                return callApiByGet(url, params, headers);
            } catch (Exception e) {
                log.error("Async API call failed", e);
                throw new RuntimeException(e);
            }
        });
    }
    public CompletableFuture<HttpResponse> callApiByPostAsync(String url, String headers, String body) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                return callApiByPost(url, headers, body);
            } catch (Exception e) {
                log.error("Async POST API call failed", e);
                throw new RuntimeException(e);
            }
        });
    }


    // 到这里只是做了签名和包装httpClient，用户可以用于请求平台开发的api，也可以当作普通httpClient请求非平台API
    // 考虑把接口相关的集成到sdk里呢，用户只输入apiname，可以服务发现？（内部用的不当暴露出来），用户yaml配置？（不如自己构造呢），
    // 直接sdk为大量api写公共方法？（阿里sdk就有这种能力，这确实可以发展但个人开发不好维护算了）还是就这样吧用户只用SDK的签名生成功能就可以了，
    // TODO 目前网关没用在这里，平台发布的url就是网关的
    //  网关也写在这里面原因：虽然可以平台上用完整的网关url，为了安全还是sdk来做url替换？该怎么保护呢
    //  配置路由地址
    // 思考：采用硬编码的形式是否合理？
    // 从封装的角度看是合理的
    // 1.网关地址相对固定（可行性）
    // 2.封装起来不对外暴露网关地址，也更安全（必要性）
    // 从需求的角度看是合理的，因为该客户端工具是提供给接口提供者使用的，开发者无需关心平台网关地址
    // 最后问了gpt：api网关应不应该对用户可见-》api网关怎么防止攻击（微服务api网关安全）？ 靠自己理解写在SDK其实也相当于透明的
}
