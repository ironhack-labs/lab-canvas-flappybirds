let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let background = new Background();
let faby = new Faby();
let frames = 0;
let obstacles = [];

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
  frames++;
  background.drawBackground();
  faby.update();

  if (frames % 220 === 0) {
    console.log("time for an obstacle!");

    x = canvas.width;
    minHeight = 20;
    maxHeight = 200;
    height = Math.floor(
      Math.random() * (maxHeight - minHeight + 1) + minHeight
    );
    minGap = 70;
    maxGap = 200;
    gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    obstacles.push(new Obstacle(40, height, x, 0, false)); //width, height, x, y, bottom
    obstacles.push(new Obstacle(40, x - height - gap, x, height + gap, true));
  }
  for (i = 0; i < obstacles.length; i += 1) {
    obstacles[i].x += -1;
    obstacles[i].update();
    console.log(obstacles[i].height);
  }
}
