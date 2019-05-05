class Player {
  constructor(gameW, gameH, ctx) {
    this.ctx = ctx      //valores generales
    this.gameW = gameW
    this.gameH = gameH

    this.posX0 = this.gameW/2-30    //Posicion inicial de flappy
    this.posX = this.posX0     
    this.posY0 = this.gameH/2-30
    this.posY = this.posY0

    this.width = 60               //tamaño de flappy
    this.height = 60

    this.img = new Image()          //imagen
    this.img.src = "images/flappy.png"

    this.velY = 1
    this.gravity = 0.05        //vel de caida

    this.jumpKey = 38           //38 == up arrow

    this.setListeners()
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.posX,
      this.posY,
      this.width,
      this.height
    )
  }

  move() {
    this.velY +=  this.velY*this.gravity
    this.posY += this.velY
  }
  
  setListeners() {
    document.onkeydown = (event) => {
      if (event.keyCode === this.jumpKey) {
        this.velY = -3
        
      }
    }
    document.onkeyup = (event) => {
       if (event.keyCode === this.jumpKey) {
         this.velY = 1
      }
    }
  }

}