import {
  SET_CONTENT,
  ADD_TO_PLAYLIST
} from './mutations-type'

export default {
  // mutations 唯一的目的就是修改 state 中的状态
  // mutations 中的每个方法尽可能完成的事情单一
  [SET_CONTENT] (state, payload) {
    state.playContent = payload
    // 更新播放列表
    return state.playList.indexOf(payload) === -1 ? state.playList.push(payload) : ''
  },
  [ADD_TO_PLAYLIST] (state, payload) {
    return state.playList.indexOf(payload) === -1 ? state.playList.push(payload) : ''
  }
}
