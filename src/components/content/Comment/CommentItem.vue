<template>
  <li class="comment-item-container">
    <el-image fit :src="item.user.avatarUrl" class="item-avatar"></el-image>
    <div class="item-detail-wrap">
      <!-- 根据 user.userId 跳转到个人主页 -->
      <div class="content-wrap">
        <a class="item-username link"
          :href="'/#/user/home?'+item.user.userId"
          >{{item.user.nickname}}: </a>
        <span class="item-content">{{item.content}}</span>
      </div>
      <div class="replied-wrap" v-if="item.beReplied.length>0">
        <a class="item-username link"
          :href="'/#/user/home?'+item.beReplied[0].user.userId"
          >@{{item.beReplied[0].user.nickname}}: </a>
        <span class="item-content">{{item.beReplied[0].content}}</span>
      </div>
      <div class="item-time text-small fl">{{item.timeStr}}</div>
      <div class="right-wrap fr">
        <span class="iconfont icon-dianzan"></span>
        <span class="item-liked-count" v-if="item.likedCount>0">{{item.likedCount}}</span>
        <span class="iconfont icon-share"></span>
        <span class="iconfont icon-comment"></span>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'CommentItem',
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment-item-container {
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
  .content-wrap, .replied-wrap {
    margin-bottom: 10px;
    a, span {
      font-size: 12px;
    }
  }
  .replied-wrap {
    background-color: #eee;
    padding: 10px;
    border-radius: 3px;
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
