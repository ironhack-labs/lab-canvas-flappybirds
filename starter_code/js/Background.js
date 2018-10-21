class Background {
  constructor(ctx, url, speed, x) {
    this.ctx = ctx
    this.speed = speed
    this.img = new Image()
    this.img.src = url
    this.x = x
    this.height = this.ctx.canvas.height
    this.width = this.height*this.img.width / this.img.height
  }
  update() {
    this.x -= this.speed
    if (this.x < -this.width) {
      this.x += this.width
    }
  }
  draw() {
    this.ctx.drawImage(this.img,this.x,0,this.width,this.height)
    this.ctx.drawImage(this.img,this.x+this.width,0,this.width,this.height)
  }
}