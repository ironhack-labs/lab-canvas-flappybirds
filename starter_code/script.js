window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };
//0.Connect the HTML Canvas and create context
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

  function startGame() {
//1.Constants
var interval;
var frames = 0;
//here we save an array of obstacles that will be dinamically created
var obstacles = [];
//we can save the images that we are going to use here
var images = {
  bg: "./images/bg.png",
  flappy: "./images/flappy.png",
  obstacleTop: "./images/obstacle_top.png",
  obstacleBottom: "./images/obstacle_bottom.png"
};

//2.Classes
//we first create our class board
class Board {
  constructor(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.score = 0;
    this.image = new Image();
    this.image.src = images.bg;
    this.image.onload = function() {
      this.draw();
    }.bind(this);
  }
  //we draw the image outside the constructor, but inside our class
  draw(){
    this.x--;
    if(this.x === -this.width) this.x = 0;
    ctx.drawImage(this.image, this.x, this.y, this.width,this.height);
    ctx.drawImage(this.image, this.x + this.width,this.y,this.width,this.height);
 }
}

};
//then we create our character
class Flappy {
  constructor() { //we want Flappy to always appear in the same place of the screen, that's why we give the values of x and y
    this.x = 150;
    this.y = 180;
    this.width = 30;
    this.height = 20;
    this.image = new Image();
    this.image.src = images.flappy;
    this.image.onload = function() {
      this.draw();
    }.bind(this);
    this.gravity = 1.5; //this value is going to be substracted from the y value, so flappy is always "falling" if there is no user action, that is the rise function
  }
  draw() {
    this.y+=this.gravity;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  rise() {
    this.y-=30;
  }
  upsTouched(item){
    return  (this.x < item.x + item.width) &&
            (this.x + this.width > item.x) &&
            (this.y < item.y + item.height) &&
            (this.y + this.height > item.y);
  }
}

//and finally, our obstacles or challenges
class Obstacle {
  constructor(position, y, height) {//we need to give it a position top or bottom, a position on y to start drawing and a height
    this.x = canvas.width;
    this.y = y;
    this.width = 50;
    this.height = height;
    this.image = new Image();
    this.image.src = position === 'top' ? images.obstacleTop : images.obstacleBottom;
    this.image.onload = function() {
      this.draw();
    }.bind(this);
  }
  draw() {
    this.x-=2
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

//3.Instances
var board = new Board();
var flappy = new Flappy();

//4.Main f(x)s
function update() { //resets our board and creates the contents every time according to the interval that we want, in the start function
  frames++;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  board.draw();
  flappy.draw();
  generateObstacles();
  drawObstacles();
}

function start() {//we can stop in the console this interval with the method clearInterval(interval)
  interval = setInterval(update, 1000/60);
}

//5.Aux f(s)s
function generateObstacles() {//the generation of obstacles needs to be aligned with the frames, so we create them under a condition
  if(!(frames%100=== 0)) return;
  //we will need a random number to give them different height every time, keeping their height up 60% of the canvas height and adding 30 px for a window
  var height = Math.floor((Math.random() * canvas.height * .6) + 30);
  //first, I create the top pipe, because the bottom obstacle height and x position depends on it
  var obstacleTop = new Obstacle('top', 0 , height);
  var obstacleBottom = new Obstacle(null, obstacleTop.height + 80, canvas.height - obstacleTop.height - 80);
  obstacles.push(obstacleTop);
  obstacles.push(obstacleBottom);
}
function drawObstacles() {//we randomly created our obstacles instances and now we need to draw them
  obstacles.forEach(function(obstacle) {
    obstacle.draw();
    if(flappy.upsTouched(obstacle)){
      endFlappy();
  }
  });
}

function endFlappy(){
  clearInterval(interval);
}


//6.Listeners
addEventListener('keydown', function(e) {
  if(e.keyCode === 32) {
    flappy.rise();
  }
})
document.getElementById("start-button").addEventListener('click', function(){
  //7.Start the game
  start();
});
