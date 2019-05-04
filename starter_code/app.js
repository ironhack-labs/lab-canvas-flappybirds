  const FlappyBirdApp = {
    version: '1.0',
    name: 'Race Car app',
    description: 'App de carrera de obstáculos en coche en  HTML5 Canvas',
    author: 'Leti',
    bg: undefined,
    player: undefined,
    fps: 20,

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
        this.drawAll()
        this.moveAll()
      }, 1000 / this.fps)
    },
    setDimensions: function () {
      this.canvasDom.setAttribute('width', this.canvasDom.w)
      this.canvasDom.setAttribute('height', this.canvasDom.h)
    },
    reset: function () {
      this.player = new Player(this.ctx, this.canvasDom.w, this.canvasDom.h)
      this.background = new Background(this.ctx, this.canvasDom.w, this.canvasDom.h, 'images/bg.png')
    },
    drawAll: function () {
      this.background.draw()
      this.player.draw()

    },
    moveAll: function () {
      this.background.move()

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