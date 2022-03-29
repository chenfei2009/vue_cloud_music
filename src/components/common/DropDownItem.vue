<template>
  <li class="dropdowm-option" :class="{ 'is-disabled': disabled }">
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: 'DropDownItem',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.dropdowm-option {
  padding: 10px 15px;
}

.dropdowm-option:hover {
  background-color: #eee;
}

/* 此处是插槽需要穿透 */
.dropdowm-option.is-disabled >>> * {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>
