
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
    start()
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

class Bird {
  constructor(){
    this.speedX = 50,
    this.speedY= 0,
    this.width= 40,
    this.heigth = 40,
    this.birdImg = new Image(),
    this.birdImg.src = images.flappy
  }

  draw(){
    ctx.drawImage(this.birdImg, this.speedX,this.speedY, this.width, this.heigth)
    this.speedY +=30
    
  }

  gravity(){
    this.speedY -= 20
  }

}


const startBoard = new Board();
const bird = new Bird();

function startGame() {
  startBoard.draw()
  bird.draw()
}

function update() {
startBoard.draw()
bird.draw()
bird.gravity()
}

function start(){
  interval = setInterval(update,800, 60);
}



document.addEventListener('keydown', ({keyCode}) => {

if(keyCode == 32) {
  bird.gravity();
}
})
