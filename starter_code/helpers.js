function generatePipes(){
  if(!(frames % 300 === 0)) return 
  const ventanita = 150
  let randoHeight = Math.floor(Math.random() * 250) +50
  let pipeTop = new Pipe(0, randoHeight, true)
  let pipeBottom = new Pipe(randoHeight + ventanita, canvas.height - (randoHeight + ventanita), false)
  pipes.push(pipeTop)
  pipes.push(pipeBottom)
}

function drawPipes(){
  pipes.forEach( pipe =>{
    pipe.draw()
  })
}

function checkCollitions(){
  if(flappy.y < 0 || flappy.y > canvas.height - flappy.height) gameOver()
  pipes.forEach(pipe => {
   if (flappy.isTouching(pipe))gameOver()
   
  })
}

function gameOver(){
  clearInterval(interval)
  interval
}