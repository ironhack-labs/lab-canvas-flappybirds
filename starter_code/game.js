const Game = {
    title: 'Flappy Bird',
    author: 'Maria',
    version: '1.0',
    license: null,
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    framesCounter: 0,
    obstacles: [],

    init: function(id) {
        this.canvas = document.getElementById(id)
        this.ctx = this.canvas.getContext('2d')
        this.width = window.innerWidth * .98
        this.height = window.innerHeight * .98 - 100 
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.start()
    },

    start: function() {
        this.reset()
       
        this. moveObstacles() 
       
        this.interval = setInterval(() => {
            this.framesCounter++         
            if(this.framesCounter > 1000) this.framesCounter = 0 
 
            this.clear()                    
            this.drawAll()
            this.moveBackground()
            this.downFlight()
            this.spacebar()
            
            this.generateObstacles()           
            this.clearObstacles()   

          //  this.isCollision()                   
          }, 1000/this.fps)
    },


    reset: function() {
        this.background = new Background(this.ctx, this.canvas.width, this.canvas.height - 50)
        this.flappy = new Flappy(this.ctx, 50, 50)
     
        this.obstacles = []
     //   this.pipeDown = new PipeDown(this.ctx, 80, 60, this.height)
    },
    drawAll: function() {
        this.background.draw()
        this.flappy.drawFlappy()
        this.obstacles.forEach(pipe => pipe.drawPipeUp())
    //   this.pipeDown.drawPipeDown()
    },
    moveBackground: function() {
        this.background.move()
    },
    clear: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    downFlight: function() {
        this.flappy.move()
    },
    moveObstacles: function() {
        this.obstacles.forEach(pipe => pipe.move())
    },
    spacebar: function() {
        document.onkeydown = e => {
            e.keyCode === 32 ? this.flappy.gravity() : null
        }
    },


    generateObstacles: function() {
        if(this.framesCounter % 70 == 0) {   
          console.log(this.obstacles)
          this.obstacles.push(new PipeUp(this.ctx, 60, 100))
        }
    },
    
    clearObstacles: function() {       
        this.obstacles.forEach( (obs, idx) => {
          if(obs.posX <= 0) {
            this.obstacles.splice(idx, 1)
          } 
        })
    },
}
