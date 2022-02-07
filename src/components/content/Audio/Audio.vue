<template>
  <div class="audio-container">
    <Info :infoProp="audio"></Info>
    <div class="di main-wrap">
      <audio ref="audio" class="hidden"
        :src="playContent.url" :preload="audio.preload" :autoplay="audio.autoplay"
        @play="onPlay"
        @error="onError"
        @ended="onEnded"
        @pause="onPause"
        @timeupdate="onTimeupdate"
        @loadedmetadata="onLoadedmetadata"
        ></audio>
      <div class="audio-wrap">
        <!-- 播放控制按钮组 -->
        <div class="action-bar">
          <!-- 循环模式切换 -->
          <el-tooltip :content="loopOptionText" placement="bottom" effect="light" :open-delay=500>
            <i class="iconfont icon" :class="loopOptionClass" @click="switchLoop"></i>
          </el-tooltip>
          <!-- 上一首 -->
          <el-tooltip content="上一首" placement="bottom" effect="light" :open-delay=500>
            <i class="iconfont icon icon-step-backward" @click="setPrev"></i>
          </el-tooltip>
          <!-- 播放/暂停 -->
          <el-tooltip :content="playBtnText" placement="bottom" effect="light" :open-delay=500>
            <div class="btn play-btn" @click="startPlayOrPause">
              <i class="iconfont icon-caret-right" v-if="!audio.playing"></i>
              <i class="iconfont icon-pause" v-else></i>
            </div>
          </el-tooltip>
          <!-- 下一首 -->
          <el-tooltip content="下一首" placement="bottom" effect="light" :open-delay=500>
            <i class="iconfont icon icon-step-forward" @click="setNext"></i>
          </el-tooltip>
          <!-- 打开歌词 -->
          <el-tooltip content="打开歌词" placement="bottom" effect="light" :open-delay=500>
            <span class="icon">词</span>
          </el-tooltip>
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
    <Tools @changeVol="handleChangeVol"
      @changeSpeed="handleChangeSpeed"
      @showListClick="handleShowList"
      ></Tools>
  </div>
</template>

<script>
import formatTime from '@/utils/formatTime.js'
import SliderBar from '@/components/common/SliderBar.vue'
import Tools from './Tools.vue'
import Info from './Info.vue'

export default {
  name: 'VueAudio',
  components: { SliderBar, Info, Tools },
  computed: {
    playContent () {
      return this.$store.state.playContent
    },
    playList () {
      return this.$store.state.playList
    },
    loopOptionClass () {
      const index = this.loopOptions.findIndex(v => v.id === this.audio.loop)
      return this.loopOptions[index].icon
    },
    loopOptionText () {
      const index = this.loopOptions.findIndex(v => v.id === this.audio.loop)
      return this.loopOptions[index].text
    },
    playBtnText () {
      return this.audio.playing ? '暂停' : '播放'
    }
  },
  data () {
    return {
      audio: {
        playing: false, // 该字段是音频是否处于播放状态
        autoplay: false,
        currentTime: 0, // 音频当前播放时长
        maxTime: 0, // 音频最大播放时长
        speed: 1,
        loop: 0,
        waiting: false,
        url: ''
      },
      loopOptions: [
        { id: 0, text: '顺序播放', icon: 'icon-shunxubofang' }, // 'notLoop' 顺序播放
        { id: 1, text: '列表循环', icon: 'icon-xunhuan' }, // 'listLoop' 列表循环
        { id: 2, text: '单曲循环', icon: 'icon-single' }, // 'singleLoop' 单曲循环
        { id: 3, text: '随机播放', icon: 'icon-random' } // 'randomLoop' 随机播放
      ],
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
      this.sliderTime = arguments[0]
      // this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)
      this.$refs.audio.currentTime = this.sliderTime
    },

    // 音量调节事件
    handleChangeVol (...args) {
      this.$refs.audio.volume = arguments[0][1] / 100
    },

    // 倍速调节事件
    handleChangeSpeed (speed) {
      this.$refs.audio.playbackRate = speed
    },

    /**
     * 播放模式及歌曲切换相关事件
     */
    // 切换歌曲循环类型
    switchLoop () {
      let index = this.loopOptions.findIndex(v => v.id === this.audio.loop)
      index === this.loopOptions.length - 1 ? index = 0 : index = index + 1
      this.audio.loop = this.loopOptions[index].id
    },

    // 根据循环类型切换歌曲
    switchContent () {
      let index = this.playList.indexOf(this.playContent)
      if (this.audio.loop === 0) { // 顺序播放
        index = index + 1
        this.$store.commit('setContent', this.playList[index])
      } else if (this.audio.loop === 1) { // 列表循环
        index === this.playList.length - 1 ? index = 0 : index = index + 1
        this.$store.commit('setContent', this.playList[index])
      } else if (this.audio.loop === 2) { // 单曲循环
        this.$store.commit('setContent', this.playList[index])
      } else if (this.audio.loop === 3) { // 随机播放
        let newIndex
        newIndex = parseInt(Math.random() * this.playList.length)
        while (newIndex === index) {
          newIndex = parseInt(Math.random() * this.playList.length)
          return newIndex
        }
        this.$store.commit('setContent', this.playList[newIndex])
      }
      // 切换歌曲后自动开始播放
      if (this.audio.playing === false) {
        this.startPlay()
      }
    },

    // 上一首
    setPrev () {
      let index = this.playList.indexOf(this.playContent)
      // 如果是第一首则跳转到列表末尾
      index === 0 ? index = this.playList.length - 1 : index = index - 1
      this.$store.commit('setContent', this.playList[index])
    },

    // 下一首
    setNext () {
      this.switchContent()
    },

    // 播放列表按钮点击事件
    handleShowList () {
      this.$emit('showList')
    },

    /**
     * audio 标签相关事件
     */
    startPlayOrPause () {
      return this.audio.playing ? this.pausePlay() : this.startPlay()
    },

    // 开始播放
    startPlay () {
      this.audio.autoplay = true
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

    // 当音频播放结束
    onEnded (res) {
      this.audio.playing = false
      this.audio.loading = true
      this.switchContent()
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
  created () {},
  watch: {
    playContent (oldVal, newVal) {
      // console.log(newVal)
      this.audio.url = this.playContent.url
      this.audio.currentTime = 0
      this.startPlay()
    }
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
      .icon:hover {
        color: var(--themeColor);
      }
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
      .play-btn:hover {
        background-color: #ccc;
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
