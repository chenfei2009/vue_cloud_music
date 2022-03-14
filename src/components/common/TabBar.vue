<template>
  <div class="tab-bar">
    <slot></slot>
    <!-- <div class="tab-bar-item">
      <img src="@/assets/img/tabbar/home.jpeg" alt="#">
      首页
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style scoped>
.tab-bar {
  display: flex;
  align-items: flex-end;
  /* 固定在子路由视图顶部 */
  position: fixed;
  z-index: 9;
  left: 200px;
  right: 0;
  top: 60px;
  padding: 20px;
  background-color: #fff;
}
</style>
