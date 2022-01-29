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
    params: {
      id, limit, offset
    }
  })
}
