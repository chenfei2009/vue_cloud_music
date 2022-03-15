<template>
  <div class="lyric-panel-container"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave">
    <!-- 进度控制线 -->
    <div class="time-line-bar" v-show="isShowTimeLine">
      <div class="timer">{{scrollTimer}}</div>
      <div class="btn" @click="handleTimerClick">
        <i class="iconfont icon-caret-right" ></i>
      </div>
    </div>
    <!-- 滚动区域 -->
    <Scroll ref="scroll"
      class="scroll-wrapper"
      :probeType="3"
      :listenScroll="true"
      :stopPropagation="true"
      :bounce="false"
      :mouseWheel="true"
      :scrollbar="true"
      @scroll="contentScroll">
      <ul ref="lyricArrRef"
        class="lyric-list"
        @mousewheel="handleMouseWheel">
        <li v-for="(item, index) in lyric"
          :key="index"
          class="lyric-item"
          :class="{active: index===currentIndex, focus: isShowTimeLine && index===scrollIndex}"
          >{{item.content}}</li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
import formatTime from '@/utils/formatTime.js'

import Scroll from '@/components/common/Scroll.vue'

export default {
  name: 'LyricPanel',
  components: { Scroll },
  props: {
    lyric: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    currentTime () {
      return this.$store.state.currentTime
    },
    currentIndex () {
      if (!this.lyric || this.lyric.length === 1) return 0
      const index = this.lyric.findIndex(v => v.time >= this.currentTime) - 1
      if (index < 0) return 0
      return index
    }
    // scrollTimer () { // scrollIndex 对应的时间
    //   return formatTime(this.lyric[this.scrollIndex].time)
    // }
  },
  data () {
    return {
      // currentIndex: 0,
      // 每句歌词对应的 Y 值，与 scrollTo() 方法对应
      lyricTopYs: [],
      isAutoScroll: true,
      isShowTimeLine: false,
      scrollIndex: 0,
      scrollTimer: '00:00'
    }
  },
  created () {},
  mounted () {
    // const posY = this.lyricTopYs[this.currentIndex]
    // this.$refs.scroll.scrollTo(0, -posY, 500)
    this.$nextTick(() => {
      // const posY = this.lyricTopYs[0]
      // this.$refs.scroll.scrollTo(0, -posY, 500)
      this.$refs.scroll.scrollTo(0, 80, 500)
    })
  },
  methods: {
    contentScroll (pos) {
      // const index = parseInt((80 + pos.y) / 40)
      // console.log('scroll')
      // 显示定位线
      // this.isShowTimeLine = true
      // 修改 currentIndex
      this.scrollIndex = parseInt((-pos.y) / 40) + 3
      if (this.scrollIndex > this.lyric.length - 1) return false
      const timer = this.lyric[this.scrollIndex].time
      this.scrollTimer = formatTime(timer)
    },
    handleMouseEnter () {
      // console.log('mouseEnter')
      // this.isShowTimeLine = true
    },
    handleMouseLeave () {
      // console.log('mouseLeave')
      this.isShowTimeLine = false
      this.isAutoScroll = true
    },
    handleMouseWheel () {
      // console.log('mouseWheel')
      this.isAutoScroll = false
      if (!this.isShowTimeLine) this.isShowTimeLine = true
    },
    handleTimerClick () {
      const timer = this.lyric[this.scrollIndex].time
      console.log('setCurrentTime', this.lyric[this.scrollIndex].time)
      this.$store.commit('setCurrentTime', timer)
    }
  },
  watch: {
    lyric () {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
        this.$refs.scroll.scrollTo(0, 80, 500)
        // console.log(this.$refs.lyricArrRef.childNodes)
        this.$refs.lyricArrRef.childNodes.forEach(v => {
          this.lyricTopYs.push(v.offsetTop - 120)
        })
        // console.log(this.lyricTopYs)
      })
    },
    currentIndex () {
      if (!this.isAutoScroll) return
      const posY = this.lyricTopYs[this.currentIndex]
      this.$refs.scroll.scrollTo(0, -posY, 500)
    }
  }
}
</script>

<style lang="less" scoped>
.lyric-panel-container {
  position: relative;
  height: 280px;
  // overflow: hidden;
  margin: 20px 0;
  .time-line-bar {
    position: absolute;
    top: 140px;
    left: 0;
    right: 0;
    // height: 1px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    z-index: 30;
    .timer {
      font-size: 10px;
    }
    .timer:after, .btn:before {
      position: absolute;
      content: '';
      width: 40px;
      height: 1px;
      background-color: #ccc;
      top: 45%;
    }
    .timer:after {
      right: 8%;
    }
    .btn:before {
      left: 12%;
    }
  }
  .scroll-wrapper {
    height: 100%;
    overflow: hidden;
  }
  .lyric-list {
    padding: 0 80px;
    .lyric-item {
      // padding: 10px 0;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      // line-height: 40px;
    }
    .focus {
      font-weight: 800;
    }
    .active {
      font-size: 16px;
      font-weight: 800;
    }
  }
}
</style>
