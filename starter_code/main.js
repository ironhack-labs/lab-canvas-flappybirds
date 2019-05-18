//Variables set interval ayuda para que se detenga

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var frames = 0;
var pipes = [];
var gravity = 2;
var interval;
//probamos que todo funcione:
//ctx.fillRect(0,0,50,50);

// Clases básicas

class Flappy {
  constructor() {
    this.x = 120;
    this.y = 200;
    this.width = 30;
    this.height = 30;
    this.image = new Image();
    this.image.src = "./images/flappy.png";
  }

  rise() {
    this.y -= 60;
  }

  collision(item) {
    return (
      this.x < item.x + item.width &&
      this.x + this.width > item.x &&
      this.y < item.y + item.height &&
      this.y + this.height > item.y
    );
  }
  draw() {
    if (this.y < canvas.height - 30) this.y += gravity;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
class Pipe {
  constructor(pos, y, height) {
    this.x = canvas.width; // que las pipes vayan de afuera a adentro
    this.y = y; // lo pasamos desde el exterior cuando tengamos una instancia
    this.width = 60;
    this.height = height;
    this.image = new Image();
    this.image.src =
      pos === "top"
        ? "./images/obstacle_top.png"
        : "./images/obstacle_bottom.png"; //si la variable pos es igual top entonces regreso la imagen top antes de ? operador ternario
  }
  draw() {
    this.x -= 4; //los pipes se dibujan fuera del canvas
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Backgroun {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.image = new Image();
    this.image.src = "./images/bg.png";
  }
  gameOver() {
    ctx.font = "40px Avenir";
    ctx.fillText("GameOver", 275, 300);
    clearInterval(interval);
    ctx.fillText("press 'RESET' to Start", 200, 150);
  }

  draw() {
    this.x--;
    if (this.x < -canvas.width) this.x = 0;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x + canvas.width,
      this.y,
      this.width,
      this.height
    );
  }
}

flappy = new Flappy();
fondo = new Backgroun();

//funcion que ayude a enerar los pipes un valor de 30 px y 60 por ciento de canvas

function generatePipes() {
  //definir cada cuando creo pipes
  if (!(frames % 120 === 0)) return;
  let height = Math.floor(Math.random() * canvas.height * 0.6 + 30);
  let pipe1 = new Pipe("top", 0, height);
  let pipe2 = new Pipe(null, pipe1.height + 120, canvas.height - 120);
  pipes.push(pipe1);
  pipes.push(pipe2);
  console.log(pipes);
}
// dibujar las pipes

function drawPipes() {
  pipes.forEach((pipe, index) => {
    if (pipe.x < -canvas.width - 30) return pipes.splice(index, 2); // cuando ya salió el pipe del canvas
    pipe.draw(); //para dibujar las instancias en el  arreglo
    if (flappy.collision(pipe)) {
      gameOver();
    }
  });
}

interval = setInterval(function() {
  frames++;
  ctx.clearRect(0, 0, canvas.width, canvas.heigth);
  fondo.draw();
  flappy.draw();
  generatePipes();
  drawPipes();
  //llamo arriba todas las  funciones
}, 1000 / 60);
//function reestablecer

function gameOver() {
  clearInterval(interval);
  fondo.gameOver();
}

function restart() {
  frames = 0;
  interval = undefined;
  pipes = [];
  start();
}

//que va escuchar
addEventListener("keydown", function(e) {
  if (e.keyCode === 32) {
    flappy.rise();
  }
  if (e.keyCode === 27) {
    restart();
  }
});

start();
pipes = [];
