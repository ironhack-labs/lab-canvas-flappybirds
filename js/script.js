// Window = {...methods, properties}
window.onload = function() {
  const bg = new Background(canvas.width , canvas.height )
  const flappy = new Flappy(100, 200, 60, 60)
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    // Ejecutar update game
    if (!requestId){
      audio.play()
      requestId = requestAnimationFrame(updateGame)
    }
    //updateGame()
  }

  function updateGame(){
    frames++;
    // .clearRect (x,y,width, height)
    ctx.clearRect(0,0,canvas.width, canvas.height)
    ctx.font = '50px serif'
    
    bg.update()
    flappy.update()
    drawPipe()
    generatePipe()
    
    ctx.fillText(`Points ${points}`,290, 60 )
    if(flappy.y > canvas.height){
      gameOver()
    }

    if(requestId){
      requestAnimationFrame(updateGame)
    }
        
  }

function gameOver(){
  audio.pause()
  requestId = undefined
  ctx.fillText('Te moriste ', 290, 300)
  // Reiniciar todo a valores por default
}

function generatePipe(){
  if (!(frames % 160 === 0)){
    return true
  }
  
  const randomHeight = Math.floor(Math.random()* (canvas.height * .6) + 30)
  const pipeTop = new Pipe('top', canvas.width, 0, randomHeight)
  const pipeBottom = new Pipe('bottom', canvas.width, randomHeight + 140,canvas.height- 140- randomHeight)

  arrPipes.push(pipeTop, pipeBottom)
}

function drawPipe(){
  // arr.foreach((param1(iterable), param2(índice), param3)=>{}) 
  arrPipes.forEach((pipe, pipe_index)=>{
    if (pipe.x  < 30){
      arrPipes.splice(pipe_index,1)

      points += .5
    }
    pipe.update()

    if(flappy.collision(pipe)){
      gameOver()
    }
  })
}


  // addEventListener keydown keyup
addEventListener('keydown', (event)=>{
    if (event.keyCode === 32){
      //flappy.y -= 10; 
      flappy.userPull = .5;
    }
  })

addEventListener('keyup', (event)=>{
    if (event.keyCode === 32){
      flappy.userPull = 0;
    }
  })
};


