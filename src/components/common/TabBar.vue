<template>
  <div class="tab-bar">
    <slot></slot>
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
  padding: 20px 0;
  /* 固定在子路由视图顶部 */
  /* position: fixed;
  z-index: 9;
  left: 200px;
  right: 0;
  top: 60px;
  padding: 20px; */
  background-color: #fff;
}
</style>
