<template>
  <div class="pic-list-container">
    <!-- 九宫格缩略图 -->
    <div class="cover-wrap" :style="{display:MinDisplay}">
      <div class="cover" v-for="(img, index) in pics" :key='index'>
        <img :src="img.squareUrl" width="100%" class="min br5" @click="ZoomIn(index)" alt="">
      </div>
    </div>
    <!-- 放大后的图 -->
    <div class="max-wrap br5" :style="{display:display}">
      <div class="tool-wrap">
        <span class="tool-item">收起</span>
        <span class="tool-item">查看原图</span>
        <span class="tool-item"
          @click="handleDownload">下载</span>
      </div>
      <div @click="ZoomOut"
        v-for="(img, index) in pics"
        :key='index'
        class="max"
        :class="[index===currentIndex?'active':'none']"
        ><img :src="img.originUrl" width="100%"></div>
      <!-- 放大后图片下方的导航图 -->
      <div class="small-wrap">
        <div :class="[{'smallActive':index===currentIndex},'cover-small']"
          v-for="(img, index) in pics"
          :key='index'
          @click="select(index)"
          ><img :src="img.squareUrl" width="90%"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PicList',
  props: {
    pics: Array
  },
  data () {
    return {
      currentIndex: 0,
      display: 'none',
      MinDisplay: 'flex'
    }
  },
  methods: {
    ZoomIn (i) {
      this.display = 'block'
      this.MinDisplay = 'none'
      this.currentIndex = i
    },
    ZoomOut () {
      this.display = 'none'
      this.MinDisplay = 'flex'
    },
    select (i) {
      this.currentIndex = i
    },
    handleDownload () {
      console.log(`下载index为${this.currentIndex}的图片`)
      const url = this.pics[this.currentIndex].originUrl
      console.log(url)
      this.download(url)
    },
    getUrlBase64 (url) {
      return new Promise(resolve => {
        let canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const img = new Image()
        img.crossOrigin = 'Anonymous' // 允许跨域
        img.src = url
        img.onload = function () {
          canvas.height = img.height
          canvas.width = img.width
          ctx.drawImage(img, 0, 0, img.width, img.height)
          const dataURL = canvas.toDataURL('image/png')
          canvas = null
          resolve(dataURL)
        }
      })
    },
    download (url) {
      const link = document.createElement('a')
      link.href = url
      link.download = 'qrCode.png'
      link.click()
      // this.getUrlBase64(url).then(base64 => {
      //   const link = document.createElement('a')
      //   link.href = base64
      //   link.download = 'qrCode.png'
      //   link.click()
      // })
    }
  }
}
</script>

<style lang="less" scoped>
.cover-wrap {
  width: 380px;
  display: flex;
  // justify-content: space-between;
  flex-wrap: wrap;
}
.cover {
  display: flex;
  justify-content: center;
  width: 120px;
  height: 120px;
  margin: 0 5px 5px 0;
}
.min {
  // border-radius: 10px;
  cursor: zoom-in;
}
.max-wrap {
  width: 100%;
  background-color: #eee;
}
.tool-wrap {
  padding: 10px;
  display: flex;
  .tool-item {
    display: block;
    padding: 0 10px;
    border-right: 1px solid #ccc;
    cursor: pointer;
  }
  // .tool-item::after {
  //   content: '';
  //   display: inline-block;
  //   position: absolute;
  //   width: 1px;
  //   height: 90%;
  //   background-color: #eee;
  //   right: -20px;
  // }
}
.max {
  margin: 0 auto;
  cursor: zoom-out;
  width: 60%;
  max-width: 500px;
}
.small-wrap {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 60%;
  max-width: 500px;
}
.cover-small {
  display: flex;
  justify-content: center;
  width: 10%;
  margin: 10px 0;
  opacity: 0.6;
  cursor: pointer;
}
.cover-small:hover {
  opacity: 1;
}
.active {
  display: flex;
}
.none {
  display: none;
}
.smallActive {
  opacity: 1;
}
</style>
