// 关键字高亮处理
export default function highlight (str, search) {
  const replaceReg = new RegExp(search, 'gi')// 匹配关键字正则
  const index = str.search(replaceReg)
  // 高亮替换v-html值
  // const replaceString = '<span class="text-highlight">' + search + '</span>'
  const replaceString = '<span class="text-highlight">' + str.substr(index, search.length) + '</span>'
  str = str.replace(replaceReg, replaceString) // 开始替换
  return str
}
