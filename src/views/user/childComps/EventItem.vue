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
      <div class="item-time text-small"
        >{{item.eventTime | dateFilter}}</div>
      <div class="content-wrap" v-if="item.json" v-html="msg"
        >{{msg}}</div>
      <!-- 分享歌曲 -->
      <div class="ref-wrap" @click="onRefClick" v-if="json.song">
        <el-image fit :src="json.song.img80x80" class="ref-cover"/>
        <div class="ref-info">
          <div class="name">{{json.song.name}}</div>
          <div class="artist text-small">{{json.song.artists[0].name}}</div>
        </div>
      </div>
      <!-- /分享歌曲 -->
      <!-- 分享歌单 -->
      <div class="ref-wrap" @click="onRefClick" v-else-if="json.playlist">
        <el-image fit :src="json.playlist.coverImgUrl" class="ref-cover"/>
        <div class="ref-info">
          <div class="name">{{json.playlist.name}}</div>
          <div class="artist text-small">{{json.playlist.creator.nickname}}</div>
        </div>
      </div>
      <!-- /分享歌单 -->
      <!-- 分享节目 -->
      <div class="ref-wrap" @click="onRefClick" v-else-if="item.type === 17">
        <el-image fit :src="json.program.img80x80" class="ref-cover"/>
        <div class="ref-info">
          <div class="name">{{json.program.mainSong.name}}</div>
          <div class="artist text-small">{{json.program.radio.name}}</div>
        </div>
      </div>
      <!-- /分享节目 -->
      <!-- 图片列表插槽 -->
      <slot name="picList"></slot>
      <!-- /图片列表插槽 -->
      <!-- 点赞 分享 转发 -->
      <div class="right-wrap fr">
        <span class="iconfont icon-dianzan"
          :class="{'active': item.info.liked}"
          @click="onLikeClick"
          > ({{item.info.likedCount}})</span>
        <span class="iconfont icon-share"
          @click="onShareClick"
          > ({{item.info.shareCount}})</span>
        <span class="iconfont icon-comment"
          @click="onCommentClick"
          > ({{item.info.commentCount}})</span>
      </div>
      <!-- /点赞 分享 转发 -->
      <!-- 评论模块插槽 -->
      <slot name="comment"></slot>
      <div>{{item}}</div>
      <!-- /评论模块插槽 -->
    </div>
  </li>
</template>

<script>
import formatDate from '@/utils/formatDate.js'

export default {
  name: 'EventItem',
  props: {
    item: Object
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
      // console.log(JSON.parse(this.item.json))
      return JSON.parse(this.item.json)
    },
    msg () {
      return this.formatJsonStr(this.json, this.item)
    }
  },
  created () {},
  methods: {
    /**
     * 引用数据点击事件
     */
    onRefClick () {
      this.$emit('refClick', this.json, this.item.type)
    },

    /**
     * 点赞动态
     */
    onLikeClick () {
      console.log('点赞，验证是否登录')
    },

    /**
     * 分享动态
     */
    onShareClick () {
      console.log('分享，验证是否登录')
    },

    /**
     * 评论动态
     */
    onCommentClick () {
      console.log('分享，验证是否登录')
    },

    /**
     * 动态正文数据格式化
     */
    formatJsonStr (json, item) {
      // const userReg = new RegExp('/@([^@|.|^ ]+)/', 'ig') // 创建正则对象
      // const actReg = new RegExp('/#([^#|.]+)#/', 'ig') // 创建正则对象
      // str.replace(userReg, '')
      // return str
      const str = json.msg
      let r = str.replace(/#([^#|.]+)#/g, function (word) {
        return `<a href="/#/activity?id=${item.actId}" class="link">${word}</a>`
      })
      r = r.replace(/@([^@|.|^ ]+)/g, function (word) {
        // 后台暂无此接口
        return `<a href="/#/user/home?nickname=${word.slice(1)}" class="link">${word}</a>`
      })
      return r
    }
  },
  filters: {
    dateFilter (date) {
      return formatDate(new Date(date), 'yyyy年MM月dd日 hh:mm')
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
  .user-wrap {
    span {
      color: #777777;
    }
  }
  .item-time {
    margin: 5px 0;
  }
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
    cursor: pointer;
    .ref-cover {
      width: 40px;
      height: 40px;
      border-radius: 5px;
      margin-right: 10px;
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
    span .active {
      color: var(--themeColor);
    }
  }
}
</style>
