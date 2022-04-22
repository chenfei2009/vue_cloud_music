<template>
  <div class="discover-container tab-container">
    <div class="loading-wrap"
      v-if="compCount !== compList.length"
      >页面加载中...</div>
    <!-- 轮播图模块 -->
    <el-carousel :interval="5000" type="card" height="175px" v-show="compCount === compList.length">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <div @click="handleItemClick(item)">
          <el-image :src="item.imageUrl" fit="cover" class="item-img"></el-image>
        </div>
      </el-carousel-item>
    </el-carousel>
    <!-- 轮播图模块/ -->
    <!-- 推荐歌单等模块 -->
    <div v-for="item in compList" :key="item.id" v-show="compCount === compList.length">
      <Title :title="item.label" :path="item.path" />
      <component :is="item.component"></component>
      <!-- <keep-alive>
        <component :is="item.component"></component>
      </keep-alive> -->
    </div>
    <!-- /推荐歌单等模块 -->
    <div class="tool" v-show="compCount === compList.length">
      <div class="tool-tip text-small">现在可以根据个人喜好，调整首页栏目的顺序啦</div>
      <button @click="dialogVisible=true"
        class="tool-btn"
        >调整栏目顺序</button>
    </div>
    <el-dialog
      title="调整栏目顺序"
      :visible.sync="dialogVisible"
      width="400px"
      center>
      <div class="tips">按住拖拽可调整顺序</div>
      <drag-list :data="compList" @sort="handleSort" ref="sortRef"/>
      <div class="tips-sort text-small"
        @click="reSort"
        >恢复默认排序</div>
      <span slot="footer" class="dialog-footer">
        <button class="primary round" @click="dialogConfirm">确认</button>
        <button class="round" @click="dialogCancel">取消</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Title from '@/components/content/Title.vue'
import DragList from '@/components/content/DragList.vue'

import PersonalList from './childComps/PersonalList.vue'
import HotProgram from './childComps/HotProgram.vue'
import PersonalMv from './childComps/PersonalMv.vue'
import PrivateContent from './childComps/PrivateContent.vue'
import NewSongs from './childComps/NewSongs.vue'

import {
  _getBanner,
  _getDaySongs
} from '@/network/discover.js'
// import { _getSongsByListId } from '@/network/playlist.js'
import {
  _getSongsByIds,
  _getSongUrlById
} from '@/network/song.js'

let sortedList = []

export default {
  name: 'Discover',

  components: {
    Title,
    DragList,
    PersonalList,
    HotProgram,
    NewSongs,
    PersonalMv,
    PrivateContent
  },

  data () {
    return {
      banners: [], // 轮播图数据
      // personalizedDj: [] // 推荐播客
      daySongs: [],
      topSongs: [],
      loading: false,
      dialogVisible: false,
      compCount: 0,
      compList: [
        { id: 1, label: '推荐歌单', component: 'PersonalList', path: '/discover/playlists' },
        { id: 2, label: '热门播客', component: 'HotProgram', path: '/vlog' },
        { id: 3, label: '独家放送', component: 'PrivateContent', path: '/dujia' },
        { id: 4, label: '最新音乐', component: 'NewSongs', path: '/discover/newests' },
        { id: 5, label: '推荐MV', component: 'PersonalMv', path: '/video/mv' }
      ]
    }
  },

  created () {
    this.loading = true
    this.getBanner()
    // this.getTopSongs()
    // this.getDaySongs() // 需要登录
    this.temp = [...this.compList]
  },

  watch: {
    compCount (val) {
      if (val !== this.compList.length) return
      this.loading = false
    }
  },

  // deactivated () {
  //   this.compCount = 0
  // },

  // beforeDestroy () {
  //   this.compCount = 0
  // },

  methods: {
    /**
     * 网络请求相关方法
     */
    // 获取轮播图数据
    async getBanner () {
      const { data: res } = await _getBanner()
      this.banners = res.banners
    },

    async getDaySongs () {
      const { data: res } = await _getDaySongs()
      // console.log(res)
      this.daySongs = res.result
    },

    onBtnClick () {
      console.log('BtnClick')
    },

    // 轮播图点击事件
    async handleItemClick (item) {
      console.log(item)
      if (item.targetType === 1) {
        if (this.$store.state.playList.findIndex(v => v.id === item.id) >= 0) return console.log('已存在')
        const { data: res } = await _getSongsByIds(item.targetId)
        const song = res.songs[0]
        const { data: res2 } = await _getSongUrlById(song.id)
        song.url = res2.data[0].url
        this.$store.commit('setContent', song)
      } else if (item.targetType === 10) {
        // https://music.163.com/#/album?id=90049201
        return console.log('获取专辑信息，跳转到专辑页面', item.targetType)
      } else {
        // 1004
        return console.log('跳转页面', item.targetType, item.url)
      }
    },

    // 歌单播放按钮点击事件
    handleBtnClick (item) {
      console.log('播放歌单', item)
      this.$store.commit('setPlayListInfo', item)
      this.getSongsByListId(item.id)
    },

    // 歌单封面点击事件
    handleCoverClick (id) {
      console.log('跳转到歌单详情页', id)
      this.$router.push({
        path: '/playlist',
        query: { id }
      })
    },

    handleSort (datalist) {
      console.log('handleSort', datalist)
      sortedList = datalist
    },

    dialogConfirm () {
      this.compList = [...sortedList]
      this.dialogVisible = false
    },

    dialogCancel () {
      console.log('cancel')
      this.$refs.sortRef.dataList = [...this.compList]
      this.dialogVisible = false
    },

    reSort () {
      this.$refs.sortRef.dataList.sort((a, b) => {
        return b.id - a.id
      })
    }
  },

  filters: {
    countFilter (playCount) {
      return playCount > 10000 ? parseInt(playCount / 10000) + '万' : playCount
    }
  }
}
</script>

<style lang="less" scoped>
.item-img {
  border-radius: 5px;
  overflow: hidden;
}
/deep/ .el-carousel__button {
  width: 6px;
  height: 6px;
  border-radius: 3px;
}
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  color: #fff;
  transform: translate(-50%, -55%);
}
.rec-icon {
  font-size: 50px;
}
.rec-date {
  font-size: 24px;
  transform: translate(-50%, -45%);
}
/deep/ .el-dialog {
  border-radius: 10px;
  overflow: hidden;
}
.tool {
  margin: 20px 0 30px 0;
  text-align: center;
  .tool-tip {
    text-align: center;
    margin-bottom: 10px;
  }
  .tool-btn {
    color: rgba(var(--primaryColor), 1);
    border: 1px solid rgba(var(--primaryColor), 1);
    border-radius: 5px;
  }
}
.tips {
  margin: 0 0 20px 10px;
}
.tips-sort {
  margin: 20px auto;
  text-decoration: underline;
  text-align: center;
  cursor: pointer;
}
.loading-wrap {
  width: 100%;
  height: calc(~"100vh - 200px");
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
