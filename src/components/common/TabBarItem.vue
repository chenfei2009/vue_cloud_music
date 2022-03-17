<template>
  <div class="tab-bar-item" @click="changeItem">
    <div :class="{'active': isActive}"><slot name="item-text"></slot></div>
    <div class="underline" v-if="isActive"></div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    currentIndex: Number,
    id: Number,
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
    // router: { // 是否开启路由模式
    //   type: Boolean,
    //   default: false
    // }
  },
  data () {
    return {
      // isActive: false
    }
  },
  computed: {
    isActive: {
      get () {
        // return this.$route.path.indexOf(this.path) !== -1
        if (this.path) return this.$route.path === this.path
        return this.currentIndex === this.id
      },
      set (v) {
        // 这里不知道写什么
      }
    },
    activeStyle () {
      return this.isActive ? { color: this.activeColor } : {}
    }
  },
  methods: {
    changeItem () {
      // console.log('click')
      this.isActive = !this.isActive
      if (this.path) return this.$router.push(this.path)
      // this.$router.replace(this.path)
      this.$emit('tabClick', this.id)
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  position: relative;
  text-align: center;
  /* height: 50px; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 18px;
  margin-right: 20px;
  cursor: pointer;
}

.tab-bar-item /deep/ div {
  font-size: 16px;
}

.active /deep/ div {
  font-size: 18px;
  font-weight: 800;
}

.underline {
  position: absolute;
  left: 50%;
  bottom: -5px;
  transform: translateX(-50%);
  height: 3px;
  width: 80%;
  background: var(--themeColor);
}
</style>
