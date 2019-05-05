//constructor de obstáculos
class ObstacleBottom {
  constructor(w, playerY, playerH, ctx) {
    this.ctx = ctx;
    this.canvasWidth = w
    this.w = 60;
    this.h = 200
    this.dx = 1;
    this.x =  this.canvasWidth ;
    this.y = 550 -  this.h
    this.img = new Image()
    this.img.src = "images/obstacle_bottom.png"
  }

  draw(framesCounter){
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    )

  }

  move() {
    this.x -= this.dx;
  }
}

class ObstacleTop {
  constructor(w, playerY, playerH, ctx) {
    this.ctx = ctx;
    this.canvasWidth = w
    this.w = 60;
    this.h = 200
    this.dx = 1;
    this.x =  this.canvasWidth ;
    this.y = 0
    this.img = new Image()
    this.img.src = "images/obstacle_top.png"
  }

  draw(framesCounter){
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    )

  }

  move() {
    this.x -= this.dx;
  }
}