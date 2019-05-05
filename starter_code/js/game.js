const Game = {
  canvas: undefined,
  ctx: undefined,
  canvasSizes: {
    w: undefined,
    h: undefined
  },
  fps: undefined,
  update: undefined,
  framesCounter: undefined,
  // Referente al background
  background: undefined,
  // Referente al player
  player: undefined,
  // teca a
  key: 65,
  // Referente al obstaculo
  imgObstacleTop: 'images/obstacle_top.png',
  imgObstacleBottom: 'images/obstacle_bottom.png',
  obstacle: undefined,
  obstaclesArray: undefined,
  // Referente al Scoreboard
  scoreBoard: undefined,
  score: undefined,

  init: function (canvasId) {
    // Obtenemos el id del canvas, extraemos el objeto canvas y el contexto
    this.canvas = document.getElementById(canvasId)
    this.ctx = this.canvas.getContext('2d')

    // Inicializaciones
    this.canvasSizes.w = window.innerWidth
    this.canvasSizes.h = window.innerHeight
    this.fps = 60

    // llamadas de inicializacion
    this.setDimensions()
    this.setHandlers()

    // Start
    this.start()


  },

  setDimensions: function () {
    // Edita las dimensiones en el canvas
    this.canvas.setAttribute('width', this.canvasSizes.w)
    this.canvas.setAttribute('height', this.canvasSizes.h)
  },

  setHandlers: function () {
    window.onresize = () => this.setDimensions()
  },

  start: function () {
    // Resetea todos los elementos del juego
    this.reset()
    // SetListener que activa el evento onClick para comenzar a crear obstaculos 
    this.setListenerStart()

    // Update 
    this.update = setInterval(() => {

      // Aumenta en 1 el contador
      this.framesCounter++;
      // controlamos que frameCounter no sea superior a 1000
      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }

      // Despues de pulsar la tecla por primera vez
      if (this.score >= 0) {
        // controlamos la velocidad de generación de obstáculos y el score cada segundo
        if (this.framesCounter % 60 === 0) {
          this.score++
          this.generateObstacle();
        }
      }

      // eliminamos obstáculos fuera del canvas
      this.clearObstacles();

      // Llamadas a los metodos
      this.clear()
      this.drawAll()
      this.moveAll()

      // Chequea las colisiones
      if (this.checkCollision()) this.gameOver()

    }, 1000 / this.fps)

  },

  reset: function () {
    // Situacion inicial
    this.framesCounter = 0
    this.background = new Background(this.ctx, this.canvasSizes.w, this.canvasSizes.h)
    this.player = new Player(this.ctx, this.canvasSizes.w, this.canvasSizes.h, this.key)
    this.obstaclesArray = []
    this.scoreBoard = new ScoreBoard(this.ctx, this.canvasSizes.w)
    this.score = undefined
  },

  clear: function () {
    // Borra todos los elementos del canvas
    this.ctx.clearRect(0, 0, this.canvasSizes.w, this.canvasSizes.h)
  },

  drawAll: function () {
    // Dibuja todos los elementos del canvas
    this.background.draw()
    this.player.draw()
    this.obstaclesArray.forEach(obstacle => {
      obstacle.draw()
    })
    this.scoreBoard.draw(this.score)
  },

  moveAll: function () {
    // Mueve todos los elementos del canvas
    this.background.move()
    this.player.move()
    this.obstaclesArray.forEach(obstacle => {
      obstacle.move()
    })
  },

  generateObstacle: function () {
    this.obstaclesArray.push(
      new ObstacleTop(this.ctx, this.canvasSizes.w, this.canvasSizes.h, this.imgObstacleTop)
    )
    this.obstaclesArray.push(
      new ObstacleBottom(this.ctx, this.canvasSizes.w, this.canvasSizes.h, this.imgObstacleBottom)
    )
  },

  //esto elimina los obstáculos del array que estén fuera de la pantalla
  clearObstacles: function () {
    this.obstaclesArray = this.obstaclesArray.filter((obstacle) => {
      return (obstacle.x + obstacle.w) >= 0;
    });
  },

  checkCollision: function () {
    const gap = 19

    return (
      (this.player.y + this.player.h > this.canvasSizes.h + gap) ||
      this.obstaclesArray.some(obstacle => {
        return (
          this.player.x + this.player.w >= obstacle.x + gap &&
          obstacle.x + obstacle.w >= this.player.x &&
          obstacle.y + obstacle.h >= this.player.y &&
          this.player.y + this.player.h >= obstacle.y + gap
        )
      })
    )
  },

  gameOver: function () {
    this.stop()

    if (confirm("GAME OVER. Play again?")) {
      this.reset();
      this.start();
    }
  },

  stop: function () {
    clearInterval(this.update)
  },

  // SetListener que activa el evento onClick para comenzar a crear obstaculos 
  setListenerStart: function () {
    document.onkeyup = e => {
      // Solo actua cuando score es undefined y lo pone a 0
      this.score = 0
      // Desactivar el evento onclick para que solo se ejecute una vez
      document.onkeyup = null
    }
  }

}