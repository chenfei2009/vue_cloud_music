<template>
  <div class="hot-program-list">
    <song v-for="(item, index) in newSongs"
      :key="index"
      :item="item"
      :column="2"
      @coverClick="handleCoverClick(index)"
      @songDbClick="handleSongDbClick(index)"/>
  </div>
</template>

<script>
import Song from '@/components/content/Song.vue'

import {
  _getNewSong
} from '@/network/discover.js'

export default {
  name: 'HotProgram',
  components: {
    Song
  },
  data () {
    return {
      newSongs: []
    }
  },
  created () {
    this.getNewSong()
  },
  // activated () {
  //   this.getNewSong()
  // },
  methods: {
    /*
     * 网络请求相关方法
     */
    // 获取推荐新音乐
    async getNewSong () {
      const { data: res } = await _getNewSong()
      this.newSongs = res.result.slice(0, 6)
      if (this.$parent.compCount < 5) return this.$parent.compCount++
    }
  }
}
</script>

<style lang="less" scoped>
.hot-program-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
