import CryptoJS from 'crypto-js'

export function encrypt(word) {
  const key = CryptoJS.enc.Utf8.parse('b1650c4758e8ace9a4ba795316e3783f')
  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
  })
  return encrypted.ciphertext.toString()
}
