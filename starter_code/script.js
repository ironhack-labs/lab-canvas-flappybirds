const $canvas = document.querySelector('canvas')
const ctx = $canvas.getContext('2d')
const offset = 5
let obs = []

let flappy
let pipe
let intervalId

let $startButton
let bg
let score = 0
let frames = 0




//Creamos al personaje -Flappy- o el que vayamos a ocupar
//Le asignamos una posicion en X-Y, tambien un alto y un ancho, un salto que sera referente a cuantos px sube al presonar la tecla


class Flappy {
  constructor() {
    this.x = 100
    this.y = 100
    this.width = 50
    this.height = 50
    this.jump = 70
    this.img = new Image()
    this.img.src = "./images/flapyGosth4.png"
    this.img.onload = () => this.draw()
  }

  draw() {
    if (this.y + this.height >= $canvas.height) GameOver()
    this.y += offset

    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }

  moveUp() {
    this.y -= (this.y <= 0) ? 0 : this.jump
  }

  isTouching(pipe) {
    return (
      (this.x > pipe.x - pipe.width &&
        this.y < pipe.y - (flappy.jump + 80) &&
        this.x < pipe.x + pipe.width) ||
      (
        this.x > pipe.x - pipe.width &&
        this.y > pipe.y - this.height &&
        this.x < pipe.x + pipe.width &&
        this.y > pipe.y - this.height
      )

    )
  }
}

//Esta clase crea la imagen de fondo la cual sera recorida una tras otra para dar el sentido de movimiento
class Board {
  constructor() {
    this.x = 0
    this.img = new Image()
    this.img.src = "./images/bg4.jpg"
    this.img.onload = () => this.draw()
  }

  draw() {
    if (this.x <= -$canvas.width) this.x = 0
    this.x -= offset

    ctx.drawImage(this.img, this.x, 0, $canvas.width, $canvas.height)
    ctx.drawImage(this.img, this.x + $canvas.width, 0, $canvas.width, $canvas.height)
  }
}


//Creacion  de obstaculos mas complicado de lo que pense, puesto que la 
//Interaccion con dichos no me resulto tan sencillo, en ocaciones no pasaba

class Obstacle {
  constructor(safezone) {
    this.x = $canvas.width
    this.y = safezone + flappy.jump + 80
    this.width = 50
    this.height = safezone

    this.img = new Image()
    this.img2 = new Image()
    this.img.src = "./images/obstacle_top2.png"
    this.img2.src = "./images/obstacle_bottom2.png"
    this.img.onload = () => this.draw()
  }

  draw() {
    this.x -= offset

    ctx.drawImage(this.img, this.x, 0, this.width, this.height)
    ctx.drawImage(this.img2, this.x, this.y, this.width, $canvas.height - this.y)
  }

  isOut() {
    return (this.x < 0 - this.width)
  }
}

//Aqui pasamos a dibujar el puntajre el cual sera dado tras pasar una pipe por completo
//Si se coliciona antes este no se ejecuta quedando en 0 o en el valor el cual se tenia acumlado
function drawScore() {
  ctx.fillStyle = "white"

  ctx.fillText("Score: " + score, $canvas.width / 2 - 100, 80)
}

function checkCollition() {
  obs.forEach(pipe => (flappy.isTouching(pipe)) ? GameOver() : null)
}


//Se imprime un cartel al centro de fin de la partida , el score y la tecla a presionar para poder reiniciar el juego
function GameOver() {
  clearInterval(intervalId)
  ctx.fillStyle = "black "
  ctx.fillRect(($canvas.width / 2) - 255, 100, 510, 260)
  ctx.clearRect(($canvas.width / 2) - 250, 105, 500, 250)

  ctx.font = "45px Arial-black"
  ctx.fillStyle = "black"
  ctx.fillText("--- Perdedor ---", ($canvas.width / 2) - 120, 170)

  ctx.font = "24px"
  ctx.fillStyle = "black"
  ctx.fillText("Puntuacion: " + score, ($canvas.width / 2) - 100, 250)
  ctx.fillText("Pulsa Enter ", ($canvas.width / 2) - 120, 320)
}


//Pasamos a dinujar las pipes, y la suma del pipe que se ocupa para el score
function drawPipes() {
  obs.forEach((pipe, i) => {
    (pipe.isOut()) ? removePipe(i): null
    pipe.draw()
  })
}

function removePipe(i) {
  score++
  obs.splice(i, 1)
}


//Se actualiza todo el cambas borrando y volviendo a imrpimir

function update() {
  const safezone = Math.floor(Math.random() * ($canvas.height - 200)) + 10
  frames++
  if (frames % 90 === 0) obs.push(new Obstacle(safezone))

  ctx.clearRect(0, 0, $canvas.width, $canvas.height)
  bg.draw()
  flappy.draw()
  drawPipes()
  checkCollition()
  drawScore()
}

function restartGame() {
  obs = []
  frames = 0
  score = 0
  flappy.y = 50
  startGame()
}

function startGame() {
  intervalId = setInterval(update, 1000 / 60)
}

window.onload = function () {
  bg = new Board()
  flappy = new Flappy()
  $startButton = document.querySelector('#start-button')

  $startButton.onclick = function () {
    $startButton.blur()
    startGame();
  };
};


window.onkeydown = function ({
  keyCode
}) {
  switch (keyCode) {
    case 32:
      return flappy.moveUp()
    case 13:
      return restartGame()
  }
}