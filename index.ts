class MinifyImage {
  private file: File
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

  /**
   * Creates an instance of Minify.
   * @author AimerFan
   * @date 18/11/2020
   * @param {File} file
   */
  constructor(file: File) {
    this.file = file
    this.canvas = this.getCanvas()
    this.ctx = this.getContext(this.canvas)
  }
  
  public setImage (file: File) {
    if (!this.isImage(file)) {
      throw new Error('this file is not a image')
    }
    this.file = file
  }

  /**
   * @description 等比压缩
   * @author AimerFan
   * @date 18/11/2020
   * @param {number} quality 清晰度
   * @returns {Promise<File>} file
   */
  public minify (quality: number = 85) {
    if (!this.isImage(this.file)) {
      console.error('this file is not a image')
      return
    }
    const promise: Promise<File> = new Promise((resolve) => {
      this.filetoImage(this.file).then(image => {
        const width = image.width
        const height = image.height
        this.canvas.width = width
        this.canvas.height = height
        this.ctx.drawImage(image, 0, 0, width, height)
        this.canvas.toBlob(blob => {
          const file = new File([blob], this.file.name, { type: this.file.type })
          resolve(file)
        }, this.file.type, quality / 100)
      })
    })
    return promise
  }

  /**
   * @description 图片文件转化成图片元素
   * @author AimerFan
   * @date 18/11/2020
   * @private
   * @param file 需要转化的图片
   * @returns {Promise<HTMLImageElement>}
   */
  private async filetoImage (file: File) {
    const dataURL: string = await this.filetoDataURL(file)
    const image = await this.dataURLtoImage(dataURL)
    return image
  }

  /**
   * @description 根据 base64 数据生成图片
   * @author AimerFan
   * @date 18/11/2020
   * @private
   * @param {string} dataURL base64 格式的数据
   * @returns {Promise<HTMLImageElement>} 
   */
  private dataURLtoImage (dataURL: string) {
    const promise: Promise<HTMLImageElement> = new Promise((resolve, reject) => {
      const image: HTMLImageElement = new Image()
      image.src = dataURL
      image.onload = () => resolve(image)
      image.onerror = e => reject(e)
    })
    return promise
  }

  /**
   * @description filetoDataURL
   * @author AimerFan
   * @date 18/11/2020
   * @private
   * @param {File} file
   * @returns {string} 
   */
  private filetoDataURL (file: File) {
    const promise: Promise<string> = new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = (e: ProgressEvent<FileReader>) => resolve(e.target.result.toString())
      reader.onerror = err => reject(err.toString())
      reader.readAsDataURL(file)
    })
    return promise
  }

  /**
   * @description 判断文件是否为图片
   * @author AimerFan
   * @date 18/11/2020
   * @param file 需要判断的文件
   * @returns {Boolean}
   */
  private isImage(file: File) {
    const { type } = file
    return /image/.test(type)
  }

  /**
   * @description 获取当前处理的文件对象
   * @author AimerFan
   * @date 18/11/2020
   * @returns {File} 
   */
  public getFile () {
    return this.file
  }

  /**
   * @description 生成 canvas 对象
   * @author AimerFan
   * @date 18/11/2020
   * @returns {HTMLCanvasElement} canvas
   */
  private getCanvas () {
    return document.createElement('canvas')
  }

  /**
   * @description 获取 canvas 上下文
   * @author AimerFan
   * @date 18/11/2020
   * @param {HTMLCanvasElement} canvas
   * @returns {CanvasRenderingContext2D} context
   */
  private getContext (canvas: HTMLCanvasElement) {
    return canvas.getContext('2d')  
  }
}