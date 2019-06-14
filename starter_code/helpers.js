function generatePipes () {
    if(!(frames%300 === 0)) return
    const ventanita = 150
    let randomHeight = Math.floor(Math.random() * 250) + 50
    let pipeTop = new Pipe(0, randomHeight, true)
    let pipeBottom = new Pipe(
        randomHeight + ventanita,
        canvas.clientHeight - (randomHeight + ventanita),
        false
        )
        pipes.push(pipeTop)
        pipes.push(pipeBottom)
}

function drawPipes() {
    pipes.forEach( pipe => {
        pipe.draw()
    })
}

function checkCollitions(){
    if(flappy.y < 0 || flappy.y > canvas.height - flappy.height) gameOver()
    pipes.forEach( pipe => {
        if (flappy.isTouching(pipe)) gameOver() 
 })
}

function gameOver(){
    clearInterval(interval)
    }