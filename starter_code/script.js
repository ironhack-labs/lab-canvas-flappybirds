function Obstacles(x, h, w) {
  this.maxheight = h;
  this.maxwidth = w;
  this.gap = Math.floor(Math.random() * (150 - 100 + 1) + 100);
  this.x = this.maxwidth/2 + x;
  this.height1 = Math.floor(Math.random() * (150 - 40 + 1) + 40);
  this.height2 = this.height1 + this.gap;
  this.img1 = new Image();
  this.img1.src = "./images/obstacle_top.png";
  this.img2 = new Image();
  this.img2.src = "./images/obstacle_bottom.png";
}

Obstacles.prototype.draw = function(ctx) {
  ctx.drawImage(this.img1, this.x, 0, 30, this.height1);
  ctx.drawImage(this.img2, this.x, this.height2, 30,   this.maxheight - this.height2);
};

Obstacles.prototype.update = function() {};

function Faby(ctx) {
  this.width = 20;
  this.height = 30;
  this.x = 380;
  this.y = 200;
  this.speedX = 0;
  this.speedY = -2;
  this.gravitySpeed = 4;
  this.gravity = 0.1;
  this.userPull = 0;
  this.img2 = new Image();
  this.img2.src = "./images/flappy.png";
  this.ctx = ctx;
}

Faby.prototype.draw = function() {
  this.ctx.drawImage(this.img2, this.x, this.y, 30, 40);
};

Faby.prototype.newPos = function() {
  this.y += this.gravity * this.gravitySpeed - this.userPull;
};

Faby.prototype.update = function() {
  this.newPos();
  this.draw();
};

Faby.prototype.falling=function() {
  this.y+=10;
  this.draw();
}

Faby.prototype.crash = function(obstacle) {
  var value=0;
  if (obstacle.x >= this.x - 20 && obstacle.x <= this.x + 20) {
    if (
      this.y <= obstacle.height1 ||
      this.y + this.height >= obstacle.height2
    ) {
      value=2;
    } 
  }
  return value;
};



var img = new Image();
img.src = "./images/bg.png";

function BackgroundImg(ctx, canvas) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.img = img;
  this.speed = -2;
  this.x = 0;
}

BackgroundImg.prototype.move = function() {
  this.x += this.speed;
  this.x %= this.canvas.width;
  // this.x %= this.canvas.width;
};

BackgroundImg.prototype.draw = function() {
  this.ctx.drawImage(this.img, this.x, 0);
  this.ctx.drawImage(this.img, this.x+this.canvas.width, 0);
  // this.x+=this.canvas.width;
  // if (this.speed < 0) {
  // this.ctx.drawImage(this.img, x, 0);
  // } else {
  //   this.ctx.drawImage(this.img, this.x - this.img.width, 0);
  // }
};

function Board() {
  this.canvas = document.getElementById("cvx-game-board");
  this.ctx = this.canvas.getContext("2d");
  // this.x=500;
  // this.y=0;
  this.mybackgroundImage = new BackgroundImg(this.ctx, this.canvas);
  this.mybackgroundImage.draw();
  this.faby = new Faby(this.ctx);
  this.faby.draw();
  this.obstacles = [];
  this.score=0;
  for (var i = 1; i < 100; i++) {
    var obstacle = new Obstacles(
      i * 200,
      this.canvas.height,
      this.canvas.width
    );
    this.obstacles.push(obstacle);
    // obstacle.draw(this.ctx);
  }
}

Board.prototype.draw = function() {
  this.ctx.fillStyle = "gray";
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
};
Board.prototype.scoreFill=function() {
  var score=(Math.floor(this.score/52));
  this.ctx.font="50px serif";
  this.ctx.fillStyle="black";
  this.ctx.fillText('Score: '+score, 100, 100);
}


Board.prototype.updateCanvas = function() {
  
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.mybackgroundImage.move();
  this.mybackgroundImage.draw();
  this.faby.update();
  this.obstacles.forEach(elem => {
    elem.x -= 4;
    elem.draw(this.ctx);
  });
  this.score+=1;
  var rmyreq;

  myreq = requestAnimationFrame(this.updateCanvas.bind(this));
  var crashed = this.obstacles.some(obstacle => {
    return this.faby.crash(obstacle);
  });
  
  if (crashed) {
    stop(myreq);
    // if(this.faby.y<800) {
    //   var myreqfaby=requestAnimationFrame(this.faby.falling.bind(this));
    // } else {
    //   stop(myreqfaby)
    // }
    
  }
  this.scoreFill();
};


function stop(myreq) {
  cancelAnimationFrame(myreq);
}

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
    document.getElementById("start-button").blur();
  };
};

function startGame() {
  var myboard = new Board();
  myboard.draw();
  // var img = new Img();
  img.onload = myboard.updateCanvas();
  // myboard.faby.draw();
  document.onkeydown = function(e) {
    if (e.keyCode == 32) {
      myboard.faby.userPull = 5;
    }
  };

  document.onkeyup = function(e) {
    if (e.keyCode == 32) {
      myboard.faby.userPull = -2;
    }
  };
}
