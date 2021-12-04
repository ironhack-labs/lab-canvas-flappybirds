const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');


window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  const game = new Game(ctx)

  function startGame() {
    game.start()
  }

  window.addEventListener('keydown', (event) =>{
    game.onKeyDown(event.keyCode)
  })


};
