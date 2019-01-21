window.onload = function () {
  document.getElementById ('start-button').onclick = function () {
    startGame ();
  };

  function startGame () {
    var game = new Game ();
    game.drawBackground ();
    game.moveBackground ();
    game.flappyPlayer ();
  }

  function Game () {
    this.canvas = document.getElementById ('canvasEx');
    this.ctx = this.canvas.getContext ('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.x = 0;
    this.speed = -1;
  }

  Game.prototype.moveBackground = function () {
    this.x += this.speed;
    this.x %= this.width;
  };

  Game.prototype.drawBackground = function () {
    this.background = new Image ();
    this.background.src = './images/bg.png';
    this.background.onload = () => {
      this.ctx.drawImage (this.background, this.x, 0, 1000, 700);
    };
    if (this.speed < 0) {
      this.ctx.drawImage (this.background, this.x + this.width, 0);
    } else {
      this.ctx.drawImage (this.background, this.x - this.width, 0);
    }
  };

  // Game.prototype.updateCanvas = function () {
  //   Game.moveBackground ();

  //   this.ctx.clearRect (0, 0, this.width, this.height);
  //   this.drawBackground.draw ();

  //   requestAnimationFrame (updateCanvas);
  // };

  Game.prototype.flappyPlayer = function () {
    this.flappy = new Image ();
    this.flappy.src = './images/flappy.png';
    this.flappy.onload = () => {
      this.ctx.drawImage (this.flappy, 300, 500, 65, 50);
    };
  };
};
