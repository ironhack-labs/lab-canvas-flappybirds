/////CodeAlong - quadrado vermelho e obstáculos verdes

var myObstacles = [];
//caracter principal del juego

class Component {
  constructor(width, height, x, y, url) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.img = new Image();
    this.img.src = url;
    this.gravity = 0;
    this.gravitySpeed = 0;
    // this.topLimit = canvas
  }
  update() {
    const ctx = myGameArea.context;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  newPos() { // sólo se llama para el player
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.width - 3;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }

  outOfScreen() {
    if (this.top() <= 0 || this.bottom() >= myGameArea.canvas.height) {
      return true
    }
  }

  crashWith(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()

    );
  }


}

class Background {
  constructor(w, h, ctx) {
    this.ctx = ctx
    this.img = new Image();
    this.img.src = "images/bg.png";
    this.h = h
    this.w = w

    this.x = 0;
    this.y = 0;

    this.dx = 3;
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    );
    this.ctx.drawImage(
      this.img,
      this.x + this.w,
      this.y,
      this.w,
      this.h
    );
  }

  move() {
    this.x -= this.dx;

    if (this.x < -this.w) this.x = 0;
  }
}


const myGameArea = {
  canvas: document.createElement("canvas"),
  frames: 0,
  start: function () {
    this.canvas.width = 900
    this.canvas.height = 504
    this.context = this.canvas.getContext("2d")
    this.background = new Background(this.canvas.width, this.canvas.height, this.context);
    const gameBoard = document.getElementById("game-board")
    gameBoard.insertBefore(this.canvas, gameBoard.childNodes[0])
    // call updateGameArea() every 20 milliseconds
    this.interval = setInterval(updateGameArea, 10);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function () {
    clearInterval(this.interval);
  },
  score: function () {
    var points = Math.floor(this.frames / 5);
    this.context.font = "18px serif";
    this.context.fillStyle = "black";
    this.context.fillText("Score: " + points, 350, 50);
  }
}


function updateObstacles() {
  for (i = 0; i < myObstacles.length; i++) {
    myObstacles[i].x += -1;
    myObstacles[i].update();
  }
  myGameArea.frames += 1;
  if (myGameArea.frames % 360 === 0) {
    var x = myGameArea.canvas.width;
    var minHeight = 50;
    var maxHeight = 350;
    var height = Math.floor(
      Math.random() * (maxHeight - minHeight + 1) + minHeight
    );
    var minGap = 100;
    var maxGap = 300;
    var gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    myObstacles.push(new Component(100, 574, x, height - 574, "images/obstacle_top.png"));
    myObstacles.push(
      new Component(100, 574, x, height + gap, "images/obstacle_bottom.png")
    );
  }
}

const player = new Component(60, 50, 450, 252, "images/flappy.png");

document.onkeydown = function (e) {
  if (e.keyCode == 32) {
    player.gravity = -0.2
  }
};

document.onkeyup = function (e) {
  if (e.keyCode == 32) {
    player.gravity = 0.05
  }
};


function updateGameArea() {
  myGameArea.clear();
  myGameArea.background.move();
  myGameArea.background.draw();
  updateObstacles();
  player.newPos(true);
  player.update();
  // check if the game should stop
  checkGameOver();
  // update and draw the score
  myGameArea.score();
}

myGameArea.start();

function checkGameOver() {
  var crashed = myObstacles.some(function (obstacle) {
    return player.crashWith(obstacle);
  });

  if (crashed || player.outOfScreen()) {
    myGameArea.stop();
  }
}