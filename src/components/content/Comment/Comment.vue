<template>
  <section class="comment-container">
    <div class="comment-title">
      <span>{{title}}</span>
      <span v-show="isShowCount">{{'('+comments.length+')'}}</span>
    </div>
    <ul class="comment-list">
      <CommentItem v-for="item in comments"
        :key="item.commentId"
        :item=item />
    </ul>
    <div class="block" v-if="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="comments.length">
      </el-pagination>
    </div>
  </section>
</template>

<script>
import CommentItem from './CommentItem.vue'

export default {
  name: 'Comment',
  props: {
    title: { // 标题
      type: String,
      default: ''
    },
    comments: { // 评论列表
      type: Array,
      default () {
        return {}
      }
    },
    isShowCount: { // 是否显示数量
      type: Boolean,
      default: false
    },
    pagination: { // 是否分页
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
  // margin: 150px auto;
  width: 100%;
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
