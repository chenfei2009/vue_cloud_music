<template>
  <div class="audio-container">
    <Info></Info>
    <div class="di main-wrap">
      <audio ref="audio" class="hidden"
        :src="url" :preload="audio.preload"
        @play="onPlay"
        @error="onError"
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
          <!-- <span>{{ audio.currentTime | formatSecond}}</span> -->
          <span>{{ sliderTime | formatSecond}}</span>
          <SliderBar height="6px" width="350px" ref="sliderBar"
            :max="audio.maxTime"
            @drag="changeTimeByDrag"
            @change="changeTimeByClick"
            :value="sliderTime"></SliderBar>
          <span>{{ audio.maxTime | formatSecond }}</span>
        </div>
      </div>
    </div>
    <Tools @changeVol="handleChangeVol"></Tools>
  </div>
</template>

<script>
import formatTime from '@/utils/formatTime.js'
import SliderBar from '@/components/common/SliderBar.vue'
import Tools from './Tools.vue'
import Info from './Info.vue'

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
  components: { SliderBar, Info, Tools },
  data () {
    return {
      audio: {
        playing: false, // 该字段是音频是否处于播放状态
        currentTime: 0, // 音频当前播放时长
        maxTime: 0, // 音频最大播放时长
        waiting: false
      },
      sliderTime: 0, // 播放进度条对应的值
      sliderVol: 0 // 音量滑动条对应的值
    }
  },
  methods: {
    // 播放进度条拖拽事件
    changeTimeByDrag (...args) {
      this.sliderTime = arguments[0]
      // this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)
    },

    // 播放条单击事件
    changeTimeByClick (...args) {
      console.log(arguments[0])
      this.sliderTime = arguments[0]
      // this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)
      this.$refs.audio.currentTime = this.sliderTime
    },

    // 音量调节事件
    handleChangeVol (...args) {
      console.log(arguments[0][1])
      this.$refs.audio.volume = arguments[0][1] / 100
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
      // this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
      if (!this.$refs.sliderBar.isMouseDownOnBall) this.sliderTime = this.audio.currentTime
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
.audio-container {
  display: flex;
  justify-content: space-between;
  height: 100%;
}

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
    }
  }

  .hidden {
    display: none;
  }

</style>
