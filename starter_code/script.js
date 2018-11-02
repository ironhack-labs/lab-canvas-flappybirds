window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    startGame();
  };

  function ObstaclesSup(canvas, height) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = 120;
    this.height = height;
    this.vx = 5;
    this.x = 1200;
    this.y = 0;
    this.img = new Image();
    this.img.src = "images/obstacle_top.png";
    
  }

  ObstaclesSup.prototype.draw = function () {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

  }

  ObstaclesSup.prototype.move = function () {
    this.x -= this.vx;
    // if (this.x < -120) this.x = 0;
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
  Faby.prototype.setListeners = function () {
    document.onkeydown = function (e) {
      e.preventDefault();
      switch (e.keyCode) {
        case KEY_SPACE:
          this.y -= 10;
          this.vy -= 20;
          break;
      }
    }.bind(this);
  };


  Faby.prototype.draw = function () {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

  }

  Faby.prototype.move = function () {
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
    this.obstaclesSup = new ObstaclesSup(this.canvas);
    this.offset = 0;
    this.obstacleArray = [];
    console.log(this.obstacleArray)
  }
  Canvas.prototype.create = function(){
    this.intervalObs = setInterval(
      function () {
        this.offset++;
        if (this.offset % 150 === 0) {
          this.obstacleArray.push(
            new ObstaclesSup(this.canvas, Math.floor(Math.random() * (350 - 50)) + 50)
          );
        }

    }.bind(this), 1000 / this.fps) 
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
        this.obstaclesSup.move();
        this.obstaclesSup.draw();
        this.faby.draw();
        this.faby.move();

        // this.offset++;
        // if (this.offset % 150 === 0) {
        //   this.obstacleArray.push(
        //     new ObstaclesSup(this.canvas, Math.floor(Math.random() * (350 - 50)) + 50)
        //   );
        // }
        this.obstacleArray.forEach(function(obstacle) {
          this.obstacle.draw();
          this.obstacle.move();
        }.bind(this));
      }.bind(this), 1000 / this.fps
    );

  }

  function startGame() {
    var canvas = new Canvas("gameId");
    canvas.drawAll();
  }

};