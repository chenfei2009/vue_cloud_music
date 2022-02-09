<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    themeColor () {
      return this.$store.state.themeColor
    }
  },
  data () {
    return {
      transitionName: ''
    }
  },
  watch: {
    themeColor (val) {
      document.getElementById('app').style.setProperty('--themeColor', val)
    }
  }
}
</script>

<style></style>
