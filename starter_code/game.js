const game = {
  title: 'Flappy flipping Flopping Birds',
  author: 'Inma',
  license: null,
  version: '1.0',
  canvasDomObj: undefined,
  ctx: undefined,
  fps: 60,
  width: undefined,
  height: undefined,
  canvasDiv: undefined,


  init: function (id) {
    this.canvasDomObj = document.getElementById(id)
    this.ctx = this.canvasDomObj.getContext('2d')
    this.canvasDiv = document.getElementById('game-board')

    this.width = (this.canvasDiv.offsetWidth)/ 2
    this.height = (this.canvasDiv.offsetHeight) * 4
    this.canvasDomObj.setAttribute('width', this.width)
    this.canvasDomObj.setAttribute('height', this.height)


    this.start()
  },



  reset: function() {
    this.background = new Background(this.ctx, this.width, this.height)
    this.player = new Player (this.ctx, this.width, this.height)
  
  },

  start: function() {
    this.reset()
    
    this.interval = setInterval(()=>{ 
      this.clear()
      this.drawAll()
      this.moveAll()

    }, 1000/this.fps)
  },

  drawAll: function() {
    this.background.draw()
    this.player.draw()

  },

  moveAll: function() {
    this.background.move()
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  },
}