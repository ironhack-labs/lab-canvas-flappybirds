class Faby {
  constructor(ctx, url, speedX, jumpSpeed, gravitySpeed, x, y) {
    this.ctx = ctx
    this.width = 70
    this.height = 50
    this.speedX = speedX
    this.jumpSpeed = jumpSpeed
    this.gravity = gravitySpeed
    this.gravitySpeed = gravitySpeed
    this.img = new Image()
    this.img.src = url
    this.x = x
    this.y = y
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }

  update() {
    this.y += this.gravity  
  }

  jump() {
    player.gravity = this.jumpSpeed
    isJumping = true;
    setTimeout(function(){ 
      isJumping = false
      player.gravity = +2;
    }, 400);
  }
}
