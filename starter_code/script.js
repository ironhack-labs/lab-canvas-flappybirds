const images = {
  fondo: './images/bg.png',
  personaje: './images/flappy.png',
  bottomObs: './images/obstacle_bottom.png',
  topObs: './images/obstacle_top.png',
  logo: './images/logo.png'
};
//sujetar el canvas 
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//generar intervalo
let interval;
//arreglo de frames
let frames = 0;
//para imprimir el score
let scoreCount = 0;
let obstacles = [];

class Board {
  constructor(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    //cargar imagen 
    this.img = new Image();
    this.img.src = images.fondo;
    this.img.onload = () => {
      this.draw();
      };
    }
  draw(){
    this.x--; //velocidad fondo
    //si no tengo el if, la imagen solo se estira, aparece la imagen y se va intercaando con la misma para que no se vea cortada
    if(this.x < -canvas.width) this.x = 0;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height);
  }
}

class Personaje {
  constructor(){
    //position of character
    this.x = 30;
    this.y = 160;
    //size of character
    this.width = 50;
    this.height = 50;
    //cargar img
    this.img = new Image();
    this.img.src = images.personaje;
    this.img.onload = () => {
      this.draw();
    };
  }
  draw(){
    this.y++;
    ctx.drawImage(this.img, this.x, this.y ,this.width, this.height);
  }
  fly(){
    this.y -= 20;
  }
  isTouching(obstacle){
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
    );
  }
}
class Obstacle {
  constructor(y, height, type) {
    this.x = canvas.width + 30;
    this.y = y;
    this.height = height;
    this.width = 50;
    this.imgTop = new Image();
    this.imgTop.src = images.topObs;
    this.imgBot = new Image();
    this.imgBot.src = images.bottomObs;
    this.type = type;
  }
  draw(){
    this.x--;
    if (this.type) {
      ctx.drawImage(this.imgTop, this.x, this.y, this.width, this.height);
    } else {
      ctx.drawImage(this.imgBot, this.x, this.y, this.width, this.height);
    }
  }
}
const board = new Board();
const personaje = new Personaje();

function clearCanvas(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}




function checkCollition(){
  obstacles.forEach((pipe) => {
    if(personaje.isTouching(pipe)){
      gameOver();
    }
    if(personaje.y <= 0 || personaje.y >= canvas.height - personaje.height){
      gameOver();
    }
  });
}

function gameOver() {
  ctx.font = '30px Courier';
  ctx.fillText('Game over', canvas.width / 2, canvas.height / 2);

  clearInterval(interval);
  interval = null;
}

function generateObs(){
  const max = canvas.height - 100;
  const min = 50;
  const ventana = 100;
  const randomHeight = Math.floor(Math.random() * (max - min));
  if(frames % 300 === 0){
    obstacles.push(new Obstacle(0, randomHeight, true));
    obstacles.push(new Obstacle(randomHeight + ventana, canvas.height - randomHeight - ventana, false)
    );
  }
}

function score(){
  for(let i = 0; i < 1; i++){
    if(frames % 100 === 0){
      scoreCount++;
    }
  }
}
function points() {
  ctx.font = '20px Arial'
  ctx.fillStyle = 'black'
  ctx.fillText(`Score: ${scoreCount}`, 100 , 100);
}

function drawObs() {
  generateObs();
  obstacles.forEach((pipe) => pipe.draw());
}

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };  
};

function startGame() {
  if(interval) return;
  interval = setInterval(update, 1000 / 90); // /60
}

function restart(){
  /*interval = false;*/
  personaje.x = 30;
  personaje.y  = 70;
  frames = 0;
  obstacles = [];
  scoreCount = 0;
  ctx.clearRect(0,0,canvas.width, canvas.height);
  startGame();
}



document.onkeydown = (e) =>{
  switch(e.keyCode){
    case 32: 
    personaje.fly();
    break;
    // case 13:
    // startGame();
    // break;
    case 82:
      restart();
    break;
    default:
      break;
  }
}


function update(){
  frames++;
  clearCanvas();
  board.draw();
  personaje.draw();
  drawObs();
  checkCollition();
  score();
  points();
}
