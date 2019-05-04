  const FlappyBirdApp = {
    version: '1.0',
    name: 'Race Car app',
    description: 'App de carrera de obstáculos en coche en  HTML5 Canvas',
    author: 'Leti',
    bg: undefined,
    player: undefined,
    fps: 60,
    frameCounter: 0,


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
          this.framesCounter = 0;
        }

        if (this.framesCounter % 150 === 0) { //controla la "distancia" entre obstáculos
          this.generateObstacle();
        }

        this.moveAll();
        this.drawAll();


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
    },
    drawAll: function () {
      this.background.draw()
      this.player.draw()
      this.obstacles.forEach(obstacle => obstacle.draw())

    },
    moveAll: function () {
      this.background.move()
      this.player.newPos()
      this.obstacles.forEach(obstacle => obstacle.move())
    },
    generateObstacle() {
      this.obstacles.push(new Obstacle(this.ctx, this.canvasDom, this.player.img.height))
    },
    clearObstacles: function () {
      this.obstacles = this.obstacles.filter(function (obstacle) {
        return obstacle.position.x >= 0;
      });
    },
    clear: function () {
      this.ctx.clearRect(0, 0, this.canvasDom.w, this.canvasDom.h)
    },
    setEventListeners: function () {
      document.onkeydown = e => {
        console.log(e)
        if (e.keyCode === 32) {
          this.player.changeGravity()
          //console.log('Speed y', this.player.speed.y)
          // console.log("Presiono tecla. Gravity:", this.player.gravity)
        }
      }
      document.onkeyup = e => {
        console.log(e)
        if (e.keyCode == 32) this.player.changeGravity() //console.log("-gravity")
        console.log("Suelto tecla. Gravity:", this.player.gravity)
      }
      window.onresize = () => {
        this.setDimensions()
      }

    },
    stop: function () {
      clearInterval(this.setInterval)
      console.log('parado')
    }

  }