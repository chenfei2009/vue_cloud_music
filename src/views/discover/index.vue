<template>
  <div class="discover-container">
    <div class="fix-wrap">
      <TabBar>
        <TabBarItem path="/discover"><div slot="item-text">个性推荐</div></TabBarItem>
        <TabBarItem path="/discover/djradio"><div slot="item-text">专属定制</div></TabBarItem>
        <TabBarItem path="/discover/playlist"><div slot="item-text">歌单</div></TabBarItem>
        <TabBarItem path="/discover/toplist"><div slot="item-text">排行榜</div></TabBarItem>
        <TabBarItem path="/discover/artists"><div slot="item-text">歌手</div></TabBarItem>
        <TabBarItem path="/discover/newest"><div slot="item-text">最新音乐</div></TabBarItem>
      </TabBar>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import TabBar from '@/components/common/TabBar.vue'
import TabBarItem from '@/components/common/TabBarItem.vue'
export default {
  name: 'DiscoverIndex',
  components: { TabBar, TabBarItem },
  data () {
    return {}
  },
  methods: {
    handleSelect (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="less" scoped>
.discover-container {
  position: relative;
  height: 100%;
  overflow: scroll;
  padding-top: 40px;
}

.discover-container::-webkit-scrollbar { /* 滚动条整体样式 */
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
