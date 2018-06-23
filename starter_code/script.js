window.onload = function() {
  var startBtn = document.getElementById('start-button');
  var logo = document.getElementById('logo');
  var game;

  startBtn.onclick = function() {
    startGame();

    startBtn.style.display = 'none';
    logo.className = 'small';
  };

  function startGame() {
    game = new Game('canvas');
    
    updateCanvas();
  }

  function updateCanvas() {
    game.update();

    window.requestAnimationFrame(updateCanvas);
  }

};
