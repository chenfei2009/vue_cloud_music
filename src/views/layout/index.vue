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
<<<<<<< HEAD
<<<<<<< HEAD
      <!-- 播放器模块 -->
      <Audio :url="audio.url" :speed="audio.speed"/>
=======
      <Footer></Footer>
>>>>>>> c328e313f635a0411e9df97f5b4e059ab27f3b87
=======
      <!-- 播放器模块 -->
      <Audio :url="audio.url" :speed="audio.speed"/>
>>>>>>> 26079ebd076347dca3a5d55cd9a77edb1ed0794e
    </el-footer>
  </el-container>
</template>

<script>
import Header from './childComps/Header.vue'
import Aside from './childComps/Aside.vue'
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
import Footer from './childComps/Footer.vue'
=======
import Audio from '@/components/content/Audio/Audio.vue'
>>>>>>> 26079ebd076347dca3a5d55cd9a77edb1ed0794e

export default {
  name: 'LayoutIndex',
  components: { Header, Aside, Audio },
  data () {
<<<<<<< HEAD
    return {}
>>>>>>> c328e313f635a0411e9df97f5b4e059ab27f3b87
=======
    return {
      name: 'Butterfly',
      singer: 'Mariah Carey',
      audio: {
        url: 'upload/test.mp3',
        speed: 1
      }
    }
>>>>>>> 26079ebd076347dca3a5d55cd9a77edb1ed0794e
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
