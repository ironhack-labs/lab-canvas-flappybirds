window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    basicGame.startGame();
  };
};



const basicGame = {
  ctx : undefined,
  canvasDOM: undefined,
  canvasSize : { width: undefined, height: undefined }, 
  duck : undefined,
  FPS : 60,
  obstacles : [],
  framesCounter: 0,
  points: 0,
  background: undefined,
  player: undefined,
  keys: {
    player: {
      SPACE: " ",
    }
  },


  startGame() {
    this.setContext()
    this.setDimensions()
    this.drawFilledRectangle();
    this.createPlayer();
    this.start()
    this.setListeners()
    

  },


  setContext() {
    this.canvasDOM = document.querySelector("#myCanvas")
    this.ctx = this.canvasDOM.getContext("2d")
  },


  setDimensions() {
    this.canvasDOM.setAttribute("width", 1200)
    this.canvasDOM.setAttribute("height", 600)
    
    this.canvasSize.width = window.innerWidth
    this.canvasSize.height = window.innerHeight
  },


  stop() {
    clearInterval(this.intervalId)
  },



  start() {
    
    this.intervalId = setInterval(() => {
      //this.clearScreen()
      //this.createPlayer();
      this.framesCounter++

      if (this.framesCounter > 2000) {
        this.framesCounter = 0
      }
      /* if (this.framesCounter % 100 === 0) {
        this.createObstacle()
      } */

      this.clearScreen()
      this.drawElements()
      this.movePlayer()
      this.setListeners()
      this.player.draw()
      
      
    }, 1000 / 60)
  },


  drawFilledRectangle() {
    this.ctx.fillStyle = "SkyBlue"
    this.ctx.fillRect(0, 0, 1200, 600);
  },


  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
  },

  
  createPlayer() {
    this.player = new Player(this.ctx, 200, 200, 80, 80, -0.5)
  },


  setListeners() {

    document.onkeydown = e => {   
      e.key === this.keys.player.SPACE ? this.player.jump() : null
    }
  },

  
  movePlayer() {
    this.player.move()
  },


  drawElements() {
    this.drawFilledRectangle();
  }

  

}



