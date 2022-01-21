<template>
  <!-- 播放设置模块 -->
  <div class="tools-container">
    <div class="tools-item speed">
      <Popper trigger="clickToOpen"
        :options="{
          placement: 'top',
          modifiers: { offset: { offset: '0, 10px' } }
        }">
        <div class="popper">
          <ul class="select-wrap">
            <li :class="speed===item.value ? activeClass : optionClass"
              class="select-item"
              v-for="item in speedOptions"
              :key=item.value
              @click="speedOptionClick(item)">
              <div class="item-text">{{item.value+'x'}}</div>
              <div class="item-tag" v-if="audio.speed===item.value">√</div>
            </li>
          </ul>
        </div>
        <span slot="reference">{{speedText}}</span>
      </Popper>
    </div>
    <div class="tools-item">音效</div>
    <div class="tools-item">
      <Popper trigger="clickToOpen"
        :options="{
          placement: 'top',
          modifiers: { offset: { offset: '0, 10px' } }
        }">
        <div class="popper volume-popper">
          <SliderBar vertical
            height="100px" width="6px"
            @drag="changVolByDrag"
            @change="changVolByClick"
            :value=20
            ></SliderBar>
        </div>
        <i slot="reference" class="iconfont icon-24gl-volumeMiddle"></i>
      </Popper>
    </div>
    <div class="tools-item">
      <i class="iconfont icon-friends"></i>
    </div>
    <div class="tools-item" @click="showListClick">
      <i class="iconfont icon-play_list"></i>
    </div>
  </div>
</template>

<script>
import SliderBar from '@/components/common/SliderBar.vue'
import Popper from 'vue-popperjs'
import 'vue-popperjs/dist/vue-popper.css'

export default {
  name: 'FooterIndex',
  components: { SliderBar, Popper },
  data () {
    return {
      // audio: {
      //   url: 'upload/test.mp3',
      //   speed: 1
      // },
      speed: 1,
      speedOptions: [
        { value: 0.5, isSelected: false },
        { value: 0.75, isSelected: false },
        { value: 1, isSelected: true },
        { value: 1.25, isSelected: false },
        { value: 1.5, isSelected: false },
        { value: 2, isSelected: false }
      ]
    }
  },
  computed: {
    audio () {
      return this.$store.state.audio
    },
    optionClass () {
      return 'item-default'
    },
    activeClass () {
      return 'item-active'
    },
    speedText () {
      return this.speed === 1 ? '倍速' : `${this.speed}x`
    }
  },
  methods: {
    changVolByDrag (...args) {
      this.$emit('changeVol', arguments)
    },
    changVolByClick (val) {
      this.$emit('changeVol', arguments)
    },
    speedOptionClick (item) {
      this.speed = item.value
      this.speedOptions.forEach(v => {
        v.isSelected = (v.value === item.value)
      })
      this.$emit('changeSpeed', item.value)
    },
    showListClick () {
      this.$emit('showListClick')
    }
  }
}
</script>

<style lang="less" scoped>
.tools-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 200px;
  height: 100%;
  .tools-item {
    margin: 0 5px;
  }
  .speed {
    border: 1px solid #000;
    padding: 0 2px;
  }
}
.select-wrap {
  .select-item {
    position: relative;
    width: 100%;
    .item-text {
      text-align: center;
      padding: 2px 25px;
      font-size: 10px;
      // margin: 2px 0;
    }
    .item-tag {
      position: absolute;
      right: 5px;
      bottom: 0;
      color: red;
    }
  }
  .select-item:hover {
    .item-text {
      color: #000;
    }
  }
  .item-active {
    color: #000;
  }
  .item-default {
    color: #ccc;
  }
}

.popper {
  padding: 5px;
  background-color: #fff;
  box-shadow: 0 0 5px #ccc;
}

.volume-popper {
  padding-bottom: 15px;
}
</style>
