<template>
  <div class="artists-container">
    <div class="content">
      <ul class="artist-list" ref="content">
        <li class="artist-item" v-for="(item, index) in artists" :key="index">
          <!-- <a :href="path" class="text-small">{{item.name}}</a> -->
          <div class="item-text" @click="onItemClick(item.id)">
            <div v-if="search" v-html="formatData(item.name)"></div>
            <div v-else>{{item.name}}</div>
          </div>
          <div class="division" v-if="index<artists.length-1">/</div>
        </li>
      </ul>
    </div>
    <span class="ellipsis" v-show="hidden">...</span>
  </div>
</template>

<script>
import highlight from '@/utils/highlight.js'

export default {
  name: 'Artists',
  props: {
    artists: {
      type: Array,
      default () {
        return []
      }
    },
    search: String // 搜索关键字
  },
  computed: {
    formatData () {
      return function (str) {
        return highlight(str, this.search)
      }
    }
  },
  data () {
    return {
      hidden: false
    }
  },
  mounted () {
    const content = this.$refs.content
    this.hidden = content.clientWidth > 180
  },
  methods: {
    onItemClick (id) {
      this.$router.push({
        path: '/artist',
        query: { id }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.artists-container {
  position: relative;
  width: 100%;
  padding-left: 0;
  .content {
    margin-right: 10px;
    overflow: hidden;
    .artist-list {
      // padding-right: 10px;
      display: inline-block;
      white-space: nowrap;
      padding-left: 0;
      // text-overflow: ellipsis;
    }
    .artist-item {
      display: inline-block;
      // white-space: nowrap;
      // overflow: hidden;
      // text-overflow: ellipsis;
    }
    .item-text {
      display: inline-block;
      cursor: pointer;
    }
    .item-text:hover {
      color: rgb(140, 140, 140);
    }
    .division {
      display: inline-block;
      margin: 0 2px;
    }
  }
  .ellipsis {
    position: absolute;
    right: -10px;
    top: 0;
  }
}
</style>
