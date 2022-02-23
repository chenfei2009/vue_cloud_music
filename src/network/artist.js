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
