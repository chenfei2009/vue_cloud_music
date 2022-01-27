<template>
  <div class="playlist-group-container">
    <div class="title">
      <router-link to="/playlist">
        <h3>{{title}}</h3>
        <i class="iconfont icon-arrow"></i>
      </router-link>
    </div>
    <div class="rec-list-main">
      <PlaylistItem v-for="item in list" :key="item.id" :picUrl="item.picUrl" :name="item.name" />
    </div>
  </div>
</template>

<script>
import PlaylistItem from '@/components/content/PlaylistGroup/PlaylistItem.vue'

export default {
  name: 'PlaylistGroup',
  components: { PlaylistItem },
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
.rec-list-main {
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
</style>
