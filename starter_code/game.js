const Game = {
  title: 'Flappy ',
  author: 'Ester',
  version: '1.0',
  license: null,
  
  ctx: undefined,
  canvas: undefined,

  width : undefined,
  height: undefined,

  fps: 40,
  framesCounter: 0,
  obstacles: [],

  keys: {SPACE : 32},
  
  init: function (id) {
    this.canvas = document.getElementById(id)
    this.ctx = this.canvas.getContext('2d')
    this.width = window.innerWidth * .98
    this.height = window.innerHeight * .98
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.start()
    
  },

  start: function () {
    this.reset()
    
    this.interval = setInterval(()=>{
      this.framesCounter++

      this.clear()
      this.drawAll()
      this.moveAll()
      this.generateObstacles()

      //this.clearObstacles()

      this.isCollision()
    },1000/this.fps)  

      
  },

  reset: function() {
    this.background = new Background(this.ctx, this.width, this.height)
    this.player = new Player(this.ctx, this.canvas.width, this.canvas.height, this.keys)
    
  },

  drawAll: function () {
    this.background.draw()
    this.player.draw()
    this.obstacles.forEach(obs => obs.draw())
  },

  clear: function() {
    console.log(this.canvas.width)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },

  generateObstacles: function() {
    if(this.framesCounter%70 == 0){
      let availHeight = this.height-this.player.height*3
      let topObsHeight = Math.floor(Math.random() * availHeight)
      let bottomObsHeight = availHeight - topObsHeight

      this.obstacles.push(new ObstacleTop(this.ctx, this.canvas.width,0,"images/obstacle_top.png", topObsHeight))
      this.obstacles.push(new ObstacleBottom(this.ctx, this.canvas.width, this.canvas.height-bottomObsHeight,"images/obstacle_bottom.png", bottomObsHeight))

    } 
  },

  clearObstacles: function() {
    this.obstacles.forEach((obs , idx) => {
      if(obs.posX<=0){
        this.obstacles.splice(idx, 1)
      }
    })
  },

  moveAll: function() {
    this.background.move()
    this.player.move()
    this.obstacles.forEach(obs => obs.move())
  },
  
  isCollision: function() {
    let boundCollision = this.player.posY <= 1 || this.player.posY >= this.height-this.player.height
    let obsCollision =
      this.obstacles.some(obstacle => 
      {
        let canPassThrough;
        if (obstacle instanceof ObstacleTop)
          canPassThrough = this.player.posY > obstacle.height
        else
          canPassThrough = this.player.posY + this.player.height < obstacle.posY

        return (
          this.player.posX  + this.player.width > obstacle.posX &&
          this.player.posX < obstacle.posX + obstacle.width && 
          !canPassThrough
        )
      })

    if (obsCollision || boundCollision) 
      return this.gameOver()
  },

  gameOver: function() {
    clearInterval(this.interval)
  }

}
