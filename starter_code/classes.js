// const canvas = document.querySelector('canvas');
// const ctx = canvas.getContext('2d');
// const obstacles = [];
// let frames = 0;
// let interval;
//imagenes
const imagenes = {
  backg: "./images/bg.png",
  flappy: "./images/flappy.png",
  tubeTop: "./images/obstacle_top.png",
  tubeDwn: "./images/obstacle_bottom.png",
  logo: "./images/logo.png"
};

class Board {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = imagenes.backg;
    this.img.onload = () => {
      this.draw()
    }
  }

  draw() {
    this.x--;
    if (this.x < -canvas.width) this.x = 0;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    // dibujamos la otra imagen, despues de la primer imagen, para que ocupe el espacio en blanco, cuando la primer imagen esta fuera
    ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height);
  }
};


class Flappy {
  costructor() {
    this.width = 50;
    this.height = 50;
    this.x = 30;
    this.y = 150;
    this.img = new Image();
    this.img.src = imagenes.flappy;
    this.img.onLoad = () => {
      this.draw()
    };
  }
  draw() {
    this.y++;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  fly() {
    this.y -= 20;
  }
  isTouching(something) {
    return (
      this.x < something.x + something.width &&
      this.x + this.width > something.x &&
      this.y < something.y + something.height &&
      this.y + this.height > something.y
    );
  }
};

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
  } //cierra draw
};


function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

function update() {
  frames++;
  clearCanvas();
  board.draw();
  flappy.draw();
  drawPipes();
  checkCollition();
};

function checkCollition() {
  obstacles.forEach((pipe) => {
    if (flappy.isTouching(pipe)) {
      gameOver();
    }
    if (flappy.y <= 0 || flappy.y >= canvas.height - flappy.height) {
      gameOver();
    }
  });
};

function gameOver() {
  ctx.font = '30px Courier';
  ctx.fillText('Game over', canvas.width / 2, canvas.height / 2);
  clearInterval(interval);
};

function generatePipes() {
  // maximo de un pipe
  const max = canvas.height - 100;
  // minimo de un pipe
  const min = 50;
  // espacio calculado a traves de mucho research para saber donde si quepo, sin albur
  const ventanita = 100;
  // expresion matematica, hecha por los dioses, e Isaac Newton, para calcular max o min
  const randomHeight = Math.floor(Math.random() * (max - min));
  if (frames % 300 === 0) {
    obstacles.push(new Obstacle(0, randomHeight, true));
    obstacles.push(
      new Obstacle(randomHeight + ventanita, canvas.height - randomHeight - ventanita, false)
    );
  }
};

function drawPipes() {
  generatePipes();
  obstacles.forEach((pipe) => pipe.draw());
};

function start() {
  if (interval) return; //seguro anti doble start
  interval = setInterval(update, 1000 / 30);
};

function restart() {
  interval = false;
  flappy.x = 30;
  flappy.y = 70;
  start();
};