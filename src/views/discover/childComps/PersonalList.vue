<template>
  <div class="list-wrap">
    <!-- 每日歌曲推荐 -->
    <cover picUrl="/image/default.png">
      <div class="hover-wrap">
        <play-button :isPlay="false" @btnClick="handleBtnClick()"/>
      </div>
      <i class="center rec-icon iconfont icon-calendar1"></i>
      <span class="center rec-date">{{day}}</span>
      <span slot="text">每日歌曲推荐</span>
    </cover>
    <!-- /每日歌曲推荐 -->
    <!-- 推荐歌单 -->
    <cover v-for="item in personalizedList"
      :key="item.id"
      :picUrl="item.picUrl"
      @itemClick="handleCoverClick(item.id)"
      @load="imgCount++">
      <div class="hover-wrap">
        <play-button :isPlay="false" @btnClick="handleBtnClick(item)"/>
      </div>
      <div class="play-count">{{item.playCount | countFilter}}</div>
      <span slot="text">{{item.name}}</span>
    </cover>
    <!-- /推荐歌单 -->
  </div>
</template>

<script>
import PlayButton from '@/components/common/PlayButton.vue'
import Cover from '@/components/content/Cover.vue'

import { _getPersonalized } from '@/network/discover.js'
import { _getSongsByListId } from '@/network/playlist.js'
import { _getSongUrlById } from '@/network/song.js'

export default {
  name: 'PersonalList',

  components: { PlayButton, Cover },

  data () {
    return {
      imgCount: 0,
      personalizedList: []
    }
  },

  computed: {
    day () {
      return new Date().getDate()
    }
  },

  created () {
    this.getPersonalized()
  },

  // activated () {
  //   this.getPersonalized()
  // },

  watch: {
    imgCount (val) {
      if (val === 9) {
        if (this.$parent.compCount < 5) return this.$parent.compCount++
      }
    }
  },

  deactivated () {
    this.imgCount = 0
  },

  methods: {
    /**
     * 网络请求相关方法
     */
    // 获取推荐歌单数据
    async getPersonalized () {
      const { data: res } = await _getPersonalized()
      this.personalizedList = [...res.result.slice(0, 9)]
      // this.$parent.compCount++
    },

    async getSongsByListId (id) {
      const { data: res } = await _getSongsByListId(id)
      const songs = res.songs
      songs.forEach(async v => {
        const { data: res } = await _getSongUrlById(v.id)
        v.url = res.data[0].url
      })
      this.$store.commit('setPlaylist', songs)
      this.$store.commit('setContent', songs[0])
    },

    /**
     * 事件监听相关方法
     */
    onBtnClick () {
      console.log('BtnClick')
    },

    // 歌单播放按钮点击事件
    handleBtnClick (item) {
      console.log('播放歌单', item)
      this.getSongsByListId(item.id)
      this.$store.commit('setPlaylistInfo', item)
    },

    // 歌单封面点击事件
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

.play-count {
  position: absolute;
  top: 2px;
  right: 5px;
  color: #fff;
  font-size: 12px;
}
</style>
