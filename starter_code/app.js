  const FlappyBirdApp = {
    version: '1.0',
    name: 'Race Car app',
    description: 'App de carrera de obstáculos en coche en  HTML5 Canvas',
    author: 'Leti',
    canvasSize: {
      w: 0,
      h: 0,
    },
    bg: undefined,

    init: function (id) {
      this.canvasDom = document.getElementById(id)
      this.ctx = this.canvasDom.getContext('2d')
      this.canvasSize.w = window.innerWidth
      this.canvasSize.h = window.innerHeight

      //this.canvasDom.style.backgroundColor = 'red'
      //this.canvasDom.style.backgroundImage = 'images/bg.png'
      this.setDimensions()
      this.setEventListeners()
      this.setBgImage('images/bg.png', 900, 600)
      this.draw()
    },
    setDimensions: function () {
      this.canvasDom.setAttribute('width', this.canvasSize.w)
      this.canvasDom.setAttribute('height', this.canvasSize.w)
    },
    setBgImage: function (url, width, height) {
      this.bg = new Image()
      this.bg.src = url
      this.bg.width = width
      this.bg.height = height
      this.bg.position = {
        x: 0,
        y: 0
      }
      this.bg.velocity = {
        x: 3
      }
    },
    drawBackground: function () {
      for (var i = 0; i < 3; i += 800) {
        this.bg.position.x += this.bg.velocity.x
        this.ctx.drawImage(this.bg, this.bg.position.x, this.bg.position.y, this.bg.width, this.bg.height)
        this.ctx.translate(800, 0);
      }
      //this.bg.position.x += 10
      console.log(this.bg.position.x)

    },
    draw: function () {
      setInterval(() => {
        //console.log(this.count)
        this.clear()
        this.drawBackground()

      }, 1000 / 60)

    },
    clear: function () {
      this.ctx.clearRect(0, 0, this.winW, this.winH)
    },
    setEventListeners: function () {
      document.onkeyup = e => {
          //console.log(e)
          //if (e.keyCode === 37) //izq
          //  if (e.keyCode === 39) //derecha
        },
        window.onresize = () => {
          this.setDimensions()
        }

    },

  }