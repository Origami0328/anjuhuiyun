export function vaptcha() {
  // return new Promise(function (resolve, reject) {
  //   const tag = document.getElementsByTagName('script')
  //   for (let i of tag) {
  //     if (i.src === 'https://v-cn.vaptcha.com/v3.js') {
  //       resolve(window.vaptcha)
  //       return
  //     }
  //   }
  //   const script = document.createElement('script')
  //   script.type = 'text/javascript'
  //   script.src = 'https://v-cn.vaptcha.com/v3.js'
  //   script.onerror = reject
  //   document.body.appendChild(script)
  //   script.onload = () => {
  //     resolve(window.vaptcha)
  //   }
  // })
  return new Promise((resolve) => {
    if (typeof window.vaptcha === 'function') {
      resolve()
    } else {
      const script = document.createElement('script')
      script.src = 'https://v-cn.vaptcha.com/v3.js'
      script.async = true
      script.onload = script.onreadystatechange = function () {
        if (
          !this.readyState ||
          this.readyState == 'loaded' ||
          this.readyState == 'complete'
        ) {
          resolve()
          script.onload = script.onreadystatechange = null
        }
      }
      document.body.appendChild(script)
    }
  })
}
