import {
  SAVE_AUDIO,
  SAVE_PLAYLIST
} from './mutations-type'

export default {
  // mutations 唯一的目的就是修改 state 中的状态
  // mutations 中的每个方法尽可能完成的事情单一
  [SAVE_AUDIO] (state, payload) {
    state.audio = payload
  },
  [SAVE_PLAYLIST] (state, payload) {
    state.playList = payload
  }
}
