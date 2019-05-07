class Player {
  constructor(w, h, ctx, keys) {
    this.canvasW = w
    this.canvasH = h
    this.ctx = ctx
    this.keys = keys
    // Posición inicial
    this.x = this.canvasW * 0.08
    this.y0 = this.canvasH * 0.50
    this.y = this.y0

    //Imagen
    this.img = new Image()
    this.img.src = "images/flappy.png"

    // Tamaño
    this.w = 498 * 0.05
    this.h = 351 * 0.05

    //Vel y gravedad
    this.vy = 1
    this.gravity = 0.05

    this.setListeners()
  }
  draw(framesCounter) {
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }
  setListeners() {
    document.onkeydown = function(event) {
      if (event.keyCode === 32) {
        this.vy = -3
      }
    }.bind(this)
    document.onkeyup = function(event) {
      if (event.keyCode === 32) {
        this.vy = 1
      }
    }.bind(this)
  }
  move() {
    this.vy += this.vy * this.gravity
    this.y += this.vy
  }
}