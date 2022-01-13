// 计时器格式化
export default function formatTime (time) {
  // 获取时分秒
  let h = parseInt(time / 3600)
  let m = parseInt((time - h * 3600) / 60)
  let s = parseInt(time - h * 3600 - m * 60)
  // 格式化
  h = (h < 10 ? `0${h}` : h)
  m = (m < 10 ? `0${m}` : m)
  s = (s < 10 ? `0${s}` : s)
  if (h > 0) return `${h}:${m}:${s}`
  return `${m}:${s}`
}
