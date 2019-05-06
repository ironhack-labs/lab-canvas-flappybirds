class Obstacle {
    constructor(ctx, winW) {
      this.ctx = ctx;
      this.w =100
      this.minH = 280
      this.maxH = 300
      this.h = Math.floor(Math.random() * (this.maxH - this.minH + 1) + this.minH)
      this.x = winW
      this.y = 0
      this.minGap = 100
      this.maxGap = 180
      this.gap = Math.floor(Math.random() * (this.maxGap - this.minGap + 1) + this.minGap)
      this.imgTop = new Image()
      this.imgTop.src = "./images/obstacle_top.png"
      this.imgBottom = new Image()
      this.imgBottom.src = "./images/obstacle_bottom.png"
      this.vel = 10
    }
    
    drawObstacles() {
      this.ctx.drawImage(
        this.imgTop,
          this.x,
          this.y,
          this.w,
          this.h,
        )
      this.ctx.drawImage(
        this.imgBottom,
          this.x,
          this.h + this.gap,
          this.w,
          this.h,
        )
    }
    
    moveObstacle(){
        this.x -= this.vel
    }
 
}