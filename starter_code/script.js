window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame.init("mygame");
  };

  const startGame = {
    canvas: undefined,
    ctx: undefined,
    fps: undefined,
    gameW: undefined,
    gameH: undefined,
    frameCounter: 0,
    scoreBoard: ScoreBoard,
    obstacles: [],

    init: function(canvasId) {
      this.canvas = document.getElementById(canvasId)
      this.ctx = this.canvas.getContext("2d")
      this.setdimentions()

      this.motor()
    },

    setdimentions: function() {
      this.canvas.setAttribute('width', window.innerWidth)
      this.canvas.setAttribute('height', window.innerHeight/1.8)
      this.gameW = window.innerWidth
      this.gameH = window.innerHeight/1.8
    },
    
    motor: function() {
      this.fps = 60
      this.reset()

      this.interval = setInterval( () => {
        if(this.frameCounter > 1000) {this.frameCounter = 0}
        this.frameCounter++
        this.scoreBoard.score += 0.1
        this.clear()
        this.drawAll()
        this.moveAll()
        this.checkCollisions()
        this.clearObstacles()
        console.log(this.obstacles.length)
      }, 1000/this.fps)
    },

    gameOver: function() {
      this.stop()
    },
    
    drawAll: function() {
      this.background.draw()
      this.player.draw()
      this.makeObstacles()
      this.scoreBoard.draw()
    },

    moveAll: function() {
      this.background.move()
      this.player.move()
      this.moveObstacles()
    },

    makeObstacles() {

      if (this.frameCounter%200 == 0) {
        this.obstacles.push(new TopObstacle(this.gameW, this.gameH, this.ctx, this.background.velX))
        this.obstacles.push(new BottomObstacle(this.gameW, this.gameH, this.ctx, this.background.velX))
  
      }

      this.obstacles.forEach((obs) => {
        obs.draw()
      })
    },

    moveObstacles() {
      this.obstacles.forEach(obs => obs.move())
    },

    clearObstacles() {
      this.obstacles = this.obstacles.filter(obs => obs.posX > -100)
    },

    checkCollisions() {
      this.obstacles.some(obs => {
        if (
              (obs.posX <= this.player.posX + this.player.width-20) 
            &&(obs.posX + obs.width >= this.player.posX-20)
            &&(obs.posY <= this.player.posY + this.player.height-30)
            &&(obs.posY+obs.height >= this.player.posY+30)
            )
            {
          alert(`Oh No! Flappy ha muerto!\n Pero has conseguido una puntuación de: ${Math.floor(this.scoreBoard.score)} puntos!`)
          this.reset()
          
        } else if (this.player.posY+this.player.height >= this.gameH) {
          alert(`Oh No! Flappy ha caido!\n Pero has conseguido una puntuación de: ${Math.floor(this.scoreBoard.score)} puntos!`)
          this.reset()
        }
      })
    },

    reset: function() {
      this.stop()
      this.background = new Background(this.gameW, this.gameH, this.ctx)
      this.player = new Player(this.gameW, this.gameH, this.ctx)
      this.scoreBoard.init(this.ctx)
      this.obstacles= []
      
    },
    stop: function() {
      clearInterval(this.interval)
    },

    clear: function() {
      this.ctx.clearRect(0,0, this.gameW, this.gameH)
    }
  }
}
