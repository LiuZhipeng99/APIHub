SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;


create database if not exists apihub;
use apihub;



-- ----------------------------
-- Table structure for interface_info
-- ----------------------------
DROP TABLE IF EXISTS `interface_info`;
CREATE TABLE `interface_info` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(256) NOT NULL COMMENT '名称',
  `description` varchar(256) DEFAULT NULL COMMENT '描述',
  `url` varchar(512) NOT NULL COMMENT '接口地址',
  `method` int NOT NULL COMMENT '请求类型:0-Get，1-Post',
  `requestParams` text COMMENT '请求参数',
  `requestHeader` text COMMENT '请求头',
  `responseHeader` text COMMENT '响应头',
  `status` int NOT NULL DEFAULT 0 COMMENT '接口状态（0-关闭，1-开启）',
  `userId` bigint NOT NULL COMMENT '创建人',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `isDelete` tinyint NOT NULL DEFAULT '0' COMMENT '是否删除(0-未删, 1-已删)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='接口信息';

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'id',
  `userName` varchar(256) DEFAULT NULL COMMENT '用户昵称',
  `userAccount` varchar(256) NOT NULL COMMENT '账号',
  `userAvatar` varchar(1024) DEFAULT NULL COMMENT '用户头像',
  `gender` tinyint DEFAULT NULL COMMENT '性别',
  `userRole` varchar(256) NOT NULL DEFAULT 'user' COMMENT '用户角色：user / admin',
  `userPassword` varchar(512) NOT NULL COMMENT '密码',
  `accessKey` varchar(512) NOT NULL COMMENT 'accessKey',
  `secretKey` varchar(512) NOT NULL COMMENT 'secretKey',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `isDelete` tinyint NOT NULL DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uni_userAccount` (`userAccount`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户';

-- ----------------------------
-- Table structure for user_interface_info
-- ----------------------------
DROP TABLE IF EXISTS `user_interface_info`;
CREATE TABLE `user_interface_info` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `userId` bigint NOT NULL COMMENT '调用用户 id',
  `interfaceInfoId` bigint NOT NULL COMMENT '接口 id',
  `totalNum` int NOT NULL DEFAULT '0' COMMENT '总调用次数',
  `leftNum` int NOT NULL DEFAULT '0' COMMENT '剩余调用次数',
  `status` int NOT NULL DEFAULT '0' COMMENT '0-正常，1-禁用',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `isDelete` tinyint NOT NULL DEFAULT '0' COMMENT '是否删除(0-未删, 1-已删)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户调用接口关系';

SET FOREIGN_KEY_CHECKS = 1;

-- 加入一个admin用户
INSERT INTO apihub.`user` (userName,userAccount,userAvatar,gender,userRole,userPassword,accessKey,secretKey,createTime,updateTime,isDelete) VALUES
	 ('adminadmin密','admin',NULL,NULL,'admin','f53bcfe70172be7db3c69cabe6946108','abcd7bd900a2b814d5532745a50c363c','427721e4b019cd8e76bb4ee981e58fc7','2024-07-31 03:08:51','2024-07-31 03:59:25',0);
-- 加入接口信息
INSERT INTO apihub.interface_info (name,description,url,requestParams,requestHeader,responseHeader,status,`method`,userId,createTime,updateTime,isDelete) VALUES
	 ('B站热榜','https://www.free-api.com/doc/639','https://v.api.aa1.cn/api/bilibili-rs/','无',NULL,'',0,0,1,'2024-07-31 03:53:46','2024-07-31 04:11:15',0),
	 ('部分免费歌曲','https://www.free-api.com/doc/643','https://www.free-api.com/doc/643','null',NULL,NULL,0,0,1,'2024-07-31 04:10:04','2024-07-31 04:10:04',0),
	 ('今日头条热点','doc：https://www.free-api.com/doc/640','https://tenapi.cn/v2/toutiaohotnew','null',NULL,NULL,0,0,1,'2024-07-31 04:10:58','2024-07-31 04:10:58',0);
INSERT INTO apihub.`user_interface_info` (`userId`, `interfaceInfoId`, `totalNum`, `leftNum`, `status`, `createTime`, `updateTime`, `isDelete`) VALUES
	(1, 1, 100, 50, 0, '2024-01-01 10:00:00', '2024-01-01 10:00:00', 0),
	(1, 2, 200, 150, 0, '2024-02-01 11:00:00', '2024-02-01 11:00:00', 0);

-- 填充数据
insert into apihub.`interface_info` (`name`, `description`, `url`, `requestHeader`, `responseHeader`, `status`, `method`, `userId`) values ('姚皓轩', '金鹏', 'www.lyda-klein.biz', '杜昊强', '邵志泽', 0, 0, 6546);
insert into apihub.`interface_info` (`name`, `description`, `url`, `requestHeader`, `responseHeader`, `status`, `method`, `userId`) values ('廖驰', '沈泽洋', 'www.consuelo-sipes.info', '彭昊然', '邓耀杰', 0, 0, 7761037);
insert into apihub.`interface_info` (`name`, `description`, `url`, `requestHeader`, `responseHeader`, `status`, `method`, `userId`) values ('赖智渊', '邓志泽', 'www.emerson-mann.co', '熊明哲', '贺哲瀚', 0, 0, 381422);
insert into apihub.`interface_info` (`name`, `description`, `url`, `requestHeader`, `responseHeader`, `status`, `method`, `userId`) values ('许涛', '陆致远', 'www.vella-ankunding.name', '贾哲瀚', '莫昊焱', 0, 0, 4218096);
insert into apihub.`interface_info` (`name`, `description`, `url`, `requestHeader`, `responseHeader`, `status`, `method`, `userId`) values ('吕峻熙', '沈鹏飞', 'www.shari-reichel.org', '郭鸿煊', '覃烨霖', 0, 0, 493);
