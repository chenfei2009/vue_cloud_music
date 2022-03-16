<template>
  <div class="search-container">
    {{searchWord}}
  </div>
</template>

<script>
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchWord: ''
    }
  },
  created () {
    this.searchWord = this.$route.query.s
  },
  activated () {
    this.searchWord = this.$route.query.s
  }
}
</script>
