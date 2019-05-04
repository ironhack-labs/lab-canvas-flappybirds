class Background {
  constructor(ctx, w, h, img) {
    this.ctx = ctx
    this.w = w
    this.h = h
    this.img = new Image()
    this.img.src = img
    this.position = {
      x: 0
    }
    this.vel = {
      x: 5
    }
  }
  draw() {
    this.ctx.drawImage(this.img, this.position.x, 0, this.w, this.h)
    this.ctx.drawImage(this.img, this.position.x + this.w, 0, this.w, this.h)
  }
  move() {
    this.position.x -= this.vel.x
    if (this.position.x <= -this.w) this.position.x = 0 //cuando la imagen está fuera del todo
  }
}