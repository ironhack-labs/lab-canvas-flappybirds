const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  fps: 60,
  keys: {
    Z: 90,
  },
  framesCounter: 0,
  barriers: [],

  init: function() {
    this.canvas = document.getElementById("mycanvas")
    this.ctx = this.canvas.getContext("2d")
    this.setDimensions()
    this.start() 
    
    
  },

  setDimensions: function() {
    this.width = window.innerWidth * 0.45
    this.height = window.innerHeight * 0.8
    this.canvas.width = this.width
    this.canvas.height = this.height
  },

  start: function() {
    this.reset()
    this.setEventListeners()
    this.Interval = setInterval(() => {
this.framesCounter++
this.framesCounter >= 6000 ? this.framesCounter = 0 : null
      this.clear()
      this.drawAll()
      this.moveAll()
      this.createObstacles()
      this.fallen()
      this.crashed()
   },1000/ this.fps)
  },

  setEventListeners: function () {
    document.onclick = event => {
      console.log(event)
    }
    document.onkeydown = event => {
      if (event.keyCode === this.keys.Z) {
        this.birdie._grav = -2
        this.birdie._gravSpeed= 0
      } 
    }
    document.onkeyup = event => {
      event.keyCode === this.keys.Z ? this.birdie._grav = 0.5 : null
    }
  },

  reset: function() {
    this.background = new Background(this.ctx,this.width,this.height) //declarar todos los componentes
    this.birdie = new Birdie(this.ctx,this.width,this.height,this.keys)
    this.barriers = []
  },

  drawAll: function() {
    this.background.draw()
    this.birdie.draw()
    this.barriers.forEach(elm => elm.draw())
  },

  moveAll: function () {
    this.background.move()
    this.birdie.move()
    this.birdie.update()
    this.barriers.forEach(elm => elm.move()) 
  },

  createObstacles: function () {
    if (this.framesCounter % 100 === 0) {
      this.barriers.push(new Obstacles(this.ctx, "images/obstacle_top.png",this.width, 0, 60, 100))
      this.barriers.push(new Obstacles(this.ctx, "images/obstacle_bottom.png", this.width, 500,60,100))
    }
  },

  clearObstacles: function() {
    this.barriers.forEach (elm, index => {
      if (elm._posX < 0) {
        this.barriers.splice(index, 1)
      }
    })
  },

  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },
  

  gameOver: function () {
    clearInterval(this.Interval)
  },

  fallen: function () {
    if (this.birdie._posY >= this.birdie._limitBottomY + this.birdie._height) {
      this.gameOver()
    } 
  },
  crashed: function () {
    this.barriers.some(elm => {
      if (this.birdie._posX + this.birdie._width >= elm._posX
        && this.birdie._posY + this.birdie._height >= elm.posY
        && this.birdie._posX <= elm._posX + elm._width) {
        this.gameOver()
      }
    })
  }
}
//Only thing what doesn't work is the  collisions, because I don't know anymore how to keep track of the birdie current position.
