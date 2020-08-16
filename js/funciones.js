
window.onload = function() {
    document.getElementById("start-button").onclick = function() {
        startGame();
    };
    
    function startGame() {
        window.location.reload()}
        intervalId = setInterval(update, 1000 / 60)
};

const board = new Board()
const flaby = new Flaby

function update() {
    frames++
    generarObst()
    clearCanvas()
    board.draw()
    drawObst()
    flaby.draw()
    flaby.flabyPos()
    checkCollition()
    drawScore()
}

function clearCanvas(){
    ctx.clearRect(0, 0, $canvas.width, $canvas.height)
}

function generarObst(){
    if (frames % 250 === 0){
        const minY = -580
        const maxY = 0
        const minGap = 80
        const maxGap = 130
        const randomGap = Math.floor(Math.random() * (maxGap - minGap) + maxGap)
        const randomY = Math.floor(Math.random() * (maxY - minY) + minY)
    
        obstacles.push(new Obstacles(randomY))
        obstacles.push(new Obstacles(randomY + randomGap + 580))
    }
}

function drawObst() {
    obstacles.forEach((obstacle, i) => {
    obstacle.draw()
    })
}

function checkCollition() {
    if (flaby.y > $canvas.height - flaby.height) {
        gameOver()
    }
    obstacles.forEach(obstacle => {
    if (flaby.isTouching(obstacle)) {
        gameOver()
        }
    })
}

function gameOver(){
    clearInterval(intervalId)
    ctx.font = `80px Nunito`
    ctx.fillStyle = "crimson"
    ctx.fillText("Game Over", 100, 280)
}

function drawScore() {
    ctx.font = "30px Nunito"
    ctx.fillStyle = "white"
    if (frames % 100 === 0) {
        score++
    }
    ctx.fillText(`Score: ${score}`, 450, 40)}

document.addEventListener("keydown", e => {
    switch (e.keyCode){
        case 32:
        flaby.salto()
        break
    }
})

