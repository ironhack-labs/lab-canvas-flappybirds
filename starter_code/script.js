window.onload = function() {
  $("#game-board").html(
    `<canvas id="ironcanvas" height="500" width="800"></canvas>`
  );

  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    var bg = new Background();
    setInterval(function() {
      bg.draw();
      bg.move();
    }, 1000 / 60);
  }

  class Background {
    constructor() {
      this.canvas = document.getElementById("ironcanvas");
      this.ctx = this.canvas.getContext("2d");
      this.bgX = 0;
      this.bgY = 0;
    }
    draw() {
      this.modelo = new Image();
      this.modelo.src = "images/bg.png";
      this.ctx.drawImage(
        this.modelo,
        this.bgX,
        this.bgY,
        this.canvas.width,
        this.canvas.height
      );
      this.ctx.drawImage(
        this.modelo,
        this.bgX + this.canvas.width,
        this.bgY,
        this.canvas.width,
        this.canvas.height
      );
    }

    move() {
      if (this.bgX < -this.canvas.width) this.bgX = 0;
      this.bgX -= 2;
    }
  }

  class Flappy {
    constructor(width, height, speedX, speedY, gravity, gravitySpeed) {
      this.width = width;
      this.height = height;
      this.speedX = speedX;
      this.speedY = speedY;
      this.gravity = gravity;
      this.gravitySpeed = gravitySpeed;
    }

    update(){

    }

    newPos(){

    }

    fly(){
      document.onkeydown = function(e) {
        e.preventDefault();
        if(e.keyCode==37){
          gravity*=-1;
        }                    
      }.bind(this);
      document.onkeyup = function(e) {
        e.preventDefault();
        if(e.keyCode==37){
          gravity*=-1;
        }                    
      }.bind(this);
    }
  }
};
