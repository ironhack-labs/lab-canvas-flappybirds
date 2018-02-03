var flappy;
var obstacles;
var points = 0;
var frames = 0;
var bg = new Image();
bg.src = "images/bg.png";

var x = 0;

var myFlappyArea = {
  canvas: document.getElementById("canvas"),
  frames: 0,
  start: function(){
    this.ctx = this.canvas.getContext("2d");
    this.interval = setInterval(updateAll, 10);
  },
  stop: function(){
    clearInterval(this.interval);
    myFlappyArea.ctx.clearRect(0, 0, 900, 504);
     myFlappyArea.ctx.drawImage(bg, x, 0, 900, 504);

     myFlappyArea.ctx.drawImage(bg, x+900, 0, 900, 504);
     for (var i = 0; i< obstacles.length; i++){
       obstacles[i].update();
     }

     if(flappy.y >= 470){
      myFlappyArea.ctx.drawImage(flappy.gameOver, 330, 150, 200, 200);
    } else {
      myFlappyArea.ctx.drawImage(flappy.gameOver, flappy.x, flappy.y, 100, 100);
    }
    myFlappyArea.score();
  },
  score: function(){
    this.ctx.font = "18px serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Score: "+points, 30, 30);
  }
}

function updateAll() {
  if(flappy.y > 470){
    myFlappyArea.stop();
    return;
  }
  
  for (var p = 0 ; p< obstacles.length; p++){
    if (flappy.crashWith(obstacles[p])) {
      myFlappyArea.stop();
      return;
    }
  }
  myFlappyArea.frames++;
  //Cuando la segunda imagen termine, se reinicia la x a 0
  if( x < -900){
    //Esto hace que se coloque la imagen 1 en la primera posición
    x = 0;
  }
  flappy.y += (flappy.speedY * flappy.gravity)
  //Infinite loop with images
  myFlappyArea.ctx.drawImage(bg, x, 0, 900, 504);
  //Creates a new image in x axis + the image width
  myFlappyArea.ctx.drawImage(bg, x + 900, 0, 900, 504);
  x--;

  myFlappyArea.ctx.drawImage(flappy.img, flappy.x, flappy.y, flappy.width, flappy.height);

  if(myFlappyArea.frames > 700 && myFlappyArea.frames % 150 === 0){
    points++;
  }

  if(myFlappyArea.frames % 150 === 0){
    minHeight = 50;
    maxHeight = 250;
    width = 60;
    minGap = 150;
    maxGap = 200;
    height = Math.floor(Math.random() * (maxHeight - minHeight+1)) + minHeight;
    gap = Math.floor(Math.random() * (maxGap - minGap+1)) + minGap;
    obstacles.push(new Obstacle(width, height, 900, 0, 0));
    obstacles.push(new Obstacle(width, 504 - height - gap, 900 , height + gap, 1));
  }

  for (var i = 0; i < obstacles.length; i++){
    obstacles[i].x--;
    obstacles[i].update();
  }

  myFlappyArea.score();
}

function Flappy(){
  this.width = 50;
  this.height = 37;
  this.speedX = 1;
  this.speedY = 1;
  this.gravity = 0;
  this.gravitySpeed = 0;
  this.img = new Image;
  this.img.src = "images/flappy.png";
  this.gameOver = new Image;
  this.gameOver.src = "images/flappy-bird-game-over.png";
  this.x = 250;
  this.y = 250;
}

Flappy.prototype.move = function(){
  if (this.y > 70){
    this.y -= 70; 
  }
}

Flappy.prototype.left = function(){
  return this.x;
}
Flappy.prototype.right = function(){
  return this.x + 50;
}
Flappy.prototype.top = function(){
  return this.y;
}
Flappy.prototype.bottom = function(){
  return this.y + 37;
}

Flappy.prototype.crashWith = function(obstacle){
  return !((this.bottom() < obstacle.top()) ||
  (this.top() > obstacle.bottom()) ||
  (this.right() < obstacle.left()) ||
  (this.left() > obstacle.right()))
}

document.onkeydown = function(e) {
  if(e.keyCode === 32){
    flappy.move();
    flappy.gravity = 2;
  }
}

function Obstacle(width, height, x, y, side){
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.img = new Image;
  if (side === 0){
    this.img.src = "images/obstacle_top.png";
  } else {
    this.img.src = "images/obstacle_bottom.png"
  }
  this.update = function(){
    myFlappyArea.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

Obstacle.prototype.left = function(){
  return this.x;
}
Obstacle.prototype.right = function(){
  return this.x + this.width;
}
Obstacle.prototype.top = function(){
  return this.y;
}
Obstacle.prototype.bottom = function(){
  return this.y + this.height;
}

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    document.getElementById("start-button").innerHTML = "Restart"
    startGame();
  };

};

var flappy;
function startGame() {
  clearInterval(myFlappyArea.interval);
  obstacles = [];

  points = 0;
  myFlappyArea.start();
  myFlappyArea.frames = 0;
  flappy = new Flappy();

  //Reinicia el contador
}


