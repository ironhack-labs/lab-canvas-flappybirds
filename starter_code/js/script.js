window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    startGame();
  };
  function startGame() {
    document.getElementById("start-button").style.display = "none";
    Game.init();
  }
};