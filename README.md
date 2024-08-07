
# APIHub

for api
https://github.com/Ba11ooner/api-project 来源于鱼皮项目

https://github.com/kixuan/XuanApi

对标：https://api.aliyun.com/ 这基本商业的调用好像都是sdk构造request，https://www.free-api.com/ 用户自己构造request，用token鉴权



```
一个api服务例子（java的api），输入名字返回名字。里面有一种鉴权一种非鉴权的方法。
除了鉴权还要做aop记录调用次数，这些都离不开backend。相当耦合。

用api网关的话这个api只需要提供restful接口甚至无关语言


再来就是api平台用户怎么用，最理想就是提供restful接口随便用户调用，网页有在线的调用直接前端发。

如果是需要鉴权的api接口，用一个网关去转发能做鉴权记录和日志。


上面是接口提供方角度和用户角度。


再就是为什么有sdk，我认为api接口不需要sdk，sdk作用是什么呢
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

---

前端二次开发：

搞不懂这些前端框架动不动install不了，也不知道改了啥突然import不了service了

- api-project的前端不能跑AssertionError [ERR_ASSERTION]: filePath not found of /Users/liuzhipeng/front/api-frontend/node_modules/.store/@umijs+renderer-react@3.5.42/node_modules/@umijs/renderer-react/dist/index.js。
- 其功能也没做完还没yupi多但做了注册

所以以yupi为基准，增加Forget和Register页和对应Router

- package.json中删除husky install脚本避免.git报错，add echart库

- cnpm进行依赖安装会报错。转yarn了

- api- project中对登陆注释跟多，可以学习

- 接下来通过复制User目录过来修改（新增注册功能），然后替换已有文件找出service import bug所在（不知道发生什么了不是缺文件可能是src）。
- 优化了接口新增的表单，学习了前端的用户态管理逻辑。了解了tsconfig和lockfile， 学习umijs框架的一些细节。

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

- 了解了SDK的作用，API网关作用，阿里的api开放平台为什么要用sdk来请求而不直接用户自己构造？ 我想知道的就是签名为什么防截胡（签名和请求参数强相关比如时间戳和Nonce，使得签名一次性的不可逆转的）。这解决了为什么不直接发请求的问题。另外就是在线调用后端依赖SDK还是重实现如果依赖SDK可以较好的版本管理
