var canvas, canvasW, canvasH, ctx;

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    var gameBoard = document.querySelector('#game-board');
    canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasW = canvas.width;
    canvasH = canvas.height;

    gameBoard.appendChild(canvas);
    ctx = canvas.getContext('2d');

    var bgImage = new Image();
    bgImage.src = './images/bg.png';
    bgImage.onload = function() {
      ctx.drawImage(bgImage, 0, 0, canvasW, canvasH);
    }
  }

};
