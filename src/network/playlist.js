import request from './request'

/**
 * 获取歌单所有歌曲
 * @param { interger } id 歌单编号
 * @param { interger } limit 限制获取歌曲的数量
 * @param { interger } offset 默认值为0，用于歌曲的分页
 */
export function _getSongsByListId (id, limit = null, offset = null) {
  return request({
    url: '/playlist/track/all',
    params: { id, limit, offset }
  })
}

/**
 * 获取歌单详情
 * @param { interger } id 歌单编号
 * @param { interger } s 歌单最近的 s 个收藏者, 默认为 8
 */
export function _getDetailByListId (id, s = 8) {
  return request({
    url: '/playlist/detail',
    params: { id, s }
  })
}
