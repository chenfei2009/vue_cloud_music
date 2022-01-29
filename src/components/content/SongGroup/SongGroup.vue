<template>
  <div class="vlog-group-container">
    <div class="title">
      <router-link to="/playlist">
        <h3>{{title}}</h3>
        <i class="iconfont icon-arrow"></i>
      </router-link>
    </div>
    <!-- <div class="rec-list-main" v-if="list.length!==0"> -->
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
    title: {
      type: String,
      default: ''
    },
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

.title a {
  display: flex;
  align-items: center;
  margin-top: 15px;
  h3 {
    margin: 5px;
  }
}

.vlog-list-main {
  display: flex;
  flex-wrap: wrap;
}
</style>
