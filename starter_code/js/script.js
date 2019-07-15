  const Game = {
    canvas: undefined,    
    ctx: undefined,
    width: undefined,
    height: undefined,
    obstacles_top: [],
    obstacles_bottom:[],
    framesCounter: 0,
    keys: {
      TOP_KEY: 38,
      SPACE: 32
    },
    init: function() {
    this.canvas = document.getElementById("canvas")
    this.ctx = this.canvas.getContext("2d")
    this.width = window.innerWidth * .96
    this.height = window.innerHeight * .96
    this.canvas.width = this.width 
    this.canvas.height = this.height 
    this.start()  
  },

 
  start: function() {
    this.reset()
    this.interval = setInterval(() => { 

      this.framesCounter ++               
      if(this.framesCounter > 1000) {  
        this.framesCounter = 0
      }

      if(this.framesCounter % 100 == 0) { 
        this.generateObstacles()       
      }

      this.drawAll()
      this.moveAll()
      this.clearObstacles()
    }, 1000/this.fps)
  },
  generateObstacles: function(){
   // this.obstacles_top.push(new Obstacle_top(this.ctx, this.canvas.width,this.player.posY0))
    this.obstacles_bottom.push(new Obstacle_bottom(this.ctx,this.canvas.width,this.player.posY0, this.player.height))
    console.log(this.obstacles)
  },

  clearObstacles: function() {        
    this.obstacles.forEach( (obs, idx) => {
      if(obs.posX<= 0) {
        this.obstacles.splice(idx, 1)
      } 
    })
  },

  drawAll: function(){
    this.background.draw()
    this.player.draw()
    this.obstacles.forEach(obs => obs.draw())  
  },

  moveAll: function(){
    this.background.move()
    this.player.move()
    this.obstacles.forEach(obs => obs.move())
  },
  reset: function(){
    ('entro')
    this.background = new Background(this.ctx,this.width,this.height)
    this.player = new Faby(this.ctx,100,70,this.keys)
    this.obstacles = []
  }


}


