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

/**
 * 获取热门评论
 * @param { interger } id 资源编号
 * @param { interger } type 资源类型
 * @param { interger } limit 评论数量，默认为20
 * @param { interger } offset 偏移论数量，用于分页
 */
export function _getHotComments (id, type, limit = 20) {
  return request({
    url: '/comment/hot',
    params: { id, type, limit }
  })
}
