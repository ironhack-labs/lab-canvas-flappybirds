class Player {

  constructor(ctx, canvasW, canvasH, key) {
    this.canvasW = canvasW
    this.canvasH = canvasH
    this.ctx = ctx
    this.key = key

    this.w = 70
    this.h = 50

    this.x = this.canvasW * 0.35
    this.y0 = this.canvasH * 0.9
    this.y = this.canvasH * 0.5
    this.vel0 = 0
    this.velJump = 10
    this.velY = this.vel0

    this.gravity = 0

    this.img = new Image()
    this.img.src = 'images/flappy.png'

    // Llamada a el setListener de las teclas
    this.setListeners();
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.x, this.y,
      this.w, this.h
    )
  }

  setListeners() {
    document.onkeydown = e => {
      if (e.keyCode === this.key) {
        this.y--;
        this.velY = -this.velJump
        this.gravity = 0.4
      }
    }
  }

  move() {
    this.velY += this.gravity;
    this.y += this.velY;
  }

}