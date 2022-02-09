import {
  SET_CONTENT,
  ADD_TO_PLAYLIST,
  RESET_PLAYLIST,
  RESET_THEMECOLOR
} from './mutations-type'

function setPlayList (state, payload) {
  // const currentIndex = state.playList.indexOf(state.playContent)
  const currentIndex = state.playList.findIndex(item => item.id === state.playContent.id)
  // console.log('currentIndex', currentIndex)
  // 更新播放列表
  return state.playList.findIndex(item => item.id === payload.id) >= 0 ? '' : state.playList.splice(currentIndex + 1, 0, payload)
  // if (state.playList.findIndex(item => item.id === payload.id) >= 0) return console.log('已存在')
  // state.playList.splice(currentIndex + 1, 0, payload)
}

export default {
  // mutations 唯一的目的就是修改 state 中的状态
  // mutations 中的每个方法尽可能完成的事情单一
  [SET_CONTENT] (state, payload) {
    setPlayList(state, payload)
    state.playContent = payload
  },
  [ADD_TO_PLAYLIST] (state, payload) {
    setPlayList(state, payload)
  },
  [RESET_PLAYLIST] (state, payload) {
    state.playList = payload
    state.playContent = payload[0]
  },
  [RESET_THEMECOLOR] (state, payload) {
    const themeItem = state.themeList.find(item => item.name === payload)
    state.themeColor = themeItem.color
  }
}
