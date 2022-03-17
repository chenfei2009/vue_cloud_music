import request from './request'

/**
 * 获取用户详情
 */
export function _getUserDetail (uid) {
  return request({
    url: 'user/detail',
    params: { uid }
  })
}

/**
 * 获取账号信息
 */
export function _getUserAccount () {
  return request({
    url: 'user/account'
  })
}

/**
 * 获取用户信息 , 歌单，收藏，mv, dj 数量
 */
 export function _getUserAccount () {
  return request({
    url: '/user/subcount'
  })
}

/**
 * 获取用户等级信息
 */
 export function _getUserLevel () {
  return request({
    url: '/user/level'
  })
}
