window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    startGame();
  };
var KEY_SPACE = 32;

  function Faby(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = 70;
    this.height = 70;
    this.vy = 5;
    this.x = 150;
    this.y = 150;
    this.img = new Image();
    this.img.src = "images/flappy.png";
    this.setListeners();
    this.gravitySpeed
  }
  Faby.prototype.setListeners = function(){
      document.onkeydown = function(e) {
        e.preventDefault();
        switch (e.keyCode) {
          case KEY_SPACE:
            this.y -= 10;
            this.vy -= 20;
            break;
        }
      }.bind(this);
    };
   

  Faby.prototype.draw = function(){
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
   
  }

  Faby.prototype.move = function(){
    var gravity = 0.50;
    this.vy += gravity;
    this.y += this.vy;
  }

  function Background(canvas, x, y) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = 0;
    this.y = 0;
    this.vx = 5;
    this.img = new Image();
    this.img.src = "images/bg.png";
  }

  Background.prototype.draw = function () {
    this.ctx.drawImage(this.img, this.x, this.y, 1200, 500);
    this.ctx.drawImage(this.img, this.x + 1200, this.y, 1200, 500);
  }

  Background.prototype.move = function () {
    this.x -= this.vx;
    if (this.x < -1200) this.x = 0;
  };


  function Canvas(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.fps = 60;
    this.background = new Background(this.canvas);
    this.faby = new Faby(this.canvas);
  }
  Canvas.prototype.clear = function () {
    this.ctx.clearRect(0, 0, 1200, 500);
  }
  Canvas.prototype.drawAll = function () {
    
    this.intervalID = setInterval(
      function () {
        this.clear();
        this.background.move();
        this.background.draw();
        this.faby.draw();
        this.faby.move();
        
        


      }.bind(this), 1000 / this.fps
    );

  }


  function startGame() {
    var canvas = new Canvas("gameId");
    canvas.drawAll();
  }

};