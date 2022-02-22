<template>
  <div class="artist-container">
    <!-- 表单模块 -->
    <form action="#">
      <div class="radio-group">
        <label class="radio-item" v-for="item in areaRadio" :key="item.value" for="item.value" @change="handleRadioClick">
          <input type="radio" v-model="area" :id="item.value" :value="item.value" name="area">
          {{item.value + item.label}}
        </label>
        <div>{{area}}</div>
      </div>
    </form>
    <!-- 歌手列表模块 -->
    <ul class="list-wrap" v-if="artists.length > 0">
      <CoverItem v-for="item in artists"
        :key="item.id"
        :item="item"
        :column="6"
        @itemClick="handleCoverClick"/>
    </ul>
    <!-- 歌手列表模块/ -->
  </div>
</template>

<script>
import CoverItem from '@/components/content/Cover/CoverItem.vue'

import { _getArtistList } from '@/network/artist.js'

export default {
  name: 'Artist',
  components: { CoverItem },
  data () {
    return {
      artists: [],
      areaRadio: [
        { value: -1, label: '全部', isChecked: true },
        { value: 7, label: '华语', isChecked: false },
        { value: 96, label: '欧美', isChecked: false },
        { value: 8, label: '日本', isChecked: false },
        { value: 10, label: '韩国', isChecked: false },
        { value: 0, label: '其他', isChecked: false }
      ],
      typeRadio: [
        { value: -1, label: '全部' },
        { value: 1, label: '男歌手' },
        { value: 2, label: '女歌手' },
        { value: 3, label: '乐队' }
      ],
      initialRadio: [],
      area: 8,
      type: -1,
      initial: null
    }
  },
  created () {
    // this.getArtistList()
    this.getinitialRadio()
  },
  methods: {
    /**
     * 获取歌手列表数据
     */
    async getArtistList () {
      const { data: res } = await _getArtistList(this.type, this.area, this.intial)
      this.artists = res.artists
    },

    /**
     * 歌手封面点击事件
     */
    handleCoverClick (id) {
      console.log('跳转到歌手详情页', id)
      // this.$router.push({
      //   path: '/artist',
      //   params: { id }
      // })
    },

    handleRadioClick () {
      this.$nextTick(() => {
        console.log(this.area)
      })
    },

    // 初始化筛选列表
    getinitialRadio () {
      const arr = []
      for (let i = 65; i < 91; i++) {
        arr.push(String.fromCharCode(i))
      }
      this.initialRadio = arr
      console.log(this.initialRadio)
    }
  }
}
</script>

<style lang="less" scoped>
.list-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
