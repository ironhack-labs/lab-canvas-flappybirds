window.onload = function() {
  //always declare consts or lets that we'll use
  const bg = new Background (canvas.width, canvas.height)
  const flappy = new Flappy (50,40,35,35)

  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
      //start gamr v 0.1
      updateGame()
  }

  //how we loose
  function gameOver(){

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

    requestAnimationFrame(updateGame)
  }

  //generate and render pipes
  function generatePipes(){
 
  }
  function renderPipes(){}
};
