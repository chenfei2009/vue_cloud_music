<template>
  <div class="video-container">
    <div class="fix-wrap">
      <TabBar>
        <TabBarItem path="/video"><div slot="item-text">视频</div></TabBarItem>
        <TabBarItem path="/video/mv"><div slot="item-text">MV</div></TabBarItem>
      </TabBar>
    </div>
    <router-view />
  </div>
</template>

<script>
import TabBar from '@/components/common/TabBar.vue'
import TabBarItem from '@/components/common/TabBarItem.vue'

export default {
  name: 'VideoIndex',
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
.video-container {
  position: relative;
  height: 100%;
  overflow: scroll;
  padding-top: 40px;
}

.video-container::-webkit-scrollbar { /* 滚动条整体样式 */
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
