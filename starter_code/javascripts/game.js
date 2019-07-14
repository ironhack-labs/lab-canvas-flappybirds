const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  fps: 60,
  framesCounter: 0,
  obstacles: [],
  tobstacles: [],

  keys: {
    W: 87
  },

  init: function(id) {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = window.innerWidth * 0.98;
    this.height = window.innerHeight * 0.98;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.start();
  },

  start: function() {
    this.reset();

    this.interval = setInterval(() => {
      this.framesCounter++; //Contador de frames
      if (this.framesCounter > 1000) this.framesCounter = 0;
      if (this.framesCounter % 100 == 0) this.score++; //Aumentamos la puntuación de la partida cada 100 frames.

      this.clear();
      this.drawAll();
      this.moveAll();
      this.generateObstacles(); //Generamos obstaculos
      this.clearObstacles(); // Limpiamos del array de obstaculos los que salgan de la pantalla
      this.isCollision();
    }, 1000 / this.fps);
  },

  reset: function() {
    this.background = new Background(this.ctx, this.width, this.height);
    this.bird = new Bird(this.ctx, this.canvas.width, this.canvas.height, this.keys);
    this.obstacles = [];
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  drawAll: function() {
    this.background.draw();
    this.bird.draw(this.framesCounter);
    this.obstacles.forEach(obs => obs.draw());
    this.tobstacles.forEach(obs => obs.draw());
  },

  moveAll: function() {
    this.background.move();
    this.bird.move();
    this.obstacles.forEach(obs => obs.move());
    this.tobstacles.forEach(obs => obs.move());
  },

  generateObstacles: function() {
    if (this.framesCounter % 70 == 0) {
      //Generamos obstaculos cada 70 frames.
      console.log(this.obstacles);
      this.obstacles.push(new Obstacle(this.ctx, this.canvas.width, this.bird.posY0, this.bird.height)); //pusheamos nuevos obstaculos
      this.tobstacles.push(new Tobstacle(this.ctx, this.canvas.width, this.bird.posY, this.bird.posX)); //pusheamos nuevos obstaculos
    }
  },

  clearObstacles: function() {
    //funcion para limpiar obs
    this.obstacles.forEach((obs, idx) => {
      if (obs.posX <= 0) {
        this.obstacles.splice(idx, 1);
      }
    });

    this.tobstacles.forEach((tobs, idx) => {
      if (tobs.posX <= 0) {
        this.tobstacles.splice(idx, 1);
      }
    });
  },

  isCollision: function() {
    // funcion para comprobar colisiones

    this.obstacles.some(obs => {
      if (this.bird.posX + this.bird.width >= obs.posX && this.bird.posY + this.bird.height >= obs.posY && this.bird.posX <= obs.posX + obs.width) {
        //fin del juego, detenemos intervalo

        this.gameOver();
      }
    });

    this.tobstacles.some(tobs => {
      if (this.bird.posX + this.bird.width >= tobs.posX && this.bird.posY - this.bird.height <= tobs.posY && this.bird.posX <= tobs.posX + tobs.width) {
        //fin del juego, detenemos intervalo

        this.gameOver();
      }
    });
  },

  gameOver: function() {
    //Gameover detiene el juego.
    clearInterval(this.interval);
  }
};
