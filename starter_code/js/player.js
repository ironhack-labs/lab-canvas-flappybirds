class Player {
    constructor (w,h,context,keys){
        this.canvasW = w
        this.canvasH = h
        this.w = 80;
        this.h = 70;
        this.ctx = context
        this.keys = keys
        this.y0 = this.canvasH * 0.8
        this.y = 400
        this.x = 150;
        this.img = new Image()
        this.img.src = "./images/flappy.png"
        this.setListeners();
        this.velY = 1

    }
    setListeners() {
        document.onkeydown = function(event) {
            console.log(event)
          if (event.keyCode === this.keys.TOP_KEY) {
            this.y -= 50;
            this.velY -= 15;
          } 
        }.bind(this);
    }
    drawImage(){

        this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.w,
        this.h
      );
    }
    move() {
        // Aumenta la velocidad en el eje y.
        var gravity = 0.4;
        // solo salta cuando el personaje está en el suelo
        if (this.y > this.y0) {
        this.velY = 1;
        this.y = this.y0;
        } else if(this.y < 0){
            this.velY = 1;
            this.y = 0;
        }else {
        this.velY += gravity;
        this.y += this.velY;
          }
    }
}