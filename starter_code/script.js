// Se utiliza window.onload "Cuando la pagina cargue haz... Lo que sea que vaya dentro de la funcion", en este caso eso significa que al dar click en el boton, el juego empezara

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    start();
  };

//1.- VARIABLES UNIVERSALES
const canvas = document.querySelector('canvas') 
const ctx = canvas.getContext('2d') 
let frames = 0 
let score = 0 
let interval 
const pipes = [] 

//2.-FUNCIONES CONSTRUCTORAS
class Board {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width 
    this.height = canvas.height
    this.img = new Image()
    this.img.src =
      'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/bg.png?raw=true'
    this.img.onload = () => {
      this.draw()
    }
  }
 
  draw() {
    this.x--
    if (this.x < -canvas.width) {
      this.x = 0
    }
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height) 
    ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height) 
  }
}

class Flappyoso {
  constructor(y) {
    this.x = 0
    this.y = y
    this.width = 50
    this.height = 50
    this.img = new Image()
    this.img.src =
      'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/flappy.png?raw=true'
  }
  draw() {
    this.y++ 
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  fly() {
    this.y -= 20 
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


class Pipe {
  constructor(y, width, height, type) {
    this.x = canvas.width
    this.y = y
    this.width = width
    this.height = height
    this.type = type
    this.imgTop = new Image()
    this.imgTop.src =
      'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_top.png?raw=true'
    this.imgBot = new Image()
    this.imgBot.src =
      'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_bottom.png?raw=true'
  }
  draw() {
    this.x-- 
    if (this.type) { 
      ctx.drawImage(this.imgTop, this.x, this.y, this.width, this.height)
    } else {
      ctx.drawImage(this.imgBot, this.x, this.y, this.width, this.height)
    }
  }
}

const board = new Board()
const flappy = new Flappyoso(10)

//DIBUJA EL PUNTAJE
function drawScore() {
  if (frames % 200 === 0) { 
    score += 1
  }
  ctx.font = '24px Courier'
  ctx.fillText(score, canvas.width / 2, 50)
}

function generatePipes() {
  const min = 0 
  const max = 300 
  const ventanita = 120 
  if (frames % 220 === 0) { 
    const randomHeight = Math.floor(Math.random() * (max - min))
    pipes.push(new Pipe(0, 50, randomHeight, true))
    pipes.push(new Pipe(randomHeight + ventanita, 50, canvas.height - randomHeight, false)
    )
  }
}

function drawPipes() {
  pipes.forEach(pipe => {
    pipe.draw()
  })
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  frames++
  board.draw()
  flappy.draw()
  generatePipes()
  drawPipes()
  checkCollition()
  drawScore()
}

function start() {
  interval = setInterval(update, 1000 / 60) 
}

function gameOver() {
  ctx.font = '50px Courier'
  ctx.fillText('Game Over', canvas.width / 2 - 100, 200)
  clearInterval(interval) 
  setTimeout(() => {
    location.reload()
  }, 3000)
}

function checkCollition() {
  if (flappy.y > canvas.height - flappy.height) return gameOver()  
  pipes.forEach(pipe => { 
    if (flappy.isTouching(pipe)) return gameOver()
  })
}

document.onkeydown = e => {
  e.preventDefault()
  switch (e.keyCode) {
    case 32:
      flappy.fly()
      break

    default:
      break
  }
}


};