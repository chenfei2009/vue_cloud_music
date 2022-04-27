import {
  SHOW_LOGIN,
  HIDDLE_LOGIN,
  ADD_USER,
  SET_CONTENT,
  SET_CURRENTTIME,
  SET_PLAYLISTINFO,
  SET_PLAYLIST,
  ADD_TO_PLAYLIST,
  RESET_PLAYLIST
} from './mutations-type'

function setlist (state, payload) {
  // const currentIndex = state.playList.indexOf(state.playContent)
  const currentIndex = state.playlist.findIndex(item => item.id === state.playContent.id)
  // payload 为播放列表
  if (Array.isArray(payload)) {
    // 判断是否为同一个播放列表
    return payload.reverse().forEach(v => setlist(state, v))
  }
  // 更新播放列表
  // return state.playList.findIndex(item => item.id === payload.id) >= 0 ? '' : state.playList.splice(currentIndex + 1, 0, payload)
  if (state.playlist.findIndex(item => item.id === payload.id) >= 0) return console.log('已存在')
  // if (Array.isArray(payload)) return state.playList.splice(currentIndex + 1, 0, ...payload)
  state.playlist.splice(currentIndex + 1, 0, payload)
  // 保存更新后的列表到本地存储
  // console.log(state.playlist)
  window.localStorage.setItem('playlist', JSON.stringify(state.playlist))
}

export default {
  // mutations 唯一的目的就是修改 state 中的状态
  // mutations 中的每个方法尽可能完成的事情单一

  /* 登录及权限 */
  [SHOW_LOGIN] (state, payload) {
    state.isShowLogin = true
  },

  [HIDDLE_LOGIN] (state, payload) {
    state.isShowLogin = false
  },

  [ADD_USER] (state, payload) {
    state.user = payload
  },

  /* 音乐播放 */
  [SET_CONTENT] (state, payload) {
    // setPlayList(state, payload)
    state.playContent = payload
    localStorage.setItem('playContent', JSON.stringify(payload))
  },

  [SET_CURRENTTIME] (state, payload) {
    state.currentTime = payload
  },

  [SET_PLAYLISTINFO] (state, payload) {
    state.playlistInfo = payload
  },

  [ADD_TO_PLAYLIST] (state, payload) {
    setlist(state, payload)
  },

  [SET_PLAYLIST] (state, payload) {
    state.playlist = payload
    localStorage.setItem('playlist', JSON.stringify(payload))
  },

  [RESET_PLAYLIST] (state, payload) {
    const { songs, id } = payload
    state.playlist = songs
    localStorage.setItem('playlist', JSON.stringify(songs))
    if (!id) {
      state.playContent = songs[0]
      localStorage.setItem('playContent', JSON.stringify(songs[0]))
      return
    }
    const item = songs.find(v => v.id === payload.id)
    state.playContent = item
    localStorage.setItem('playContent', JSON.stringify(item))
  }
}
