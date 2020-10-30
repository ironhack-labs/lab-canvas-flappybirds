window.onload = () => {
  const canvas = document.getElementById('my-canvas')
  canvas.width = 700
  canvas.height = 400
  const ctx = canvas.getContext('2d')

  // DEFINO LA CLASE IMAGENES
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

  // --------------------- CREACIÓN DE OBJETOS ----------------------

  // CREACIÓN DEL FONDO
  const background = new ImageCreation(1024, 768, 0, 0, '/images/bg.png')
  // RELACION DE IMAGEN DADA LA ALTURA birdH
  const kBird = 498 / 351
  const birdH = 20
  const birdW = birdH * kBird
  const birdX = canvas.width / 3
  // CREACIÓN DE LA IMAGEN BIRD
  const bird = new ImageCreation(birdW, birdH, birdX, canvas.height/2, '/images/flappy.png')

  // RELACION DE IMAGEN DADA LA ALTURA tubH
  const obstaclesArr = []
  let counter = 0
  
  // CREACIÓN DE ALTURA ALEATORIA PARA TUBERIAS
  const createObstacles = () => {
    const kTub = 138 / 793
    const tubH = 300
    const tubW = Math.floor(tubH * kTub)
    counter += 1
    let gap = 50
    let minHeight = 100
    let maxHeight = canvas.height - gap
    if(counter % 120 === 0){
      let tubY = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight)
      //CREACION DE LA TUBERIA INFERIOR
      let tuberia = new ImageCreation(tubW, tubH, canvas.width, tubY, '/images/obstacle_bottom.png')
      obstaclesArr.push(tuberia)
      console.log(tuberia)
    }
  }
  // ---------- MOVIMIENTO DE LAS TUBERIAS -------
  const updateObstacles = () => {
    for(i = 0; i < obstaclesArr.length; i++){
      obstaclesArr[i].x -= 2
      obstaclesArr[i].print()
    }
    createObstacles()
  }
    
    
    //------------------- JUEGO ---------------------
    
    // INICIACIÓN DEL JUEGO
    const startGame = () => {
      background.print()
      bird.print()
      updateGameArea()
      createObstacles()
    }
    //GENERACIÓN DEL LOOP DEL JUEGO
    const updateGameArea = () => {
      background.print()
      bird.print()
      bird.newPos()
      updateObstacles()

    requestAnimationFrame(updateGameArea)
  }


    // ------------- KEYBOARD ------------------

    document.getElementById("start-button").onclick = () => {
      startGame()
    };


    document.addEventListener('keydown', (event) => {
      if(event.key === 'ArrowUp'){
        bird.speedY = -2
        bird.gravitySpeed = 0.3
      }
    })
    document.addEventListener('keyup', () => {
      bird.gravitySpeed = 0
    })
  


};












