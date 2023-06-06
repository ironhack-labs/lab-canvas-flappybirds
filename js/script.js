// @ts-nocheck
const body = document.querySelector("body")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let gameFrames = 0
let requestId
let speed = 1.5
let obstacles = []
let points = 0

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

window.onload = function () {
  // document.querySelector("#game-board").style.display = "none"
  document.getElementById("start-button").onclick = () => {
    startGame()
  }
}

function startGame() {
  // document.querySelector("#game-intro").style.display = "none"
  // document.querySelector("#game-board").style.display = ""
  if (!requestId) requestId = requestAnimationFrame(gameEngine)
}

function obstacleGenerator() {
  if (gameFrames % 140 === 0) {
    const obstacle = new Obstacle()
    obstacles.push(obstacle)
  }
}

function drawObstacles() {
  obstacles.forEach((obstacle, i) => {
    obstacle.draw()

    if (obstacle.x + obstacle.width < 0) {
      obstacles.shift()
      points++
    }
  })
}

function collisionCheck() {
  obstacles.forEach((obstacle, i) => {
    if (((bird.x + bird.width - 5) > obstacle.x) &&
      ((bird.y +5)< (obstacle.height + obstacle.yTop))) {
      requestId = cancelAnimationFrame(gameEngine)
    } else if (
      bird.x + bird.width - 5 > obstacle.x &&
      bird.y + bird.height -5 > obstacle.yBot
    ) {
      requestId = cancelAnimationFrame(gameEngine)
    }
  })
}

function drawPoints() {
  ctx.font = "20px Arial"
  ctx.fillStyle = "white"
  ctx.fillText("Points: " + points, 10, 20)
}

function gameEngine() {
  gameFrames++

  clearCanvas()

  background.draw()
  obstacleGenerator()
  drawObstacles()

  bird.draw()

  collisionCheck()

  drawPoints()

  

  if (requestId) requestAnimationFrame(gameEngine)
}