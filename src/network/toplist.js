import request from '@/utils/request'

/**
 * 获取 所有榜单 接口地址
 */
export function _getToplist () {
  return request({
    url: '/toplist'
  })
}
