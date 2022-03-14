<template>
  <div class="artists-container">
    <div class="content" ref="content">
      <ul class="artist-list">
        <li class="artist-item" v-for="(item, index) in artists" :key="item.id">
          <!-- <a :href="path" class="text-small">{{item.name}}</a> -->
          <span class="item-text" @click="onItemClick(item.id)">{{item.name}}</span>
          <span class="division" v-if="index<artists.length-1">/</span>
        </li>
      </ul>
    </div>
    <span class="ellipsis" v-show="hidden">...</span>
  </div>
</template>

<script>
export default {
  name: 'Artists',
  props: {
    artists: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    // content () {
    //   console.log(this.$refs.content)
    //   return this.$refs.content
    // },
    // hidden () {
    //   const content = this.$refs.content
    //   return content.clientWidth > 200
    // }
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
  .content {
    padding-right: 10px;
    overflow: hidden;
    .artist-list {
      // padding-right: 10px;
      display: inline-block;
      white-space: nowrap;
      // overflow: hidden;
      // text-overflow: ellipsis;
    }
    .artist-item {
      display: inline-block;
      // white-space: nowrap;
      // overflow: hidden;
      // text-overflow: ellipsis;
    }
    .item-text {
      cursor: pointer;
    }
    .item-text:hover {
      color: rgb(140, 140, 140);
    }
    .division {
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
