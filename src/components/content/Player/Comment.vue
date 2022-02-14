<template>
  <!-- 歌曲评论模块 -->
  <div class="comment-container">
    <div class="all-comment-wrap">
      <div class="title">
        全部评论({{commentCount}})
      </div>
      <ul class="comment-list">
        <li v-for="item in comments" :key="item.commentId" class="list-item">
          <el-image fit :src="item.user.avatarUrl" class="item-avatar"></el-image>
          <div class="item-detail-wrap">
            <div class="item-username">{{item.user.nickname}}</div>
            <div class="item-content">{{item.content}}</div>
            <div class="item-time">{{item.timeStr}}</div>
            <div class="item-liked-count">{{item.likedCount}}</div>
            <div class="item-share">分享</div>
            <div class="item-reply">回复</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { _getCommentById } from '@/network/comment.js'

export default {
  name: 'Comment',
  props: {},
  computed: {
    playContent () {
      return this.$store.state.playContent
    },
    commentCount () {
      return this.comments.length
    }
  },
  data () {
    return {
      comments: []
    }
  },
  created () {
    this.getCommentById()
  },
  methods: {
    async getCommentById () {
      const { data: res } = await _getCommentById(this.playContent.id)
      this.comments = res.comments
    }
  },
  watch: {
    playContent () {
      this.getCommentById()
    }
  }
}
</script>

<style lang="less" scoped>
.comment-container {
  margin: 150px auto;
  width: 500px;
}

.list-item {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.item-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
}
</style>
