<template>
  <div class="di main-wrap">
    <audio ref="audio" class="hidden"
      :src="url" :preload="audio.preload"
      @play="onPlay"
      @error="onError"
      @waiting="onWaiting"
      @pause="onPause"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
      ></audio>
    <div class="audio-wrap">
      <!-- 播放控制按钮组 -->
      <div class="action-bar">
        <i class="iconfont icon-xunhuan"></i>
        <i class="iconfont icon-step-backward"></i>
        <div class="btn play-btn" @click="startPlayOrPause">
          <i class="iconfont icon-caret-right" v-if="!audio.playing"></i>
          <i class="iconfont icon-pause" v-else></i>
        </div>
        <i class="iconfont icon-step-forward"></i>
        <i class="iconfont icon-collect"></i>
      </div>
      <!-- 进度条 -->
      <div class="slider-wrap">
        <span>{{ audio.currentTime | formatSecond}}</span>
        <el-slider v-model="sliderTime"
          :format-tooltip="formatProcessToolTip"
          @change="changeCurrentTime"
          class="slider"></el-slider>
        <span>{{ audio.maxTime | formatSecond }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import formatTime from '@/utils/formatTime.js'

export default {
  name: 'VueAudio',
  props: {
    url: {
      type: String,
      required: true
    },
    speed: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      audio: {
        currentTime: 0,
        maxTime: 0,
        playing: false,
        muted: false,
        speed: 1,
        waiting: true,
        preload: 'auto'
      },
      sliderTime: 0
    }
  },
  methods: {
    // 进度条toolTip
    formatProcessToolTip (index = 0) {
      index = parseInt(this.audio.maxTime / 100 * index)
      return '进度条: ' + formatTime(index)
    },
    // 播放跳转
    changeCurrentTime (index) {
      this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)
    },
    startPlayOrPause () {
      return this.audio.playing ? this.pausePlay() : this.startPlay()
    },
    // 开始播放
    startPlay () {
      this.$refs.audio.play()
    },
    // 暂停
    pausePlay () {
      this.$refs.audio.pause()
    },
    // 当音频暂停
    onPause () {
      this.audio.playing = false
    },
    // 当发生错误, 就出现loading状态
    onError () {
      this.audio.waiting = true
    },
    // 当音频开始等待
    onWaiting (res) {
      console.log(res)
    },
    // 当音频开始播放
    onPlay (res) {
      this.audio.playing = true
      this.audio.loading = false
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate (res) {
      // console.log('timeupdate')
      // console.log(res)
      this.audio.currentTime = res.target.currentTime
      this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata (res) {
      // console.log('loadedmetadata')
      // console.log(res)
      this.audio.waiting = false
      this.audio.maxTime = parseInt(res.target.duration)
    }
  },
  filters: {
    formatSecond (second = 0) {
      return formatTime(second)
    }
  },
  created () {
    // this.setControlList()
  }
}
</script>

<style lang="less" scoped>
  .main-wrap{
    padding: 5px 15px;
    overflow: hidden;
    height: 59px;
  }

  .audio-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 60px;

    .action-bar {
      display: flex;
      width: 200px;
      justify-content: space-between;
      align-items: center;
      .play-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        background-color: #eee;
        border-radius: 50%;
        font-size: 16px;
        .iconfont {
          font-size: 18px;
        }
      }
    }

    .slider-wrap {
      display: flex;
      align-items: center;
      overflow: hidden;
      .el-slider {
        box-sizing: border-box;
        width: 350px;
        position: relative;
        margin: 0 10px ;
        .el-slider__runway {
          // margin: 5px 0;
          /deep/ .el-slider__bar {
            background-color: #ec4141;
          }
        }
      }
    }
  }

  .hidden {
    display: none;
  }

</style>
