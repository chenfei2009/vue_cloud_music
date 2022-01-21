<template>
  <el-container class="layout-container">
    <Header></Header>
    <el-container>
      <Aside></Aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <el-footer class="footer-container" height="70px">
      <!-- 播放器模块 -->
      <Audio :url="audio.url" :speed="audio.speed"/>
    </el-footer>
  </el-container>
</template>

<script>
import Header from './childComps/Header.vue'
import Aside from './childComps/Aside.vue'
import Audio from '@/components/content/Audio/Audio.vue'

export default {
  name: 'LayoutIndex',
  components: { Header, Aside, Audio },
  data () {
    return {
      name: 'Butterfly',
      singer: 'Mariah Carey',
      audio: {
        url: 'upload/test.mp3',
        speed: 1
      }
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.layout-container {
  width: 100vw;
  height: 100%;
  .el-footer {
    border-top: 1px solid #ccc;
  }
}
</style>
