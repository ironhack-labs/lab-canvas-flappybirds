  const FlappyBirdApp = {
    version: '1.0',
    name: 'Race Car app',
    description: 'App de carrera de obstáculos en coche en  HTML5 Canvas',
    author: 'Leti',
    bg: undefined,
    player: undefined,
    fps: 60,
    frameCounter: 0,
    score: undefined,


    init: function (id) {
      this.canvasDom = document.getElementById(id)
      this.ctx = this.canvasDom.getContext('2d')
      this.canvasDom.w = window.innerWidth
      this.canvasDom.h = window.innerHeight

      //this.canvasDom.style.backgroundColor = 'red'
      //this.canvasDom.style.backgroundImage = 'images/bg.png'
      this.setDimensions()
      this.setEventListeners()
      this.reset()
      this.start()

    },
    start: function () {

      this.setInterval = setInterval(() => {
        this.clear()
        this.framesCounter++;
        if (this.framesCounter > 1000) {
          this.framesCounter = 0
        }
        this.score += 0.1
        if (this.framesCounter % 150 === 0) { //controla la "distancia" entre obstáculos
          this.generateObstacle();
        }

        if (this.checkColision()) {
          this.gameOver()
        }
        this.moveAll()
        this.drawAll()

        this.clearObstacles();


      }, 1000 / this.fps)
    },
    setDimensions: function () {
      this.canvasDom.setAttribute('width', this.canvasDom.w)
      this.canvasDom.setAttribute('height', this.canvasDom.h)
    },
    reset: function () {
      this.player = new Player(this.ctx, this.canvasDom.w, this.canvasDom.h)
      this.background = new Background(this.ctx, this.canvasDom.w, this.canvasDom.h, 'images/bg.png')
      this.framesCounter = 0;
      this.obstacles = [];
      this.scoreBoard = new scoreBoard(this.ctx)
      this.score = 0

    },
    drawAll: function () {
      this.background.draw()
      this.player.draw()
      this.obstacles.forEach(obstacle => obstacle.draw())
      this.scoreBoard.update(this.score)
    },
    moveAll: function () {
      this.background.move()
      this.player.move()
      this.obstacles.forEach(obstacle => obstacle.move())
    },
    generateObstacle() {
      this.obstacles.push(new Obstacle(this.ctx, this.canvasDom, this.player.h))
    },
    clearObstacles: function () {
      this.obstacles = this.obstacles.filter(function (obstacle) {
        return obstacle.position.x >= 0;
      });
    },
    //(p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
    checkColision: function () {

      return this.obstacles.some(obstacle => {

        return ( //revisar colisiones
          this.player.position.x + this.player.w > obstacle.position.x &&
          obstacle.position.x + obstacle.w >= this.player.position.x &&
          this.player.position.y + this.player.h >= obstacle.position.bottomY &&
          obstacle.position.bottomY + obstacle.bottom.height > this.player.position.y
        )
      })
    },
    clear: function () {
      this.ctx.clearRect(0, 0, this.canvasDom.w, this.canvasDom.h)
    },
    setEventListeners: function () {
      document.onkeydown = e => {
          console.log(e)
          if (e.keyCode === 38) {
            this.player.changeGravity()
            //console.log('Speed y', this.player.speed.y)
            // console.log("Presiono tecla. Gravity:", this.player.gravity)
          }
          if (e.keyCode == 40) this.player.changeGravity() //console.log("-gravity")

        },
        window.onresize = () => {
          this.setDimensions()
        }
    },
    stop: function () {
      clearInterval(this.setInterval)
      console.log('parado')
    },
    gameOver: function () {
      this.stop();

      if (confirm("GAME OVER. Play again?")) {
        this.reset();
        this.start();
      }
    },

  }