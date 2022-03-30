import request from '@/utils/request'

/**
 * 获取最近播放歌单
 * @param { number } limit 默认100
 */
export function _getRecentPlaylist (limit = 100) {
  return request({
    url: '/record/recent/playlist',
    params: { limit }
  })
}
