const myGame = {
  version: "1.0",
  name: "Flappy Birds",
  description: "juego Flappy Birds",
  author: "Lucia",
  canvasDom: undefined,
  ctx: undefined,
  winW: undefined,
  winH: undefined,
  fps: 60,
  scoreBoard: undefined,

  init: function(id) {
    this.canvasDom = document.getElementById(id);
    this.ctx = this.canvasDom.getContext("2d");

    this.startGame();
  },

  startGame: function() {
    this.fps = 60;
    this.resetGame();

    this.interval = setInterval(() => {
      this.drawAll();
      this.moveAll();
    }, 1000 / this.fps);
  },

  resetGame: function() {
    this.background = new Background(
      this.ctx,
      this.canvasDom.width,
      this.canvasDom.height
    );
    this.playerBird = new Player(
      this.ctx,
      this.canvasDom.width,
      this.canvasDom.height,
      this.keys
    );
  },

  drawAll: function() {
    this.background.draw();
    this.playerBird.draw();
  },

  moveAll: function() {
    this.background.move();
  }
};
