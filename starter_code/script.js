//canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
//ctx.fillRect(0, 0, 100, 112);

//globals
let score = 0
let interval;
let images = {
  bg:
    "https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/bg.png?raw=true",
  flappy:
    "https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/flappy.png?raw=true",
  topPipe:
    "https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_top.png?raw=true",
  bottomPipe:
    "https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_bottom.png?raw=true"
};
let frames = 0;
let pipes = [];

  let music = new Audio()
  music.src = "http://66.90.93.122/ost/sonic-the-hedgehog-boom/yrkllysc/01%20Sonic%20Boom%20Opening%20Theme.mp3"
  music.loop = true

  let hit = new Audio()
  hit.src = "./sonido/sfx_hit.wav"
  music.loop = true

//clases
function Board() {
  this.x = 0;
  this.y = 0;
  this.width = canvas.width;
  this.height = canvas.height;
  this.image = new Image();
  this.image.src = images.bg;
  this.draw = function() {
    if (this.x < -canvas.width) this.x = 0;
    this.x--;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  };
  this.image.onload = this.draw.bind(this);
  
}

class Flappy {
  constructor() {
    this.x = 150;
    this.y = 50;
    this.width = 50;
    this.height = 40;
    this.image = new Image();
    this.image.src = images.flappy;
    this.image.onload = this.draw.bind(this);
  }
  draw() {
    //abajo
    if (this.y < canvas.height - this.height) this.y += 2;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  checkIfTouch(obstacle) {
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
    );
  }
}

function Pipe(height = 100, y = 0, isTop = true) {
  this.x = canvas.width + 60;
  this.y = y;
  this.width = 60;
  this.height = height;
  this.image = new Image();
  this.image.src = isTop ? images.topPipe : images.bottomPipe;
  this.draw = function() {
    this.x -= 2;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  };
  this.image.onload = this.draw.bind(this);
}

//instances
let board = new Board();
let flappy = new Flappy();

//let pipe1 = new Pipe();

//main functions
function start() {
  interval = setInterval(update, 1000 / 60);
  music.play()
  
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frames++;
  
  board.draw();
  //pipe1.draw();
  generatePipes();
  drawPipes();
  flappy.draw();
  checkCollition();
  
}

function gameOver() {
  clearInterval(interval);
  music.pause()
  hit.play()
  ctx.font = '80px "Press Start 2P" ';
  ctx.fillStyle = "Orange";
  ctx.fillText("GAME OVER", 100, 200);
  ctx.font = '20px "Press Start 2P" ';
  ctx.fillText("Presiona 'espacio' ", 330, 320);
  ctx.fillText("Para reinicar", 330, 280);
}

//aux functions
function generatePipes() {
  let times = [200];
  let i = Math.floor(Math.random() * times.length);
  if (frames % times[i] !== 0) return;
  let height = Math.floor(Math.random() * 300) + 50;
  let top = new Pipe(height);
  let y = height + 100;
  let height2 = canvas.height - y;
  let bottom = new Pipe(height2, y, false);
  pipes.push(top);
  pipes.push(bottom);
}

function drawPipes() {
  pipes.forEach((pipe, index) => {
    //if (pipe.x < -pipe.width) pipes.splice(index, 1);
    pipe.draw();
  });
}

function checkCollition() {
  pipes.forEach(pipe => {
    if (flappy.checkIfTouch(pipe)) {
      gameOver();
    }
  });
}

// function sonido () {
//   this.music = new Audio()
//   this.music.src = "http://66.90.93.122/ost/sonic-the-hedgehog-boom/yrkllysc/01%20Sonic%20Boom%20Opening%20Theme.mp3"
//   this.music.play()
// }

function volando() { 
  this.music = new Audio()
  this.music.src = "/sonido/sfx_wing.mp3"
  this.music.play()
}


//listeners
addEventListener("keydown", e => {
  if (e.keyCode === 32 || e.keyCode === 38) {
    volando()
    if (flappy.y > 35) flappy.y -= 50;
    
  } else if(e.keyCode === 13){
    clearInterval(interval)
    pipes = []
    flappy.x = 20
    flappy.y = 80
    start()
  }
});


// document.querySelector("button").addEventListener("click",()=>{
//   start()
//   update();
 
// })



