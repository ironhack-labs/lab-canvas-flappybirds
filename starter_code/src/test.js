var canvas, context ;
var width = 900;
var height = 504;
var startbutton;
var intervalId;
var x = 0;
var y = 0;

// window.onload = function() {

canvas = document.createElement("canvas");
context = canvas.getContext("2d");

var img = new Image();
img.src = "images/bg.png";

var imgObstacleBottom = new Image();
imgObstacleBottom.src = "images/obstacle_bottom.png"

var imgObstacleTop = new Image();
imgObstacleTop.src = "images/obstacle_top.png"

var ob1 = new Obstacle("bottom", 200, 300, 100, 200);
var ob2 = new Obstacle("top", 200, 0, 100, 200);
var ob3 = new Obstacle("bottom", 600, 300, 100, 200);
var ob4 = new Obstacle("top", 600, 0, 100, 200);

var obArr = [ob1, ob2, ob3, ob4];

var bird1 = new Faby(30, 30, 30, 30, 1, 1, 1, 1);


// Start and Stop //
startButton =  document.getElementById("start-button");
stopButton =  document.getElementById("stop-button");

startButton.onclick = function() {
  console.log("start");
  myGameAre.start();
  intervalId = setInterval(function() {
  updateCanvas();    
  }, 1000/100)
};

stopButton.onclick = function() {
  console.log("stop");
  clearInterval(intervalId);
}

function updateCanvas(){
  context.clearRect(0,0,width, height);
  myGameAre.draw();
  myGameAre.move();
  myGameAre.drawOb();
  // bird1.draw();
}


// Game Canvas and Background image //
var myGameAre = {
  canvas: canvas,
  x: 0,
  y: 0,
  speed: -2,

  start: function() {
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext("2d");
    document.getElementById("game-board").appendChild(this.canvas);
    document.getElementById("game-board").appendChild(canvas); 
  },

  move: function(){
      this.x += this.speed;
      this.x = (this.x) % width;
    },
  
  draw: function(){
    this.context.drawImage(img, this.x, 0);
    // if (this.speed < 0) {
      this.context.drawImage(img, this.x + width, 0);
      this.context.drawImage(img, this.x + 2*width, 0);
    // } else {
      this.context.drawImage(img, this.x - this.width, 0);
    // }
  },

  drawOb: function(){
    this.context.drawImage(imgObstacleBottom, ob1.x, ob1.y, ob1.width, ob1.height);
    this.context.drawImage(imgObstacleTop, ob2.x, ob2.y, ob2.width, ob2.height);

    this.context.drawImage(imgObstacleBottom, ob3.x, ob3.y, ob3.width, ob3.height);
    this.context.drawImage(imgObstacleTop, ob4.x, ob4.y, ob4.width, ob4.height);
  }
}


document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 38: Faby.moveUp();    console.log('up'); break;
    case 40: Faby.moveDown();  console.log('down'); break;
    case 37: Faby.moveLeft();  console.log('left'); break;
    case 39: Faby.moveRight(); console.log('right'); break;
  }
}







  

// };
