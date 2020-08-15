function update() {
    frames = frames - 0.5

    generatePipes()
    clearCanvas()
    board.draw()
    flappy.draw()
    updateFlappyPos()
    drawPipes()
    checkCollition()




}

function clearCanvas() {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height)
    board.draw()
}

function updateFlappyPos() {
    flappy.y += flappy.speedY
    flappy.speedY += gravity
}

function generatePipes() {


    if (frames % 250 === 0) {
        const minY = -1043
        const maxY = 0
        const minGap = 120
        const maxGap = 250
        const gap = Math.floor(Math.random() * (maxGap - minGap) + maxGap)
        const randomY = Math.floor(Math.random() * (maxY - minY) + minY)

        obstacles.push(new Obstacles(randomY))
        obstacles.push(new Obstacles(randomY + gap + 1043))
    }
}

function drawPipes() {
    obstacles.forEach((obstacle, i) => {
        obstacle.draw()
    })
}

function checkCollition() {
    if (flappy.y > $canvas.height - flappy.height || flappy.y <= 0) {
        gameOver()
    }
    obstacles.forEach(obstacle => {
        if (flappy.isTouching(obstacle)) {
            gameOver()
        }
    })
}

function gameOver() {
    clearInterval(intervalId)
        /* ctx.font = `80px 'Comic Neue'`
        ctx.fillStyle = "crimson"
        ctx.fillText("Game Over", 200, 400)
        ctx.fillText("Press enter to retry", 100, 600) */

    const gameO = document.getElementById("gameOver");

    ctx.drawImage(gameO, 300, 250, 600, 250)
}

function ResetGlobalVariables() {
    flappy.x = 150
    flappy.y = 300
}