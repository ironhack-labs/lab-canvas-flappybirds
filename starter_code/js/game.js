const Game = {
  canvas: undefined,
  ctx: undefined,
  canvasSizes: {
    w: undefined,
    h: undefined
  },
  fps: undefined,
  update: undefined,
  framesCounter: 0,
  // Referente al background
  background: undefined,
  // Referente al player
  player: undefined,
  key: 65,
  // Referente al obstaculo
  imgObstacleTop: 'images/obstacle_top.png',
  imgObstacleBottom: 'images/obstacle_bottom.png',
  obstacle: undefined,
  obstaclesArray: [],



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

    // Update 
    this.update = setInterval(() => {

      // Aumenta en 1 el contador
      this.framesCounter++;
      // controlamos la velocidad de generación de obstáculos
      if (this.framesCounter % 200 === 0) {
        this.generateObstacle();
      }
      // Llamadas a los metodos
      this.clear()
      this.drawAll()
      this.moveAll()
      // Chequea las colisiones
      if (this.checkCollision()) this.gameOver()

    }, 1000 / this.fps)

  },

  reset: function () {
    // Crea las instancias de las clases
    this.background = new Background(this.ctx, this.canvasSizes.w, this.canvasSizes.h)
    this.player = new Player(this.ctx, this.canvasSizes.w, this.canvasSizes.h, this.key)

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

  checkCollision: function () {
    const gap = 19

    return this.obstaclesArray.some(obstacle => {
      return (
        this.player.x + this.player.w > obstacle.x + gap &&
        obstacle.x + obstacle.w > this.player.x &&
        obstacle.y + obstacle.h > this.player.y &&
        this.player.y + this.player.h > obstacle.y + gap
      )
    })
  },

  gameOver: function () {
    this.stop()
  },

  stop: function () {
    clearInterval(this.update)
  }

}