class Minifytor {
  STAT_LOADING = 'statLoading'
  STAT_LOADED = 'statLoaded'

  constructor (file) {
    this.status = this.STAT_LOADING
    this.tasks = []
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    // 加载图片文件 将文件的相关属性挂载至对象中
    this.filetoImage(file).then(image => {
      this.image = image
      this.imageMIME = file.type
      this.imageWidth = image.width
      this.imageHeight = image.height
      this.status = this.STAT_LOADED
      // 状态改变后查看当前任务队列 依次执行相关任务
      this.tasks.forEach(promise => promise())
    })
  }

  /**
   * 大小不变改变图片品质
   * @param {Number} quality 图片的质量 0~1 值越大清晰度越高
   */
  minify (quality) {
    return new Promise((resolve, reject) => {
      if (this.status === this.STAT_LOADED) {
        const base64 = this.minifyImage(quality)
        return this.dataURLtoImage(base64)
      } else {
        return this.tasks.push(() => {
          const base64 = this.minifyImage(quality)
          this.dataURLtoImage(base64).then(image => {
            resolve(image)
          })
        })
      }
    })
  }

  /**
   * 等比缩放图片
   * @param {Number} width 期望的图片宽度
   * @param {Number} height 期望的图片高度
   */
  minifyRatio (width, height) {
    return new Promise((resolve, reject) => {
      if (this.status === this.STAT_LOADED) {
        const { computedWidth, computedHeight } = this.computeSize(width, height)
        const base64 = this.minifyImage(1, computedWidth, computedHeight)
        return this.dataURLtoImage(base64)
      } else {
        return this.tasks.push(() => {
          const { computedWidth, computedHeight } = this.computeSize(width, height)
          const base64 = this.minifyImage(1, computedWidth, computedHeight)
          this.dataURLtoImage(base64).then(image => {
            resolve(image)
          })
        })
      }
    })
  }

  // 缩小图片
  minifyImage (quality, width, height) {
    width = width || this.imageWidth
    height = height || this.imageHeight

    this.canvas.width = width
    this.canvas.height = height

    this.ctx.drawImage(this.image, 0, 0, width, height)
    return this.canvas.toDataURL(this.imageMIME, quality)
  }

  // 计算等比缩放的图片宽高
  computeSize (width, height) {
    const widthScale = width / this.imageWidth
    const heightScale = height / this.imageHeight
    let computedWidth
    let computedHeight
    if (widthScale > heightScale && widthScale === heightScale) {
      computedWidth = width
      computedHeight = this.imageHeight * widthScale
    } else {
      computedHeight = height
      computedWidth = this.imageWidth * heightScale
    }
    return { computedWidth, computedHeight }
  }

  filetoDataURL (file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = e => resolve(e.target.result)
      reader.onerror = err => reject(err)
      reader.readAsDataURL(file)
    })
  }

  async filetoImage(file) {
    const dataURL = await this.filetoDataURL(file)
    return await this.dataURLtoImage(dataURL)
  }

  dataURLtoImage (dataURL) {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.src = dataURL
      image.onload = () => resolve(image)
      image.onerror = e => reject(e)
    })
  }

}