<template>
  <ul class="list-wrap">
    <cover v-for="item in privateContent"
      :key="item.id"
      :picUrl="item.picUrl"
      :column="3"
      :ratio="1080/399"
      @itemClick="handleCoverClick">
      <div class="fix-btn-wrap">
        <play-button :isPlay="false" @btnClick.stop="handleBtnClick(item)"/>
      </div>
      <span slot="text" class="text-hide">{{item.name}}</span></cover>
  </ul>
</template>

<script>
import Cover from '@/components/content/Cover.vue'
import PlayButton from '@/components/common/PlayButton.vue'

import {
  _getPrivateContent
} from '@/network/discover.js'

export default {
  name: 'PrivateContent',

  components: {
    Cover,
    PlayButton
  },

  data () {
    return {
      privateContent: []
    }
  },

  created () {
    this.getPrivateContent()
  },

  // activated () {
  //   this.getPrivateContent()
  // },

  methods: {
    /**
     * 网络请求相关方法
     */
    // 获取独家放送数据
    async getPrivateContent () {
      const { data: res } = await _getPrivateContent()
      this.privateContent = res.result
      console.log('PrivateContent')
      this.$parent.compCount++
    },

    /**
     * 事件监听相关方法
     */
    onBtnClick () {
      console.log('BtnClick')
    },

    // 歌单播放按钮点击事件
    handleBtnClick (item) {
      console.log('播放歌单', item)
      this.$store.commit('setPlayListInfo', item)
      this.getSongsByListId(item.id)
    },

    // 歌单封面点击事件
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

.fix-btn-wrap {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 30px;
  height: 30px;
}
</style>
