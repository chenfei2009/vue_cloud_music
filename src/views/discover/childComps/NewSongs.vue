<template>
  <song-group :list="newSongs" :column="3" />
</template>

<script>
import SongGroup from '@/components/content/SongGroup/SongGroup.vue'

import {
  _getNewSong
} from '@/network/discover.js'

export default {
  name: 'CompB',
  components: {
    SongGroup
  },
  data () {
    return {
      newSongs: []
    }
  },
  activated () {
    this.getNewSong()
  },
  methods: {
    /*
     * 网络请求相关方法
     */
    // 获取推荐新音乐
    async getNewSong () {
      const { data: res } = await _getNewSong()
      this.newSongs = res.result.slice(0, 9)
    }
  }
}
</script>

<style lang="less" scoped></style>
