/* window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {

  }

}; */


// 1. Obtener elementos del HTML (DOM)


const $button = document.getElementById("start-button");
const $canvas = document.getElementById("my-canvas");
const ctx = $canvas.getContext("2d");




// 2. Declarar las variables globales
let intervalId;
let frames = 0;
const GRAVITY = 0.2;
const obstacles = []
let isGameOver = false;



// 3. Definir clases (Propiedades y Metodos)


// Clase generica con lo minimo indispensable para que un elemento del juego sea representado y se logre pintar.
class GameMold {
  constructor(x, y, width, heigth, img){
    this.x = x;
    this.y = y;
    this.width = width;
    this.heigth = heigth;
    this.image = new Image ();
    this.image.src = img;
  }

  draw(){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.heigth)
  }
}

class Background extends GameMold {
  constructor(x, y, width, heigth, img){
    super(x, y, width, heigth, img)
  }

  // Aqui se realiza lo que se conoce como poliformismo a DRAW (Quiere decir que se cambia el comportamiento de la clase padre, en la hija)
  
  draw(){
    this.x--
    // Aqui se genera el efecto de fondo infinito
    // Y cuando la posicion de X es menor que el ancho negatico (cuando la primer imagen sale del canvas, se resetea X a 0 para volver a inciar )
  
    if(this.x < -this.width) this.x = 0;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.heigth)
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width, 
      this.heigth
    )
  }
}



class Character extends GameMold {
  constructor(x, y, width, heigth){
    super(x, y, width, heigth);

    this.img = new Image();
    this.img.src = "/images/flappy.png"
    this.animation = 0;
    this.vy = 0;
  }


  draw(){
    this.vy = GRAVITY;
    this.y = this.vy;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }


  crash(){
    return this.y < 0 || this.y > this.heigth > $canvas.height;
  }


  jump(){
    this.vy -= 5;
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


class Obstacle extends GameMold {
  constructor(y, width, heigth, img) {
    super($canvas.width, y, width, heigth, img)
  }

  draw(){
    this.x--;
    ctx.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}



// 4. Instancias de las clases 


const gameMoldImage = "/images/bg.png";
const flappyImage = "/images/flappy.png";
const board = new GameMold(0, 0, $canvas.width, $canvas.height, gameMoldImage);
const flappy = new Character(30, $canvas.height / 3, 60, 60);




// 5. Funciones principales

function start() {
  if(intervalId) return;
  intervalId = setInterval(() => {
    update();
  }, 1000 / 60);
}


function update() {
  frames++;
  generateObstacles();
  checkCollitions();
  clearCanvas();
  board.draw();
  flappy.draw();
  drawObstacles();
  gameOver();  
}



function gameOver() {
  if(isGameOver){
    ctx.font = "50 px sans-serif"
    ctx.fillText("Game Over!", $canvas.width / 3, $canvas.height / 2)
  }
}




// 6. Funciones de apoyo


function clearCanvas() {
  ctx.clearRect(0, 0, $canvas.width, $canvas.height);
}



function generateObstacles() {
  if(frames % 100 === 0){

    const limitHeigth = 100;
    const window = 80;
    const randomHeight = Math.floor(Math.random() * limitHeigth);
    const obstacle1 = new Obstacle(0, 25, randomHeight);
    const obstacle2 = new Obstacle(
      randomHeight + window, 
      25, 
      $canvas.height - (randomHeight + window)
    );

    obstacles.push(obstacle1)
    obstacles.push(obstacle2)

  }


  // Aqui nos aseguramos de solo tener los obstaculos que se muestran en la pantalla dentro del array para no ralrntizar el juego

  obstacles.forEach((obs, index) => {
   if(obs.x + obs.width < 0) obstacles.splice(1, index)
  });
}




function checkCollitions(params) {
  if(flappy.crash()){
    clearInterval(intervalId);
    isGameOver = true;
  }

  obstacles.forEach((obs) => {
    if(flappy.isTouching(obs)){
      clearInterval(intervalId)
      isGameOver = true;
    }
  });
}


function drawObstacles() {
  obstacles.forEach((obstacle) => {
    obstacle.draw();
  });
}



// 7. Interaccion con el usuario e iniciarlo al mismo tiempo


document.onkeyup = (event) => {
  switch (event.key) {
    case " ":
      // Hacer que flappy brinque
      flappy.jump;
      break;
    case "Enter":
    // Inicializar el juego
    start();
    default:
    break;
  }
};















