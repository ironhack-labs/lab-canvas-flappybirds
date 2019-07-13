const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  fps: 60,

  init: function() {
    this.canvas = document.getElementById("mycanvas")
    this.ctx = this.canvas.getContext("2d")
    this.setDimensions()
    this.start() //newly made
    
  },

  setDimensions: function() {
    this.width = window.innerWidth * 0.6
    this.height = window.innerHeight * 0.8
    this.canvas.width = this.width
    this.canvas.height = this.height
  },

  start: function() {
    this.reset()
    this.Interval = setInterval(() => {
      //AQUÍ IRÁ CLEAR ALL
      this.clear()
      this.drawAll()
      this.moveAll()
   },1000/ this.fps)
  },

  reset: function() {
    this.background = new Background(this.ctx,this.width,this.height) //declarar todos los componentes
  },

  drawAll: function() {
    this.background.draw()
  },

  moveAll: function () {
    this.background.move()
  },

  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },
}
/*Uncaught TypeError: Cannot read property 'draw' of undefined
at Object.drawAll(game.js: 28)
'reused' at game.js: 21 */