<template>
  <div class="toplist-container tab-container">
    <Title title="官方榜" />
    <!-- 官方榜列表 -->
    <li class="list-item" v-for="(item, index) in lists" :key="index">
      <div class="cover-wrap">
        <cover :picUrl="item.coverImgUrl" :fixWidth="190" />
      </div>
      <div class="songs-wrap">
        <songs-table :songs="item.songs"
          :name="item.name"
          :showIndex="true"
          :showAction="true"
          :showAll="false"
          :showDt="false"
          @rowDbClick="handleRowDbClick($event, index)"/>
        <a class="more" :href="'/#/playlist?id='+item.id">查看全部 ></a>
      </div>
    </li>
    <!-- /官方榜列表 -->
    <Title title="全球榜" />
  </div>
</template>

<script>
import Title from '@/components/content/Title.vue'
import Cover from '@/components/content/Cover.vue'
import SongsTable from '@/components/content/SongsTable.vue'

import { _getToplist } from '@/network/toplist.js'
import { _getSongsByListId } from '@/network/playlist.js'
import { _getSongUrlById } from '@/network/song.js'

export default {
  name: 'Toplist',

  components: {
    Title,
    Cover,
    SongsTable
  },

  data () {
    return {
      lists: [] // 榜单信息
      // topList: [], // 飙升榜 歌曲
      // newList: [], // 新歌榜 歌曲
      // originList: [], // 原创榜 歌曲
      // hotList: [] // 热歌榜 歌曲
    }
  },

  created () {
    this.getToplist()
    // this.initSongsTables()
  },

  // watch: {
  //   lists (val) {

  //   }
  // },

  methods: {
    async getToplist () {
      const { data: res } = await _getToplist()
      this.lists = res.list.slice(0, 4)
      this.lists.forEach(async (v, i) => {
        const songs = await this.getSongsByListId(v.id)
        this.$set(this.lists[i], 'songs', songs.slice(0, 5))
        // this.lists[i].songs = songs.slice(0, 5)
      })
      // this.lists = lists
      // this.topList = this.getSongsByListId(lists[0].id)
    },

    initSongsTables () {
      this.lists.forEach(v => {
        console.log(v.id)
        const songs = this.getSongsByListId(v.id)
        v.songs = songs
      })
    },

    // 请求歌单对应的歌曲数据
    async getSongsByListId (id) {
      const { data: res } = await _getSongsByListId(id)
      // console.log(res)
      const songs = res.songs
      songs.forEach(async v => {
        const { data: res } = await _getSongUrlById(v.id)
        v.url = res.data[0].url
      })
      return songs
    }
  }
}
</script>

<style lang="less" scoped>
.list-item {
  display: flex;
  width: 100%;
  margin-bottom: 20px;
  .songs-wrap {
    flex: 1;
    padding-left: 30px;
    .more {
      margin: 10px;
      display: block;
    }
  }
}
</style>
