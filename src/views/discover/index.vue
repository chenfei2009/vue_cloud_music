<template>
  <div class="discover-container">
    <el-menu default-active="/" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
      <el-menu-item index="/">个性推荐</el-menu-item>
      <el-menu-item index="/djradio">专属定制</el-menu-item>
      <el-menu-item index="/playlist">歌单</el-menu-item>
      <el-menu-item index="/toplist">排行榜</el-menu-item>
      <el-menu-item index="/artist">歌手</el-menu-item>
      <el-menu-item index="/newest">最新音乐</el-menu-item>
    </el-menu>
    <router-view />
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
