<template>
  <div class="artist-container">
    <Header>
      <CoverItem slot="left" :picUrl="artist.picUrl" :fixWidth="200"/>
      <div class="info-wrap" slot="center">
        <h1 class="name">{{artist.name}}</h1>
        <div class="alias" v-if="artist.alias">{{artist.alias[0]}}</div>
        <div class="btn-wrap">
          <button class="btn btn-round">
            <i class="iconfont icon-add"></i>收藏
          </button>
        </div>
        <div class="info-item">
          <span>歌曲数：</span>
          <span>{{artist.musicSize}}</span>
          <span>专辑数：</span>
          <span>{{artist.albumSize}}</span>
          <span>MV数：</span>
          <span>{{artist.mvSize}}</span>
        </div>
      </div>
    </Header>
    <!-- <div>{{artist}}</div> -->
    <!-- tab选项卡 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="歌曲列表" name="0">
        <ul class="album-list">
          <!-- 热门50首 -->
          <li class="album-item">
            <div class="cover-wrap">
              <CoverItem slot="left" picUrl="/image/default.png" :fixWidth="150">
                <span class="center">TOP50</span>
              </CoverItem>
            </div>
            <div class="info-wrap" slot="center">
              <SongsTable :songs="songs"
                :activeId="activeId"
                :title="true"
                name="热门50首"
                @rowDbClick="handleRowDbClick"/>
            </div>
          </li>
          <!-- 热门50首/ -->
          <!-- 专辑列表 -->
          <li class="album-item" v-for="item in hotAlbums" :key="item.id">
            <div class="cover-wrap">
              <CoverItem slot="left" :picUrl="item.picUrl" :fixWidth="150">
                <div class="date" slot="text">{{item.publishTime | dateFilter}}</div>
              </CoverItem>
            </div>
            <div class="info-wrap" slot="center">
              <!-- {{item.songs[0]}} -->
              <SongsTable :songs="item.songs"
                :activeId="activeId"
                :title="true"
                :name="item.name"
                :showAll="false"
                @rowDbClick="handleRowDbClick"/>
            </div>
          </li>
          <!-- 专辑列表/ -->
        </ul>
      </el-tab-pane>
      <el-tab-pane label="MV" name="1">
        <div class="mvs-wrap">
          <CoverItem v-for="item in mvs" :key="item.id" :picUrl="item.imgurl" :ratio="16/9" :columns="4">
            <span slot="text" class="mv-name">{{item.name}}</span>
          </CoverItem>
        </div>
      </el-tab-pane>
      <el-tab-pane label="歌手详情" name="2">
        <div>{{artist.briefDesc}}</div>
      </el-tab-pane>
      <el-tab-pane label="相似歌手" name="3">
        <div>相似歌手</div>
      </el-tab-pane>
    </el-tabs>
    <!-- tab选项卡/ -->
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
    <!-- 对话框/ -->
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue'
import SongsTable from '@/components/content/SongsTable.vue'
import CoverItem from '@/components/content/Cover.vue'

import { _getArtistInfo, _getArtistMV, _getArtistAlbum } from '@/network/artist.js'
import { _getSongsByAlbumId } from '@/network/song.js'

import formatDate from '@/utils/formatDate.js'
import { SongsDbClickMixin } from '@/utils/mixin.js'

export default {
  name: 'ArtistIndex',
  components: { Header, CoverItem, SongsTable },
  mixins: [SongsDbClickMixin],
  data () {
    return {
      artist: {},
      hotSongs: [],
      hotAlbums: [],
      mvs: [],
      isShowAll: false,
      activeName: '0' // 当前tab选项卡
    }
  },
  computed: {
    songs () {
      return this.isShowAll ? this.hotSongs : this.hotSongs.slice(0, 10)
    }
  },
  created () {
    const { id } = this.$route.query
    this.getArtistInfo(id)
    this.getArtistMV(id)
    this.getArtistAlbum(id)
  },
  methods: {
    async getArtistInfo (id) {
      const { data: res } = await _getArtistInfo(id)
      this.artist = res.artist
      this.hotSongs = res.hotSongs
    },
    async getArtistMV (id) {
      const { data: res } = await _getArtistMV(id)
      this.mvs = res.mvs
    },
    async getArtistAlbum (id) {
      const { data: res } = await _getArtistAlbum(id)
      this.hotAlbums = res.hotAlbums
      this.hotAlbums.forEach(async v => {
        const id = v.id
        const { data: res } = await _getSongsByAlbumId(id)
        v.songs = res.songs
      })
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

.info-wrap {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: right;
  margin-left: 20px;
  .name {
    font-size: 20px;
  }
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
