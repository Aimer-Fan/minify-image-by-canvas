export default class Minify {
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

  public minify () {}


  private isImage(file: File) {
    const type = file
    debugger
    return true
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