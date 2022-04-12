<template>
  <aside class="aside">
    <el-menu
      default-active="/discover"
      class="el-menu-vertical-demo"
      router>
      <el-menu-item index="/discover">
        <span slot="title">发现音乐</span>
      </el-menu-item>
      <el-menu-item index="/vlog">
        <span slot="title">播客</span>
      </el-menu-item>
      <el-menu-item index="/video">
        <span slot="title">视频</span>
      </el-menu-item>
      <el-menu-item index="/friends">
        <span slot="title">关注</span>
      </el-menu-item>
      <el-menu-item index="/live">
        <span slot="title">直播</span>
      </el-menu-item>
      <el-menu-item index="/fm">
        <span slot="title">私人FM</span>
      </el-menu-item>
      <el-menu-item-group title="我的音乐">
        <el-menu-item index="/local">
          <i class="iconfont icon-download"></i>
          <span slot="title">本地与下载</span>
        </el-menu-item>
        <el-menu-item index="/recent">
          <i class="iconfont icon-recentsicon"></i>
          <span slot="title">最近播放</span>
        </el-menu-item>
      </el-menu-item-group>
      <el-submenu index="/menu" >
        <template slot="title">
          <span style="font-size: 12px; color: #909399">创建的歌单</span>
          <!-- <i class="iconfont icon-plus"></i> -->
        </template>
        <el-menu-item index="/like" style="padding: 0 20px;">
          <i class="iconfont icon-tubiaozhizuomoban-"></i>
          <span slot="title">我喜欢的音乐</span>
          <!-- <i class="iconfont icon-heart"></i> -->
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </aside>
</template>

<script>
export default {
  name: 'LayoutAside',
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.aside {
  width: 200px;
}

.el-menu {
  padding: 10px 2px 10px 10px;
  box-sizing: border-box;
  height: 100%;
}

.el-menu-item {
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  .iconfont {
    margin-right: 10px;
    color: #000;
  }
}

.el-menu-item:hover {
  background-color: #f6f6f6;
}

.el-menu-item-group {
  margin-top: 10px;
}

.is-active {
  font-size: 16px;
  font-weight: 900;
  color: #000;
  background-color: #f6f6f6;
}

.el-submenu {
  // .el-submenu__icon-arrow {
  //   position: relative !important;
  // }
  // .el-submenu__title {
  //   width: 100px;
  // }
  .el-menu-item {
    min-width: 0;
  }
}
</style>
