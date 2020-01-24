const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  fps: 60,
  obstacles: [],
  framesCounter: 0,
  score: undefined,
  keys: {
    TOP_KEY: 32
  },

  init() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = window.innerWidth * 0.98;
    this.height = window.innerHeight * 0.98;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.start();
  },

  start() {
       this.reset(); // Reiniciamos configuración del juego
       this.interval = setInterval(() => {
      //   //Intervalo de juego.
      //   this.framesCounter++; //Contador de frames
      //   // controlamos que frameCounter no sea superior a 1000
      //   if (this.framesCounter > 1000) this.framesCounter = 0;
      //   // controlamos la velocidad de generación de obstáculos
      //   if (this.framesCounter % 100 == 0) this.score++; //Aumentamos la puntuación de la partida cada 100 frames.
      //   this.clear();
        this.drawAll();
        this.moveAll();
        this.generateObstacles(); //Generamos obstaculos
        // eliminamos obstáculos fuera del canvas
        this.clearObstacles(); // Limpiamos del array de obstaculos los que salgan de la pantalla
      // //   if (this.isCollision()) {
      // //     this.gameOver();
      //   } // Comprobamos colisiones
    }, 1000/60);
  },

  reset() {
    //     //reset del game
    //    this.background = new Background(this.ctx, this.width, this.height);
    this.bird = new Bird(this.ctx, this.width, this.height, this.keys);

    this.background = new Background(this.ctx, this.width, this.height);
    

    //     this.player = new Player(this.ctx, this.canvas.width, this.canvas.height, this.keys);
    //     this.scoreboard = ScoreBoard;
    //     this.scoreboard.init(this.ctx);
    //     this.score = 0;
        this.obstacles = [];
  },

  drawAll() {
    this.background.draw();
    this.bird.draw();
    

    // this.player.draw(this.framesCounter);
    this.obstacles.forEach(obs => obs.draw());
    // this.drawScore();
  },

    moveAll() {
     
      this.bird.move();
    //   this.obstacles.forEach(obs => obs.move());

      
    },



  //   clear() {
  //     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  //   },

   generateObstacles() {
   if (this.framesCounter % 70 == 0) {
      //Generamos obstaculos cada 70 frames.
    console.log(this.obstacles);
        this.obstacles.push(new Obstacle(this.ctx, this.canvas.width, this.player.posY0, this.player.height)); //pusheamos nuevos obstaculos
    }
    },
     clearObstacles() {
      //funcion para limpiar obs
      this.obstacles.forEach((obs, idx) => {
        if (obs.posX <= 0) {
          this.obstacles.splice(idx, 1);
        }
      });
    },

  //   isCollision() {
  //     // funcion para comprobar colisiones
  //     return this.obstacles.some(
  //       obs =>
  //         this.player.posX + this.player.width >= obs.posX &&
  //         this.player.posY + this.player.height >= obs.posY &&
  //         this.player.posX <= obs.posX + obs.width
  //     );
  // },

  // drawScore() {
  //     //con esta funcion pintamos el marcador
  //     this.scoreboard.update(this.score);
  //   },
  //   gameOver() {
  //     //Gameover detiene el juego.
  //     clearInterval(this.interval);
  //   }
}