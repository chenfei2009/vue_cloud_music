<template>
  <!-- 歌曲评论模块 -->
  <section class="comment-container">
    <div v-show="!isShowBackTop" class="add-comment-r">写评论</div>
    <div v-show="isShowBackTop" class="add-comment-b">发表我的评论</div>
    <div v-show="isShowBackTop" class="back-top">返回顶部</div>
    <!-- 热门评论 -->
    <div class="hot-comments-wrap">
      <div class="comment-title">全部评论({{hotComments.length}})</div>
      <ul class="comment-list">
        <CommentItem v-for="item in hotComments"
          :key="item.commentId"
          :item=item />
      </ul>
      <div class="more-comments">
        <a href="#">更多精彩评论 ></a>
      </div>
    </div>
    <!-- 最新评论 -->
    <div class="recent-comments-wrap">
      <div class="comment-title">最新评论({{comments.length}})</div>
      <ul class="comment-list">
        <CommentItem v-for="item in comments"
          :key="item.commentId"
          :item=item />
      </ul>
      <div class="block">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="comments.length">
        </el-pagination>
      </div>
    </div>
  </section>
</template>

<script>
import CommentItem from './CommentItem.vue'

export default {
  name: 'Comment',
  props: {
    hotComments: { // 热门评论
      type: Array,
      default () {
        return {}
      }
    },
    comments: { // 最新评论
      type: Array,
      default () {
        return {}
      }
    },
    isShowBackTop: {
      type: Boolean,
      default: false
    }
  },
  components: { CommentItem },
  computed: {},
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>

<style lang="less" scoped>
.comment-container {
  position: relative;
  margin: 150px auto;
  width: 550px;
  .back-top {
    position: absolute;
    top: 0;
    right: -100px;
    height: 50px;
  }
  .add-comment-b {
    position: fixed;
    bottom: 0;
    left: 50%;
  }
  .add-comment-r {
    position: fixed;
    bottom: 0;
    right: 300px;
  }
  .comment-title {
    font-weight: 600;
    margin-top: 50px;
    padding-bottom: 10px;
  }
  .more-comments {
    width: 100%;
    a {
      display: block;
      margin: 20px auto;
      text-align: center;
      height: 30px;
      width: 150px;
      line-height: 30px;
      border-radius: 15px;
      border: 1px solid #ccc;
    }
  }
  .block {
    padding: 20px;
    display: flex;
    justify-content: center;
    /deep/ .el-pager {
      .active {
        background-color: var(--themeColor) !important;
      }
    }
  }
}
</style>
