<template>
  <div class="discover-container">
    <el-menu default-active="/discover" class="el-menu" mode="horizontal" @select="handleSelect" router>
      <el-menu-item index="/discover">个性推荐</el-menu-item>
      <el-menu-item index="/discover/djradio">专属定制</el-menu-item>
      <el-menu-item index="/discover/playlist">歌单</el-menu-item>
      <el-menu-item index="/discover/toplist">排行榜</el-menu-item>
      <el-menu-item index="/discover/artists">歌手</el-menu-item>
      <el-menu-item index="/discover/newest">最新音乐</el-menu-item>
    </el-menu>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'DiscoverIndex',
  components: {},
  data () {
    return {}
  },
  methods: {
    handleSelect (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="less" scoped>
.discover-container {
  position: relative;
  height: 100%;
  overflow: scroll;
  padding-top: 40px;
}

.discover-container::-webkit-scrollbar { /* 滚动条整体样式 */
  width: 4px; /* 高宽分别对应横竖滚动条的尺寸 */
  height: 4px;
}

.el-menu {
  position: fixed;
  top: 80px;
  left: 220px;
  width: 100%;
  background-color: #fff;
  z-index: 9;
}

/deep/ .el-menu--horizontal {
  border-bottom: 0;
  .el-menu-item {
    height: 30px;
    line-height: 30px;
    padding: 0;
    margin: 0 10px 10px 10px;
  }
  .is-active {
    border-bottom: 2px solid var(--themeColor);
    font-size: 18px;
    font-weight: 800;
  }
}
</style>
