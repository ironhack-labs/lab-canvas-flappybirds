window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    // var pattern = context.createPattern(backImg, 'repeat');
    // ctx.fillStyle = pattern;
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    startGame();
  };
}

var myObstacles = [];

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.setAttribute("id", "canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.backImg = new Image();
    this.backImg.src = "images/bg.png";
    this.interval = setInterval(updateGameArea, 20);
  },
  drawBackground: function () {
    this.ctx.drawImage(this.backImg, 0, 0, this.canvas.width, this.canvas.height);
  },
  frames: 0,
  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground();
  },
  stop: function () {
    clearInterval(this.interval);
  }
}

function Component(x, y, width, height) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.ctx = myGameArea.ctx;

  this.update = function () {
    this.ctx = myGameArea.ctx;

    this.obstacleBottom = new Image();
    this.obstacleBottom.src = "images/obstacle_bottom.png";
    this.obstacleTop = new Image();
    this.obstacleTop.src = "images/obstacle_top.png";

    this.ctx.drawImage(this.obstacleBottom, this.x, this.y, this.width, this.height);
    //this.ctx.drawImage(this.obstacleTop, this.x, this.y, this.width, this.height);
  }

  this.drawPlayer = function () {
    this.playerImg = new Image();
    this.playerImg.src = "images/flappy.png";
    this.ctx.drawImage(this.playerImg, myGameArea.canvas.width * 0.08, myGameArea.canvas.height * 0.8, 50, 75);
  }

  this.newPos = function () {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  this.left = function () { return this.x };
  this.right = function () { return (this.x + this.width) };
  this.top = function () { return this.y };
  this.bottom = function () { return (this.y + this.height) };

  this.crashWith = function (obstacle) {
    return !((this.bottom() < obstacle.top()) ||
      (this.top() > obstacle.bottom()) ||
      (this.right() < obstacle.left()) ||
      (this.left() > obstacle.right()))
  }
}

player = new Component(myGameArea.canvas.width * 0.08, myGameArea.canvas.height * 0.8, 50, 75);

function updateGameArea() {
  for (i = 0; i < myObstacles.length; i += 1) {
    if (player.crashWith(myObstacles[i])) {
      myGameArea.stop();
      return;
    }
  }
  myGameArea.clear();
  myGameArea.frames += 1;
  if (myGameArea.frames % 400 === 0) {
    x = myGameArea.canvas.width;
    minHeight = 20;
    maxHeight = 200;
    height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
    minGap = 50;
    maxGap = 200;
    gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    myObstacles.push(new Component(800, height, x * 0.2, 0));
    myObstacles.push(new Component(800, x - height - gap, x * 0.2, height + gap));
  }
  for (i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].x += -1;
    myObstacles[i].update();
  }
  player.update();
}

function moveUp() {
  player.speedY -= 100;
}

function moveDown() {
  player.speedY += 10;
}

document.onkeydown = function (e) {
  if (e.keyCode == 32) {
    moveUp();
  }
}

document.onkeyup = function (e) {
  moveDown();
}


function startGame() {
  myGameArea.start();
  myGameArea.drawBackground();
  player.drawPlayer();
}