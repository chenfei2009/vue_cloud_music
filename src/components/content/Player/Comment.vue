<template>
  <!-- 歌曲评论模块 -->
  <section class="comment-container">
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
    padding: 20px 0 80px 0;
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
