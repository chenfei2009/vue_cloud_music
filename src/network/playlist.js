import request from '@/utils/request'

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

/**
 * 收藏歌单
 * @param { number } t 类型,1:收藏,2:取消收藏
 * @param { number } id 歌单id
 */
export function _subsPlaylist (t, id) {
  return request({
    url: '/playlist/subscribe',
    params: { t, id }
  })
}

/**
 * 歌单分类
 */
export function _getPlaylistCats () {
  return request({
    url: '/playlist/catlist'
  })
}

/**
 * 热门歌单分类
 */
export function _getPlaylistHots () {
  return request({
    url: '/playlist/hot'
  })
}

/**
 * 歌单 ( 网友精选碟 )
 * @param { string } order 可选值为 new 和 hot, 分别对应最新和最热 , 默认为 hot
 * @param { string } cat tag, 比如 华语、古风、欧美、流行, 默认为 全部,可从歌单分类接口获取(/playlist/catlist)
 * @param { number } limit: 取出歌单数量 , 默认为 50
 * @param { number } offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 */
export function _getPlaylistByCat (order = 'hot', cat, limit = null, offset = null) {
  return request({
    url: '/top/playlist',
    params: { order, cat, limit, offset }
  })
}

/**
 * 精品歌单标签列表
 */
export function _getHighTags () {
  return request({
    url: '/playlist/highquality/tags'
  })
}

/**
 * 获取精品歌单
 * @param { string } cat tag, 比如 华语、古风、欧美、流行, 默认为 全部,可从歌单分类接口获取(/playlist/catlist)
 * @param { number } limit: 取出歌单数量 , 默认为 20
 * @param { number } before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
 */
export function _getHighPlaylist (order = 'hot', cat, limit = null, before = null) {
  return request({
    url: '/top/playlist/highquality',
    params: { order, cat, limit, before }
  })
}
