window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    startGame();
  };

  function startGame() {
    const game = new Game("my-canvas");
    game.start();

    canvas.addEventListener("click", function (e) {
      game.faby.isClicking = true;
    });
  }
};
