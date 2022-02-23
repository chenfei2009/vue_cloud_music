<template>
  <div class="radio-item" @click="changeItem">
    <slot name="item-text"></slot>
  </div>
</template>

<script>
export default {
  name: 'RadioItem',
  props: {
    value: [Number, String]
  },
  data () {
    return {}
  },
  methods: {
    changeItem () {
      this.$emit('change', this.value)
    }
  }
}
</script>

<style scoped>
.radio-item {
  display: inline-block;
  margin: 5px 0;
  cursor: pointer;
}
</style>
