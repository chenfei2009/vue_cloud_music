<template>
  <div class="layout-container">
    <!-- 头部模块 -->
    <layout-header/>
    <!-- /头部模块 -->
    <section class="main-container">
      <!-- 导航栏模块 -->
      <layout-aside/>
      <!-- /导航栏模块 -->
      <main class="main">
        <keep-alive>
          <router-view />
        </keep-alive>
      </main>
    </section>
    <section class="footer-container" height="70px">
      <!-- 播放器模块 -->
      <player />
      <!-- /播放器模块 -->
    </section>
  </div>
</template>

<script>
import Player from '@/components/content/Player/Player.vue'
import LayoutHeader from './childComps/LayoutHeader.vue'
import LayoutAside from './childComps/LayoutAside.vue'

export default {
  name: 'LayoutIndex',
  components: {
    LayoutHeader,
    LayoutAside,
    Player
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  width: 100vw;
  height: 100%;
  .left-wrap {
    width: 200px;
    display: flex;
    align-items: center;
    .logo-bg {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #fff;
      .logo {
        font-size: 20px;
        color: var(--themeColor);
      }
    }
    span {
      margin-left: 5px;
      font-size: 18px;
      color: #fff;
    }
  }
  .main-container {
    height: calc(~"100vh - 130px");
    padding-bottom: 0;
    display: flex;
    .main {
      width: calc(~"100% - 200px");
      height: 100%;
      overflow: scroll;
    }
    .main::-webkit-scrollbar { /* 滚动条整体样式 */
      width: 4px; /* 高宽分别对应横竖滚动条的尺寸 */
      height: 4px;
    }
  }
}
</style>
