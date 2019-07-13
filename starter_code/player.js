class Player {

  constructor(ctx, width, height, keys) {
    this._ctx = ctx
    this._gameWidth = width
    this._gameHeight = height

    this._keys = keys

    this._image = new Image()
    this._image.src = "images/flappy.png"

    this._posX = this._gameWidth/3
    this._posY0 = (this._gameHeight)/2
    this._posY = (this._gameHeight)/2
    this._finalPos = this._gameHeight - this._height
    this._width= 70
    this._height = 55

    this._velY = .1

    this.setListeners()
  }

  draw() {

    this._ctx.drawImage(this._image, this._posX, this._posY, this._width, this._height)
  }

  move() {

    let gravity = .2

    if (this._posY <= this._gameHeight - this._height) {    
      this._posY += this._velY
      this._velY += gravity
    } 
    else {
      this._posY = this._gameHeight - this._height
    }
  }


  setListeners() {
    document.onkeydown = (e) => {
      switch (e.keyCode) {
        case this._keys.TOP_KEY:
          this.move()
          if (this._posY >= this._gameHeight - this._height) {
            this._posY -= 40
            this._velY -= 30
          }
        break;  
      }
      
    }
  }


}