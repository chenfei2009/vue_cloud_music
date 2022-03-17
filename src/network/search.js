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

/**
 * 关键词搜索
 * @param { string } keywords 关键词
 * @param { number } type 搜索类型；默认为1, 取值意义: 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
 * @param { number } limit 返回数量，默认为30
 * @param { number } offset 返偏移数量，用于分页，默认为0
 */
export function _getSearch (keywords, type = 1, limit = 30) {
  return request({
    url: '/search',
    params: { keywords, type, limit }
  })
}

/**
 * 关键词搜索
 * @param { string } keywords 关键词
 * @param { number } type 搜索类型；默认为1, 取值意义: 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
 * @param { number } limit 返回数量，默认为30
 * @param { number } offset 返偏移数量，用于分页，默认为0
 */
export function _getCloudSearch (keywords, type = 1, limit = 30) {
  return request({
    url: '/cloudsearch',
    params: { keywords, type, limit }
  })
}

/**
 * 搜索建议
 * @param { string } keywords 关键词
 * @param { string } type 如果传 'mobile' 则返回移动端数据
 */
export function _getSuggest (keywords, type = null) {
  return request({
    url: '/search/suggest',
    params: { keywords, type }
  })
}

/**
 * 搜索多重匹配
 * @param { string } keywords 关键词
 */
export function _getMultiMatch (keywords) {
  return request({
    url: '/search/multimatch',
    params: { keywords }
  })
}
