<template>
  <div class="player-container">
    <PlayBar @showDetail="isShowPlayDetail=!isShowPlayDetail"
      @showList="isShowPlayList=!isShowPlayList" />
    <Drawer :drawer="isShowPlayDetail"
      height="calc(100% - 70px)"
      :mask=false
      :bgImage="bgImage">
      <Header :transparent="true" @arrowClick="isShowPlayDetail=!isShowPlayDetail" />
      <PlayDetail />
    </Drawer>
    <!-- 播放列表侧边栏 -->
    <PlayList :tableData=playList
      :activeId="activeId"
      v-if="isShowPlayList"/>
  </div>
</template>

<script>
import Drawer from '@/components/common/Drawer.vue'
import Header from '@/components/content/Header/Header.vue'

import PlayBar from './PlayBar.vue'
import PlayDetail from './PlayDetail.vue'
import PlayList from './PlayList.vue'

export default {
  name: 'Player',
  components: { PlayBar, PlayDetail, PlayList, Drawer, Header },
  computed: {
    playContent () {
      return this.$store.state.playContent
    },
    playList () {
      return this.$store.state.playList
    }
  },
  data () {
    return {
      bgImage: 'linear-gradient(#eee, #fff)',
      activeId: 0, // 当前选中歌曲 id
      isShowPlayDetail: false, // 是否显示歌曲详情
      isShowPlayList: false // 是否显示播放列表
    }
  },
  mounted () {},
  methods: {}
}
</script>

<style lang="less" scoped>

</style>
