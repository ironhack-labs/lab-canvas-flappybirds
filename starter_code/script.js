const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let frames = 0
let score = 0
let interval
const obtacles = []

class Component {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = 'https://image.freepik.com/vector-gratis/ilustracion-paisaje-granja_1084-13.jpg'
    this.img.onload = () => {
      this.draw()
    }
  }
  draw() {
    this.x--
    //para que la imagen esté "cirulando entre el incio de la imagen y el final de la clase"
    if (this.x < -canvas.width) {
      this.x = 0
    }
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height)
  }
}

class Chikenyoso {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = 50
    this.height = 50
    this.img = new Image()
    this.img.src = 'https://pngscreativos.files.wordpress.com/2015/07/1-206.png'
  }
  draw() {
    this.y++
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  esquivar() {
    this.y -= 50
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

class obstaculo {
  constructor(y, width, height, type) {
    this.x = canvas.width
    this.y = y
    this.width = width
    this.height = height
    this.type = type
    this.imgTop = new Image()
    this.imgTop.src = './images/obstacle_top.png'
    this.imgAbj = new Image()
    this.imgAbj.src = './images/obstacle_bottom.png'
  }
  draw() {
    this.x--
    if (this.type) {
      ctx.drawImage(this.imgTop, this.x, this.y, this.width, this.height)
    } else {
      ctx.drawImage(this.imgAbj, this.x, this.y, this.width, this.height)
    }
  }
}
const component = new Component()
const chikenyoso = new Chikenyoso(20, 10)

function drawScore() {
  if (frames % 60 === 60) {
    score += 1
  }
  ctx.font = '35px Verdana, Geneva, Tahoma, sans-serif'
  ctx.fillerText(score, canvas.width / 2, 50)
}

function generateObtaculos() {
  const min = 20
  const max = 100
  const gap = 100
  if (frames % 160 === 0) {
    const randomHeight = Math.floor(Math.random() * (max - min))
    obtacles.push(new obstaculo(0, 50, randomHeight, true))
    obtacles.push(new obstaculo(randomHeight + gap, 50, canvas.height - randomHeight, false))
  }
}
function drawObstacles() {
  obtacles.forEach(obstaculo => {
    obstaculo.draw()
  })
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  frames++
  component.draw()
  chikenyoso.draw()
  generateObtaculos()
  drawObstacles()
  revColision()
  drawScore()
}
function startGame() {
  interval = setInterval(update, 2000 / 60)
}
window.onload = function() {
  document.getElementById('start-button').onclick = function() {
    startGame()
  }
}
function gg() {
  ctx.font = '50px Verdana, Geneva, Tahoma, sans-serif'
  ctx.fillText('Game Over!', canvas.width / 2 - 100, 200)
  clearInterval(interval)
}

function revColision() {
  if (chikenyoso.y > canvas.height - chikenyoso.height) return gg()
  obtacles.forEach(obstaculo => {
    if (chikenyoso.isTouching(obstaculo)) return gg()
  })
}
document.onkeydown = e => {
  switch (e.keyCode) {
    case 32:
      chikenyoso.esquivar()
      break
    default:
      break
  }
}
