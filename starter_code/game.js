const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  fps: 60,
  keys: {
    Z: 90,
  },

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
      this.clear()
      this.drawAll()
      this.moveAll()
      this.fallen()
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
  },

  drawAll: function() {
    this.background.draw()
    this.birdie.draw()
  },

  moveAll: function () {
    this.background.move()
    this.birdie.move()
    this.birdie.update()
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
  }
}
console.log(Game)