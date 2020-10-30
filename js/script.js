window.onload = () => {
  const canvas = document.getElementById('my-canvas')
  canvas.width = 700
  canvas.height = 400
  const ctx = canvas.getContext('2d')
  // DEFINO LA CREACION DE IMAGENES
  class ImageCreation {
    constructor(_width, _height, _x, _y, _src){
      this.width = _width
      this.height = _height
      this.x = _x
      this.y = _y
      this.speedX = 0
      this.speedY = 0
      this.gravity = 0.05
      this.gravitySpeed = 0
      this.drag = 0.99
      
      const img = new Image()
      img.addEventListener('load', () => {
        this.img = img
      })
      img.src = _src
    }
    print = () => {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    update = () => {

    }
    newPos = () => {

      this.speedY = this.speedY + (this.gravity - this.gravitySpeed)  
      this.y += this.speedY

      // this.speedY *= this.drag
    }
    
  }


  // CREACIÓN DEL FONDO
  const background = new ImageCreation(1024, 768, 0, 0, '/images/bg.png')
  // RELACION DE IMAGEN DADA LA ALTURA birdH
  const k = 498 / 351
  const birdH = 20
  const birdW = 20 * k
  // CREACIÓN DE LA IMAGEN BIRD
  const bird = new ImageCreation(birdW, birdH, 20, canvas.height/2, '/images/flappy.png')

  // INICIACIÓN DEL JUEGO
  const startGame = () => {
    background.print()
    bird.print()
    updateGameArea()
  }

  //GENERACIÓN DEL LOOP DEL JUEGO
  const updateGameArea = () => {
    background.print()
    bird.print()
    bird.newPos()

    requestAnimationFrame(updateGameArea)
  }


    
    document.getElementById("start-button").onclick = () => {
      startGame()
    };


    document.addEventListener('keydown', (event) => {
      if(event.key === ' '){
        bird.speedY = -5
        bird.gravitySpeed = 0.3
      }
    })
    document.addEventListener('keyup', () => {
      bird.gravitySpeed = 0
    })
  


};












