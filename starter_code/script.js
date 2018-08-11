let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let background = new Background();
let faby = new Faby(30, 30);
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
      faby.hop();
    }
  });
};

function startGame() {
  this.interval = setInterval(update, 1000 / 50);
}

function stopGame() {
  clearInterval(this.interval);
}

function update() {
  frames++;
  background.drawBackground();
  faby.update();

  if (frames % 80 === 0) {
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
  }

  var crashed = obstacles.some(function(obstacle) {
    return faby.crashWith(obstacle);
  });
  console.log("crashed? " + crashed);

  if (crashed) {
    stopGame();
  }
}
