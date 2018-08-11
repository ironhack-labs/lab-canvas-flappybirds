
 var startButton =  document.getElementById("start-button")
 
 startButton.onclick = function() { 
    startGame();
  };

var flappy;
var interval;
function startGame() {
myGameArea.start();
flappy = new Bird(50,50,10, -0.9);
interval = setInterval(updateCanvas, 1000/50);
}

var myGameArea = {
canvas: document.createElement("canvas"),
start: function() {
  this.canvas.width = 600;
  this.canvas.height = 600;
  this.frames = 0;
  myObstacles = [];
  this.points = 0;
  this.ctx = this.canvas.getContext("2d");
  var gameBoard = document.getElementById("game-board");
  gameBoard.insertBefore(this.canvas, gameBoard.childNodes[0]);
  startButton.onclick = function() {};
  this.ctx.clearRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
  backgroundImage.draw();
  
  },
stop: function() {
  clearInterval(interval);
  this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);;
  this.ctx.fillStyle = "black";
  this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
  this.ctx.font = "40px monospace";
  this.ctx.fillStyle = "red";
  this.ctx.fillText("GAME OVER!", 40,100);
  startButton.onclick = function() { 
    clearInterval(interval);
    startGame();
  };
}
}

var img = new Image();
img.src = 'images/bg.png';

var backgroundImage = {
  img: img,
  x: 0,
  speed: -0.5,

  move: function() {
    this.x += this.speed;
    this.x %= myGameArea.canvas.width;
    
  },

  draw: function() {
    myGameArea.ctx.drawImage(this.img, this.x, 0);
    if (this.speed < 0) {
      myGameArea.ctx.drawImage(this.img, this.x + myGameArea.canvas.width, 0);
    } else {
      myGameArea.ctx.drawImage(this.img, this.x - this.img.width, 0);
    }
  },
};

var imgFlappy = new Image();
imgFlappy.src = "images/flappy.png";

function Bird(width, height, speedY, gravitiySpeed) {
  this.width = width;
  this.height = height;
  this.y = 10;
  this.x = myGameArea.canvas.width/3;
  this.dy = 2;

  this.update = function() {
    myGameArea.ctx.drawImage(imgFlappy, this.x, this.y, width, height) 
  }
  this.newPos = function() {
    this.dy += 0.4;
    this.y += this.dy;
    this.hitBottom();
     }
  this.hitBottom = function (){
    if (this.y > 450) {
      this.y = 450;
      myGameArea.stop();
    }
  };
  this.left = function() {
    return this.x;
  }; 
  this.right = function() {
    return this.x + this.width;
  };
  this.top = function() {
    return this.y;
  };
  this.bottom = function() {
    return this.y + this.height;
  };
  this.crashWith = function(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );
  }
}
;

var myObstacles = [];

function createObstacle() {
   var imagedown = new Image();
   imagedown.src = "images/obstacle_top.png";
   var imageup = new Image();
   imageup.src = "images/obstacle_bottom.png";
  var x = myGameArea.canvas.width;
  var minHeight = 20;
  var maxHeight = 200;
  var height = Math.floor(
    Math.random() * (maxHeight - minHeight + 1) + minHeight
  );
  var minGap = 150;
  var maxGap = 250;
  var gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
   myObstacles.push(new Component(60, height, imagedown, x, 0));
   myObstacles.push(new Component(60, x - height - gap, imageup, x, height + gap));
  //   myObstacles.push(new Component(10, height, x, 0));
  //   myObstacles.push(new Component(10, x - height - gap, x, height + gap)
  // );
  return { x, minHeight, maxHeight, height, minGap, maxGap, gap };
}


function Component(width, height, image, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  
  this.speedX = 0;
  this.speedY = 0;
  ctx = myGameArea.context;
  // myGameArea.ctx.fillStyle = "green";
  myGameArea.ctx.drawImage(image, this.x, this.y, this.width, this.height);
  this.update = function() {
    myGameArea.ctx.drawImage(image, this.x, this.y, this.width, this.height);
  };
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  };
  this.left = function() {
    return this.x;
  };
  this.right = function() {
    return this.x + this.width;
  };
  this.top = function() {
    return this.y;
  };
  this.bottom = function() {
    return this.y + this.height;
  };
}

document.onkeydown = function(e) {
    flappy.dy = -6  
};

function drawScore() {
  var scoreText = "Score: " + myGameArea.points;
  myGameArea.ctx.font = "30px sans-serif";
  myGameArea.ctx.fillStyle = "green";
  myGameArea.ctx.fillText(scoreText, 45, 45);
}

function countScore() {
  if (myObstacles.length <= 2) {
    myGameArea.points = 0;
  }
  else if (myObstacles.length > 2) {
    myGameArea.points = myObstacles.length/2 - 2;
  }
}




function updateCanvas() {
  flappy.speedY = 4;
  myGameArea.ctx.clearRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
  backgroundImage.draw(); 
  myGameArea.frames++;
  
  for (var i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].x += -1;
    myObstacles[i].update();
  }

  flappy.newPos();
  flappy.update(); 

  if (myGameArea.frames % 240 === 0) {
    createObstacle();
  }

  for (var i = 0; i < myObstacles.length; i++) {
  if (flappy.crashWith(myObstacles[i])) {
    myGameArea.stop();
    }}
  backgroundImage.move();
  countScore();
  drawScore();
}

// start calling updateCanvas once the image is loaded
//  img.onload = updateCanvas;
