//funciones auxiliares
function generatePipes(){
    if(!(frames % 300=== 0)) return /*determina cada cuanto tiempo van a aparecer, cada 300 cuadros va a pasar un pipe */ 
    console.log('pipes')
    const ventanita = 150//va a medir algo que estara en funcion de una ventana
    let randomHeight = Math.floor(Math.random() * 250) + 50//quiero un numero entre 250 y 50
    let pipeTop = new Pipe(0, randomHeight, true)
    let pipeBottom = new Pipe(randomHeight + ventanita, canvas.height -(randomHeight + ventanita), false)
    pipes.push(pipeTop)
    pipes.push(pipeBottom)
}//genera pipes
function drawPipes(){
    pipes.map(pipe => {
        pipe.draw()
    })
}
function checkCollition(){
    if (flappy.y < 0 || flappy.y > canvas.height - flappy.height) gameOver()
    pipes.forEach(pipe => {
        if(flappy.isTouching(pipe)) gameOver()})
}

function gameOver(){
    clearInterval(interval)
    interval = 0
}
