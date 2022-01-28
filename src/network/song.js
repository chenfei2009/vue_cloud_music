import request from './request'

/**
 * 获取 ids 对应歌曲信息
 */
export function _getSongsByIds (ids) {
  return request({
    url: 'song/detail',
    params: { ids }
  })
}

/**
 * 获取 id 对应歌曲 url
 */
export function _getSongUrlById (id) {
  return request({
    url: 'song/url',
    params: { id }
  })
}
