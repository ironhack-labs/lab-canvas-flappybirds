const canvas = document.getElementById('my-canvas')
canvas.width = 700
canvas.height = 400
const ctx = canvas.getContext('2d')
let clickable = true
let gameOver = false
// DEFINO LA CLASE IMAGENES
class ImageCreation {
constructor(_width, _height, _x, _y, _img){
  this.width = _width
  this.height = _height
  this.x = _x
  this.y = _y
  this.speedX = 0
  this.speedY = 0
  this.gravity = 0.05
  this.gravitySpeed = 0
  this.drag = 0.99
  this.img = _img
  this.points = 0
    
  }
  print = () => {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  update = () => {

  }
  newPos = () => {

    this.speedY = this.speedY + (this.gravity - this.gravitySpeed)  
    this.y += this.speedY
  }
  top = () => {
    return this.y
  }
  bottom = () => {
    return this.y + this.height
  }
  left = () => {
    return this.x
  }
  right = () => {
    return this.x + this.width
  }
  crashWith = (obstacle) => {
    return (this.right() < obstacle.left() &&
            this.top() < obstacle.bottom() &&
            this.left() < obstacle.right())
  }
  
}
const tubUpImg = new Image()
tubUpImg.src = '/images/obstacle_top.png'
const tubDownImg = new Image()
tubDownImg.src = '/images/obstacle_bottom.png'
const birdImg = new Image()
birdImg.src = '/images/flappy.png'
const backgroundImg = new Image()
backgroundImg.src = '/images/bg.png'
// CREACIÓN DEL FONDO
const background = new ImageCreation(1024, 768, 0, 0, backgroundImg)
// RELACION DE IMAGEN DADA LA ALTURA birdH
const kBird = 498 / 351
const birdH = 20
const birdW = birdH * kBird
const birdX = canvas.width / 3
// CREACIÓN DE LA IMAGEN BIRD
const bird = new ImageCreation(birdW, birdH, birdX, canvas.height/2, birdImg)

// RELACION DE IMAGEN DADA LA ALTURA tubH
const obstaclesArrDown = []
const obstaclesArrUp = []
let counter = 0
const createObstacles = () => {
  const kTub = 138 / 793
  const tubH = 300
  const tubW = Math.floor(tubH * kTub)
  counter += 1
  let gap = 100
  let minHeight = 150
  let maxHeight = canvas.height - gap
  if(counter % 120 === 0){
    let tubY = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight)
    //CREACION DE LA TUBERIA INFERIOR
    let tuberiaDown = new ImageCreation(tubW, tubH, canvas.width, tubY, tubDownImg)
    obstaclesArrDown.push(tuberiaDown)
    let tuberiaUp = new ImageCreation(tubW, tubH, canvas.width, tubY-gap-tubH, tubUpImg)
    obstaclesArrUp.push(tuberiaUp)

  }
}
window.onload = () => {


  // --------------------- CREACIÓN DE OBJETOS ----------------------

  
  // CREACIÓN DE ALTURA ALEATORIA PARA TUBERIAS
  // ---------- MOVIMIENTO DE LAS TUBERIAS -------
  const updateObstacles = () => {
    obstaclesArrDown.forEach(obstacle => {
      obstacle.x -= 2
      obstacle.print()
    })
    obstaclesArrUp.forEach(obstacle => {
      obstacle.x -= 2
      obstacle.print()
    })
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
      checkGameOver()
      if(gameOver){
        return
      }

    requestAnimationFrame(updateGameArea)
  }

  // GAME OVER
  const checkGameOver = () => {
    obstaclesArrUp.forEach(obstacle => {
      if(!(bird.bottom() < obstacle.top() || bird.top() > obstacle.bottom() ||
      bird.right() < obstacle.left() || bird.left() > obstacle.right())){
        gameOver = true
      }
    })
  }

  // --------------- POINTS --------------
  const checkPoints = () => {
    
  }


    // ------------- KEYBOARD ------------------

    document.getElementById("start-button").onclick = () => {
      if(clickable){
        startGame()
        clickable = false
      }
    };


    document.addEventListener('keydown', (event) => {
      if(event.key === ' '){
        bird.speedY = -1
        bird.gravitySpeed = 0.3
      }
    })
    document.addEventListener('keyup', () => {
      bird.gravitySpeed = 0
    })
  


};












