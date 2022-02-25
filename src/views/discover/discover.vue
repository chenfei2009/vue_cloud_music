<template>
  <div class="rec-container container">
    <!-- 轮播图模块 -->
    <el-carousel :interval="5000" type="card" height="175px">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <div @click="handleItemClick(item)"><el-image :src="item.imageUrl" fit="cover" class="item-img"></el-image></div>
      </el-carousel-item>
    </el-carousel>
    <!-- 轮播图模块/ -->
    <!-- 推荐歌单模块 -->
    <Title title="推荐歌单" path="/playlist" />
    <ul class="list-wrap" v-if="personalizedList.length > 1">
      <!-- 每日歌曲推荐 -->
      <CoverItem :item="recItem">
        <div class="hover-wrap">
          <PlayButton :isPlay="false" @btnClick="handleBtnClick()"/>
        </div>
        <i class="center rec-icon iconfont icon-calendar1"></i>
        <span class="center rec-date">{{day}}</span>
        <span slot="text">{{recItem.name}}</span></CoverItem>
      <!-- 每日歌曲推荐/ -->
      <!-- 推荐歌单 -->
      <CoverItem v-for="item in personalizedList"
        :key="item.id"
        :picUrl="item.picUrl"
        @itemClick="handleCoverClick(item.id)">
        <div class="hover-wrap">
          <PlayButton :isPlay="false" @btnClick="handleBtnClick(item)"/>
        </div>
        <div class="play-count">{{item.playCount | countFilter}}</div>
        <span slot="text">{{item.name}}</span></CoverItem>
      <!-- 推荐歌单/ -->
    </ul>
    <!-- 推荐歌单模块/ -->
    <!-- 热门播客单模块 -->
    <SongGroup title="热门播客" :list="newSongs" :column="2" />
    <!-- 热门播客单模块/ -->
    <!-- 独家放送模块 -->
    <Title title="独家放送" />
    <ul class="list-wrap" v-if="privateContent.length > 0">
      <CoverItem v-for="item in privateContent"
        :key="item.id"
        :picUrl="item.picUrl"
        :column="3"
        :ratio="1080/399"
        @itemClick="handleCoverClick">
        <div class="fix-btn-wrap">
          <PlayButton :isPlay="false" @btnClick.stop="handleBtnClick(item)"/>
        </div>
        <span slot="text">{{item.name}}</span></CoverItem>
    </ul>
    <!-- 独家放送模块/ -->
    <!-- 最新音乐模块 -->
    <SongGroup title="最新音乐" :list="newSongs" :column="3" />
    <Title title="推荐MV" />
    <ul class="list-wrap" v-if="personalizedMv.length > 0">
      <CoverItem v-for="item in personalizedMv"
        :key="item.id"
        :picUrl="item.picUrl"
        :column="4"
        :ratio="1280/719"
        @itemClick="handleCoverClick">
        <div slot="text">
          <div class="video-name">{{item.name}}</div>
          <div class="artists">{{item.artists[0].name}}</div>
        </div>
      </CoverItem>
    </ul>
    <!-- 最新音乐模块/ -->
    <Title title="听听" />
    <Title title="看看" />
  </div>
</template>

<script>
import PlayButton from '@/components/common/PlayButton.vue'
import Title from '@/components/content/Title/Title.vue'
import CoverItem from '@/components/content/Cover/CoverItem.vue'
import SongGroup from '@/components/content/SongGroup/SongGroup.vue'

import {
  _getBanner,
  _getPersonalized,
  _getPrivateContent,
  _getNewSong,
  _getDaySongs,
  _getPersonalizedMv
} from '@/network/discover.js'

import { _getSongsByListId } from '@/network/playlist.js'

import {
  _getSongsByIds,
  _getSongUrlById
} from '@/network/song.js'

