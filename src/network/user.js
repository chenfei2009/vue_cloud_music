import request from '@/utils/request'

/**
 * 获取用户详情
 */
export function _getUserDetail (uid) {
  return request({
    url: 'user/detail',
    params: { uid }
  })
}

export function _getUserDetailByName (nickname) {
  return request({
    url: 'user/detail',
    params: { nickname }
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
export function _getUserSubcount () {
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

/**
 * 获取用户电台
 */
export function _getUserDj (uid) {
  return request({
    url: 'user/dj',
    params: { uid }
  })
}

/**
 * 获取用户电台
 * @param {number} uid 用户id
 * @param {number} limit 返回数量, 默认为 30
 * @param {number} lasttime 返回数据的 lasttime ,默认-1,传入上一次返回结果的lasttime,将会返回下一页的数据
 */
export function _getUserEvent (uid, limit = 30, lasttime = -1) {
  return request({
    url: 'user/event',
    params: { uid, limit, lasttime }
  })
}
