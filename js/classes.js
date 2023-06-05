// @ts-nocheck

class Background {
  constructor() {
    this.x = 0
    this.y = 0
    this.speed = speed
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = "images/bg.png"
    this.img.onload = () => {
      this.draw()
    }
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    this.x -= this.speed
    ctx.drawImage(
      this.img,
      this.x +this.width,
      this.y,
      this.width,
      this.height
    )
    this.x + this.width <= 0 ? (this.x = 0) : void 0
  }
}
