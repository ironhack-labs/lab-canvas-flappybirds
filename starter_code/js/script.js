window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    var game = new Game("flappy");
    game.start();
    document.getElementById("start-button").disabled = "true";
  }
  };