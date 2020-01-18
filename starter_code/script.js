
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let interval;
let frames = 0;
const obstacles = []


const images = {
  background: './images/bg.png',
  flappy: './images/flappy.png',
  obstacleBottom: './images/obstacle_bottom.png',
  obstacleTop: './images/obstacle_top.png'
};


window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };
}

class Board {
  constructor() {
    this.x = 0,
    this.y = 0,
    this.width = canvas.width,
    this.heigth = canvas.height,
    this.img = new Image(),
    this.img.src = images.background
  }

  draw(){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.heigth );
    ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.heigth )
    this.x -=10
    if(this.x < -canvas.width){
      this.x = 0
    }
  }

}

const startBoard = new Board();

function startGame() {
  startBoard.draw();
}

function update() {
startBoard.draw();
}

function start(){
  interval = setInterval(update,1000);
}

start()