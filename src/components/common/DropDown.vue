<template>
  <div class="dropdown" ref="dropDownRef">
    <div href="#"
      @click.prevent="toggleOpen"
      class="btn">
      <span>{{title}}</span>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </div>
    <div class="dropdown-menu"
      :class="align"
      :style="menuStyle"
      v-show="isOpen">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropDown',
  props: {
    title: {
      type: String,
      required: true
    },
    width: Number,
    height: Number,
    align: {
      type: String,
      default: 'center'
    }
  },
  computed: {
    menuStyle () {
      return {
        width: this.width + 'px',
        height: this.height + 'px',
        display: 'block'
      }
    }
  },
  data () {
    return {
      isOpen: false,
      isClickOutside: false
    }
  },
  methods: {
    toggleOpen () {
      this.isOpen = !this.isOpen
    },
    handler (e) {
      if (this.$refs.dropDownRef) {
        if (this.$refs.dropDownRef.contains(e.target)) {
          this.isClickOutside = false
        } else {
          this.isClickOutside = true
        }
      }
    }
  },
  mounted () {
    document.addEventListener('click', this.handler)
  },
  destroyed () {
    document.removeEventListener('click', this.handler)
  },
  watch: {
    isClickOutside (newValue) {
      if (this.isOpen && this.isClickOutside) {
        this.isOpen = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.dropdown {
  position: relative;
  margin: 0 5px;
  .btn {
    cursor: pointer;
  }
  .dropdown-menu {
    position: absolute;
    top: 50px;
    z-index: 11;
    background-color: #fff;
    color: #333;
    border-radius: 5px;
    box-shadow: 0 2px 2px 2px #eee;
    &.left {
      left: 0;
    }
    &.center {
      left: 50%;
      transform: translateX(-50%);
    }
    &.right {
      right: 0;
      transform: translateX(-100%);
    }
  }
}
</style>
