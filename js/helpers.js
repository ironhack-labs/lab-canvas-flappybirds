function update() {
    frames++
    generatePipes()
    clearCanvas()
    board.draw()
    drawPipes()
    drawScore()
    checkCollition()
    flappy.draw()
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
    ctx.fillText("Game Over", $canvas.width/2 - 200, $canvas.height/2)
    reboot = true;
    intervalId = undefined;
    $button.innerHTML = "Retry?"
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
    ctx.font = "60px Arial"
    ctx.fillStyle = "Orange"
    ctx.fillText(`Score: ${Math.floor(frames / 350)}`,  $canvas.width/2 - 120, 60)
  }
  
  function checkCollition() {
    if (flappy.y > $canvas.height - flappy.height) {
      gameOver()
    }
    if (flappy.y + flappy.height/2 < 0) {
      gameOver()
    }
    obstacles.forEach(obstacle => {
      if (flappy.isTouching(obstacle)) {
        gameOver()
      }
    })
  }
  