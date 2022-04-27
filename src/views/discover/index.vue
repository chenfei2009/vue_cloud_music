<template>
  <div class="index-container">
    <div class="fix-wrap">
      <tab-bar>
        <tab-bar-item path="/discover"><div slot="item-text">个性推荐</div></tab-bar-item>
        <tab-bar-item path="/discover/djradios"><div slot="item-text">专属定制</div></tab-bar-item>
        <tab-bar-item path="/discover/playlist"><div slot="item-text">歌单</div></tab-bar-item>
        <tab-bar-item path="/discover/toplist"><div slot="item-text">排行榜</div></tab-bar-item>
        <tab-bar-item path="/discover/artists"><div slot="item-text">歌手</div></tab-bar-item>
        <tab-bar-item path="/discover/newests"><div slot="item-text">最新音乐</div></tab-bar-item>
      </tab-bar>
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import TabBar from '@/components/common/TabBar.vue'
import TabBarItem from '@/components/common/TabBarItem.vue'

export default {
  name: 'DiscoverIndex',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style lang="less" scoped>
.index-container {
  position: relative;
  height: 100%;
  overflow: scroll;
  padding-top: 45px;
}

.index-container::-webkit-scrollbar { /* 滚动条整体样式 */
  width: 4px; /* 高宽分别对应横竖滚动条的尺寸 */
  height: 4px;
}

.fix-wrap {
  position: fixed;
  z-index: 9;
  left: 200px;
  right: 0;
  top: 40px;
  padding: 20px;
}
</style>
