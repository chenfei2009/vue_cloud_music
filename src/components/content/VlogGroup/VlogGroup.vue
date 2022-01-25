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
      <VlogItem v-for="item in list" :key="item" :item="item" />
    </div>
  </div>
</template>

<script>
import VlogItem from '@/components/content/VlogGroup/VlogItem.vue'

export default {
  name: 'VlogGroup',
  components: { VlogItem },
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
  h3 {
    margin: 5px;
  }
}

.vlog-list-main {
  display: flex;
  flex-wrap: wrap;
}
</style>
