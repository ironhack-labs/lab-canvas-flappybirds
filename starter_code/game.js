
var Game = {
  canvas: undefined,
  ctx: undefined,
  fps: 30,
  
  init: function(id){
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.w = 900;
    this.h = 504;
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    console.log(this.canvas)
    this.start();

  },

  start: function () {

    this.reset();

    this.interval = setInterval(function () {
  

      this.framesCounter++;

      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }

      this.moveAll();
      this.drawAll();


    }.bind(this), 1000 / this.fps);
  },

  reset: function () {
    this.background = new Background(this);
    this.player = new Player(this);
    this.framesCounter = 0;


  },

  drawAll: function () {
    this.background.draw();
    this.player.draw();
    this.obstacles.forEach(function (obstacle) { obstacle.draw(); });
  },

  moveAll: function () {
    this.background.move();

  }
}
