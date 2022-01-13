<template>
  <div class="footer-container">
    <!-- 歌曲信息模块 -->
    <div class="info-wrap">
      <div class="info-cover">封面</div>
      <div class="info-text">
        <div class="info-name">{{name}}</div>
        <div class="info-singer">{{singer}}</div>
      </div>
      <div class="info-zan"><i class="iconfont icon-dianzan"></i></div>
    </div>
    <!-- 播放器模块 -->
    <Audio :url="audio.url" :speed="audio.speed"/>
    <!-- 播放设置模块 -->
    <div class="tools-wrap">
      <div class="tools-item speed">倍速</div>
      <div class="tools-item">音效</div>
      <div class="tools-item">
        <i class="iconfont icon-24gl-volumeMiddle"></i>
      </div>
      <div class="tools-item">
        <i class="iconfont icon-friends"></i>
      </div>
      <div class="tools-item">
        <i class="iconfont icon-play_list"></i>
      </div>
    </div>
  </div>
</template>

<script>
import Audio from '@/components/content/Audio.vue'

export default {
  name: 'FooterIndex',
  data () {
    return {
      name: 'Butterfly',
      singer: 'Mariah Carey',
      audio: {
        url: 'public/upload/test.mp3',
        speed: 1
      }
    }
  },
  components: { Audio },
  computed: {},
  methods: {}
}
</script>

<style lang="less" scoped>
.footer-container {
  display: flex;
  justify-content: space-between;
  height: 100%;
  .info-wrap {
    display: flex;
    align-items: center;
    height: 100%;
    .info-cover {
      width: 50px;
      height: 50px;
      background-color: rgb(129, 116, 116);
    }
    .info-text {
      margin-left: 10px;
      width: 120px;
      .info-singer {
        font-size: 12px;
        margin-top: 2px;
      }
    }
    .info-zan {
      height: 40px;
      .iconfont {
        font-size: 18px;
      }
    }
  }
  .tools-wrap {
    display: flex;
    justify-content: right;
    align-items: center;
    height: 100%;
    .tools-item {
      margin: 0 5px;
    }
    .speed {
      border: 1px solid #000;
      padding: 0 2px;
    }
  }
}
</style>
