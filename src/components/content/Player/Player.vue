<template>
  <div class="player-container">
    <PlayBar @showDetail="isShowPlayDetail=!isShowPlayDetail"
      @showList="isShowPlayList=!isShowPlayList" />
    <Drawer :drawer="isShowPlayDetail"
      height="calc(100% - 70px)"
      :mask=false>
      <Header bgColor="#eee" @arrowClick="isShowPlayDetail=!isShowPlayDetail" />
      <!-- 滚动区域 -->
      <div class="scroll-wrap">
        <!-- 歌曲详情 -->
        <PlayDetail />
        <!-- 歌曲评论 -->
        <Comment />
      </div>
      <div class="scroll-bg"></div>
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
import Comment from './Comment.vue'

export default {
  name: 'Player',
  components: { PlayBar, PlayDetail, PlayList, Drawer, Header, Comment },
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
.scroll-wrap {
  height: 100%;
  overflow: auto;
}
.scroll-wrap::-webkit-scrollbar { /* 滚动条整体样式 */
  width: 4px; /* 高宽分别对应横竖滚动条的尺寸 */
  height: 4px;
}
.scroll-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60%;
  background-image: linear-gradient(#eee, #fff);
  z-index: -1;
}
</style>
