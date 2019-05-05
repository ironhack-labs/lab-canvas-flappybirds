class Background {

  constructor(ctx, canvasW, canvasH) {
    this.ctx = ctx
    this.canvasW = canvasW
    this.canvasH = canvasH
    this.img = new Image()
    this.img.src = 'images/bg.png'

    this.x = 0
    this.y = 0

    this.velX = 5
  }

  draw() {
    // Dibuja el background
    this.ctx.drawImage(
      this.img,
      this.x, this.y,
      this.canvasW, this.canvasH
    )
    // Dibuja el background complementario
    this.ctx.drawImage(
      this.img,
      this.x + this.canvasW, this.y,
      this.canvasW, this.canvasH
    )
  }

  move() {
    // Mueve el background
    this.x -= this.velX
    // Si la primera imagen ha llegado a su final reinicia
    if (this.x <= -this.canvasW) this.x = 0

  }

}