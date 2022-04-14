<template>
  <ul class="transition-wrapper" name="sort">
    <li v-for="(item, index) in dataList" :key='item.id' class="sort-item"
      :class="{'active': index === dragIndex}"
      :draggable="true"
      @dragstart="dragstart(index, $event)"
      @dragenter="dragenter(index, $event)"
      @dragover="dragover($event)"
      @dragend="dragend($event)">
      <div class="label-wrap">
        <span class="label">{{ item.label }}</span>
        <i class="iconfont icon-unorderedlist"></i>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'DragList',
  props: {
    data: Array
  },
  data () {
    return {
      dataList: [],
      dragIndex: '',
      enterIndex: ''
    }
  },
  mounted () {
    this.dataList.push(...this.data)
  },
  watch: {},
  methods: {
    dragstart (index, e) {
      this.dragIndex = index
      e.target.style.opacity = 0.1
    },
    // 记录移动过程中信息
    dragenter (index, e) {
      e.preventDefault()
      if (this.dragIndex !== index) {
        const source = this.dataList[this.dragIndex]
        // 删除老的节点
        this.dataList.splice(this.dragIndex, 1)
        // 在列表中目标位置增加新的节点
        this.dataList.splice(index, 0, source)
        // 排序变化后目标对象的索引变成源对象的索引
        this.dragIndex = index
      }
    },
    // 拖动事件（主要是为了拖动时鼠标光标不变为禁止）
    dragover (e) {
      e.preventDefault()
    },
    dragend (e) {
      e.preventDefault()
      e.target.style.opacity = 1
      this.dragIndex = ''
      // console.log(e.DataTransfer)
      this.$emit('sort', this.dataList)
    }
  }
}
</script>

<style lang="less" scoped>
.sort-item {
  margin: 0 -25px;
  &.sort-item:hover {
    background-color: #eee;
  }
  &.active {
    height: 40px;
    background-color: #ccc;
    opacity: 1;
  }
  .label-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 35px;
    height: 60px;
    border-bottom: 1px solid #eee;
    .label {
      font-size: 16px;
    }
    .iconfont {
      cursor: move;
    }
  }
}
</style>
