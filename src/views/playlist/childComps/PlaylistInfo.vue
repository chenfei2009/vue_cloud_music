<template>
  <div class="playlist-info-container">
    <div class="cover-wrap"><el-image :src="playlist.coverImgUrl"></el-image></div>
    <div class="info-wrap">
      <h1 class="title-wrap"><span class="tag">歌单</span>{{playlist.name}}</h1>
      <div class="user-wrap">
        <div class="avatar-wrap"><el-image :src="playlist.creator.avatarUrl"></el-image></div>
        <a class="user-name link"
          :href="'/#/user/home?'+playlist.creator.userId"
          >{{playlist.creator.nickname}}</a>
        <span class="create-time text-small">{{playlist.createTime | dateFilter}}创建</span>
      </div>
      <!-- 按钮组 -->
      <div class="btn-wrap">
        <button class="primary round-left" @click="onPlayAll"
          ><i class="iconfont icon-caret-right"></i>播放全部</button>
        <button class="primary round-right" @click="onAddToPlaylist"
          ><i class="iconfont icon-plus"></i></button>
        <button class="round" @click="handleSubs">
          <i class="iconfont icon-add"></i>
          收藏({{playlist.subscribedCount | numFilter}})
        </button>
        <button class="round" @click="handleShare">
          <i class="iconfont icon-share"></i>
          分享({{playlist.shareCount | numFilter}})
        </button>
        <button class="round" @click="handleDownload">
          <i class="iconfont icon-download"></i>
          下载全部
        </button>
      </div>
      <!-- 标签组 -->
      <div class="info-item">
        <span>标签：</span>
        <ul class="tags-wrap">
          <li v-for="(item, index) in playlist.tags"
            :key="index"
            @click="handleTagClick(item)"
            class="link"
            >{{item}}</li>
        </ul>
      </div>
      <div class="info-item">
        <span>歌曲：</span>
        <span>{{songsLength}}</span>
        <span>播放：</span>
        <span>{{playlist.playCount | numFilter}}</span>
      </div>
      <div class="info-item">
        <span>简介：</span>
        <span class="item-content">{{playlist.description}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import formatDate from '@/utils/formatDate.js'

export default {
  name: 'PlaylistInfo',
  props: {
    playlist: {
      type: Object,
      default () {
        return {}
      }
    },
    songsLength: {
      type: Number
    }
  },
  methods: {
    onPlayAll () {
      this.$emit('playAll')
    },
    onAddToPlaylist () {
      this.$emit('addToPlaylist')
    },
    handleTagClick (item) {
      this.$router.push({
        path: '/discover/playlist',
        query: { tag: item, order: 'hot' }
      })
    },
    handleSubs () {
      console.log('检查是否登录')
      // 检查是否登录
      this.$emit('subscribe')
      // 未登录跳转到登录页面
      // this.$store.commit('showLogin')
    },
    handleShare () {
      console.log('检查是否登录')
      // 检查是否登录
      // 未登录跳转到登录页面
      // this.$store.commit('showLogin')
    },
    handleDownload () {
      console.log('检查是否登录')
      // 检查是否登录
      // 未登录跳转到登录页面
      // this.$store.commit('showLogin')
    }
  },
  filters: {
    numFilter (num) {
      return num > 10000 ? `${parseInt(num / 10000)}万` : num
    },
    dateFilter (date) {
      return formatDate(new Date(date), 'yyyy-MM-dd')
    }
  }
}
</script>

<style lang="less" scoped>
.playlist-info-container {
  display: flex;
  margin-bottom: 20px;
}
.cover-wrap {
  width: 200px;
  height: 200px;
  border-radius: 5px;
  overflow: hidden;
}
.info-wrap {
  margin-left: 20px;
  > * {
    margin-bottom: 15px;
  }
  .title-wrap {
    font-size: 20px;
    .tag {
      margin-right: 10px;
      font-weight: 400;
    }
  }
  .user-wrap  {
    display: flex;
    align-items: center;
    .avatar-wrap {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      overflow: hidden;
    }
    .user-name {
      margin: 0 10px;
    }
  }
  .btn-wrap {
    display: flex;
    align-items: center;
  }
  .info-item {
    display: flex;
    margin-bottom: 5px;
    .tags-wrap {
      display: flex;
      .link:before {
        content: '/';
        margin: 0 5px;
      }
      .link:first-child:before {
        display: none;
      }
    }
    .item-content {
      width: 150px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
