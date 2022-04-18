export default {
  currentTime (state) {
    return state.currentTime
    // if (state.currentTime) return state.currentTime
    // console.log('返回本地存储 currentTime')
    // return JSON.parse(window.localStorage.getItem('currentTime')) || null
  },

  playContent (state) {
    return state.playContent.id ? state.playContent : JSON.parse(window.localStorage.getItem('playContent')) || {}
  },

  playList (state) {
    return state.playList.length ? state.playList : JSON.parse(window.localStorage.getItem('playList')) || []
  },

  playListInfo (state) {
    return state.playListInfo
  },

  audio (state) {
    return state.audio
  }
}
