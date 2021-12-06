const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');
const game = new Game(ctx);
const button = document.getElementById('start-button');

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
    
  };

  function startGame() {
    game.start();
    
  }

  document.addEventListener('keydown',(event) => {
    game.onKeyDown(event.keyCode);
  })
};
