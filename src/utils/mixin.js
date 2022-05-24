// import { debounce } from '@/common/utils.js'
// import BackTop from 'components/content/BackTop.vue'

// 监听表行双击
export const SongsDbClickMixin = {
  data () {
    return {
      dialogVisible: false,
      dialogContent: '',
      activeId: 0,
      rowId: null, // 双击行的id
      albumIndex: null
    }
  },
  methods: {
    /**
     * 双击歌曲表行事件
     */
    handleRowDbClick (id, index) {
      console.log('rowDbClick', id, index)
      this.albumIndex = index
      this.rowId = id
      this.dialogContent = '"双击播放"将会替换当前的播放列表，是否继续?'
      this.dialogVisible = true
    },

    /**
     * 对话框确认按钮点击事件
     */
    handleConfirm () {
      // rowId 为 null，播放列表第一首
      // rowId 不为 null，播放 rowId 对应的歌曲
      const song = this.rowId ? this.curSongs.find(v => v.id === this.rowId) : this.curSongs[0]
      this.$store.commit('setContent', song)
      this.$store.commit('setPlaylist', this.curSongs)
      // 重置 rowId 为 null
      this.rowId = null
      this.dialogVisible = false
    },

    /**
     * 对话框关闭按钮点击事件
     */
    handleClose (done) {
      this.rowId = null
      this.dialogVisible = false
    }
  }
}

// 返回顶部功能
// export const backTopMixin = {
//   components: {
//     BackTop
//   },
//   data () {
//     return {
//       isShowBackTop: false
//     }
//   },
//   methods: {
//     // 监听返回顶部按钮点击
//     backClick () {
//       // console.log('返回顶部')
//       this.$refs.scroll.scrollTo(0, 0, 500)
//     }
//     // 监听页面滚动 不能抽取函数内部的部分代码
//     // contentScroll (pos) {...}
//   }
// }
