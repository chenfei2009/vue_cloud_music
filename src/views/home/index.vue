<template>
  <div class="home-container">
    Home
    <Audio :url="audio.url" />
  </div>
</template>

<script>
import Audio from '@/components/content/Audio.vue'

export default {
  name: 'HomeIndex',
  components: { Audio },
  data () {
    return {
      audio: {
        url: 'public/upload/test.mp3'
      }
    }
  },
  methods: {}
}
</script>
