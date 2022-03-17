<template>
  <div class="playlist-info-container">
    <div class="cover-wrap"><el-image :src="playlist.coverImgUrl"></el-image></div>
    <div class="info-wrap">
      <h1 class="name">{{playlist.name}}</h1>
      <div class="user-wrap">
        <div class="avatar-wrap"><el-image :src="playlist.creator.avatarUrl"></el-image></div>
        <span class="user-name" @click="handleCreatorClick">{{playlist.creator.nickname}}</span>
        <span class="create-time">{{playlist.createTime | dateFilter}}创建</span>
      </div>
      <div class="btn-wrap">
        <button class="btn btn-primary btn-left" @click="onPlayAll">播放全部</button>
        <button class="btn btn-primary btn-right" @click="onAddToPlaylist">+</button>
        <button class="btn btn-round">
          <i class="iconfont icon-add"></i>
          收藏({{playlist.subscribedCount | numFilter}})
        </button>
        <button class="btn btn-round">
          <i class="iconfont icon-share"></i>
          分享({{playlist.shareCount | numFilter}})
        </button>
        <button class="btn btn-round">
          <i class="iconfont icon-download"></i>
          下载全部
        </button>
      </div>
      <div class="info-item">
        <span>标签：</span>
        <ul class="tags-wrap">
          <li v-for="(item, index) in playlist.tags" :key="index">{{item}}</li>
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
    handleCreatorClick () {
      this.$router.push({
        path: '/user/home',
        query: { id: this.playlist.creator.userId }
      })
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;
  .name {
    font-size: 20px;
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
  }
  .btn-wrap {
    display: flex;
    align-items: center;
    .btn {
      border: 1px solid #ccc;
      height: 30px;
      padding: 0 15px;
      background-color: #fff;
      margin-right: 10px;
      font-size: 13px;
    }
    .btn-primary {
      color: #fff;
      background-color: var(--themeColor);
      border: 1px solid var(--themeColor);
    }
    .btn-left {
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
      padding-right: 5px;
      margin-right: 1px;
    }
    .btn-right {
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
      padding-left: 5px;
    }
    .btn-round {
      border-radius: 15px;
    }
  }
  .info-item {
    display: flex;
    .tags-wrap {
      display: flex;
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
