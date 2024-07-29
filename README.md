# APIHub
for api
https://github.com/Ba11ooner/api-project 来源于鱼皮项目

https://github.com/kixuan/XuanApi
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
