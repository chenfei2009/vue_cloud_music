<template>
  <div class="lyric-panel-container">
    <ul ref="lyricArr" class="lyric-wrapper">
      <li v-for="(item, index) in lyric"
        :key="index"
        class="lyric-item"
        :class="index === currentIndex - 1 ? 'active' : ''"
        >{{item.content}}</li>
    </ul>
    <Scroll />
    <!-- <Scroll class="lyric-wrapper">
      <ul ref="lyricArr">
        <li v-for="(item, index) in lyric"
          :key="index"
          class="lyric-item"
          >{{item.content}}</li>
      </ul>
    </Scroll> -->
  </div>
</template>

<script>
import Scroll from '@/components/common/Scroll.vue'

import { _getLyricById } from '@/network/song.js'

export default {
  name: 'LyricPanel',
  components: { Scroll },
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    currentTime: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      lyric: [],
      currentIndex: 0
    }
  },
  created () {
    this.getLyricById()
  },
  methods: {
    async getLyricById () {
      const { data: res } = await _getLyricById(this.id)
      const lyricData = res.lrc.lyric.split('\n')
      const lyricObj = []
      // 正则匹配 [03:57.201]原谅我...
      const reg = /\[\d*:\d*(\.|:)\d*]/g
      lyricData.forEach(v => {
        const timeRegArr = v.match(reg)
        // if (!timeRegArr) continue
        if (!timeRegArr) return
        // 获取歌词
        const content = v.replace(timeRegArr, '')
        // 获取时间
        const t = timeRegArr[0]
        const min = parseInt(t.match(/\[\d*/i).toString().slice(1))
        const sec = parseInt(t.match(/:\d*/i).toString().slice(1))
        const time = min * 60 + sec
        lyricObj.push({ time, content })
      })
      this.lyric = lyricObj
    }
  },
  watch: {
    id () {
      this.getLyricById()
    },
    currentTime () {
      this.currentIndex = this.lyric.findIndex(v => parseInt(v.time) >= this.currentTime)
      // console.log(this.currentIndex)
      if (this.currentIndex < 0) {
        this.currentIndex = this.lyric.length
        console.log('lyric ended')
      }
      this.$refs.lyricArr.style.transform = `translateY(${140 - (40 * (this.currentIndex + 1))}px)`
      // for (let i = 0; i < this.lyric.length; i++) {
      //   if (this.currentTime > (parseInt(this.lyric[i].time))) {
      //     const index = this.$refs.lyricArr[i].dataset.index
      //     if (i === parseInt(index)) {
      //       this.currentIndex = i
      //       this.$refs.lyricArr.style.transform = `translateY(${170 - (30 * (i + 1))}px)`
      //     }
      //   }
      // }
    }
  }
}
</script>

<style lang="less" scoped>
.lyric-panel-container {
  height: 280px;
  overflow: hidden;
  padding: 20px 0;
  .lyric-wrapper {
    height: 70%;
    transition: 0.5s;
    // overflow: hidden;
    .lyric-item {
      // padding: 10px 0;
      height: 40px;
      line-height: 40px;
    }
    .active {
      font-weight: 800;
    }
  }
}
</style>
