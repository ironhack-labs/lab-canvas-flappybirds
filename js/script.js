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
  obstaclesBottom : [],
  obstaclesTop : [],
  randomPos: [],
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
    this.createObstacles()
   

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


  gameOver() {
    clearInterval(this.intervalId)
  },



  start() {
    
    this.intervalId = setInterval(() => {
      //this.clearScreen()
      //this.createPlayer();
      this.framesCounter++

      /* if (this.framesCounter > 2000) {
        this.framesCounter = 0
      } */
      /* if (this.framesCounter % 100 === 0) {
        this.createObstacle()
      } */

      this.clearScreen()
      this.drawElements()
      this.movePlayer()
      this.setListeners()
      this.player.draw()
      this.framesCounter % 200 === 0 ? this.createObstacles(): null
      this.drawObstaclesBottom()
      this.moveObstaclesBottom()
      this.drawObstaclesTop()
      this.moveObstaclesTop()
      if (this.createCollisionBottom()) {
        this.gameOver();
      }

      if (this.createCollisionTop()) {
        this.gameOver();
      }
      
      
      
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
  },


  createObstacles() {

    this.randomPos.unshift(this.randomPosY = Math.floor(Math.random() * 350 + 200));
    

    this.obstaclesBottom.push(new ObstaclesBottom(this.ctx, 1300, this.randomPos[0], 100, 800, 3));
    this.obstaclesTop.push(new ObstaclesTop(this.ctx, 1300, (this.randomPos[0])-1000, 100, 800, 3))
  },


  drawObstaclesBottom() {
    this.obstaclesBottom.forEach(obstacle => obstacle.draw());
  },

  moveObstaclesBottom() {
    this.obstaclesBottom.forEach(obstacle => obstacle.move());
  },

  drawObstaclesTop() {
    this.obstaclesTop.forEach(obstacle => obstacle.draw());
  },


  moveObstaclesTop() {
    this.obstaclesTop.forEach(obstacle => obstacle.move());
  },


  createCollisionBottom() {
    
    
      return this.obstaclesBottom.some(obs => {
  
        return (
          this.player.pos.x + this.player.size.width > obs.pos.x && //lado drch del player lado izq del obs
          this.player.pos.x < obs.pos.x + obs.size.width &&         //lado izq del player lado drch del obs
          this.player.pos.y + this.player.size.height > obs.pos.y //lado de abajo del player lado de arriba del obs
        )
  
      })
  
   

  },


  createCollisionTop() {
    
    
    return this.obstaclesTop.some(obs => {

      return (
        this.player.pos.x + this.player.size.width > obs.pos.x && //lado drch del player lado izq del obs
        this.player.pos.x < obs.pos.x + obs.size.width &&         //lado izq del player lado drch del obs
        this.player.pos.y < obs.pos.y + obs.size.height //lado de abajo del player lado de abajo del obs
      )

    })
  },

  

}



