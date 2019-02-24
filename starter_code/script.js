"use strict";
var ctx, imgBackground, faby, imgFaby, imgTopObs, imgBotObs, score
var counter = 0;
var framerate = 0;
var status = 1;

function readyCheck() {
  if (counter === 5) {
    score = 0;
    updateCanvas();
  }
};

window.onload = function () {

  document.getElementById("start-button").onclick = function () {
    if (status == 1) {
      status = 0;
      startGame();
    } else {
      return;
    }
  };

  function startGame() {
    // load assets
    createCanvas();
    loadBackground();
    loadFaby();
    loadObstacles();
  }

};

function loadObstacles() {
  imgTopObs = new Image();
  imgTopObs.onload = function () {
    counter++;
    readyCheck();
  };
  imgTopObs.src = "images/obstacle_top.png";
  // bot img
  imgBotObs = new Image();
  imgBotObs.onload = function () {
    counter++;
    readyCheck();
  };
  imgBotObs.src = "images/obstacle_bottom.png";
};

function loadBackground() {
  imgBackground = new Image();
  imgBackground.onload = function () {
    ctx.drawImage(imgBackground, 0, 0);
    counter++;
    readyCheck();
  }
  imgBackground.src = "images/bg.png";
};

// Load Faby
function loadFaby() {
  faby = new Faby();
  imgFaby = new Image();
  imgFaby.onload = function () {
    ctx.drawImage(imgFaby, 50, 250, 50, 50);
    counter++;
    readyCheck();
  }
  imgFaby.src = "images/flappy.png";
};

var background = {
  x: 0,
  y: 0,
  speed: -1,
  move: function () {
    this.x += this.speed;
    this.x %= 900; // reset every 900 (full width);
    // draw first
    ctx.drawImage(imgBackground, this.x, this.y);
    // draw second
    ctx.drawImage(imgBackground, this.x + 900, this.y);
  }
};

function Faby() {
  this.x = 50;
  this.y = 250;
  this.width = 50;
  this.height = 50;
  this.speedX = 1;
  this.speedY = 1;
  this.gravity = 1;
  this.gravitySpeed = 1;
  this.update = function () {
    console.log("update");
  };
  this.newPos = function () {
    console.log("newpos");
  };
  this.draw = function () {
    if (this.y > 504) {
      console.log("game over");
    }
    this.y += this.speedY * this.gravity;
    ctx.drawImage(imgFaby, this.x, this.y, 50, 50);
  }
};

// EVENT listeners (faby)
addEventListener("keydown", function (e) {
  if (e.key == " ") {
    faby.gravity *= -1;
  }
});

// OBSTACLES
var obstacles = [];

var Obstacle = function () {
  this.width = 138;
  this.height = 793;
  this.x = 900;
  // top Y length is 50-200
  this.topYLength = Math.floor(Math.random() * 150 + 50);
  this.topY = this.topYLength - 793;
  // gap is 150-250
  this.gap = Math.floor(Math.random() * 100 + 150);
  // bot y is length Y + gap
  this.botY = this.topYLength + this.gap;
  this.speed = -2;
  this.draw = function () {
    this.x += this.speed;
    ctx.drawImage(imgTopObs, this.x, this.topY, this.width, this.height);
    ctx.drawImage(imgBotObs, this.x, this.botY, this.width, this.height);
  }
};

// Score
function drawScore() {
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 700, 60);
};

// UPDATE canvas
function updateCanvas() {
  framerate++;
  ctx.clearRect(0, 0, 900, 504);
  background.move();
  faby.draw();
  // new obstacle
  if (framerate % 240 === 0) {
    var obstacle = new Obstacle();
    obstacles.push(obstacle);
  };
  // loop obstacles (delete + move + colission)
  for (var i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x < -140) {
      score++;
      obstacles.splice(i, 1);
    };
    // collission check
    if (obstacles[i].x < faby.x + 50 && obstacles[i].x + obstacles[i].width > faby.x && 
      // with top or bottom obstacle
      (obstacles[i].botY < faby.y + 50 || obstacles[i].topYLength > faby.y)) {
        obstacles[i].draw();
        createGameOver();
        // should be some sort of reset function .. 
        return;
      };
      // move
      obstacles[i].draw();
    }
    // faby out of screen
    if(faby.y > 504 || faby.y < -50) {
      createGameOver();
      return;
    }
    // score
    drawScore();
  requestAnimationFrame(updateCanvas);
};

function createGameOver() {
  // ctx.createPath();
  status = 1;
  drawScore();
  ctx.fillStyle = "white";
  ctx.fillRect(100,100, 700, 304);
  ctx.textAlign = "center";
  ctx.fillStyle = "black";
  ctx.fillText("Game over", 450, 240);
  ctx.fillStyle = "green";
  ctx.fillText("Score: " + score, 450, 300);
  ctx.font = "15px Arial";
  ctx.fillStyle = "grey";
  ctx.fillText("to play again, refresh page (F5)", 450, 360)
};

function createCanvas() {
  // can only be one canvas :)
  if (document.getElementById("my-canvas")) {
    return;
  };
  // create canvas
  var field = document.createElement("canvas");
  field.style = "margin: 0 auto;";
  field.id = "my-canvas";
  field.width = 900;
  field.height = 504;
  ctx = field.getContext("2d");
  ctx.font = "40px Arial";
  document.getElementById("game-board").appendChild(field);
  counter++;
};





