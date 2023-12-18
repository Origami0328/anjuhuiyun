export function generateUniqueValue() {
  // 生成随机字符串
  function generateRandomString(length) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

  // 获取当前时间戳
  const timestamp = new Date().getTime().toString()

  // 生成随机字符串
  const randomString = generateRandomString(8)

  // 将随机字符串和时间戳拼接
  const combinedData = randomString + timestamp

  // 生成唯一值
  return combinedData
}
