/*jshint esversion: 6 */

////////////////////////////////////
//CREATION OF OBJECT WITH ALL IMAGES
const images = {
  bg:
    'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/bg.png?raw=true',
  flappy:
    'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/flappy.png?raw=true',
  logo:
    'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/logo.png?raw=true',
  bottomPipe:
    'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_bottom.png?raw=true',
  topPipe:
    'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_top.png?raw=true'
};
////////////////////////////////////
//UNIVERSAL VARIABLES
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let interval; // inventary para acelerar y detener
let frames = 0; // vari auxiliar para tener nocion del tiempo
const obstacles = []; // split obstacle que ya no sirve
let score = 0;


////////////////////////////////////
//LOAD ALL THIS WHEN WINDOW OPENS
window.onload = function() {
  document.getElementById("start-button").onclick = function() {
     startGame();
     counterPoints();
  };
};// end of unload

function counterPoints() {
  ctx.font = '30px Courier';
  ctx.fillText(`Score: ${score}`, 20,40);
  //clearCanvas();
}

////////////////////////////////////
//CREATION OF BACKGROUND
class Board {
  constructor(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image(); //attach new image
    this.img.src = images.bg;
    this.img.onload = () => { //img appears on onload
      this.draw();
    };
  }// end constructor
  draw(){
    this.x--; // decrease x to move down
    if(this.x < -canvas.width) this.x=0; // if img is out fo canvas
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height); // drae normal images
    ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height); // we draw another duplicate image right after the first to loop background
  }

}// en class board

////////////////////////////////////
//CRETION OF FLAPPY OBJECT
class Flappy {
  constructor() {
    this.x = 100;
    this.y = 150;
    this.width = 50;
    this.height = 50;
    this.img = new Image();
    this.img.src = images.flappy;
    this.img.onload = () => {
      this.draw();
    };
  }
  draw() {
    this.y++;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  fly() {
    this.y -= 20;
    // if(this.y > this.height){
    //   this.y = this.height;
    // } //keep bird in window and loose
    // if(this.y < 0){
    //   this.y = this.height;
    // }
  }
  isTouching(obstacle) {
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
    );
  }
} //end of class flappy

const board = new Board();
const flappy = new Flappy();

////////////////////////////////////
//CREATE THE OBSTACLES PIPES
class Obstacle {
  constructor(y, height, type) {
    this.x = canvas.width + 50;
    this.y = y;
    this.height = height;
    this.width = 50;
    this.imgTop = new Image();
    this.imgTop.src = images.topPipe;
    this.imgBot = new Image();
    this.imgBot.src = images.bottomPipe;
    this.type = type;
  }
  draw() {
    this.x--;
    if (this.type) {
      ctx.drawImage(this.imgTop, this.x, this.y, this.width, this.height);
    } else {
      ctx.drawImage(this.imgBot, this.x, this.y, this.width, this.height);
    }
  }
}

function generatePipes(){
    // maximo de un pipe
    const max = canvas.height - 100;
    // minimo de un pipe
    const min = 80;
    // espacio calculado a traves de mucho research para saber donde si quepo, sin albur
    const ventanita = 130;
    // expresion matematica, hecha por los dioses, e Isaac Newton, para calcular max o min
    const randomHeight = Math.floor(Math.random() * (max - min));
    if (frames % 300 === 0) {
      obstacles.push(new Obstacle(0, randomHeight, true));
      obstacles.push(
        new Obstacle(randomHeight + ventanita, canvas.height - randomHeight - ventanita, false)
      );
    }
}

////////////////////////////////////
//DRAW OPSTACLES
function drawPipes() {
  generatePipes();
  obstacles.forEach((pipe) => pipe.draw());

}

////////////////////////////////////
//UPDATE THE CANVASS
function update() {
  frames++; 
  clearCanvas();
  board.draw();
  flappy.draw();
  drawPipes();
  checkCollition(); 
  counterPoints();
  score +=  1 ;
 
}

////////////////////////////////////
//CLEAR THE CANVASS
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

////////////////////////////////////
//START GAME FUNCTION
function startGame() {
  if (interval) return;
  interval = setInterval(update, 1000 / 60);
}// end function start game


////////////////////////////////////
function checkCollition() {
  obstacles.forEach((pipe) => {
    if (flappy.isTouching(pipe)) {
      gameOver();
    }
    if (flappy.y <= 0 || flappy.y >= canvas.height - flappy.height) {
      gameOver();
    }
  });
}

////////////////////////////////////
function gameOver() {
  ctx.font = '30px Courier';
  ctx.fillText('Game over', canvas.width / 2, canvas.height / 2);
  clearInterval(interval);
}



////////////////////////////////////
//RESTART GAME FUNCTION
function restart() {
  interval = false;
  flappy.x = 30;
  flappy.y = 70;
  startGame();
}

////////////////////////////////////
//KEYBOARD CONTROL
document.onkeydown = (e) => {
  switch (e.keyCode) {
    case 32:
    flappy.fly();
    break;

    case 13:
    start();
    break;

    case 82:
    restart();
    break;

    default:
    break;
  }
};

