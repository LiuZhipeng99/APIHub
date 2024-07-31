# APIHub
for api
https://github.com/Ba11ooner/api-project 来源于鱼皮项目

https://github.com/kixuan/XuanApi

# 中间件
```
services:
  mysql:
    image: mysql:8.0
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: 123456
    # 在这个compose里不持久化down就没了，其他几个vol没什么好存的日志啥的
    volumes:
      - ./mysql_data:/var/lib/mysql

  redis:
    image: redis
    ports:
      - "6379:6379"

  zookeeper:
    image: zookeeper
    ports:
      - "2181:2181"

  kafka:
    image: apache/kafka
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      ALLOW_PLAINTEXT_LISTENER: yes
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://0.0.0.0:9092

  nacos:
    image: nacos/nacos-server
    ports:
      - "8848:8848"
      - "9848:9848"
      # 害得看官网的少了个端口，官网示例了个骚操作对depends的服务用命令ping
    environment:
      MODE: standalone
      # 默认用内嵌h2
      #SPRING_DATASOURCE_PLATFORM: mysql
```

# TODO:
- 新增了admin的用户数据，新增了接口样例（https://github.com/public-apis/public-apis、https://github.com/fangzesheng/free-api、在后续考虑介入ai接口如songquanpeng/one-api，考虑不需要鉴权的，前端结合apipost跳转方便开发者调用
- 在启动并使用后，发现没有注册的页面，新增接口也没有前端失焦确定必填项 后端也没校验直接报sql错。
- 接口分析打开报sql错误是表没数据导致的，解决下空表的报错问题
- 重新理清业务，client-sdk做签名真的需要吗，校验token直接放在请求里就行了啊检验在后端做而不是http client
- 主页展示接口的弄漂亮一点（低优先级）

# change：
### 前端部分学习(浅学umi
- openapi插件（如果多个服务添加多个项），自动生成的好处：如果我们后端的实体类修改了,我们可以直接运行 **openapi** 来直接更新
    {
      requestLibPath: "import { request } from '@umijs/max'",
//       schemaPath: 'http://localhost:7529/api/v3/api-docs',
      schemaPath: join(__dirname, 'oneapi.json'), //import { join } from 'path';
      projectName: 'yuapi-backend',
      mock: false,
    },

  另外在requestConfig指定baseURL可以在services里不写完整url，
  模版的requestErrorConfig.ts中还有很多操作：后端数据格式，错误处理，请求响应拦截等等

  https://kixuan.github.io/posts/f568/
- 用户态（前端的登陆状态：不登陆会跳转，登陆后跳转到主页）
我们知道后端有鉴权有security对每个请求放行与否，那么在前端是如何反映出的呢。在app.ts中getInitialState会在每个需要拦截的页面执行，我们需要去控制是否需要跳转到login页面history.push(loginPath);。这只是前端做的方便我们找页面并不是说请求不到其他页面的html。

而在后端需要实现userLogin方法当登陆成功需要把request的session状态改变（加个属性）返回user， 还要getLoginUser方法从带cookier的equest查询当前的用户 返回user对象

- 权限部分（管理员）
```
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canUser: loginUser,
    canAdmin: loginUser?.userRole === 'admin',
  };
}
```

### 后端部分学习
MD5哈希算法本身是不可逆，不安全因为快速可暴力而且碰撞多。Spring Boot DevTools和sonic等等都是减少项目构建时间的技术。新建后端项目别用maven的模版了直接去spring图形化设置吧。
- 考虑微服务场景下/两个模块依赖共同common模块场景 -- 项目目录构造
学习pom模块化组织和编译打包：涉及模块相互引用（公共模块common不打包只编译）->build的父子继承、dependencyManagement父pom去管理子pom
父pom仍然可以引用如springboot作为父pom减少部分版本管理
```
my-project/
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
├── backend/
│   ├── user-service/
│   │   ├── src/
│   │   ├── pom.xml
│   │   └── ...
│   ├── order-service/
│   │   ├── src/
│   │   ├── pom.xml
│   │   └── ...
│   ├── api-gateway/
│   │   ├── src/
│   │   ├── config/
│   │   ├── pom.xml
│   │   └── ...
│   ├── common/
│   │   ├── src/
│   │   ├── pom.xml
│   │   └── ...
│   ├── pom.xml
│   └── ...
├── pom.xml
```
- 
