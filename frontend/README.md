# API平台前端 ant design pro 6构建

搞不懂这些前端框架动不动install不了，也不知道改了啥突然import不了service了

- api-project的前端不能跑AssertionError [ERR_ASSERTION]: filePath not found of /Users/liuzhipeng/front/api-frontend/node_modules/.store/@umijs+renderer-react@3.5.42/node_modules/@umijs/renderer-react/dist/index.js。 
- 其功能也没做完还没yupi多但做了注册

所以以yupi为基准，增加Forget和Register页和对应Router

- package.json中删除husky install脚本避免.git报错，add echart库

- cnpm进行依赖安装会报错。转yarn了

- api- project中对登陆注释跟多，可以学习

- 接下来通过复制User目录过来修改，然后替换已有文件找出service import bug所在（不知道发生什么了不是缺文件可能是src）。

登陆页面修改下好看点方式，了解了tsconfig和lockfile。
