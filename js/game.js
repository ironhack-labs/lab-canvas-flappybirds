class Game {
  constructor(ctx) {
    this.ctx = ctx

    this.background = new Background(ctx)   
    this.backgroundRoad=new BackgroundRoad(ctx)
    this.playerFaby= new Player(ctx)
    

    this.intervalId = undefined   
  }

  start() {
    this.intervalId = setInterval(() => {

      // clear 

      this.clear()

      // move
      this.move()

      // draw
      this.draw()

    }, 1000 / 60)
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  move() {
    this.playerFaby.move();
    this.backgroundRoad.move();
  }

  draw() {
    this.background.draw();
    this.backgroundRoad.draw();
    this.playerFaby.draw();
  }

  onKeyDown(keyCode){
      this.playerFaby.onKeyDown(keyCode)
  }

  onKeyUp(keyCode){
      this.playerFaby.onKeyUp(keyCode)
  }
}