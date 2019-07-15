class Player {
    constructor(ctx, w, h){
        this.ctx = ctx
        this.width = w
        this.height = h
        this.speedX = 40
        this.speedY = 40
        this.posX = 0
        this.posY = 0
        this.gravity = .45
        // this.gravitySpeed = gravitySpeed
        
        this.image = new Image()
        this.image.src = "images/flappy.png"
        
        //this.keys = keys
        // this.setListeners()       //Llamamos al listener para que desde el primer momento el jugador responda.

        // this.image.frames = 1           //Indicamos el numero de frames que tiene la imagen
        //this.image.framesIndex = 0      //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }

    // move() {
    //     let gravity = 0.4;
    //     if (this.posY <= this.posY0) {
    //       this.posY += this.velY;
    //       this.velY += gravity;
    //     } else {
    //       this.velY = 1;
    //       this.posY = this.posY0;
    //     }
    // }

    setListeners() {
        document.onkeydown = e => {
          switch (e.keyCode) {
            case this.keys.KEY_W:
              this.posY -= 30;
              this.velY -= 10;
              break;
          }
        }
}
}

    //métodos
    // update(){

    // },
    // newPos(){

