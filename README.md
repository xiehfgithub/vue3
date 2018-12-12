# hfxie基于vue-cli3 脚手架搭建的开发目录结构

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 基本结构
```
/index
 入口列表页
 
 /stockCircle/
====/login
====登录 
====/CircleSelectHome/
====圈列表
========/stockCircleTimeline/
========单圈timelines列表【默认是本地be提供服务的数据，右上角点击会刷新取线上数据，以下detail同理】
=============/stockCircleDetail/
=============单圈详情

```