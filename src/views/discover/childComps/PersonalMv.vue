<template>
  <ul class="list-wrap" v-if="personalizedMv.length > 0">
    <cover v-for="item in personalizedMv"
      :key="item.id"
      :picUrl="item.picUrl"
      :column="4"
      :ratio="1280/719"
      @itemClick="handleCoverClick">
      <div slot="text">
        <div class="video-name text-hide">{{item.name}}</div>
        <artists :artists="item.artists"/>
      </div>
    </cover>
  </ul>
</template>

<script>
import Cover from '@/components/content/Cover.vue'
import Artists from '@/components/content/Artists.vue'

import {
  _getPersonalizedMv
} from '@/network/discover.js'

export default {
  name: 'PersonalMv',
  components: {
    Cover,
    Artists
  },
  data () {
    return {
      personalizedMv: []
    }
  },
  created () {
    this.getPersonalizedMv()
  },
  methods: {
    async getPersonalizedMv () {
      const { data: res } = await _getPersonalizedMv()
      // console.log(res)
      this.personalizedMv = res.result
    },
    /**
     * MV封面点击事件
     */
    handleCoverClick (id) {
      console.log('跳转到歌单详情页', id)
      this.$router.push({
        path: '/playlist',
        query: { id }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.list-wrap {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
