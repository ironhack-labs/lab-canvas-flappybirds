window.onload = function() {
  document.getElementById("start-button").addEventListener("click", startGame);

};

// The Canvas
const canvas = document.getElementById("my-canvas");
let ctx = canvas.getContext("2d");


class Background {
  constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = canvas.width;
      this.height = canvas.height;
      this.img = new Image();
      this.img.src = "../images/bg.png";
      this.speed = -1;
  }

  drawBackground() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.drawImage(
          this.img,
          this.x + canvas.width,
          this.y,
          this.width,
          this.height
      );
  }

  move() {
      this.x += this.speed;
      this.x %= canvas.width;
  }
}

let background = new Background(0, 0);

// The Player

class Player {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.speedX = 1;
    this.speedY = 1;
    this.gravity = 1;
    this.userPull = 0;
    this.img = new Image();
    this.img.src = "../images/flappy.png";
    this.width = 50;
    this.height = 50;
  }

update() {
  ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}

hitBottom() {
  let bottom = canvas.height - this.height;
  if (this.y > bottom) {
    this.y = bottom;
  }
}

newPos() {
  this.speedY += (this.gravity - this.userPull);
  console.log(this.speedY);
  this.x += this.speedX;
  this.y += this.speedY;
  this.hitBottom();
}
}

// Spacebar Control

  document.addEventListener('keydown', function(e) {
    if (e.keyCode == 32) {
      this.userPull = 0.5;
    }
  });
  
  document.addEventListener('keyup', function(e) {
    if (e.keyCode == 32) {
      this.userPull = 0;
    }
  });


let faby = new Player(100,80);

// START GAME

function startGame() {
  console.log("Game has started!");

  setInterval(() => {
    ctx.clearRect(0, 0, 700, 300);

    // Background
    background.move();
    background.drawBackground();

    // Player
    faby.newPos();
    faby.update();

}, 20);

}