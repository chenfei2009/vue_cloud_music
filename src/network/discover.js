import request from '@/utils/request.js'

/**获取轮播图数据 */
export function getBanner() {
  return request({
    url: '/banner'
  })
}