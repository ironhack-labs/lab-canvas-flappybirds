class Background {
    constructor(ctx, url, speed) {
      this.ctx = ctx
      this.speed = speed
      this.img = new Image()
      this.img.src = url
      this.x = 0
      this.height = this.ctx.canvas.height
      this.width = this.height*this.img.width/this.img.height
    }
    update() {
      this.x -= this.speed
      if (this.x < -this.width) {
        this.x += this.width
      }
    }
    draw() {
        for (var i = 0; this.x+i*this.width < this.ctx.canvas.width; i++) {
            this.ctx.drawImage(this.img,this.x+i*this.width,0,this.width,this.height)
        }
    }
}