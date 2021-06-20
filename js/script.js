window.onload = function() {
  document.getElementById("start-button").addEventListener("click", startGame);

};

// The Canvas
const canvas = document.getElementById("my-canvas");
let ctx = canvas.getContext("2d");

// The Background Canvas
const backgroundCanvas = document.getElementById("my-canvas-background");
let backgroundCtx = backgroundCanvas.getContext("2d");

class BackgroundCanvas {
  constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = backgroundCanvas.width;
      this.height = backgroundCanvas.height;
      this.img = new Image();
      this.img.src = "../images/bg.png";
      this.speed = -1;
  }

  drawBackground() {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      ctx.drawImage(
          this.img,
          this.x + backgroundCanvas.width,
          this.y,
          this.width,
          this.height
      );
  }

  move() {
      this.x += this.speed;
      this.x %= backgroundCanvas.width;
  }
}

let background = new BackgroundCanvas(0, 0);

// The Player

class Player {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.speedX = 1;
    this.speedY = 1;
    this.gravity = 1;
    this.gravitySpeed = 1;
    this.width = 20;
    this.height = 30;

  }
update() {

}

newPos() {
  this.x += this.speedX;
  this.y += this.speedY;
}
}


let faby = new Player();

// Spacebar

document.onkeydown = function (e) {
  console.log("it moves", e);
  if (e.keyCode === 32) {

  } else {}
};


// START GAME

function startGame() {
  console.log("Game has started!");

  setInterval(() => {
    ctx.clearRect(0, 0, 700, 300);

    // Background
    background.move();
    background.drawBackground();


}, 20);
}