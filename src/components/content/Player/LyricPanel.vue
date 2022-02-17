<template>
  <div class="lyric-panel-container">
    <div class="time-line" v-if="isShowTimeLine"></div>
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
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave">
        <li v-for="(item, index) in lyric"
          :key="index"
          class="lyric-item"
          :class="{active: index===currentIndex, scrollFocus:index===scrollIndex}"
          >{{item.content}}</li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
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
      const index = this.lyric.findIndex(v => parseInt(v.time) >= this.currentTime) - 1
      if (!this.lyric || index < 0) return 0
      return index
    }
  },
  data () {
    return {
      // currentIndex: 0,
      // 每句歌词对应的 Y 值，与 scrollTo() 方法对应
      lyricTopYs: [],
      isShowTimeLine: false,
      scrollIndex: 0
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
      console.log('scroll')
      // 显示定位线
      this.isShowTimeLine = true
      // 修改 currentIndex
      this.scrollIndex = parseInt((80 + pos.y) / 40)
    },
    handleMouseEnter () {
      console.log('mouseEnter')
      // this.isMouseOnLyric = true
    },
    handleMouseLeave () {
      console.log('mouseLeave')
      // this.isMouseOnLyric = false
    }
  },
  watch: {
    lyric () {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
        // console.log(this.$refs.lyricArrRef.childNodes)
        this.$refs.lyricArrRef.childNodes.forEach(v => {
          this.lyricTopYs.push(v.offsetTop - 100)
        })
        console.log(this.lyricTopYs)
      })
    },
    currentIndex () {
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
  padding: 20px 0;
  .time-line {
    position: absolute;
    top: 140px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #000;
  }
  .scroll-wrapper {
    height: 70%;
    overflow: hidden;
  }
  .lyric-list {
    .lyric-item {
      // padding: 10px 0;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      // line-height: 40px;
    }
    .scroll-focus {
      font-weight: 800;
    }
    .active {
      font-size: 16px;
      font-weight: 800;
    }
  }
}
</style>
