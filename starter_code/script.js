let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let background = new Background();

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    background.drawBackground();
    startGame();
  };

  function startGame() {
    setInterval(update, 1000 / 50);
  }
};

function update() {
  background.drawBackground();
}
