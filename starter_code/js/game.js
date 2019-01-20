var Game = {
  canvas: undefined,
  ctx: undefined,
  w: 800,
  h: 504,
  fps: 60,
  obstacles: undefined,
  start: function(){
    this.canvas = document.createElement("canvas")
    this.canvas.setAttribute("id", "canvas")
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.w
    this.canvas.height = this.h
    this.frames = 0
    this.obstacles = []

    document.getElementById("game-board").appendChild(this.canvas)

    this.background = new Background(this)
    this.player = new Player(this)

    this.background.draw()

  this.interval = setInterval(function(){
      this.ctx.clearRect(0,0,this.w, this.h)
      this.background.draw()
      this.score()
      this.background.move()
      this.player.draw()
      this.player.move() 
      this.player.jump() 
      this.checkCollision()

      if(this.frames > 1200){
        this.frames = 0
      }
      
      // if(this.frames % 1000 === 0){
      //   this.obstacleInterval = this.randomInterval(10,300)
      //   this.obstacles.push(new ObsTop(this))
      //   this.obstacles.push(new ObsBottom(this))
      //   this.obstacles.forEach(function(obstacle){
      //     obstacle.draw()
      //     obstacle.move()
      //   });
      // }


      this.frames++
    }.bind(this), 1000 / this.fps)

    

  },
  checkCollision: function(){
    if(this.player.y >= this.canvas.height - this.player.h * 0.80){
      this.gameOver()
    }
  },
  gameOver: function(){
    clearInterval(this.interval)
    this.element = document.getElementById("canvas");
    this.element.parentNode.removeChild(this.element);
    this.start()
  },

  score: function(){
    this.ctx.font = "30px sans-serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(this.frames, 700, 30)
  },

  randomInterval: function(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }

}