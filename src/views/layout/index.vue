<template>
  <el-container class="layout-container">
    <Header></Header>
    <el-container>
      <Aside></Aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <el-footer class="footer-container" height="70px">
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script>
import Header from './childComps/Header.vue'
import Aside from './childComps/Aside.vue'
import Footer from './childComps/Footer.vue'

export default {
  name: 'LayoutIndex',
  // components: { Header, Aside },
  components: { Header, Aside, Footer },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.layout-container {
  width: 100vw;
  height: 100%;
  .el-footer {
    border-top: 1px solid #ccc;
  }
}
</style>
