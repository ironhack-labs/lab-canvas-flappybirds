window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    startGame();
  };



  function Background(canvas, x, y) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = 0;
    this.y = 0;
    this.dx = 5;
    this.img = new Image();
    this.img.src = "images/bg.png";
  }

  Background.prototype.draw = function () {
    this.ctx.drawImage(this.img, this.x, this.y, 1200, 500);
    this.ctx.drawImage(this.img, this.x+1200, this.y, 1200, 500);
  }

  Background.prototype.move = function() {
    this.x -= this.dx;
      if (this.x < -1200) this.x = 0;
  };


  function Canvas(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.fps = 60;
    this.background = new Background(this.canvas);
  }
  Canvas.prototype.clear = function(){
    this.ctx.clearRect(0,0,1200, 500);
  }
  Canvas.prototype.drawAll = function () {

    this.intervalID = setInterval(
      function () {
        this.clear();
        this.background.move();
        this.background.draw();
        
        
      }.bind(this), 1000 / this.fps
    );

  }


  function startGame() {
    var canvas = new Canvas("gameId");
    canvas.drawAll();
  }

};