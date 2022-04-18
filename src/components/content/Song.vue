<template>
  <div class="song-container" :style="itemStyle">
    <div class="left-wrap" :style="leftStyle" @click="coverClick">
      <el-image :src="item.picUrl" fit="cover" class="item-img"></el-image>
      <div class="item-btn">
        <i class="iconfont icon-caret-right" v-if="1"></i>
        <i class="iconfont icon-pause" v-else></i>
      </div>
    </div>
    <div class="right-wrap" :style="rightStyle" @dblclick="songDbClick">
      <div class="item-name">{{item.name}}</div>
      <div class="item-tag-wrap" v-if="item.tag">
        <span class="item-tag text-small">{{item.tag}}</span>
      </div>
      <div class="item-info text-small">
        <Artists :artists="item.song.artists"/>
        <!-- <div class="item-artists-wrap">
          <span v-for="item in item.song.artists" :key="item.id">{{item.name}}</span>
        </div> -->
        <div class="item-hit-wrap" v-if="item.hit">
          <i class="iconfont icon-caret-right"></i>
          <div class="item-hit">{{item.hit}}</div>
        </div>
        <div class="item-time-wrap" v-if="item.time">
          <i class="iconfont icon-recentsicon item-icon"></i>
          <div class="item-time">{{item.time}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Artists from '@/components/content/Artists.vue'

export default {
  name: 'Song',

  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    },
    column: {
      type: Number,
      default: 2
    }
  },

  components: {
    Artists
  },

  data () {
    return {
      isShowBtn: true
    }
  },

  computed: {
    itemStyle () {
      if (this.column === 2) {
        return {
          width: '45%',
          height: '80px'
        }
      } else {
        return {
          width: '32%',
          height: '50px'
        }
      }
    },
    leftStyle () {
      if (this.column === 2) {
        return {
          // width: '80px',
          height: '80px',
          flex: '0 0 80px'
        }
      } else {
        return {
          // width: '50px',
          height: '50px',
          flex: '0 0 50px'
        }
      }
    },
    rightStyle () {
      if (this.column === 2) {
        return {
          // width: '80px',
          height: '80px',
          width: 'calc(100% - 80px)'
        }
      } else {
        return {
          // width: '50px',
          height: '50px',
          width: 'calc(100% - 50px)'
        }
      }
    }
  },

  methods: {
    coverClick () {
      this.$emit('coverClick')
    },
    songDbClick () {
      this.$emit('songDbClick')
    }
  }
}
</script>

<style lang="less" scoped>
.song-container {
  display: flex;
  // width: 100%;
  margin: 10px 0 10px 5px;
  .left-wrap {
    position: relative;
    &:hover {
      cursor: pointer;
    }
    .item-img {
      width: 100%;
      // height: 100%;
      border-radius: 5px;
      overflow: hidden;
    }
    .item-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: 10px;
      right: 10px;
      width: 30px;
      height: 30px;
      background-color: #eee;
      border-radius: 50%;
      color: var(--themeColor);
      opacity: 0.9;
    }
  }
  .right-wrap {
    padding-left: 10px;
    // flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    &:hover {
      background-color: #eee;
    }
    .item-name {
      // width: 100%;
      padding-bottom: 1px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .item-tag {
      // padding: 0 2px;
      border: 1px solid #ccc;
    }
    .item-info {
      // padding-top: 5px;
      display: flex;
      height: 16px;
      overflow: hidden;
      .iconfont {
        margin: 0 5px 0 10px;
        font-size: 10px;
        line-height: 16px;
      }
    }
  }
}
</style>
