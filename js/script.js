window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    startGame();
    goFullScreen();
  };

  function startGame() {
    const game = new Game("my-canvas");
    game.start();

    const start = document.querySelector("#start");
    start.classList.add("inactive");

    game.canvas.addEventListener("click", function (e) {
      game.faby.isClicking = true;
    });
  }
  function goFullScreen() {
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }
};
