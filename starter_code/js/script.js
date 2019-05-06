window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    document.getElementById("logo-start").className = "display";
    myGame.init("myCanvas");
  }
};
