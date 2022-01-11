<template>
  <el-container class="layout-container">
    <Header></Header>
    <el-container>
      <Aside></Aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
import Header from './childComps/Header.vue'
import Aside from './childComps/Aside.vue'

export default {
  name: 'LayoutIndex',
  components: { Header, Aside },
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
