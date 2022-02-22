<template>
  <div class="title-container">
    <router-link to="/playlist">
      <h3>{{title}}</h3>
      <i class="iconfont icon-arrow"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    title: {
      type: String,
      default: ''
    },
    path: {
      type: String,
      default: '#'
    }
  }
}
</script>

<style lang="less" scoped>
.title-container a {
  display: flex;
  align-items: center;
  margin-top: 15px;
  h3 {
    margin: 5px;
  }
}
</style>
