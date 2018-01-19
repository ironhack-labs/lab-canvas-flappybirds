window.onload = function() {

  var board = new Board();
  var bird = new Bird();
  var obstacleTop = new Obstacles('top');
  var obstacleBot = new Obstacles('bottom');
  
  function startGame() {
    board.clean();
    board.render(board.ctx);
    bird.render(board.ctx);
    bird.pull(board.ctx);
    obstacleTop.render(board.ctx);
    obstacleBot.render(board.ctx);
    if (bird.gameOver()) {
      window.cancelAnimationFrame(startGame);
      console.log(bird.y);
      // console.log('Game over!');
    }
    window.requestAnimationFrame(startGame);
  }
  

  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  // window.addEventListener('keypress', f); 
  // function f (e) {
  //   console.log(e);
  // }
};
