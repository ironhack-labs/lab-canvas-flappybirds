class Birdie {
  constructor (ctx,w, h,keys) {
    this._ctx = ctx
    this._image = new Image()
    this._image.src = "images/flappy.png"
    this._canvasWidth = w
    this._canvasHeigth = h
    this._posX = 50
    this._posY = 250
    this._width = 40
    this._height = 40
    this._speedX = 1
    this._speedY = 1
    this._grav = 0
    this._gravSpeed = 0.02
    this._keys = keys
    this._limitTopY = 0 + this._height
    this._limitBottomY = 655
  }
draw() {
  this._ctx.drawImage(
    this._image,
    this._posX,
    this._posY,
    this._width,
    this._height)
  }

  move() {
this._posY += this._speedY
this._grav += this._gravSpeed
this._posY <= this._limitTopY - this._height ? this._speedY = 0.001 : null
this._posY <= this._limitTopY - this._height ? this._posY = 0+this._height : null
 }


  update () {
this.posY += this._speedY
this._speedY += this._grav
this._grav += this._gravSpeed
//PTEE DE INVOCAR ///////////////////////////
  }

  newPosX() {

  }

}
