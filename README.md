# 鱼皮 - API 开放平台项目

> 作者：[程序员鱼皮](https://github.com/liyupi)

本项目为 [编程导航知识星球](https://yuyuanweb.feishu.cn/wiki/VC1qwmX9diCBK3kidyec74vFnde) 的原创全栈项目，后端代码开源。

[加入星球](https://yuyuanweb.feishu.cn/wiki/VC1qwmX9diCBK3kidyec74vFnde) 可获得该项目从 0 到 1 的完整视频教程 + 源码 + 笔记 + 答疑 + 简历写法 + 面试题解。

![加入编程导航](./doc/加入编程导航.jpeg)

## 项目简介

[编程导航知识星球](https://yuyuanweb.feishu.cn/wiki/VC1qwmX9diCBK3kidyec74vFnde) 原创项目，一个提供 API 接口供开发者调用的平台。

管理员可以接入并发布接口，统计分析各接口调用情况；用户可以注册登录并开通接口调用权限，然后可以浏览接口及在线调试，还能使用客户端 SDK 轻松在代码中调用接口。

项目的前端并不复杂，更侧重后端，包含丰富的编程技巧和架构设计层面的知识。

主页（浏览接口）：

![](https://yupi-picture-1256524210.cos.ap-shanghai.myqcloud.com/1/1673399530597-2748898e-9f88-4329-85fc-f7bcdba3ae8a.png)



接口管理：

![img](https://yupi-picture-1256524210.cos.ap-shanghai.myqcloud.com/1/1673399741446-9627305d-cd5e-4dbf-b51a-fc249d2206db.png)



在线调试：

![](https://yupi-picture-1256524210.cos.ap-shanghai.myqcloud.com/1/1673399936177-ae0942ec-f0cc-4481-b101-b109e849b3be.png)



使用自己开发的客户端 SDK，一行代码调用接口：

![](https://yupi-picture-1256524210.cos.ap-shanghai.myqcloud.com/1/1673400021340-08220e8e-3aaf-4ca6-bdd6-c7165402151e.png)



从需求分析、技术选型、系统设计、前后端开发再到最后上线，整个项目的制作过程为 **全程直播** ！除了学做项目之外，还能学到很多思考问题、对比方案的套路，并提升排查问题、解决 Bug 的能力。

此外，还能学习到最最最方便的项目开发方式。熟练之后，**几分钟开发一个新功能** 真的轻轻松松！



## 为什么带大家做这个项目？

首先是它足够新颖，不同于大家在学校时做的管理系统、商城项目等，开放平台通常是知名企业（产品）才会建设和提供的。开放平台类的项目不要说现成的教程了，连相关的文章都少的可怜！

如下图，有点儿人看的文章基本都是几年前的了：

![](https://yupi-picture-1256524210.cos.ap-shanghai.myqcloud.com/1/1673320096281-17d8c09b-93c2-456c-b805-dace09605e7e.png)

此外，开放平台项目涉及 **多个系统** 的交互（不止有一个后端），包含了 API 签名认证、网关、RPC、分布式等必学知识，很适合帮助后端同学开拓眼界、提升系统设计和架构能力，而这点是很多网课不能做到的。

![](https://yupi-picture-1256524210.cos.ap-shanghai.myqcloud.com/1/1673400300009-9d6c7262-d1e8-4484-8386-e1971a423b56.png)



## 本项目适合的同学

本项目更侧重后端，如果你学习过后端开发技术（比如 Java Web），希望做一个区别于管理系统的、有亮点的、写在简历上加分的项目，并提升自己的编程和架构设计能力，那么非常欢迎来学习！

当然，如果你是前端，也可以通过这个项目学习到快速开发前端项目的技巧，但是最好学习过 Vue 或 React 框架。



## 技术选型

### 前端

- React 18
- Ant Design Pro 5.x 脚手架
- Ant Design & Procomponents 组件库
- Umi 4 前端框架
- OpenAPI 前端代码生成



### 后端

- Java Spring Boot
- MySQL 数据库
- MyBatis-Plus 及 MyBatis X 自动生成
- API 签名认证（Http 调用）
- Spring Boot Starter（SDK 开发）
- Dubbo 分布式（RPC、Nacos）
- Swagger + Knife4j 接口文档生成
- Spring Cloud Gateway 微服务网关
- Hutool、Apache Common Utils、Gson 等工具库



## 项目收获

1. 全程直播开发，带你了解并巩固做项目的完整流程，能够独立开发及上线项目
2. 学习最新版本前后端开发脚手架的使用，掌握快速生成代码、前后端协作的方法，提高数倍开发效率
3. 跳出传统的 CRUD 管理系统项目，学习企业级第三方平台的架构设计和开发
4. 学习客户端 SDK、API 签名认证、API 网关、RPC 分布式等后端知识和编程技巧
5. 鱼皮带你读官方文档，让你学到阅读官方文档的方法和技巧，提高自主学习的能力
6. 所有 Bug 和问题均为直播解决，带你提升自主解决问题的能力



## 已帮多名同学拿到 offer

![](https://yupi-picture-1256524210.cos.ap-shanghai.myqcloud.com/1/image-20230303094640912.png)

![](https://yupi-picture-1256524210.cos.ap-shanghai.myqcloud.com/1/image-20230303094502786.png)

![](https://yupi-picture-1256524210.cos.ap-shanghai.myqcloud.com/1/781677764412_.pic.jpg)



## 项目大纲

1. 项目介绍和计划
2. 需求分析
3. 业务流程和子系统介绍
4. 技术选型（各技术作用讲解）
5. 前后端项目初始化
    1. 前端 Ant Design Pro 框架最新版本教程
    2. 后端 Spring Boot 万用模板使用
6. 数据库表设计
7. 前后端代码自动生成（强烈推荐，大幅提高开发效率！）
8. 登录页开发
9. 接口管理功能开发（Ant Design 高级组件使用）
10. 模拟 API 接口项目开发
11. HTTP 接口调用
12. API 签名认证详解及开发
13. 客户端 SDK 开发（Spring Boot Starter）
14. 管理员接口发布 / 下线功能开发
15. 接口列表页开发
16. 在线调试接口功能开发
17. 接口调用统计开发
    1. 后端开发
    2. 优化方案分析及对比
18. API 网关详解
    1. 网关介绍及优点
    2. 10 种网关应用场景
    3. 网关分类及技术选型
19. Spring Cloud Gateway 网关实现
    1. 详细带读官方文档
    2. 统一业务处理：用户鉴权及接口调用次数统计
20. 项目分布式改造
    1. 公共模块抽象
    2. RPC 和 HTTP 调用详解及对比
    3. Dubbo 框架讲解及示例项目开发
    4. Dubbo 业务实战
21. 管理员统计分析功能
    1. 前端 2 种可视化库的使用
    2. 后端聚合查询接口开发
22. 项目扩展点及上线分析


## 项目资料

[加入星球](https://yupi.icu) 可获得：

1. 完整视频教程
2. 视频教程大纲
3. 完整项目源码
4. 项目学习笔记
5. 本项目交流答疑
6. 本项目简历写法
7. 更多原创项目教程和学习专栏

![加入编程导航](./doc/加入编程导航.jpeg)


## 版权声明

请尊重原创！与其泄露资料、二次售卖，不如邀请他人加入星球得大额赏金：https://t.zsxq.com/0eP82UuaG
