import request from './request'

/**
 * 获取二维码 key
 */
export function _getQrKey () {
  return request({
    url: '/login/qr/key'
  })
}

/**
 * 生成二维码
 * 返回二维码图片的 base64 和二维码信息
 * 可使用 base64 展示图片
 * 或者使用二维码信息内容自行使用第三方二维码生成库渲染二维码
 * @param { string } key 上一个接口生成的 key
 */
export function _getQrCreate (key) {
  return request({
    url: '/login/qr/create',
    params: { key }
  })
}

/**
 * 手机登录
 * @param { string } phone 手机号
 * @param { string } password 手机登录密码
 */
export function _loginByCellphone (phone, password) {
  return request({
    url: '/login/cellphone',
    params: { phone, password }
  })
}
