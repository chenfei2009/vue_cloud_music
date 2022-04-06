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
      <div class="ref-wrap" @click="onRefClick">
        <el-image fit :src="json.song.img80x80" class="ref-cover"/>
        <div class="ref-info">
          <div class="name">{{json.song.name}}</div>
          <div class="artist text-small">{{json.song.artists[0].name}}</div>
        </div>
      </div>
      <slot></slot>
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
import formatDate from '@/utils/formatDate.js'

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
      // 判断引用数据类型 歌曲 歌单
      const id = this.json.song.mMusic.id
      console.log('refClick', id)
      this.$emit('refClick', id)
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
      return formatDate(new Date(date), 'yyyy-MM-dd')
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
  }
}
</style>
