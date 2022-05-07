window.onload = function() {
  //always declare consts or lets that we'll use
  const bg = new Background (canvas.width, canvas.height);
  const flappy = new Flappy (50,40,35,35);

  document.getElementById("start-button").onclick = function() {
    if(!requestId){
      startGame();
    }
   
  };

  function startGame() {
      //start gamr v 0.1
      //updateGame()
      //ver v 0.2
      requestId= requestAnimationFrame(updateGame)
    }

  //how we loose
  function gameOver(){
    console.log("te moriste");
    requestId = undefined;
  }

  function resetGame(){

  }
  //how we win
  function winGame(){

  }

  //hearts, life points, etc.

  //game engine
  function updateGame(){
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    bg.render()

    flappy.render()
    
    rePipes()
    generatePipes()
    
    if(flappy.y + flappy.height > canvas.height){
      gameOver()
    }

    if (requestId){ //recursividad
      requestAnimationFrame(updateGame)
    }

    requestAnimationFrame(updateGame)
  }

  //generate and render pipes
  function generatePipes(){
    //limit amount of pipes
    if (!(frames %160 ===0)){
      return true //do nothing until you meet this condition
    }

    //heigth random
    //math.floor( math.random()*(max * 0.6)) + 35 (0.6 minimum value, 35 is our flappy size)
    const height = math.floor(math.random()*(canvas.height * 0.6)) + 35;
    const pipe1= new Pipe("top", canvas.width,0,heigth) //so it comes from the right side
    const pipe2= new Pipe ("bottom", canvas.width, height + 120, canvas.height - 120 - height) //pos, x, y, dynamic height
    pipes.push(pipe1,pipe2)

  }
  function renderPipes(){
    //forEach => doesnt return anything
    //for of => doesnt return
    // for => doesnt return
    //map => returns a new array, copy of the original
    //reduce => returns an array, object, number, string
    //filter => returns a new filtered array
    // we will use For Each becauuse we only need to iterate

    pipes.forEach(pipe,index_pipe)=>{
      //render pipes
      pipe.render()
    }
  }

  addEventListener("keydown",(event)=>{
    event.preventDefault();

    if (event.keyCode ===32){
      //this.y -= 10; //v1 will be deleted
      flappy.userPull = 0.3; //v2 
    }
    //32 es espacio
    })
    addEventListener("keyup", (event)=>{
      event.preventDefault()

      if(event.keyCode === 32) {
        flappy.userPull = 0;
      }
    })
  };//end onload
