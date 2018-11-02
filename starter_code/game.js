function Canvas() {
  this.canvas = document.getElementById("myCanvas");
  this.ctx = this.canvas.getContext("2d");
  this.x = 0;
  this.y = 0;
  this.faby = new Faby(this.ctx);
  this.background = new Background(this.canvas)
}

var canvas = new Canvas();

Canvas.prototype.clearAll = function() {
    this.ctx.clearRect(this.x, this.y, this.width, this.height)
}

function Background(canvas) {
    this.x = 0;
    this.y = 0;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = "./images/bg.png";
  }
  
  Background.prototype.drawBackground = function() {
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.canvas.width,
      this.canvas.height
    );
    this.ctx.drawImage(
      this.img,
      this.x + this.canvas.width,
      this.y,
      this.canvas.width,
      this.canvas.height
    );
  };
  
  Background.prototype.moveBackground = function() {
    this.x--;
    if (this.x < -this.canvas.width) {
      this.x = 0;
    }
  };
  
  Background.prototype.update = function() {
      this.moveBackground();
    this.drawBackground();
  };

  
Canvas.prototype.updateAll = function() {
    setInterval(
      function() {
          this.clearAll();
          this.background.update();
        this.faby.update();
      }.bind(this),
      1000 / this.fps
    );
  };