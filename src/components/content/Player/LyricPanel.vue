<template>
  <div class="lyric-panel-container">
    <div>{{currentTime}}</div>
    <ul v-for="(item, index) in lyric" :key="index">
      <li>{{item.content}}</li>
    </ul>
  </div>
</template>

<script>
import { _getLyricById } from '@/network/song.js'

export default {
  name: 'LyricPanel',
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
      lyric: []
    }
  },
  created () {
    console.log('created')
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
        lyricObj.push({
          time,
          content
        })
        // lyricObj.time = time
        // lyricObj.content = content
      })
      this.lyric = lyricObj
      console.log(this.lyric)
    }
  },
  watch: {
    id () {
      this.getLyricById()
    }
  }
}
</script>

<style lang="less" scoped>
.lyric-panel-container {
  height: 200px;
  overflow: hidden;
}
</style>
