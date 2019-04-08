const backgroundImage = './images/bg.png'
const flappyImage = './images/flappy.png'
const obstacleBottom = './images/obstacle_bottom.png'
const obstacleTop = './images/obstacle_top.png'

let interval, frames = 0

const obstacles = []

window.onload = () => {
  const canvas = document.getElementById('game-board')
  const ctx = canvas.getContext('2d')
  const buttonStart = document.getElementById("start-button")

  // Clases
  class Board {
    constructor(img) {
      this.x = 0,
      this.y = 0,
      this.img = new Image()
      this.img.src = img
      this.img.onload = () => this.draw()
    }
    draw() {
      if(this.x < -canvas.width) this.x = 0
      ctx.drawImage(this.img, this.x, this.y, canvas.width, canvas.height)
      ctx.drawImage(this.img, this.x + canvas.width, this.y, canvas.width, canvas.height)
      this.x--
    }
  }

  class Flappy {
    constructor(img, x, y) {
      this.x = x
      this.y = y
      this.img = new Image()
      this.img.src = img
      this.img.onload = () => this.draw()
    }
    draw() {
      this.y++
      ctx.drawImage(this.img, this.x, this.y, 20, 15)
    }
    fly() {
      if(this.y > 0) this.y -= 25
    }
    isTouching(obstacle) {
      return (this.x < obstacle.x + obstacle.width) &&
            (this.x + 20 > obstacle.x) &&
            (this.y < obstacle.y + obstacle.height) &&
            (this.y + 15 > obstacle.y)
    }
    isDepth() {
      if(this.y > canvas.height) gameOver()
    }
  }

  class Pipe {
    constructor(y = 0, height = 350, type) {
      this.x = canvas.width
      this.y = y
      this.width = 35
      this.height = height
      this.type = type
      this.img1 = new Image()
      this.img2 = new Image()
      this.img1.src = obstacleBottom
      this.img2.src = obstacleTop
    }
    draw() {
      (this.type) ? ctx.drawImage(this.img1, this.x, this.y, this.width, this.height) : ctx.drawImage(this.img2, this.x, this.y, this.width, this.height)
      this.x--
    }
  }

  // Definiciones
  const board = new Board(backgroundImage)
  const flappy = new Flappy(flappyImage, 100, 50)

  // Flujo principal
  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    board.draw()
    flappy.draw()
    flappy.isDepth()
    generatePipes()
    drawPipes()
    checkCollition()
    ctx.fillText(Math.round((frames / 1000) * 10), 10, 10)
    frames++
  }

  buttonStart.onclick = function() {
    startGame();
  };
  
  function startGame() {
    buttonStart.style.display = 'none'
    canvas.style.display = 'inline-block'
    if(interval) return
    interval = setInterval(update, 1000 / 60)
  }

  function gameOver() {
    clearInterval(interval)
    ctx.fillText('Game over', canvas.width / 2 - 20, canvas.height / 2)
    buttonStart.style.display = 'block'
  }
  
  // Helpers
  function generatePipes() {
    const space = 50
    const randomHeight = Math.floor(Math.random() * space) + 15
    if(frames % 120 === 0) {
      const obs1 = new Pipe(0, randomHeight, false)
      const obs2 = new Pipe(randomHeight + space, canvas.height - (randomHeight - space), true)
      obstacles.push(obs1)
      obstacles.push(obs2)
    }
  }

  function drawPipes() {
    obstacles.forEach(obstacle => obstacle.draw())
  }

  function checkCollition() {
    obstacles.forEach(obstacle => {
      if(flappy.isTouching(obstacle)) gameOver()
    })
  }

  // Listeners
  document.addEventListener('keydown', e => {
    switch(e.keyCode) {
      case 13:
        startGame()
        break;
      case 32:
        flappy.fly()
        break;
      default:
      break;
    }
  })
};