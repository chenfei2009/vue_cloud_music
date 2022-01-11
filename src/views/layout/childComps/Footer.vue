<template>
  <el-container class="layout-container">
    <Header></Header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          router>
          <el-menu-item index="/home">
            <span slot="title">发现音乐</span>
          </el-menu-item>
          <el-menu-item index="/vlog">
            <span slot="title">博客</span>
          </el-menu-item>
          <el-menu-item index="/video">
            <span slot="title">视频</span>
          </el-menu-item>
          <el-menu-item index="/friends">
            <span slot="title">朋友</span>
          </el-menu-item>
          <el-menu-item index="/fm">
            <span slot="title">私人FM</span>
          </el-menu-item>
          <el-menu-item-group title="我的音乐">
            <el-menu-item index="/local" disabled>本地与下载</el-menu-item>
            <el-menu-item index="/recent" disabled>最近播放</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="/menu">
            <template slot="title">创建的歌单</template>
            <el-menu-item index="/like">我喜欢的音乐</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main
        <router-view />
      </el-main>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
import Header from './childComps/Header.vue'

export default {
  name: 'LayoutIndex',
  components: { Header },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.layout-container {
  height: 100%;
}
</style>
