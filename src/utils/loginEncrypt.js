import CryptoJS from 'crypto-js'

export function encrypt(word) {
  const key = CryptoJS.enc.Utf8.parse('ajhyweb@pc202400')
  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
  })
  return encrypted.ciphertext.toString()
}
