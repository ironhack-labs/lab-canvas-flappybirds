const bgImg = document.createElement('img');
bgImg.src = '../images/bg.png';

// create background class
class Background {
    constructor(canvasContext, width, height){
        this.ctx = canvasContext,
        this.x = 0,
        this.y = 0,
        this.width = width,
        this.height = height;
    }

    draw() {
        this.ctx.drawImage(bgImg, this.x, this.y, this.width, this.height);
    }

}