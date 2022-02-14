import request from './request'

/**
 * 获取歌曲评论
 * @param { interger } id 歌曲编号
 */
export function _getCommentById (id) {
  return request({
    url: '/comment/music',
    params: { id }
  })
}
