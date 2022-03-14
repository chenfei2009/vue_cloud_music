<template>
  <div class="title-container">
    <router-link :to="path" v-if="path">
      <span class="text-title">{{title}}</span>
      <i class="iconfont icon-arrow"></i>
    </router-link>
    <span class="text-title" v-else>{{title}}</span>
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
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.title-container {
  display: flex;
  align-items: center;
  padding-top: 15px;
}

.text-title {
  margin: 5px 5px 5px 0;
}
</style>
