<template>
  <div class="home-container">
    Home
    <SliderBar vertical
      height="150px" width="6px"
      @drag="changVolByDrag"
      @change="changVolByClick"
      ></SliderBar>
  </div>
</template>

<script>
import SliderBar from '@/components/content/SliderBar.vue'

export default {
  name: 'HomeIndex',
  components: { SliderBar },
  data () {
    return {}
  },
  methods: {
    changVolByDrag (val) {
      console.log(val)
    },
    changVolByClick (val) {
      console.log(val)
    }
  }
}
</script>
