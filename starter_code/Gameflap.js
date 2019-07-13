window.onload = function () {

  document.getElementById("start-button").onclick = function () {
    Game.init("canvas")
  };

  const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    obstacles: [],
    obstaclesTwo: [],
    framesCounter: 0,
    score: undefined,
    keys: {
      KEY_A: 65
    },
    init: function () {
      this.canvas = document.getElementById("canvas")
      this.ctx = this.canvas.getContext("2d")
      this.width = window.innerWidth * .98
      this.height = window.innerHeight * 0.98
      this.canvas.width = this.width
      this.canvas.height = this.height
      this.start()

    },
    start: function () {
      this.reset()        // Reiniciamos configuración del juego
      this.interval = setInterval(() => {     //Intervalo de juego.
        this.framesCounter++                //Contador de frames

        // controlamos que frameCounter no sea superior a 1000
        if (this.framesCounter > 1000) this.framesCounter = 0

        // controlamos la velocidad de generación de obstáculos
        if (this.framesCounter % 100 == 0) this.score++      //Aumentamos la puntuación de la partida cada 100 frames. 
        this.clear()
        this.drawAll()
        this.moveAll()
        this.generateObstacles()
        this.generateObstaclesTwo()                    //Generamos obstaculos

        // eliminamos obstáculos fuera del canvas
        this.clearObstacles()                     // Limpiamos del array de obstaculos los que salgan de la pantalla
        this.clearObstaclesTwo()
        this.isCollision()
        this.isCollisionTwo()                 // Comprobamos colisiones
        this.drawScore()
      }, 1000 / this.fps)

    },
    reset: function () {         //reset del game
      this.background = new Background(this.ctx, this.width, this.height)
      this.player = new Player(this.ctx, this.canvas.width, this.canvas.height, this.keys)
      this.scoreboard = ScoreBoard
      this.scoreboard.init(this.ctx)
      this.score = 0
      this.obstacles = []
      this.obstaclesTwo = []
    },
    drawAll: function () {
      this.background.draw()
      this.player.draw(this.framesCounter)
      this.obstacles.forEach(obs => obs.draw())
      this.obstaclesTwo.forEach(obs => obs.draw())

      //this.drawScore()
    },
    moveAll: function () {
      this.background.move()
      this.player.move()
      this.obstacles.forEach(obs => obs.move())
      this.obstaclesTwo.forEach(obs => obs.move())


    },
    clear: function () {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    //----------------------------------------------------------------------------------
    generateObstacles: function () {
      if (this.framesCounter % 70 == 0) {        //Generamos obstaculos cada 70 frames.
        console.log(this.obstacles)
        this.obstacles.push(new Obstacle(this.ctx, this.canvas.width, this.player.posY0, this.player.height)) //pusheamos nuevos obstaculos
      }
    },
    clearObstacles: function () {        //funcion para limpiar obs
      this.obstacles.forEach((obs, idx) => {
        if (obs.posX <= 0) {
          this.obstacles.splice(idx, 1)
        }
      })
    },
    //----------------------------------------------------------------------------------
    generateObstaclesTwo: function () {
      if (this.framesCounter % 70 == 0) {        //Generamos obstaculos cada 70 frames.
        console.log(this.obstaclesTwo)
        this.obstaclesTwo.push(new ObstacleTop(this.ctx, this.canvas.width, this.player.posY0, this.canvas.height)) //pusheamos nuevos obstaculos
      }
    },
    clearObstaclesTwo: function () {        //funcion para limpiar obs
      this.obstaclesTwo.forEach((obs, idx) => {
        if (obs.posX <= 0) {
          this.obstaclesTwo.splice(idx, 1)
        }
      })
    },
    //----------------------------------------------------------------------------------
    isCollision: function () {           // funcion para comprobar colisiones
      this.obstacles.some(obs => {

        if (this.player.posX + this.player.width >= obs.posX
          && this.player.posY + this.player.height >= obs.posY
          && this.player.posX <= obs.posX + obs.width) {
          //fin del juego, detenemos intervalo
          this.gameOver()
        }
      })

    },
    isCollisionTwo: function () {           // funcion para comprobar colisiones
      this.obstaclesTwo.some(obs => {

        if (this.player.posX + this.player.width >= obs.posX
          && this.player.posY <= obs.posY + obs.height
          && this.player.posX <= obs.posX + obs.width) {
          //fin del juego, detenemos intervalo
          this.gameOver()
        }
      })

    },
    gameOver: function () {              //Gameover detiene el juego.
      clearInterval(this.interval)
    },
    //----------------------------------------------------------------------------------
    drawScore: function () {             //con esta funcion pintamos el marcador
      this.scoreboard.update(this.score)
    },

  };
}
