import jsQR from 'jsqr'
import QRCode from 'qrcode'
// 读取二维码文件
function ReadQrFile(text) {
  let input = document.createElement('input')
  input.type = 'file'
  input.onchange = (e) => {
    let file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      const image = new Image()
      image.src = e.target.result
      image.onload = () => {
        let can = document.createElement('canvas')
        can.width = 200
        can.height = 200
        const ctx = can.getContext('2d')
        ctx.drawImage(image, 0, 0, 200, 200)
        let imageData = ctx.getImageData(0, 0, can.width, can.height)
        const decodedResult = jsQR(imageData.data, 200, 200, {
          inversionAttempts: 'dontInvert',
        })
        if (decodedResult) {
          text.value = decodedResult.data
        } else {
          return '未识别到二维码!'
        }
      }
    }
    reader.readAsDataURL(file)
  }
  input.click()
}
// 读取页面的img标签
function ReadQr(img) {
  let can = document.createElement('canvas')
  can.width = 200
  can.height = 200
  const ctx = can.getContext('2d')
  ctx.drawImage(img, 0, 0, 200, 200)
  let imageData = ctx.getImageData(0, 0, can.width, can.height)
  const decodedResult = jsQR(imageData.data, 200, 200, {
    inversionAttempts: 'dontInvert',
  })
  if (decodedResult) {
    return decodedResult.data
  } else {
    return '未识别到二维码!'
  }
}

function MakeQr(params) {
  return new Promise((resolve) => {
    QRCode.toDataURL(params.text, {
      /*
        L — 低容错率（大约 7% 的数据可以丢失）
        M — 中容错率（大约 15% 的数据可以丢失）
        Q — 高容错率（大约 25% 的数据可以丢失）
        H — 最高容错率（大约 30% 的数据可以丢失）
      */
      errorCorrectionLevel: 'L', // 错误修正级别：L (低), M (中), Q (较高), H (最高)
      width: params.size,
      height: params.size,
      color: {
        dark: '#000', // 二维码的前景色（黑色）
        light: '#ffffff00', // 二维码的背景色（白色）
      },
      margin: 0, // 边距，默认是 4
      scale: 1, // 模块大小，默认是 4
    }).then((url) => {
      let can = document.createElement('canvas')
      can.width = params.size
      can.height = params.size
      const ctx = can.getContext('2d')
      ctx.fillStyle = 'white' //确定填充的颜色,默认值是黑色
      ctx.fillRect(0, 0, can.width, can.height) // 确定路径并填充出来
      ctx.fill() //开始填充
      let qr = new Image()
      qr.src = url
      qr.width = params.size
      qr.height = params.size
      qr.onload = () => {
        let image = null
        if (params.logo) {
          image = new Image()
          image.src = params.logo
        } else if (params.background) {
          image = new Image()
          image.src = params.background
        }
        if (image) {
          image.onload = () => {
            let w, x
            if (params.logo) {
              ctx.drawImage(qr, 0, 0, can.width, can.width)
              w = 30
              x = (can.width - w) * 0.5
              ctx.drawImage(image, x, x, w, w)
            } else {
              ctx.save()
              ctx.globalAlpha = params.opacity
              w = can.width
              ctx.drawImage(image, 0, 0, w, w)
              ctx.restore()
              ctx.globalAlpha = 1
              ctx.drawImage(qr, 0, 0, can.width, can.width)
            }
            resolve(can.toDataURL())
          }
        } else {
          ctx.drawImage(qr, 0, 0, can.width, can.width)
          resolve(can.toDataURL())
        }
      }
    })
  })
}
// 生成二维码图片
export { ReadQrFile, ReadQr, MakeQr }
