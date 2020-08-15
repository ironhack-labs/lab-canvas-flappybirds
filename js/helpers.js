function update() {
    frames++;
    score = Math.floor(frames / 250 - 2.4 > 0 ? frames / 250 - 2.4 : 0)
    clearCanvas()
    board.draw()
    flappy.draw()
    flappy.move()
    createObstacles()
    drawObstacles()
    printScore()
    checkCollision()
}

function clearCanvas() {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height)
}

function createObstacles() {
    if (frames % 250 === 0) {
        const minY = -476
        const maxY = 0
        const randomY = Math.floor(Math.random() * (maxY - minY) + minY)
        const minGap = 100
        const maxGap = 200
        const gap = Math.floor(Math.random() * (maxGap - minGap) + minGap)
        obstacles.push(new Obstacle(randomY))
        obstacles.push(new Obstacle(randomY + 476 + gap))
    }
}

function drawObstacles() {
    obstacles.forEach((obstacle, index) => {
        obstacle.draw()
        if (obstacle.x < -$canvas.width) obstacles.splice(index, 1);
    })
}

function checkCollision() {
    if (flappy.flyOut()) {
        gameOver()
        return true
    }
    obstacles.forEach(obstacle => {
        if (flappy.isTouching(obstacle)) {
            gameOver()
            return true
        }
    })
}

function printScore() {
    ctx.font = `30px 'Permanent marker`
    ctx.fillStyle = 'white'
    ctx.fillText(`Score: ${score}`, 340, 50)
}

function gameOver() {
    clearInterval(intervalId)
    ctx.font = `60px "Permanent marker"`
    ctx.fillStyle = 'red'
    ctx.fillText('Game Over', 240, 200)
    ctx.font = `40px "Permanent marker"`
    ctx.fillStyle = 'white'
    ctx.fillText(`Final score: ${score}`, 250, 250)
}