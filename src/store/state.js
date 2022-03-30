export default {
  /* 登录及权限 */
  isShowLogin: false, // 是否显示登录弹窗
  user: {},

  /* 音乐播放 */
  playListIds: [], // 歌单id列表
  playList: [], // 播放列表
  playListInfo: {}, // 当前播放列表信息
  playContent: {}, // 当前歌曲对象
  currentTime: 0, // 当前播放进度

  /* 主题颜色 */
  themeColor: '#ec4141', // 主题色
  themeList: [ // 主题列表
    { name: 'red', color: '#ec4141' },
    { name: 'light', color: '#ccc' }
  ]
}
