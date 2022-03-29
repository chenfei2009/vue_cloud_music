<template>
  <div class="artists-container tab-container">
    <!-- 表单模块 -->
    <form action="#">
      <RadioGroup>
        <div slot="label" class="label">语种：</div>
        <RadioItem v-for="(item, index) in areaRadio"
          :key="item.value"
          :value="item.value"
          :active="area===item.value"
          :class="{'bd-r': index !== areaRadio.length-1}"
          @change="handleAreaChange">
          <div slot="item-text"
            class="btn btn-round"
            :class="{'btn-primary': area===item.value}"
            >{{item.label}}</div>
        </RadioItem>
      </RadioGroup>
      <RadioGroup>
        <div slot="label" class="label">分类：</div>
        <RadioItem v-for="(item, index) in typeRadio"
          :key="item.value"
          :value="item.value"
          :active="type===item.value"
          :class="{'bd-r': index !== typeRadio.length-1}"
          @change="handleTypeChange">
          <div slot="item-text"
            class="btn btn-round"
            :class="{'btn-primary': type===item.value}"
            >{{item.label}}</div>
        </RadioItem>
      </RadioGroup>
      <RadioGroup>
        <div slot="label" class="label">筛选：</div>
        <RadioItem v-for="(item, index) in initialRadio"
          :key="item.value"
          :value="item.value"
          :active="initial==item.value"
          :class="{'bd-r': index !== initialRadio.length-1}"
          @change="handleInitialChange">
          <div slot="item-text"
            class="btn btn-round"
            :class="{'btn-primary': initial==item.value}"
            >{{item.label}}</div>
        </RadioItem>
      </RadioGroup>
    </form>
    <!-- 歌手列表模块 -->
    <ul class="list-wrap" v-if="artists.length > 0">
      <Cover v-for="item in artists"
        :key="item.id"
        :picUrl="item.picUrl"
        :column="6"
        @itemClick="handleCoverClick(item.id)">
        <span slot="text">{{item.name}}</span></Cover>
    </ul>
    <!-- 歌手列表模块/ -->
  </div>
</template>

<script>
import Cover from '@/components/content/Cover.vue'
import RadioItem from '@/components/common/RadioItem.vue'
import RadioGroup from '@/components/common/RadioGroup.vue'

import { _getArtistList } from '@/network/artist.js'

export default {
  name: 'Artists',
  components: { Cover, RadioGroup, RadioItem },
  data () {
    return {
      artists: [],
      areaRadio: [
        { value: -1, label: '全部' },
        { value: 7, label: '华语' },
        { value: 96, label: '欧美' },
        { value: 8, label: '日本' },
        { value: 10, label: '韩国' },
        { value: 0, label: '其他' }
      ],
      typeRadio: [
        { value: -1, label: '全部' },
        { value: 1, label: '男歌手' },
        { value: 2, label: '女歌手' },
        { value: 3, label: '乐队' }
      ],
      initialRadio: [
        { value: -1, label: '全部' }
      ],
      area: -1,
      type: -1,
      initial: -1
    }
  },
  created () {
    this.getArtistList()
    this.getinitialRadio()
  },
  methods: {
    /**
     * 获取歌手列表数据
     */
    async getArtistList () {
      const { data: res } = await _getArtistList(this.type, this.area, this.initial)
      this.artists = res.artists
    },

    /**
     * 歌手封面点击事件
     */
    handleCoverClick (id) {
      console.log('跳转到歌手详情页', id)
      this.$router.push({
        path: '/artist',
        query: { id }
      })
    },

    handleAreaChange (value) {
      this.area = value
      this.getArtistList()
    },

    handleTypeChange (value) {
      this.type = value
      this.getArtistList()
    },

    handleInitialChange (value) {
      this.initial = value
      this.getArtistList()
    },

    // 初始化筛选列表
    getinitialRadio () {
      const arr = [{ value: -1, label: '全部' }, { value: 0, label: '#' }]
      for (let i = 65; i < 91; i++) {
        const item = {
          value: String.fromCharCode(i).toLowerCase(),
          label: String.fromCharCode(i)
        }
        arr.splice(i - 64, 0, item)
      }
      this.initialRadio = arr
      // console.log(this.initialRadio)
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

.label {
  width: 40px;
  font-size: 12px;
}

.btn {
  font-size: 12px;
  // box-sizing: content-box;
  min-width: 50px;
  text-align: center;
  height: 20px;
  line-height: 20px;
  margin: 0 10px;
  padding: 0 10px;
  // border: 1px solid #ccc;
}

.btn-round {
  border-radius: 10px;
}

.btn-primary {
  color: #fff;
  background-color: var(--themeColor);
  border: 1px solid var(--themeColor);
}

.bd-r {
  border-right: 1px solid #ccc;
}
</style>
