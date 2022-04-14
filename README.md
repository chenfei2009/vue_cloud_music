# vue_cloud_music
## 介绍

采用VUE及网易云音乐 Node.js API service实现，风格主要参考网易云音乐window pc客户端，

实现了其部分页面和功能 。



#### 已完成部分

2022.04.14 更新

##### Layout / Player / 登录组件

- vuex 管理歌曲、播放列表、用户登录信息等状态
- 封装 theme.js 通过 less 变量方案实现主题色切换
- 封装 Tab、TabItem 支持 router 和 常规模式
- css transition 实现部分播放器切换动效
- 封装歌词解析及滚动展示组件

##### 首页（发现音乐 > 个性推荐）

- 封装 Cover、SongItem 等组件用于数据展示及交互上的复用，满足响应式布局需求
- 自定义栏目顺序，通过 封装 dragList 组件 + vue 动态组件 实现

##### 歌手列表（发现音乐 > 歌手）

##### 用户主页（部分）/ 用户动态

- 评论列表组件复用
- 封装九宫格组件，用于缩略图及详情展示等

##### 歌手主页 / 歌单主页

- 对el-table进行二次封装及复用，实现不同场景下歌曲列表信息动态展示
- mixin 混入可复用方法



## 使用

#### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```

