const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  init: function(id) {
    this.canvas = document.getElementById(id)
    this.ctx = this.canvas.getContext("2d")
    this.setDimensions()
    this.start() //newly done
  },
  setDimensions: function() {
    this.width = window.innerWidth * 0.95
    this.height = window.innerHeight * 0.6
    this.canvas.width = this.width
    this.canvas.height = this.height
  },
  start: function() {
    this.Interval = setInterval(() => {
      //AQUÍ IRÁ CLEAR ALL
      this.drawAll()   ESTO DA PROBLEMAS. MILES DE ERRORES
    })
  },
  componentes: function() {
    this.background = new Background(this.ctx, "images/bg.png") //declarar todos los componentes
  },
  drawAll: function() {
    this.Background.draw() //ANTES ERA  this.Background.draw()  ESTO DA PROBLEMAS. MILES DE ERRORES
  }
}
