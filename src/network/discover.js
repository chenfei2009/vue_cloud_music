import request from './request'

/** 获取轮播图 */
export function _getBanner () {
  return request({
    url: '/banner'
  })
}

/** 获取推荐歌单 */
export function _getPersonalized (config) {
  return request({
    url: '/personalized',
    params: {
      limit: config
    }
  })
}

/** 获取独家放送 */
export function _getPrivateContent () {
  return request({
    url: '/personalized/privatecontent'
  })
}

/** 获取推荐新音乐 */
export function _getNewSong () {
  return request({
    url: '/personalized/newsong'
  })
}

/** 获取最新歌曲 */
export function _getTopSongs (type) {
  return request({
    url: '/top/song',
    params: {
      type: type
    }
  })
}
