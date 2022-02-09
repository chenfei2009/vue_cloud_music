<template>
  <el-container class="song-container">
    <Header :transparent=true />
    <el-container class="main-container">
      Song
    </el-container>
    <el-footer class="footer-container" height="70px">
      <!-- 播放器模块 -->
      <Audio />
    </el-footer>
  </el-container>
</template>

<script>
import Header from '@/components/content/Header/Header.vue'
import Audio from '@/components/content/Audio/Audio.vue'

export default {
  name: 'SongIndex',
  components: { Header, Audio },
  created () {
    // console.log('resetThemeColor', 'light')
    // this.$store.commit('resetThemeColor', 'light')
  },
  beforeDestroy () {
    // console.log('resetThemeColor', 'red')
    // this.$store.commit('resetThemeColor', 'red')
  }
}
</script>

<style lang="less" scoped>
.song-container {
  width: 100vw;
  height: 100%;
  // background-color: var(--themeColor);
  background-image: linear-gradient(#eee, #fff);
  .main-container {
    height: calc(~"100vh - 130px");
  }
  .el-footer {
    border-top: 1px solid #ccc;
    box-sizing: border-box;
  }
}
</style>
