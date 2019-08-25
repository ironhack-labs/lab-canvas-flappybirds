/********************************************/
/**************** VARIABLES ****************/
/******************************************/

// Getting the canvas and the context from the DOM
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
// Frames
let frames = 0
// The interval is stored inside this variable, so we can later clear it
let interval
// Pipes Array
const pipes = []
// Music
const bgMusic = document.querySelector('#bg-music')
const flySound = document.querySelector('#flying-sound')
const evilMortyTheme = document.querySelector('#game-over-song')
// Game Over screen
const gameOverScreen = document.querySelector('#wasted')
// Score Board
let score = 0
const scoreBoard = document.querySelector('#board')

/***********************************************/
/******************* CLASSES ******************/
/*********************************************/

// Fábrica de boards
class Board {
  constructor() {
    // Starting positions and measurements
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    // Creates a new img instance with the Image() class and adds the src attribute, then it listens for the onload event to run the draw method
    this.img = new Image()
    this.img.src = './images/bg.png'
    this.img.onload = () => {
      this.draw()
    }
  }
  draw() {
    // Moves the image horizontal position to the left one unit at a time
    this.x--
    // If my image moves outside my canvas, reset its position in x to 0
    if (this.x < -canvas.width) {
      this.x = 0
    }
    // Drawing my FIRST background
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    // Drawing my SECOND background starting from where my first background ends
    ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height)
  }
}

// Fábrica de players (flappy birds)
class Player {
  constructor(x, y, width, height) {
    // Starting positions and measurements
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    // Creates a new img instance with the Image() class and adds the src attribute
    this.img = new Image()
    this.img.src = './images/flappy.png'
  }
  draw() {
    // If the user does nothing, the bird will keep moving down (falling) and eventually, the player will lose
    this.y++
    // Drawing my img inside the canvas
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  fly() {
    // To achieve the fly effect, the y position must be reduced in some (20 aprox) units
    this.y -= 20
    flySound.play()
  }
  isTouching(obstacle) {
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
    )
  }
}

// Fábrica de pipes
class Pipe {
  constructor(y, width, height, isTop) {
    // My pipes will start at the very end of my canvas and will keep moving to the left (x--)
    this.x = canvas.width
    this.y = y
    this.width = width
    this.height = height
    // A boolean to check if the pipe created isTop (true) or bottom (false)
    this.isTop = isTop
    // Top Pipe
    this.imgTop = new Image()
    this.imgTop.src = './images/obstacle_top.png'
    // Bottom Pipe
    this.imgBot = new Image()
    this.imgBot.src = './images/obstacle_bottom.png'
  }
  draw() {
    // Moves the pipe to the left
    this.x--
    // If the parameter isTop is true, draw a top pipe, else draw a bottom pipe
    this.isTop
      ? ctx.drawImage(this.imgTop, this.x, this.y, this.width, this.height)
      : ctx.drawImage(this.imgBot, this.x, this.y, this.width, this.height)
  }
}

/*****************************************************/
/****************** THE INSTANCES *******************/
/***************************************************/

// Creating my board from my Board class
const board = new Board()
// Creating the flappy from the Player class (initialX, initialY, width, height)
const flappy = new Player(20, 10, 60, 50)
// Generating random pipes
function generateRandomPipes() {
  // Every 200 frames (el residuo de dividir los frames o sus múltiplos / 200  = 0)...
  if (frames % 200 === 0) {
    // Both pipes will have the same width and height, the width was a number that looks okay on the screen, but the height is the half of our canvas height
    const pipeWidth = 85
    const pipeHeight = canvas.height / 2
    // Qué tan buen pedo te quieres ver con el jugador
    const min = flappy.height * 1.75
    const max = flappy.height * 7
    // El tamaño aleatorio del gap dentro del rango (min-max)
    const gap = Math.floor(Math.random() * max + min)
    const upperGap = Math.floor(Math.random() * gap)
    const lowerGap = gap - upperGap
    // Construyendo los pipes como una instancia de Pipe
    const topPipe = new Pipe(0 - upperGap, pipeWidth, pipeHeight, true)
    const bottomPipe = new Pipe(canvas.width / 2 + lowerGap, pipeWidth, pipeHeight, false)
    // Pushing the pipes
    pipes.push(topPipe, bottomPipe)
  }
}
function drawPipes() {
  pipes.forEach(pipe => {
    pipe.draw()
  })
}

/*****************************************************/
/****************** THE FUNCTIONS *******************/
/***************************************************/

// MOST IMPORTANT FUNCTION
function update() {
  // 0. Incrementing my counter
  frames++
  // 1. CLEARING
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // 2. DRAWING
  // 2.1 Drawing the board
  board.draw()
  // 2.2 Drawing the flappy
  flappy.draw()
  // 2.3 Creating and drawing the pipes
  generateRandomPipes()
  drawPipes()
  checkCollition()
  drawScore()
}

// Starting my game will run my update function at 60fps
function start() {
  // Clear my Initial Screen (or hide it)
  clearInitialScreen()
  // Starts updating every 60 fps
  interval = setInterval(update, 1000 / 60)
  // Starts playing music
  bgMusic.play()
}

function clearInitialScreen() {
  const initialScreen = document.querySelector('.initial')
  initialScreen.style.display = 'none'
}

function checkCollition() {
  if (flappy.y > canvas.height - flappy.height) return gameOver()
  pipes.forEach(pipe => {
    if (flappy.isTouching(pipe)) return gameOver()
  })
}

function gameOver() {
  clearInterval(interval)
  bgMusic.pause()
  evilMortyTheme.play()
  canvas.classList.add('loser')
  gameOverScreen.classList.add('fadeIn')
  setTimeout(() => {
    location.reload()
  }, 8000)
}

function drawScore() {
  if (frames % 200 === 0) {
    score++
  }
  scoreBoard.innerHTML = `<p>${score}</p>`
}

/*****************************************************/
/***************** EVENT LISTENERS ******************/
/***************************************************/

// When the start button is clicked...
const startButton = document.querySelector('#start-button')
startButton.onclick = () => {
  start()
}

// When the space bar is pressed...
document.onkeydown = e => {
  if (frames > 0) {
    switch (e.keyCode) {
      case 32: // Space Bar keyCode
        flappy.fly()
        break
    }
  } else {
    start()
  }
}
