<template>
  <li class="event-item-container">
    <el-image fit :src="item.user.avatarUrl" class="item-avatar"/>
    <div class="item-detail-wrap">
      <!-- 根据 user.userId 跳转到个人主页 -->
      <div class="user-wrap">
        <a class="item-username link"
          :href="'/#/user/home?uid='+item.user.userId"
          >{{item.user.nickname}}</a>
        <span class="item-type">  {{type}}</span>
      </div>
      <div class="item-time text-small">{{item.eventTime}}</div>
      <div class="content-wrap" v-if="item.json">
        {{json.msg}}
      </div>
      <div class="ref-wrap">
        <el-image fit :src="json.song.img80x80" class="ref-cover"/>
        <div class="name">{{json.song.name}}</div>
        <!-- {{json.song}} -->
      </div>
      <slot></slot>
      <!-- <div class="pics-wrap">
        <el-image fit
          v-for="(pic, index) in item.pics"
          :key="index"
          :src="pic.squareUrl"
          class="pic-item"/>
      </div> -->
      <div class="right-wrap fr">
        <span class="iconfont icon-dianzan">{{item.info.liked}}</span>
        <span class="item-liked-count" v-if="item.likedCount>0">{{item.info.likedCount}}</span>
        <span class="iconfont icon-share">{{item.info.shareCount}}</span>
        <span class="iconfont icon-comment">{{item.info.commentCount}}</span>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'EventItem',
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    type () {
      const typeObj = {
        18: '分享单曲',
        19: '分享专辑',
        17: '分享电台节目',
        28: '分享电台节目',
        22: '转发',
        39: '发布视频',
        35: '分享歌单',
        13: '分享歌单',
        24: '分享专栏文章',
        41: '分享视频',
        21: '分享视频'
      }
      return typeObj[this.item.type]
    },
    json () {
      return JSON.parse(this.item.json)
    }
  }
}
</script>

<style lang="less" scoped>
.event-item-container {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.item-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.item-detail-wrap {
  flex: 1;
  margin-left: 10px;
  .content-wrap {
    margin-bottom: 10px;
    a, span {
      font-size: 12px;
    }
  }
  .ref-wrap {
    display: flex;
    padding: 8px;
    margin-bottom: 10px;
    background-color: #eee;
    border-radius: 5px;
    .ref-cover {
      width: 40px;
      height: 40px;
      border-radius: 5px;
    }
  }
  .pics-wrap {
    width: 380px;
    margin: 10px 0;
    .pic-item {
      width: 120px;
      height: 120px;
      margin: 0 5px 5px 0;
      border-radius: 5px;
    }
  }

  .right-wrap {
    span {
      font-size: 12px;
    }
    .icon-share {
      margin: 0 15px;
      padding: 0 15px;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
    }
  }
}
</style>
