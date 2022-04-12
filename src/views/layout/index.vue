<template>
  <div class="layout-container">
    <!-- 头部模块 -->
    <layout-header/>
    <!-- /头部模块 -->
    <section class="main-container">
      <!-- 导航栏模块 -->
      <layout-aside/>
      <!-- /导航栏模块 -->
      <main class="main">
        <keep-alive>
          <router-view />
        </keep-alive>
      </main>
    </section>
    <section class="footer-container" height="70px">
      <!-- 播放器模块 -->
      <player />
      <!-- /播放器模块 -->
    </section>
  </div>
</template>

<script>
import Player from '@/components/content/Player/Player.vue'
import LayoutHeader from './childComps/LayoutHeader.vue'
import LayoutAside from './childComps/LayoutAside.vue'

export default {
  name: 'LayoutIndex',
  components: { LayoutHeader, LayoutAside, Player },
  data () {
    return {
      name: 'Butterfly',
      singer: 'Mariah Carey',
      audio: {
        url: 'upload/test.mp3',
        speed: 1
      },
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
  },
  methods: {
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
        ar: [{ // 歌手信息
          id: 0,
          name: 'Mariah Carey'
        }],
        al: { // 专辑信息
          id: 0,
          name: 'Butterfly',
          picUrl: '#' // 专辑封面
        },
        tag: 0,
        url: 'upload/Butterfly.m4a',
        dt: 500
      }, {
        id: 1,
        name: 'The Roof (Back in Time)',
        ar: [{ // 歌手信息
          id: 0,
          name: 'Mariah Carey'
        }],
        al: { // 专辑信息
          id: 0,
          name: 'Butterfly',
          picUrl: '#' // 专辑封面
        },
        tag: 0,
        url: 'upload/The_Roof_(Back_in_Time).m4a',
        dt: 700
      }]
      for (let i = 0; i < 20; i++) {
        arr.push({
          id: i + 2,
          name: `test${i}`,
          ar: [{ // 歌手信息
            id: 0,
            name: 'Craig David'
          }],
          al: { // 专辑信息
            id: 0,
            name: 'Test',
            picUrl: '#' // 专辑封面
          },
          tag: 0,
          url: 'upload/test.mp3',
          dt: 500
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
  .left-wrap {
    width: 200px;
    display: flex;
    align-items: center;
    .logo-bg {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #fff;
      .logo {
        font-size: 20px;
        color: var(--themeColor);
      }
    }
    span {
      margin-left: 5px;
      font-size: 18px;
      color: #fff;
    }
  }
  .main-container {
    height: calc(~"100vh - 130px");
    padding-bottom: 0;
    display: flex;
    .main {
      width: calc(~"100% - 200px");
      height: 100%;
      overflow: scroll;
    }
    .main::-webkit-scrollbar { /* 滚动条整体样式 */
      width: 4px; /* 高宽分别对应横竖滚动条的尺寸 */
      height: 4px;
    }
  }
}
</style>
