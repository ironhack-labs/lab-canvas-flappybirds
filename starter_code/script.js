window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    if (frames !== 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      location.reload();
      ctx.restore();
      pipes = [];
      flappy.draw();
      frames = 0;

      //start();
    }
    start();
  };

  //ctx.font = "40px Lobster";
  //ctx.fillText("Welcome, avoid the pipes!!", 255, 120);
  ctx.font = "40px Avenir";
  ctx.fillStyle = "white";
  ctx.fillText("Press Start Game to start", 210, 250);
  // ctx.strokeText("Press S to start", 320, 250)
  ctx.font = "20px Avenir";
  ctx.fillStyle = "#6CAF64";
  ctx.fillText("A game by Bliss, Daniela, Alex and Isabella", 260, 490);

  function start() {
    isRunning = true;
    interval = setInterval(update, 1000 / 60);
  }
};
//Manipulacion del canvas

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//Pruebas para definir que sirva
//ctx.fillRect(0, 0, 100, 100);
/*
window.onload = () => {
  ctx.font = "40px Lobster";
};
*/

//Globals
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
let sounds = {
  jump: "http://66.90.93.122/ost/flappy-nes/atwuwezlsi/SFX%206.mp3",
  crash: "http://66.90.93.122/ost/flappy-nes/aajualgvxh/SFX%208.mp3"
};
let frames = 0;
let pipes = [];
let isRunning = false;

//Clases
function Board() {
  this.x = 0;
  this.y = 0;
  this.width = canvas.width;
  this.height = canvas.height;
  this.image = new Image();
  this.image.src = images.bg;
  //Opcional onload porque se refresca con el update, para la portada si sirve
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
  //Es mejor que exista despues
  this.image.onload = this.draw.bind(this);
}

let score = {
  x: 0,
  y: 0,
  draw: function() {
    ctx.fillStyle = "orange";
    ctx.fillRect(327, 0, 100, 30);
  }
};

function drawTime() {
  ctx.fillStyle = "blue";
  //ctx.font = "10px Lobster";
  ctx.fillText("Puntos " + Math.floor(frames / 60), 335, 20);
}

//Mezclado clases y functiones
class Flappy {
  constructor() {
    this.x = 150;
    this.y = 50;
    this.width = 37;
    this.height = 30;
    this.image = new Image();
    this.image.src = images.flappy;
    this.image.onload = this.draw.bind(this);
  }
  draw() {
    //limite para abajo
    if (this.y < canvas.height - this.height) this.y += 2;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  //Recibe objeto
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
  //Default o this.y = ? y : 0
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

//Instances

let board = new Board();
let flappy = new Flappy();
let pipe1 = new Pipe();

//Main functions

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frames++;
  board.draw();
  //pipe1.draw();
  generatePipes();
  drawPipes();
  flappy.draw();
  checkCollision();
  score.draw();
  drawTime();
}

function gameOver() {
  let back = document.getElementById("bg");
  back.classList.toggle("background-red");
  isRunning = false;
  clearInterval(interval);
  ctx.fillStyle = "red";
  ctx.fillText("GAME OVER", 200, 200);
  ctx.fillText("Presiona el botón para reiniciar", 200, 300);
  audioCrash.play();
}

//Aux functions
//Las imagenes siempre se dibujan de arriba a abajo
//Funcion para generar pipes
function generatePipes() {
  //Para generar un pipe por decima de segundo
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
    //Para borrar los pipes una vez que salen
    if (pipe.x < -60) pipes.splice(index, 1);
    pipe.draw();
  });
}

function checkCollision() {
  pipes.forEach(pipe => {
    if (flappy.checkIfTouch(pipe)) {
      gameOver();
    }
  });
}
//Listeners
addEventListener("keydown", e => {
  if (e.keyCode === 32 || e.keyCode === 38) {
    e.preventDefault();
    //Mejor practica: hacer un flappy.goUp()
    if (flappy.y > 30) flappy.y -= 50;
    e.preventDefault();
    //if (audioJump.paused)
    audioJump.currentTime = 0;
    if (isRunning) audioJump.play();
    // else audioJump.pause();
  }
});

//Sounds
let audioJump = new Audio();
audioJump.src = sounds.jump;

let audioCrash = new Audio();
audioCrash.src = sounds.crash;

/*
addEventListener("keydown", e => {
  if (e.keyCode === 65) {
    start();
  }
});
*/

//start();
