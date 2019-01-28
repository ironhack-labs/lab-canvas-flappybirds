//Canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//Globals
let gamestarted = false
let interval;
let frames = 0;
let images = {
  bg: "./images/bg.png",
  flappy: "./images/flappy.png",
  bottomPipe: "./images/obstacle_bottom.png",
  topPipe: "./images/obstacle_top.png"
};
let sounds = {
  die: './music/sfx_die.wav',
  point: './music/sfx_point.wav',
  wing: './music/sfx_wing.wav',
  song: './music/Tetris Theme Song A.mp3'
}
let pipeSpeed = 2;
let bgSpeed = 1;
let pipes = [];
let pipeSpacing = 150
let pipeApperture = Math.floor(Math.random() * 100) + 100;
let gravity = 0.0981
let jumpStrength = 2
let score = 0

//Clases
function Board() {
  this.x = 0;
  this.y = 0;
  this.width = canvas.width;
  this.height = canvas.height;
  this.image = new Image();
  this.image.src = images.bg;
  this.song = new Audio()
  this.draw = function() {
    if (this.x < -canvas.width) {
      this.x = 0;
    }
    this.x -= bgSpeed;
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
    this.velY = 0;
    this.height = 40;
    this.width = 50;
    this.image = new Image();
    this.image.src = images.flappy;
    this.image.onload = this.draw.bind(this);
  }
  draw() {
    if (this.y < canvas.height - this.height) {
      this.y += this.velY
    } else {
      gameOver()
    }
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

class Pipe {
  constructor(height = 100, isTop = false, y = 0) {
    this.x = canvas.width;
    this.y = y; //isTop ? 0 : canvas.height - height - 3;
    this.height = height;
    this.width = 80;
    this.image = new Image();
    this.image.src = isTop ? images.topPipe : images.bottomPipe;
    this.image.onload = this.draw.bind(this);
  }
  draw() {
    this.x -= pipeSpeed;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

//Instancias
let board = new Board();
let flappy = new Flappy();

//Main Functions
function startGame() {
  interval = setInterval(update, 1000 / 60);
  score = 0
}
function update() {
  // if(frames === 416) {gameOver()
  //   return}
  randomizeVars()
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  board.draw();
  flappy.draw();
  if (frames % pipeSpacing === 0) {
    generatePipes();
  }
  deletePipes();
  //console.log(pipes.length);
  move()
  drawPipes();
  checkCollitions();
  scoreCounter()
  drawScore()
  frames++;

}
function gameOver() {
  clearInterval(interval);
  ctx.font = "100px 'Flappy Bird'";
  ctx.textAlign = 'center'
  ctx.fillStyle = "red";
  ctx.fillText("GAME OVER",canvas.width/2, canvas.height/2+25);
  // gamestarted = false
  frames = 0
  pipes = [];
  flappy.y = 50
  flappy.velY= 0
  board.song.pause()
  let die = new Audio()
  die.src = sounds.die
  die.play()
}

//Auxiliar Functions
function drawPipes() {
  for (p in pipes) {
    pipes[p].draw();
  }
}
function generatePipes() {
  let height = Math.max(Math.floor(Math.random() * 300), 50);
  pipes.push(new Pipe(height, true));
  let y = height + pipeApperture;
  let height2 = canvas.height - y;
  pipes.push(new Pipe(height2, false, y));
}
function deletePipes() {
  for (p in pipes) {
    if (pipes[p].x <= -pipes[p].width) {
      pipes.splice(p, 1);
    }
  }
}
function checkCollitions() {
  pipes.forEach(pipe => {
    if (flappy.checkIfTouch(pipe)) {
      gameOver();
    }
  });
}
function move(){
  flappy.y += flappy.velY
    flappy.velY += gravity
    //console.log(flappy)
}

function randomizeVars(){
  pipeApperture = Math.floor(Math.random() * 100) + 100;
}
function drawScore(){
  ctx.open
  ctx.font = "50px 'Flappy Bird'";
  ctx.textAlign = 'center'
  ctx.fillStyle = "yellow"
  ctx.fillText(score, 850,50)
}
function scoreCounter(){
  let point = new Audio()
  point.src = sounds.point
  if (score >= 1 && (frames-416)%150 === 0) {
    score++   
    point.play()
 }
  if (frames === 416) {
    score = 1
    point.play()
  }

}

//Listeners
document.getElementById("start-button").onclick = function() {
  if (!gamestarted) {
    startGame()
    gamestarted = true
    board.song.src = sounds.song
    board.song.loop = true
    board.song.volume = 0.75
    board.song.play()
  }
};

addEventListener("keypress", e => {
  if (e.keyCode === 38 || e.keyCode === 32) {
    let wing = new Audio()
    wing.src = sounds.wing
    wing.play()
    if (flappy.y > flappy.height) {
      flappy.velY = 0
      flappy.grounded = false
      flappy.jumping = true
      flappy.velY += -jumpStrength
    }
  }
});