export default {
  name: 'Discover',
  components: { PlayButton, Title, CoverItem, SongGroup },
  data () {
    return {
      banners: [], // 轮播图数据
      recItem: {
        name: '每日歌曲推荐',
        picUrl: '/image/default.png'
      },
      personalizedList: [], // 推荐歌单
      privateContent: [],
      newSongs: [], // 推荐最新音乐
      // personalizedDj: [] // 推荐播客
      daySongs: [],
      topSongs: [],
      personalizedMv: []
    }
  },
  computed: {
    day () {
      return new Date().getDate()
    }
  },
  created () {
    this.getBanner()
    this.getPersonalized('')
    this.getPrivateContent()
    this.getNewSong()
    // this.getTopSongs()
    // this.getDaySongs() // 需要登录
    this.getPersonalizedMv()
  },
  mounted () {},
  methods: {
    /**
     * 获取轮播图数据
     */
    async getBanner () {
      const { data: res } = await _getBanner()
      this.banners = res.banners
    },

    /**
     * 获取推荐歌单数据
     */
    async getPersonalized (config) {
      const { data: res } = await _getPersonalized(config)
      this.personalizedList.push(...res.result.slice(0, 9))
    },

    /**
     * 获取独家放送数据
     */
    async getPrivateContent () {
      const { data: res } = await _getPrivateContent()
      this.privateContent = res.result
    },

    /**
     * 获取推荐新音乐
     */
    async getNewSong () {
      const { data: res } = await _getNewSong()
      // console.log(res)
      this.newSongs = res.result
    },

    async getSongsByListId (id) {
      const { data: res } = await _getSongsByListId(id)
      const songs = res.songs
      songs.forEach(async v => {
        const { data: res } = await _getSongUrlById(v.id)
        v.url = res.data[0].url
      })
      this.$store.commit('resetPlayList', { songs })
    },

    async getDaySongs () {
      const { data: res } = await _getDaySongs()
      // console.log(res)
      this.daySongs = res.result
    },

    async getPersonalizedMv () {
      const { data: res } = await _getPersonalizedMv()
      // console.log(res)
      this.personalizedMv = res.result
    },

    onBtnClick () {
      console.log('BtnClick')
    },

    /** 点击轮播图 */
    async handleItemClick (item) {
      console.log(item)
      if (item.targetType === 1) {
        if (this.$store.state.playList.findIndex(v => v.id === item.id) >= 0) return console.log('已存在')
        const { data: res } = await _getSongsByIds(item.targetId)
        const song = res.songs[0]
        const { data: res2 } = await _getSongUrlById(song.id)
        song.url = res2.data[0].url
        this.$store.commit('setContent', song)
      } else if (item.targetType === 10) {
        // https://music.163.com/#/album?id=90049201
        return console.log('获取专辑信息，跳转到专辑页面', item.targetType)
      } else {
        // 1004
        return console.log('跳转页面', item.targetType, item.url)
      }
    },

    /**
     * 歌单播放按钮点击事件
     */
    handleBtnClick (item) {
      console.log('播放歌单', item)
      this.$store.commit('setPlayListInfo', item)
      this.getSongsByListId(item.id)
    },

    /**
     * 歌单封面点击事件
     */
    handleCoverClick (id) {
      console.log('跳转到歌单详情页', id)
      this.$router.push({
        path: '/playlist',
        query: { id }
      })
    }
  },
  filters: {
    countFilter (playCount) {
      return playCount > 10000 ? parseInt(playCount / 10000) + '万' : playCount
    }
  }
}
</script>

<style lang="less" scoped>
.item-img {
  border-radius: 5px;
  overflow: hidden;
}

/deep/ .el-carousel__button {
  width: 6px;
  height: 6px;
  border-radius: 3px;
}

.list-wrap {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  color: #fff;
  transform: translate(-50%, -55%);
}

.rec-icon {
  font-size: 50px;
}

.rec-date {
  font-size: 24px;
  transform: translate(-50%, -45%);

}

/* 播放按钮 */
.hover-wrap {
  // display: none;
  // display: flex;
  opacity: 0;
  // justify-content: center;
  // align-items: center;
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
}

.item-cover-wrap:hover {
  .hover-wrap {
    opacity: 1;
    transition: opacity 1s;
  }
}

.fix-btn-wrap {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 30px;
  height: 30px;
}

.play-count {
  position: absolute;
  top: 2px;
  right: 5px;
  color: #fff;
  font-size: 12px;
}

.video-name {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
