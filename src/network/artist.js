import request from './request'

/**
 * 获取歌手列表
 * @param { interger } limit 返回数量, 默认为 30
 * @param { interger } type 类型
 * @param { interger } area 地区
 * @param { string } initial 索引
 */
export function _getArtistList (type, area, initial = null, limit = 30) {
  return request({
    url: '/artist/list',
    params: { type, area, initial, limit }
  })
}

/**
 * 获取歌手单曲
 * @param { interger } id
 */
export function _getArtistInfo (id) {
  return request({
    url: '/artists',
    params: { id }
  })
}

/**
 * 获取歌手MV
 * @param { interger } id
 */
export function _getArtistMV (id) {
  return request({
    url: '/artist/mv',
    params: { id }
  })
}

/**
 * 获取歌手专辑
 * @param { interger } id
 * @param { interger } limit 返回数量, 默认为 50
 */
export function _getArtistAlbum (id, limit = 50) {
  return request({
    url: '/artist/album',
    params: { id, limit }
  })
}
