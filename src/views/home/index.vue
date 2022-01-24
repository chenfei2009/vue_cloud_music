<template>
  <div class="home-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="个性推荐" name="first">个性推荐</el-tab-pane>
    <el-tab-pane label="专属定制" name="second">专属定制</el-tab-pane>
    <el-tab-pane label="歌单" name="third">歌单</el-tab-pane>
    <el-tab-pane label="排行榜" name="fourth">排行榜</el-tab-pane>
    <el-tab-pane label="歌手" name="fifth">歌手</el-tab-pane>
    <el-tab-pane label="最新音乐" name="sixth">最新音乐</el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  components: {},
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
