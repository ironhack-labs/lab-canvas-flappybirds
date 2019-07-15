const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    // obstacles: [],
    framesCounter: 0,
    // score: undefined,
    // keys: {
    //   TOP_KEY: 38
    // },

    init: function() {
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")
        this.width = window.innerWidth *.98
        this.height = window.innerHeight *.98
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.start() // importante
    
    },
    start: function() { 
         //funcion que inicializa
        this.reset()
        this.interval = setInterval(()=>{     //Intervalo de juego.
            this.framesCounter++                
            
            if(this.framesCounter > 1000) this.framesCounter = 0 
      
            // obstaculas vel
            if(this.framesCounter%100==0) this.score++
           this.clear()
        this.drawEverything()
        this.moveEverything()

    }, 1000/this.fps)

   },

   reset: function() {
       this.background = new Background(this.ctx, this.width, this.height)
        this.player = new Player(this.ctx, this.width, this.height)
        this.obstacles = new Obstacles(this.ctx, this.width, this.height)
   
    },

   drawEverything: function() {

       this.background.draw()
       this.player.draw()
        this.obstacles.draw()    
    
   },

   moveEverything: function() {
       this.background.move()
        this.player.move()
        this.obstacles.move()
   },

   clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },
}

