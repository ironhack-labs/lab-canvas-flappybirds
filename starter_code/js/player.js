class Player {
  constructor(width, height, ctx, keys){
    this.canvasW = width;
    this.canvasH = height;
    this.ctx = ctx;
    this.keys = keys;
    this.x = this.canvasW * 0.3

    /// 
    this.y0 = this.canvasH * 0.5
    this.y = this.y0;

    ///
    this.img = new Image()
    this.img.src = "images/flappy.png"
    this.w = 55;
    this.h = 45;
    this.vy = 0.1;
    this.mRange = 260

    /// repetitive movement vars
    this.mDown = () => this.y += this.vy
    this.mUp = () => this.y -= this.vy
    this.move = () => {
      this.mDown()
    }
      
  }
   // draw image
  draw(framesCounter){
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    )
    this.setListeners()
    //this.animateImg(framesCounter);
    if (framesCounter % 50 === 0) {
    this.changeMovement()
    }
  }

  // Up and down repetitive movement conditionals 
  changeMovement(){
    if (this.y < 249) this.move = () => this.mDown()
    if (this.y > this.mRange) this.move = () => this.mUp()
    }  

  // jumping and falling var
  jumpUp(){
    this.jumpRange = this.y -= 100
    if(this.y > this.jumpRange){
      this.move = () => this.mUp()
    }
    else { 
        this.mDown = () => this.y += (this.vy + 0.6)
        this.move = () => this.mDown() 
    }
  }

  // spacebar listener
  setListeners() {
    document.onkeydown = function(event) {
      if (event.keyCode === 32) {
        console.log("pressed")
        this.jumpUp()

        this.changeMovement = () => undefined 
      
       }
      }.bind(this)
    }

}
    
