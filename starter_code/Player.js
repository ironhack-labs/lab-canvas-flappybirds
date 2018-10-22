class Player {
    constructor(ctx, url) {
      this.ctx = ctx
      //FOR FUTURE ITERATIONS - PHYSICS COULD HAVE GRAVITY AS A NUMBER THAT *ALWAYS* PULLS THE BIRD DOWN AND SPEED COULD BE A NUMBER THAT OVERCOMES THAT BY ADDING A NUMBER LARGER THAN GRAVITY'S NUMBER. FOR EXAMPLE IF GRAVITY IS 1, THE BIRD WILL ALWAYS CHANGE IT'S Y AXIS BY 1 AND WILL BE "PULLED" DOWN. IF SPEEDY WOULD BE -2, THAT WOULD MAKE THE BIRD "RESIST" GRAVITY AND INCREMENT IT'S POSITION BY 1 ON EACH UPDATE.
    //   this.speedX;
    //   this.speedY;
      this.img = new Image()
      this.img.src = url
      this.x = 100;
      this.y = 100;
      this.gravity = 5;
      this.gravitySpeed = 1;
    }
    update() {
        document.addEventListener('keydown', (event) => {
            event.preventDefault();
            const keyCode = event.keyCode;
            if (keyCode === 32){
                p1.gravity = -5;
            }
          });
          document.addEventListener('keyup', (event) => {
            event.preventDefault();
            const keyCode = event.keyCode;
            if (keyCode === 32){
                p1.gravity = 5;
            }
          });
        this.y += this.gravity;
    }
    draw() {
        this.ctx.drawImage(this.img,this.x,this.y,this.ctx.canvas.width/10,this.ctx.canvas.height/10)
    }
}

