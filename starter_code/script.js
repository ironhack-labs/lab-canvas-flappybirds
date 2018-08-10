
  // document.getElementById("start-button").onclick = function() { 
  //   clearInterval(interval);
  //   startGame();
  // };

 var flappy;
var interval;
function startGame() {
console.log("start");
myGameArea.start();
flappy = new Bird(50,50,0,0);
interval = setInterval(updateCanvas, 1000/50);
}

var myGameArea = {
canvas: document.createElement("canvas"),
start: function() {
  this.canvas.width = 600;
  this.canvas.height = 600;
  this.ctx = this.canvas.getContext("2d");
  var gameBoard = document.getElementById("game-board");
  gameBoard.insertBefore(this.canvas, gameBoard.childNodes[0]);
  console.log("start")
}}

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
  this.speedY = speedY;
  this.gravity = 0.05;
  this.gravitySpeed = gravitiySpeed;
  this.y = myGameArea.canvas.height/2;
  this.x = myGameArea.canvas.width/3;

  this.update = function() {
    myGameArea.ctx.drawImage(imgFlappy, this.x, this.y, width, height) 
  }
  this.newPos = function() {
    this.gravitySpeed += this.gravity;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
     }
  this.hitBottom = function (){
    if (this.y > 450) {
      this.y = 450;
    }
}}

var flappy = new Bird(50,50,0);

document.onkeydown = function(e) {
    flappy.gravitiy=-1;
};

document.onkeyup = function(e) {
  
};



function updateCanvas() {
  flappy.speedY = 4;
  backgroundImage.move();
  flappy.newPos();
  myGameArea.ctx.clearRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
  backgroundImage.draw();
  flappy.update();    
}

// start calling updateCanvas once the image is loaded
//  img.onload = updateCanvas;
