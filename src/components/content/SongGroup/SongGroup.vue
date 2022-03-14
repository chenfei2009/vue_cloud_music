<template>
  <div class="vlog-group-container">
    <div class="vlog-list-main">
      <SongItem v-for="item in list" :key="item.id" :item="item" :column="column" />
    </div>
  </div>
</template>

<script>
import SongItem from '@/components/content/SongGroup/SongItem.vue'

export default {
  name: 'SongGroup',
  components: { SongItem },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    column: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.vlog-list-main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.vlog-list-main {
  display: flex;
  flex-wrap: wrap;
}
</style>
