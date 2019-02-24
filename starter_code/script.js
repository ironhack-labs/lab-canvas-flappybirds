// Triggers
window.onload = function() {
  player = new Player(50, 70, "flappy.png", 219, 390, true); //Dont know where should I put this
  document.getElementById("start-button").onclick = function() {
    startGame();
  };
  function startGame() {
    canvas.start();
  }
  document.onkeyup = function(e) {
    player.stopMove();
  }
};
document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 32: //space bar
      player.moveUp();
      break;
  }
}
const myObstacles = []; //Dont know where should I put this

// Canvas and background animation
let canvas = {  
  image : new Image(),  
  canvas : document.createElement('canvas'), 
  speed: -1,
  x : 0,
  frames: 320,
  start : function () {
    this.context = this.canvas.getContext('2d')
    this.canvas.width = 880;
    this.canvas.height = 470;
    this.image.src = './images/bg.png';   
    this.image.onload = updateGame();  
    document.getElementById('game-board').appendChild(this.canvas);
  },  
  bkgMove : function () {
    this.x += this.speed;
    this.x %= this.canvas.width;
  },
  bkgDraw :  function (){
    this.context.drawImage(this.image, this.x, 0);
    if (this.speed < 0){
      this.context.drawImage(this.image, this.x + this.canvas.width, 0);
    } else {
      this.context.drawImage(this.image, this.x - this.image.width, 0);      
    }
  },
  updateCanvas : function (){
    this.bkgMove() 
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bkgDraw();
  }
}


function updateGame (){
    canvas.updateCanvas()
    player.newPos();
    player.update();
    canvas.frames +=1;
    if (canvas.frames % 340 === 0) {
      x = canvas.canvas.width;
      minHeight = 20;
      maxHeight = 200;
      height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
      minGap = 50;
      maxGap = 200;
      gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
      myObstacles.push(new Component(138, height, 'obstacle_top.png', x, 0));
      myObstacles.push(new Component(138, x - height - gap, 'obstacle_bottom.png', x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i++) {
      myObstacles[i].x += -1;
      myObstacles[i].update();
    }
    requestAnimationFrame(updateGame);
}

//Obstacle 
function Component(width, height, img, x, y) {
  this.image = new Image();
  this.image.src = './images/' + img;
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;  
}
Component.prototype.update = function (){
  ctx = canvas.context;
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
}
// Player
function Player(width, height, img, x, y) {
  Component.call(this, width, height, img, x, y); //Copying basic config from Obstacle
  this.speedX = 0;
  this.speedY = 0;
  this.newPos = function() {
      this.x += this.speedX;
      this.y += this.speedY;
  }
}
Player.prototype = Object.create(Component.prototype); //Copying prototypes from Component

Player.prototype.moveUp = function () {this.speedY -= 1;}

Player.prototype.stopMove = function () {
  this.speedX = 0;
  this.speedY = 0;
}
