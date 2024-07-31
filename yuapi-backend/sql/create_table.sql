# 数据库初始化
# @author <a href="https://github.com/liyupi">程序员鱼皮</a>
# @from <a href="https://yupi.icu">编程导航知识星球</a>
-- 创建库
create database if not exists yuapi;

-- 切换库
use yuapi;

-- 用户表
create table if not exists user
(
    id           bigint auto_increment comment 'id' primary key,
    userName     varchar(256)                           null comment '用户昵称',
    userAccount  varchar(256)                           not null comment '账号',
    userAvatar   varchar(1024)                          null comment '用户头像',
    gender       tinyint                                null comment '性别',
    userRole     varchar(256) default 'user'            not null comment '用户角色：user / admin',
    userPassword varchar(512)                           not null comment '密码',
    `accessKey` varchar(512) not null comment 'accessKey',
    `secretKey` varchar(512) not null comment 'secretKey',
    createTime   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime   datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint      default 0                 not null comment '是否删除',
    constraint uni_userAccount
        unique (userAccount)
) comment '用户';

-- 接口信息
create table if not exists yuapi.`interface_info`
(
    `id` bigint not null auto_increment comment '主键' primary key,
    `name` varchar(256) not null comment '名称',
    `description` varchar(256) null comment '描述',
    `url` varchar(512) not null comment '接口地址',
    `requestParams` text null comment '请求参数',
    `requestHeader` text null comment '请求头',
    `responseHeader` text null comment '响应头',
    `status` int default 0 not null comment '接口状态（0-关闭，1-开启）',
    `method` varchar(256) not null comment '请求类型',
    `userId` bigint not null comment '创建人',
    `createTime` datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    `updateTime` datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    `isDelete` tinyint default 0 not null comment '是否删除(0-未删, 1-已删)'
) comment '接口信息';

-- 用户调用接口关系表
create table if not exists yuapi.`user_interface_info`
(
    `id` bigint not null auto_increment comment '主键' primary key,
    `userId` bigint not null comment '调用用户 id',
    `interfaceInfoId` bigint not null comment '接口 id',
    `totalNum` int default 0 not null comment '总调用次数',
    `leftNum` int default 0 not null comment '剩余调用次数',
    `status` int default 0 not null comment '0-正常，1-禁用',
    `createTime` datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    `updateTime` datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    `isDelete` tinyint default 0 not null comment '是否删除(0-未删, 1-已删)'
) comment '用户调用接口关系';

-- 加入一个admin用户
INSERT INTO yuapi.`user` (userName,userAccount,userAvatar,gender,userRole,userPassword,accessKey,secretKey,createTime,updateTime,isDelete) VALUES
	 ('adminadmin密','admin',NULL,NULL,'admin','29755bf93fbdce95de1b06c61d402a76','abcd7bd900a2b814d5532745a50c363c','427721e4b019cd8e76bb4ee981e58fc7','2024-07-31 03:08:51','2024-07-31 03:59:25',0),
	 (NULL,'admin2',NULL,NULL,'user','29755bf93fbdce95de1b06c61d402a76','b52b2cceec3106f306690e27e4e4c6f8','12f6480d9cc830226a07259765904ab7','2024-07-31 03:31:30','2024-07-31 03:31:30',0);
-- 加入接口信息
INSERT INTO yuapi.interface_info (name,description,url,requestParams,requestHeader,responseHeader,status,`method`,userId,createTime,updateTime,isDelete) VALUES
	 ('B站热榜','https://www.free-api.com/doc/639','https://v.api.aa1.cn/api/bilibili-rs/','无',NULL,'',0,'',2,'2024-07-31 03:53:46','2024-07-31 04:11:15',0),
	 ('部分免费歌曲','https://www.free-api.com/doc/643','https://www.free-api.com/doc/643','null',NULL,NULL,0,'get/post',2,'2024-07-31 04:10:04','2024-07-31 04:10:04',0),
	 ('今日头条热点','doc：https://www.free-api.com/doc/640','https://tenapi.cn/v2/toutiaohotnew','null',NULL,NULL,0,'get/post',2,'2024-07-31 04:10:58','2024-07-31 04:10:58',0);
INSERT INTO yuapi.`user_interface_info` (`userId`, `interfaceInfoId`, `totalNum`, `leftNum`, `status`, `createTime`, `updateTime`, `isDelete`) VALUES
	(1, 1, 100, 50, 0, '2024-01-01 10:00:00', '2024-01-01 10:00:00', 0),
	(1, 2, 200, 150, 0, '2024-02-01 11:00:00', '2024-02-01 11:00:00', 0);

-- 填充数据
insert into yuapi.`interface_info` (`name`, `description`, `url`, `requestHeader`, `responseHeader`, `status`, `method`, `userId`) values ('姚皓轩', '金鹏', 'www.lyda-klein.biz', '杜昊强', '邵志泽', 0, '冯鸿涛', 6546);
insert into yuapi.`interface_info` (`name`, `description`, `url`, `requestHeader`, `responseHeader`, `status`, `method`, `userId`) values ('廖驰', '沈泽洋', 'www.consuelo-sipes.info', '彭昊然', '邓耀杰', 0, '周彬', 7761037);
insert into yuapi.`interface_info` (`name`, `description`, `url`, `requestHeader`, `responseHeader`, `status`, `method`, `userId`) values ('赖智渊', '邓志泽', 'www.emerson-mann.co', '熊明哲', '贺哲瀚', 0, '田鹏', 381422);
insert into yuapi.`interface_info` (`name`, `description`, `url`, `requestHeader`, `responseHeader`, `status`, `method`, `userId`) values ('许涛', '陆致远', 'www.vella-ankunding.name', '贾哲瀚', '莫昊焱', 0, '袁越彬', 4218096);
insert into yuapi.`interface_info` (`name`, `description`, `url`, `requestHeader`, `responseHeader`, `status`, `method`, `userId`) values ('吕峻熙', '沈鹏飞', 'www.shari-reichel.org', '郭鸿煊', '覃烨霖', 0, '熊黎昕', 493);
