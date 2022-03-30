import request from '@/utils/request'

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

/**
 * 获取 id 对应歌词
 */
export function _getLyricById (id) {
  return request({
    url: 'lyric',
    params: { id }
  })
}

/**
 * 获取相似歌单
 * @param { interger } id 歌曲编号
 */
export function _getSimiPlaylistsById (id) {
  return request({
    url: '/simi/playlist',
    params: { id }
  })
}

/**
 * 获取相似歌曲
 * @param { interger } id 歌曲编号
 */
export function _getSimiSongsById (id) {
  return request({
    url: '/simi/song',
    params: { id }
  })
}

/**
 * 获取专辑歌曲
 * @param { interger } id 专辑编号
 */
export function _getSongsByAlbumId (id) {
  return request({
    url: '/album',
    params: { id }
  })
}
