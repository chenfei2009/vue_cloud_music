<template>
  <!-- <song-group :list="newSongs" :column="3" /> -->
  <div class="new-songs-list">
    <song v-for="(item, index) in newSongs"
      :key="index"
      :item="item"
      :column="3"
      @coverClick="handleCoverClick(index)"
      @songDbClick="handleSongDbClick(index)"/>
  </div>
</template>

<script>
// import SongGroup from '@/components/content/SongGroup/SongGroup.vue'
import Song from '@/components/content/Song.vue'

import {
  _getNewSong
} from '@/network/discover.js'

export default {
  name: 'NewSongs',
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
      this.newSongs = res.result.slice(0, 9)
      if (this.$parent.compCount < 5) return this.$parent.compCount++
    },

    /*
     * 事件监听相关方法
     */
    // 封面点击
    handleCoverClick (index) {
      // 只插入当前歌曲，不替换播放列表
      console.log('handleCoverClick', index)
      this.$store.commit('setContent', this.newSongs[index])
    },

    handleSongDbClick (index) {
      // 替换播放列表，弹出对话框
      console.log('handleSongDbClick', index)
    }
  }
}
</script>

<style lang="less" scoped>
.new-songs-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: column;
  height: 210px;
}
</style>
