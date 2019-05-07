class Obstacle {
  constructor(w, playerY, playerH, ctx, place) {
    this.ctx = ctx
    this.w = 35
    this.h = this.w * 2
    this.dx = 1
    this.x = w
    //this.y = playerY + playerH - this.h - 5;
    this.y = 100
    this.place = place
    this.img = new Image()
    this.img.src = undefined
  }

  draw() {
    if (this.place == "top") {
      this.img.src = "images/obstacle_top.png"
      this.ctx.drawImage(
        this.img,
        this.x,
        this.y - 100,
        this.w,
        this.h
      );
    }
    else {
    this.img.src = "images/obstacle_bottom.png"
      this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.w,
        this.h
    );
    }
  }
  move() {
    this.x -= this.dx
  }
}
