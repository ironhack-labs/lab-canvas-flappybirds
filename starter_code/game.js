class Game {
  constructor($canvas) {
    this.ctx = $canvas.getContext('2d');
    this.gameRun = true;

    this.activateStartButton();
    this.keyListnerDown();
    // this.keyListnerUp();
  }
  activateStartButton() {
    let _this = this;
    window.onload = function() {
      document.getElementById('start-button').onclick = function() {
        _this.startGame();
      };
    };
  }
  startGame() {
    this.backGround = new BackGround(this);
    this.bird = new Bird(this);
    this.obstacles = new Obstacles(this);
    this.loop();
  }
  runLogic() {
    this.bird.newPos();
    this.obstacles.updateObstacles();
    this.obstacles.paint();
    this.paint();
  }
  loop() {
    this.runLogic();
    window.requestAnimationFrame(timestamp => this.loop(timestamp));
  }
  paint() {
    this.clearCanvas();
    this.backGround.backGroundPaint();
    this.bird.update();
  }
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
  }
  keyListnerDown() {
    window.addEventListener('keydown', event => {
      if (
        event.keyCode === 37 || //left
        event.keyCode === 38 || //up
        event.keyCode === 39 || //right
        event.keyCode === 40 //down
      ) {
        event.preventDefault(); // Stop the default behavior (moving the screen to the left/up/right/down)
      }
      if (this.gameRun) {
        this.bird.move(event); //takes the argument event to move the player
      }
    });
  }
  keyListnerUp() {
    window.addEventListener('keyup', event => {
      if (
        event.keyCode === 37 || //left
        event.keyCode === 38 || //up
        event.keyCode === 39 || //right
        event.keyCode === 40 //down
      ) {
        event.preventDefault(); // Stop the default behavior (moving the screen to the left/up/right/down)
      }
      if (this.gameRun) {
        this.bird.stopMoving(); //this will stop the movement of the bird
      }
    });
  }
}
