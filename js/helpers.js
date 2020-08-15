function update() {
  frames++
  generatePipes()
  clearCanvas()
  board.draw()
  checkCollition()
  flappy.draw()
  drawPipes()
  drawScore()
  updateFlappyPos()
}

function clearCanvas() {
  ctx.clearRect(0, 0, $canvas.width, $canvas.height)
}

function updateFlappyPos() {
  flappy.y += flappy.velY
  flappy.velY += gravity
}

function gameOver() {
  clearInterval(intervalId)
  ctx.font = `80px 'Comic Neue'`
  ctx.fillStyle = "crimson"
  ctx.fillText("Game Over", 200, 400)
}

// Generar obstaculos
function generatePipes() {
  // calcular una posicion aleatoria entre
  if (frames % 350 === 0) {
    const minY = -793
    const maxY = 0
    const minGap = 120
    const maxGap = 200
    const gap = Math.floor(Math.random() * (maxGap - minGap) + maxGap)
    const randomY = Math.floor(Math.random() * (maxY - minY) + minY)

    obstacles.push(new Obstacle(randomY))
    obstacles.push(new Obstacle(randomY + gap + 793))
  }
}
// dibujar obstaculos
function drawPipes() {
  obstacles.forEach((obstacle, i) => {
    obstacle.draw()
  })
}

function drawScore() {
  ctx.font = "60px Sans-serif"
  ctx.fillStyle = "white"
  ctx.fillText(Math.floor(frames / 350), 370, 60)
}

function checkCollition() {
  if (flappy.y > $canvas.height - flappy.height || flappy.y < 0) {
    gameOver()
  }
  obstacles.forEach(obstacle => {
    if (flappy.isTouching(obstacle)) {
      gameOver()
    }
  })
}
