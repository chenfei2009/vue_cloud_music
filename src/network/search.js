import request from './request'

/**
 * 获取默认搜索关键词
 */
export function _getDefaultKey () {
  return request({
    url: '/search/default'
  })
}

/**
 * 获取热搜列表
 */
export function _getHotKeys () {
  return request({
    url: '/search/hot/detail'
  })
}
