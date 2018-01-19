window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var canvasSize = { w: canvas.width, h: canvas.height };

    window.gravity = 0.1;
    var bird = createBird(ctx, canvasSize);

    function update() {
      ctx.clearRect(0, 0, canvasSize.w, canvasSize.h);
      bird.update();
      bird.render();
    }
    setInterval(update, 20);

    document.onkeydown = function(e) {
      if (e.keyCode == 32) {
        bird.userPull = 0.3;
      }
    };

    document.onkeyup = function(e) {
      if (e.keyCode == 32) {
        bird.userPull = 0;
      }
    };
  }
};
