class Game {
  constructor(ctx) {
    this.ctx = ctx

    this.background = new Background(ctx)
    this.background2 = new Background2(ctx)

    this.player = new Player(ctx)

    this.intervalId = undefined

    // obstacle
    this.obstacles = [];
    this.obstacleFramesCount = 0;

    //this.score = 0
  }

  start() {
    if (!this.intervalId) {

      this.intervalId = setInterval(() => {
        // add an obstacle every OBSTACLE_FRAMES
        if (this.obstacleFramesCount % OBSTACLE_FRAMES === 0) {
          this.addObstacle();
          this.obstacleFramesCount = 0;
        }
        this.obstacleFramesCount++;

        this.clear()

        this.move()

        this.draw()
        this.checkCollissions()

      }, 1000 / 60)
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  draw() {
    this.background.draw()
    this.background2.draw()

    this.player.draw()
    this.obstacles.forEach(obstacle => {
      obstacle.draw();
    })
  }

  move() {
    this.background.move()
    this.background2.move()

    this.player.move()
    this.obstacles.forEach(obstacle => obstacle.move());
  }

  addObstacle() {
    const randomY = Math.floor(Math.random() * 300 + 150)
    this.obstacles.push(new Obstacle(this.ctx, randomY, "top"));
    this.obstacles.push(new Obstacle(this.ctx, randomY, "bottom"));
  }

  onKeyDown(keyCode) {
    this.player.onKeyDown(keyCode)
  }

  checkCollissions() {
    const condition = this.obstacles.some(obstacle => this.player.collidesWith(obstacle))
    if (condition) {
      this.gameOver()
    }
  }

  gameOver() {
    clearInterval(this.intervalId)

    this.ctx.save()

    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

    this.ctx.fillStyle = 'white'
    this.ctx.textAlign = 'center'
    this.ctx.font = 'bold 32px sans-serif'
    this.ctx.fillText('Game Over', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2)

    this.ctx.restore()
  }

}