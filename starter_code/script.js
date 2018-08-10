let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let background = new Background();
let faby = new Faby();

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    background.drawBackground();
    startGame();
  };

  function startGame() {
    setInterval(update, 1000 / 50);
  }

  document.addEventListener("keypress", function(e) {
    if (e.keyCode === 32) {
      faby.hop();
    }
  });
};

function update() {
  background.drawBackground();
  faby.update();
}
