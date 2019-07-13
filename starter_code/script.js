window.onload = function() {
  Game.init("canvas")
  document.getElementById("start-button").onclick = function() {
    Game.start();
  };
};
