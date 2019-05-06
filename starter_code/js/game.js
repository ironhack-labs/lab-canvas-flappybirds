var Game = {
  canvas: undefined,
  ctx: undefined,
  fps: 60,
  score: undefined,
  SPACE: 32,
  gravity: 0.4,
  velY: 0,

  init: function(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    //Score.init(this.ctx);
    this.start();
    // this.setListeners();
  },
  start: function() {
    this.reset();
    this.interval = setInterval(() => {
      this.clear();
      this.framesCounter++;

      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }
      this.moveAll();
      this.drawAll();
    }, 1000 / this.fps);
  },
  stop: function() {
    clearInterval(this.interval);
  },
  reset: function() {
    this.background = new Background(
      this.canvas.width,
      this.canvas.height,
      this.ctx
    );
    this.faby = new Faby(
      this.canvas.width,
      this.canvas.height,
      this.ctx,
      this.SPACE,
      this.gravity,
      this.velY
    );
    //this.score = Score
    this.framesCounter = 0;
    //this.obstacles=[]
  },
  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  drawAll: function() {
    this.background.draw();
    this.faby.draw();
  },
  moveAll: function() {
    this.background.move();
    this.faby.move();
  }
  // setListeners: function() {
  //   console.log(this.gravity);
  //   document.onkeydown = event => {
  //     if (event.keyCode === this.SPACE) {
  //       // this.velY = -10;
  //       console.log(this.velY);
  //     }
  //   };
  //   document.onkeyup = event => {
  //     if (event.keyCode === this.SPACE) {
  //       // this.gravity *= -1;
  //       this.velY = -10;
  //     }
  //   };
  // }
};
