// Triggers
window.onload = function() {
  player = new Player(50, 70, "flappy.png", 319, 190); //Dont know where should I put this
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
    case 66: //b key
    player.moveUp();
    break;
    // case 27: //Escape
    // canvas.stop();
    // break;
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
  pause: false,
  start : function () {
    this.context = this.canvas.getContext('2d')
    this.canvas.width = 880;
    this.canvas.height = 470;
    this.image.src = './images/bg.png';       
    this.image.onload = updateGame();  
    // this.interval = setInterval(()=>{
    //   updateGame()
    //   console.log('called')
    // }, 20);

    document.getElementById('game-board').appendChild(this.canvas);
  },  
  stop: function(){
    this.pause = !this.pause;
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
  // setTimeout(()=>{
    canvas.updateCanvas()
    player.newPos();
    player.update();
    canvas.frames +=1;  
    if(canvas.pause){
      console.log('your die')
    }
    engine(); 
    // if(canvas.pause){ //experimental
       requestAnimationFrame(updateGame);
      // }
  // }, 1000/5)
}

function engine () {
  if (canvas.frames % 340 === 0) {
    console.log(canvas.frames)
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
    myObstacles[i].ex += -1;
    myObstacles[i].update();
  }
  if(myObstacles.length > 10){
    myObstacles.shift();
    // console.log(myObstacles.length)
  }

  var crashed = myObstacles.some(function(obstacle) {
    return player.crashWith(obstacle)
  })

  if (crashed) {
    canvas.stop();
  }
} 
//Obstacle 
function Component(width, height, img, x, y) {
  this.imageComp = new Image();
  this.imageComp.src = './images/' + img;
  this.width = width;
  this.height = height;
  this.ex = x;
  this.y = y;  
  this.left   = function() { return this.x };
  this.right  = function() { return (this.x + this.width) };
  this.top    = function() { return this.y };
  this.bottom = function() { return (this.y + this.height) }
}
Component.prototype.update = function (){
  ctx = canvas.context;
  ctx.drawImage(this.imageComp, this.ex, this.y, this.width, this.height)
}
// Player
function Player(width, height, img, x, y) {
  Component.call(this, width, height, img, x, y); //Copying basic config from Obstacle
  this.speedY = 0;
  this.gravity = 0.01;
  this.gravitySpeed = 0;

  this.crashWith = function(obstacle) {
    return !((this.bottom() < obstacle.top())    ||
            (this.top()    > obstacle.bottom()) ||
            (this.right()  < obstacle.left())   ||
            (this.left()   > obstacle.right()))
  }


}
Player.prototype = Object.create(Component.prototype); //Copying prototypes from Component

Player.prototype.newPos = function () {
  if (this.gravitySpeed < 2){
    this.gravitySpeed += this.gravity;
  } else {
    this.gravitySpeed = 2;
  }
  this.y += this.speedY + this.gravitySpeed; 
}

Player.prototype.moveUp = function () {
  this.speedY -= 10
}

Player.prototype.stopMove = function () {
  this.speedY = 0;
}
