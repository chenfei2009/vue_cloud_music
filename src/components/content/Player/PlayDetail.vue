<template>
  <div class="play-detail-container">
    <div class="main container">
      <div class="left">
        <div class="cover-wrap">
          <el-image class="cover" :src="playContent.al.picUrl"></el-image>
        </div>
      </div>
      <div class="center">
        <div class="title">
          <h1 class="name">{{playContent.name}}</h1>
          <div class="ar-al-wrap">
            <div class="artist" v-for="item in playContent.ar" :key="item.id">
            -{{item.name}}
            </div>
            <div class="album">-{{playContent.al.name}}</div>
          </div>
        </div>
        <LyricPanel :id="playContent.id" :currentTime="currentTime" />
      </div>
      <div class="right" v-show="!isCollapsed">
        <div class="title">喜欢这首歌的人也听</div>
        <ul>
          <li>111</li>
          <li>222</li>
          <li>333</li>
          <li>444</li>
          <li>555</li>
        </ul>
      </div>
    </div>
    <div class="aside-btn">
      <i class="iconfont icon-arrow" @click="isCollapsed=!isCollapsed"></i>
    </div>
  </div>
</template>

<script>
import LyricPanel from './LyricPanel.vue'

export default {
  name: 'PlayDetail',
  components: { LyricPanel },
  computed: {
    playContent () {
      return this.$store.state.playContent
    },
    currentTime () {
      return this.$store.state.currentTime
    }
  },
  data () {
    return {
      id: null,
      isCollapsed: false
    }
  },
  created () {},
  methods: {}
}
</script>

<style lang="less" scoped>
.play-detail-container {
  position: relative;
  width: 100%;
  height: 66%;
  min-height: 400px;
  max-height: 600px;
  margin-top: 20px;
  .main {
    display: flex;
    height: 100%;
    .left {
      flex: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      .cover-wrap {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        padding: 30px;
        overflow: hidden;
        background-color: #000;
        border: 10px solid #ccc;
        .cover {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
    .center {
      flex: 3;
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: space-around;
      padding: 0 20px;
      .title {
        .ar-al-wrap {
          display: flex;
          justify-content: center;
        }
      }
      .lrc-wrap {
        overflow: hidden;
        flex: 1;
      }
    }
    .right {
      width: 20vw;
      margin-top: 120px;
      height: 200px;
    }
  }

  .aside-btn {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
  }
}
</style>
