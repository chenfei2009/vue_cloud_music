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

  playlist (state) {
    return state.playlist.length ? state.playlist : JSON.parse(window.localStorage.getItem('playlist')) || []
  },

  playlistInfo (state) {
    return state.playlistInfo
  }
}
