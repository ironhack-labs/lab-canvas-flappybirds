const Game = { //configuracion principal del juego
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 30,
    obstacles: [],
    framesCounter: 0,
    score: undefined,
    keys: {
      TOP_KEY: 38,
      SPACE: 32
    },
  
    init: function() {
      this.canvas = document.getElementById("canvas")
      this.ctx =    this.canvas.getContext("2d")
      this.width = window.innerWidth * 0.60
      this.height = window.innerHeight * 0.70
      this.canvas.width = this.width 
      this.canvas.height = this.height 
      this.start()
    },
  
    start: function() {
      this.reset()
      this.interval = setInterval(()=>{
       this.framesCounter++
  
        // controlamos que frameCounter no sea superior a 1000
        if(this.framesCounter > 1000) this.framesCounter = 0 
  
        //vel de obstaculos y aumenta puntuacion c/100 frames
        if(this.framesCounter%100==0) this.score++ 
        this.clear()                    
        this.drawAll()
        this.moveAll()
        this.generateObstacles()       
        this.clearObstacles()    //solo borra los que estan fuera del canvas.
        //collision?
        this.isCollision()                    
      }, 1000/this.fps)
    },
    //Funcion reset
    reset: function() {         
      this.background = new Background(this.ctx, this.width, this.height)
      this.player = new Player(this.ctx, this.canvas.width, this.canvas.height, this.keys)
      this.scoreboard = ScoreBoard
      this.scoreboard.init(this.ctx)
      this.score = 0
      this.obstacles = []
    },
  
    drawAll: function() {
      this.background.draw()
      this.player.draw()
      this.obstacles.forEach( obs => obs.draw())  
      this.drawScore()
    },
  
    moveAll: function() {
      this.background.move()
      this.player.move()
      this.obstacles.forEach(obs => obs.move())
  
    },
  
    clear: function() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
  //Cada 70 frames.
    generateObstacles: function() {
      if(this.framesCounter%70==0) {        
        console.log(this.obstacles)
        this.obstacles.push(new Obstacle(this.ctx, this.canvas.width, this.player.posY0, this.player.height)) //pusheamos nuevos obstaculos
      }
    },
  
    clearObstacles: function() {
      this.obstacles.forEach( (obs, idx) => {
        if(obs.posX<= 0) {
          this.obstacles.splice(idx, 1)
        } 
      })
    },
     // el collision
    isCollision: function() {          
          // obstaculos en eje x
      this.obstacles.some( obs => {

        if((this.player.posX+this.player.width >= obs.posX)
          &&(this.player.posY+this.player.height <= obs.posY + obs.height)
          &&(this.player.posX<= obs.posX+obs.width) && (this.player.posX+this.player.width >= obs.posX)
              &&(this.player.posY+this.player.height <= obs.posY2 + obs.height)
              &&(this.player.posX<= obs.posX+obs.width)){
          console.log('this.player.posX: ',this.player.posX)
          console.log('this.player.posY: ',this.player.posY)
          console.log('obs.posX: ',obs.posX)
          console.log('obs.posY: ',obs.posY)
          console.log('obs.posY2: ',obs.posY2)

            this.gameOver()
        }
      })
    },
  
    //funcion marcador
    drawScore: function() {             
      this.scoreboard.update(this.score)
    },
  
                //El game over.
    gameOver: function() {
      clearInterval(this.interval)
      this.ctx.fillStyle = "red";
      this.ctx.fillText("Game Over!!!", 250, 250);
    }
  }