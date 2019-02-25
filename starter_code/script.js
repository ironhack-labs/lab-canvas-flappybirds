var myDiv = document.getElementById("game-board");
var img = new Image();
img.src = "images/bg.png";
var imgCTop = new Image();
imgCTop.src = "images/obstacle_top.png"
var imgCBottom = new Image();
imgCBottom.src = "images/obstacle_bottom.png"
var myObstaclesT = [];
var myObstaclesB = [];
var points = 0;

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };


  document.onkeydown = function(e){
    if(e.keyCode = 32){
      e.preventDefault()
      moveUp();
    };
  }
  
    document.onkeyup = function(e){
      faby.speedY = 0;
    }

  function startGame() {
    resetGame()
    myGameArea.start();
    faby.drawFaby();    
  }

};


var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function(){
    this.canvas.width = 1200;
    this.canvas.height = 600;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    myDiv.insertBefore(this.canvas, null);
    this.interval = setInterval(updateGameArea, 1000/60);
  },
  frames: 0,
  stop: function() {
    clearInterval(this.interval);
  },
  score: function() {
    this.ctx.font = '25px serif';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText('Score: '+ points, 0, 20);
  }, 
}


var bgImg = {
  img: img,
  x: 0,
  speed: -1,

  movebg: function() {
    this.x += this.speed;
    this.x %= myGameArea.canvas.width;
  },

  draw: function() {
    myGameArea.ctx.drawImage(this.img, this.x, 0, myGameArea.canvas.width, myGameArea.canvas.height);
    if (this.speed < 0) {
      myGameArea.ctx.drawImage(this.img, this.x + myGameArea.canvas.width, 0, myGameArea.canvas.width, myGameArea.canvas.height);
    } 
  }
}


function ComponentTop(width, height, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.update = function(){
    ctx = myGameArea.ctx;
    ctx.drawImage(imgCTop, this.x, this.y, this.width, this.height);
  }
  this.right = function() {return this.x + width};
  this.left   = function() { return this.x}
  this.bottom    = function() { return this.y + this.height}
}

function ComponentBottom(width, height, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.update = function(){
    ctx = myGameArea.ctx;
    ctx.drawImage(imgCBottom, this.x, this.y, this.width, this.height);
  }
  this.right = function() {return this.x + width};
  this.left   = function() { return this.x}
  this.top    = function() { return this.y}
}

function updateGameArea() {
  for (i = 0; i < myObstaclesT.length; i += 1) {
    if(myObstaclesT[i].right() > faby.left()){
      if (faby.crashWithT(myObstaclesT[i])) {
          finalPoints = myGameArea.frames/10
          myGameArea.stop();
          return;
      }
    }
  }
  for (i = 0; i < myObstaclesB.length; i += 1) {
    if(myObstaclesB[i].right() > faby.left()){
      if (faby.crashWithB(myObstaclesB[i])) {
          finalPoints = myGameArea.frames/10
          myGameArea.stop();
          return;
      }
    }
  }


  bgImg.movebg();
  bgImg.draw();
  faby.drawFaby();
  faby.update();
  myGameArea.frames +=1;

  if (myGameArea.frames % 75 === 0) {
    var minHeight = 20;
    var maxHeight = 400;
    var height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
    var minGap = 100;
    var maxGap = 250;
    var gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
    myObstaclesT.push(new ComponentTop(100, height, 1200, 0));
    myObstaclesB.push(new ComponentBottom(100, myGameArea.canvas.height - height - gap, 1200, height + gap));
  };

  for (i = 0; i < myObstaclesT.length; i += 1) {
    if(myObstaclesT[i].x + 100 <= 0){
      myObstaclesT.shift(myObstaclesT[i]);
      i--
      continue
    }
    myObstaclesT[i].x -= 5;
    myObstaclesT[i].update();
    if (myObstaclesT[i].right() === faby.left()){points++};
  };

  for (i = 0; i < myObstaclesB.length; i += 1) {
    if(myObstaclesB[i].x + 100 <= 0){
      myObstaclesB.shift(myObstaclesB[i]);
      i--
      continue
    }
    myObstaclesB[i].x -= 5;
    myObstaclesB[i].update();
  };
  myGameArea.score();
}


var faby = {
  x: 560,
  y: 250,
  width: 70,
  height: 50,
  drawFaby: function() {
    img2 = new Image();
    img2.src ="images/flappy.png";
    ctx = myGameArea.ctx;
    ctx.drawImage(img2, this.x, this.y, this.width, this.height);
  },
  speedX: 0,
  speedY: 0,
  gravity: 1.8,
  update: function() {
    hitBottomOrTop()
    this.y += this.gravity
    },
  left: function(){return faby.x},
  right: function() { return (faby.x + faby.width)},
  top: function() { return faby.y},
  bottom: function() {return faby.y + faby.height},

  crashWithT : function(obstacle) {

    return ((faby.top() < obstacle.bottom())    &&
           (faby.right() > obstacle.left())) 
  },

  crashWithB : function(obstacle) {
    return ((faby.bottom() > obstacle.top())    &&
           (faby.right() > obstacle.left())) 
  },
  
  }
  



function hitBottomOrTop () {
  var bottom = 600;
    if (faby.y >= bottom - faby.height) {
      faby.y = bottom - faby.height;
      clearInterval(myGameArea.interval)
    }
    else if (faby.y <= 0) {
      clearInterval(myGameArea.interval)
    }
  }

function moveUp () {
    faby.y -= 25;
  }


function resetGame() {
  myObstaclesT = [];
  myObstaclesB = [];
  points = 0;
  faby.x = 560;
  faby.y = 250;
}