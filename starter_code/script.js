window.onload = function () {
  function startGame() {
    faby.gravity = 0.4;
    started = 1;
  }

  document.getElementById('start-button').onclick = function () {
    startGame();
  };
};

let started = 0;

const img = new Image();

const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

const backgroundImage = {
  img: img,
  x: 0,
  speed: -1,

  move: function () {
    this.x += this.speed;
    this.x %= canvas.width;
  },

  draw: function () {
    ctx.drawImage(this.img, this.x, 0);
    if (this.speed < 0) {
      ctx.drawImage(this.img, this.x + canvas.width, 0);
    } else {
      ctx.drawImage(this.img, this.x - this.img.width, 0);
    }
  },
};

const faby = {
  x: 200,
  y: 250,
  width: 50,
  height: 35,
  speedY: 0,
  gravity: 0,
};

function update () {

}

function newPos () {
  faby.speedY += faby.gravity;
  faby.y += faby.speedY;
}

function jump () {
  faby.speedY = -10;
  console.log("jump");
}

document.onkeydown = function (e) {
  if (e.keyCode === 32){
    jump();
  }
}

img.src = 'images/bg.png';

function updateCanvas() {
  backgroundImage.move();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  backgroundImage.draw();
  newPos();
  drawFaby();
  if(started === 1){
    drawObstacles();
  }

  if(!checkCrash()){
    requestAnimationFrame(updateCanvas);
  }
}

img.onload = updateCanvas;

var fabyImg = new Image();
var topImg = new Image();
var bottomImg = new Image();
fabyImg.src = 'images/flappy.png';
topImg.src = 'images/obstacle_top.png';
bottomImg.src = 'images/obstacle_bottom.png';

function drawFaby () {
  ctx.drawImage(fabyImg, faby.x, faby.y, faby.width, faby.height)
}

function drawObstacles(){
  for(let i = 0; i < obstacles.length; i++){
    obstacles[i].x -= 2;
    
    ctx.drawImage(topImg, obstacles[i].x, obstacles[i].y - 100 - 793, 75, 793)
    ctx.drawImage(bottomImg, obstacles[i].x, obstacles[i].y + 100, 75, 793)
  }
}

var obstacles = []; // 138 793

function Obstacle(y){
  this.y = y;
  this.x = 500;
}

function yObstacle(){
  return 100 + Math.floor(Math.random() * 25) * 4;
}

setInterval(function(){
  if(started === 1){
    const myObstacle = new Obstacle(yObstacle());
    obstacles.push(myObstacle);
  }
}, 2000)

function checkCrash(){
  if(faby.y > 504){
    alert('Out of bounds!');
    return true;
  }

  for(let i = 0; i < obstacles.length; i++){
    if(faby.x > obstacles[i].x && faby.x < obstacles[i].x + 75 && (faby.y > obstacles[i].y + 100 || faby.y < obstacles[i].y - 100)){
      alert('Crash!');
      return true;
    }
  }
}
