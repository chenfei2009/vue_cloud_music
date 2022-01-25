<template>
  <div class="rec-container container">
    <!-- 轮播图模块 -->
    <el-carousel :interval="5000" type="card" height="175px">
      <el-carousel-item v-for="item in carouselData" :key="item">
        <el-image :src="item" :fit="cover" class="item-img"></el-image>
      </el-carousel-item>
    </el-carousel>
    <!-- 轮播图模块/ -->
    <!-- 推荐歌单模块 -->
    <PlaylistGroup title="推荐歌单" :list="recListData" />
    <!-- 推荐歌单模块/ -->
    <!-- 热门播客单模块 -->
    <VlogGroup title="热门播客" :list="vlogListData" />
    <!-- 热门播客单模块/ -->
  </div>
</template>

<script>
import PlaylistGroup from '@/components/content/PlaylistGroup/PlaylistGroup.vue'
import VlogGroup from '@/components/content/VlogGroup/VlogGroup.vue'

export default {
  name: 'Recommend',
  components: { PlaylistGroup, VlogGroup },
  data () {
    return {
      carouselData: [
        'http://p1.music.126.net/mSSSYdJdjPG9Y2fFNdi0YA==/109951166975718342.jpg?imageView&quality=89',
        'http://p1.music.126.net/32yzzqnFZT5cRXhkhEwzrA==/109951166975991967.jpg?imageView&quality=89',
        'http://p1.music.126.net/NqsLtJ0KoiiyqbAIzeC9rw==/109951166975569795.jpg?imageView&quality=89',
        'http://p1.music.126.net/4aKeU9-fc93FntLNSllzIQ==/109951166975762771.jpg?imageView&quality=89',
        'http://p1.music.126.net/0AsN3YzohFQRkj4HHUFHgA==/109951166975766985.jpg?imageView&quality=89',
        'http://p1.music.126.net/j9jBf8MQ-GEIaNKhZxrttw==/109951166975737110.jpg?imageView&quality=89'
      ],
      recListData: [
        { text: '每日歌曲推荐', url: '#' },
        { text: '每日歌曲推荐', url: '#' },
        { text: '每日歌曲推荐', url: '#' },
        { text: '每日歌曲推荐', url: 'http://p1.music.126.net/mSSSYdJdjPG9Y2fFNdi0YA==/109951166975718342.jpg?imageView&quality=89' },
        { text: '每日歌曲推荐', url: '#' },
        { text: '每日歌曲推荐', url: '#' },
        { text: '每日歌曲推荐', url: '#' },
        { text: '每日歌曲推荐', url: '#' },
        { text: '每日歌曲推荐', url: '#' },
        { text: '每日歌曲推荐', url: '#' }
      ],
      vlogListData: [
        { name: '下雨了', tag: '音乐故事', artist: '播客', hit: 810, time: 500, url: '#' },
        { name: '下雨了', tag: '音乐故事', artist: '播客', hit: 810, time: 500, url: '#' },
        { name: '下雨了', tag: '音乐故事', artist: '播客', hit: 810, time: 500, url: '#' },
        { name: '下雨了', tag: '音乐故事', artist: '播客', hit: 810, time: 500, url: '#' },
        { name: '下雨了', tag: '音乐故事', artist: '播客', hit: 810, time: 500, url: '#' },
        { name: '下雨了', tag: '音乐故事', artist: '播客', hit: 810, time: 500, url: '#' }
      ]
    }
  },
  methods: {
    onBtnClick () {
      console.log('BtnClick')
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

// .title a {
//   display: flex;
//   align-items: center;
//   h3 {
//     margin: 5px;
//   }
// }
</style>
