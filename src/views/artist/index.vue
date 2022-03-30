<template>
  <div class="artist-container container">
    <ArtistInfo :artist="artist"/>
    <!-- tab选项卡 -->
    <TabBar>
      <TabBarItem v-for="item in tabs"
        :key="item.id"
        :id="item.id"
        :currentIndex="currentIndex"
        @tabClick="handleTabClick"
        ><div slot="item-text">{{item.text}}</div></TabBarItem>
    </TabBar>
    <!-- /tab选项卡 -->
    <section v-if="currentIndex===1">
      <ul class="album-list">
        <!-- 热门50首 -->
        <li class="album-item">
          <div class="cover-wrap">
            <Cover slot="left" picUrl="/image/default.png" :fixWidth="150">
              <span class="center">TOP50</span>
            </Cover>
          </div>
          <div class="info-wrap" slot="center">
            <SongsTable :songs="songs"
              :activeId="activeId"
              :title="true"
              name="热门50首"
              :showArtist="false"
              @rowDbClick="handleRowDbClick"/>
          </div>
        </li>
        <!-- 热门50首/ -->
        <!-- 专辑列表 -->
        <li class="album-item" v-for="item in hotAlbums" :key="item.id">
          <div class="cover-wrap">
            <Cover slot="left" :picUrl="item.picUrl" :fixWidth="150">
              <div class="date" slot="text">{{item.publishTime | dateFilter}}</div>
            </Cover>
          </div>
          <div class="info-wrap" slot="center">
            <SongsTable :songs="item.songs"
              :activeId="activeId"
              :title="true"
              :name="item.name"
              :showAll="false"
              :showArtist="false"
              @rowDbClick="handleRowDbClick"/>
          </div>
        </li>
        <!-- 专辑列表/ -->
      </ul>
    </section>
    <section v-else-if="currentIndex===2">
      <div class="mvs-wrap">
        <Cover v-for="item in mvs" :key="item.id" :picUrl="item.imgurl" :ratio="16/9" :columns="4">
          <span slot="text" class="mv-name">{{item.name}}</span>
        </Cover>
      </div>
    </section>
    <section v-else-if="currentIndex===3">
      <div>{{artist.briefDesc}}</div>
    </section>
    <section v-else>
      <div>相似歌手</div>
    </section>
    <!-- 对话框 -->
    <el-dialog
      title="替换播放列表"
      :visible.sync="dialogVisible"
      width="500px"
      center
      :before-close="handleClose">
      <span>{{dialogContent}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleConfirm">继 续</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- /对话框 -->
  </div>
</template>

<script>
import TabBar from '@/components/common/TabBar.vue'
import TabBarItem from '@/components/common/TabBarItem.vue'
import SongsTable from '@/components/content/SongsTable.vue'
import Cover from '@/components/content/Cover.vue'
import ArtistInfo from './childComps/ArtistInfo.vue'

import { _getArtistInfo, _getArtistMV, _getArtistAlbum } from '@/network/artist.js'
import { _getSongsByAlbumId } from '@/network/song.js'

import formatDate from '@/utils/formatDate.js'
import { SongsDbClickMixin } from '@/utils/mixin.js'

export default {
  name: 'ArtistIndex',
  components: { TabBar, TabBarItem, Cover, SongsTable, ArtistInfo },
  mixins: [SongsDbClickMixin],
  data () {
    return {
      artist: {},
      hotSongs: [],
      hotAlbums: [],
      mvs: [],
      isShowAll: false,
      activeName: '0', // 当前tab选项卡
      currentIndex: 1,
      tabs: [
        { id: 1, text: '专辑' },
        { id: 2, text: 'MV' },
        { id: 3, text: '歌手详情' },
        { id: 4, text: '相似歌手' }
      ]
    }
  },
  computed: {
    songs () {
      return this.isShowAll ? this.hotSongs : this.hotSongs.slice(0, 10)
    }
  },
  created () {
    this.getDatas()
  },
  activated () {
    this.getDatas()
  },
  methods: {
    // 网络请求相关方法
    /**
     * 请求本页所有数据
     */
    getDatas () {
      const { id } = this.$route.query
      this.getArtistInfo(id)
      this.getArtistMV(id)
      this.getArtistAlbum(id)
    },

    /**
     * 请求歌手信息和热门歌曲数据
     * @param { integer } id 歌手编号
     */
    async getArtistInfo (id) {
      const { data: res } = await _getArtistInfo(id)
      this.artist = res.artist
      this.hotSongs = res.hotSongs
    },

    /**
     * 请求MV数据
     * @param { integer } id 歌手编号
     */
    async getArtistMV (id) {
      const { data: res } = await _getArtistMV(id)
      this.mvs = res.mvs
    },

    /**
     * 请求歌手对应的专辑数据
     * @param { integer } id 歌手编号
     */
    async getArtistAlbum (id) {
      const { data: res } = await _getArtistAlbum(id)
      this.hotAlbums = res.hotAlbums
      this.hotAlbums.forEach(async v => {
        const id = v.id
        const { data: res } = await _getSongsByAlbumId(id)
        v.songs = res.songs
      })
    },

    handleTabClick (id) {
      this.currentIndex = id
    }
  },
  filters: {
    dateFilter (date) {
      return formatDate(new Date(date), 'yyyy-MM-dd')
    }
  }
}
</script>

<style lang="less">
.mvs-wrap {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.mv-name {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.album-item {
  display: flex;
  margin-top: 30px;
  width: 100%;
  // flex-direction: column;
  // justify-content: right;
  // margin-left: 20px;
  .cover-wrap {
    width: 200px;
  }
  .info-wrap {
    margin-left: 20px;
    flex: 1;
  }
}

</style>
