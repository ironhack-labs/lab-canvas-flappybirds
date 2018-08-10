let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let background = new Background();
let faby = new Faby();

window.onload = function() {
  $("#start-button").click(function() {
    $("#start-button").hide();
    background.drawBackground();
    startGame();
  });
  document.addEventListener("keypress", function(e) {
    if (e.keyCode === 32) {
      console.log("pressed space bar");
      faby.hop();
    }
  });
};

function startGame() {
  setInterval(update, 1000 / 50);
}

function update() {
  background.drawBackground();
  faby.update();
}
