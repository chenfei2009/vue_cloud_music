<template>
  <el-container class="layout-container">
    <Header></Header>
    <el-container class="main-container">
      <Aside></Aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <el-footer class="footer-container" height="70px">
      <!-- 播放器模块 -->
      <!-- <Audio :audioProp="audio" @showList="handleShowList"/> -->
      <Audio @showList="handleShowList"/>
    </el-footer>
    <!-- 播放列表侧边栏 -->
    <PlayList :tableData=playList
      :activeId="activeId"
      v-if="isShowPlayList"/>
  </el-container>
</template>

<script>
import Header from './childComps/Header.vue'
import Aside from './childComps/Aside.vue'
import PlayList from './childComps/PlayList.vue'
import Audio from '@/components/content/Audio/Audio.vue'

import request from '@/utils/request.js'

export default {
  name: 'LayoutIndex',
  components: { Header, Aside, Audio, PlayList },
  data () {
    return {
      name: 'Butterfly',
      singer: 'Mariah Carey',
      audio: {
        url: 'upload/test.mp3',
        speed: 1
      },
      // playList: [], // 播放列表数据
      activeId: 0, // 当前选中歌曲 id
      isShowPlayList: false // 是否显示播放列表
    }
  },
  computed: {
    playContent () {
      return this.$store.state.playContent
    },
    playList () {
      return this.$store.state.playList
    }
  },
  created () {
    // 加载播放列表数据
    this.setPlayListData()
    this.setAudio()
    this.loginTest()
  },
  methods: {
    async loginTest () {
      const res = await request({
        method: 'GET',
        url: '/login/cellphone',
        params: {
          phone: '15811121817',
          password: 'chenfei2013'
        }
      })
      console.log(res)
    },
    handleShowList () {
      this.isShowPlayList = !this.isShowPlayList
    },
    /**
     * 加载播放列表数据
     */
    setPlayListData () {
      // 暂用虚拟数据
      const arr = [{
        id: 0,
        name: 'Butterfly',
        tag: 0,
        singer: 'mariah carey',
        url: 'upload/Butterfly.m4a',
        cover: '#',
        time: 500
      }, {
        id: 1,
        name: 'The Roof (Back in Time)',
        tag: 0,
        singer: 'mariah carey',
        url: 'upload/The_Roof_(Back_in_Time).m4a',
        cover: '#',
        time: 500
      }]
      for (let i = 0; i < 20; i++) {
        arr.push({
          id: i + 2,
          name: `test${i}`,
          tag: 0,
          singer: 'mariah carey',
          url: 'upload/test.mp3',
          cover: '#',
          time: 500
        })
      }
      this.playList.push(...arr)
      this.$store.commit('addToPlayList', ...arr)
    },
    /**
     * 设置当前歌曲数据
     */
    setAudio () {
      const index = this.playList.findIndex(v => v.id === this.activeId)
      this.audio = this.playList[index]
      this.$store.commit('setContent', this.audio)
    }
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  width: 100vw;
  height: 100%;
  .main-container {
    height: calc(~"100vh - 130px");
  }
  .el-footer {
    border-top: 1px solid #ccc;
    box-sizing: border-box;
  }
}
</style>
