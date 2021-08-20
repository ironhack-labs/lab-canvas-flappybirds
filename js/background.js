const bgImg = document.createElement("img");
bgImg.src = "/images/bg.png";

class Background {
  constructor(canvasContext, canvasWidth, canvasHeight) {
    this.ctx = canvasContext;

    this.bgImgX = 0; //initial img width
    this.bgImgY = 0;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.slideSpeed = 0.25;
  }

  drawLoop() {
    //this will loop through two images infinitely
    //draw 1st img
    this.ctx.drawImage(
      bgImg,
      this.bgImgX,
      this.bgImgY,
      this.canvasWidth,
      this.canvasHeight
    );
    //draw 2nd  img
    this.ctx.drawImage(
      bgImg,
      this.bgImgX + this.canvasWidth,
      this.bgImgY,
      this.canvasWidth,
      this.canvasHeight
    );
    // update image height
    this.bgImgX -= this.slideSpeed;
    // reseting the images when the first image entirely exits the screen
    if (this.bgImgX == -this.canvasWidth) this.bgImgX = 0; //  when - = left direction

    // this function creates a 60fps animation by scheduling a
    // loop function call before the
    // next redraw every time it is called
    console.log("this.drawLoop");
    window.requestAnimationFrame(this.drawLoop.bind(this));
  }
}
