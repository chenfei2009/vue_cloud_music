<template>
  <song-group :list="newSongs" :column="2" />
</template>

<script>
import SongGroup from '@/components/content/SongGroup/SongGroup.vue'

import {
  _getNewSong
} from '@/network/discover.js'

export default {
  name: 'HotProgram',
  components: {
    SongGroup
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
      console.log('HotPro')
      this.$parent.compCount++
    }
  }
}
</script>

<style lang="less" scoped></style>
