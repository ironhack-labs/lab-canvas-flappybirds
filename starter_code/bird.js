class Bird {
    constructor(ctx, w, h, keys) {
      this.ctx = ctx;
      this.gameWidth = w;
      this.gameHeight = h;
      this.image = new Image();
      this.image.src = "./images/flappy.png";
      this.width = 60;
      this.height = 60;
      this.posX = 150;
    //   this.posY0 = this.gameHeight * 0.98 - this.height; //Guardamos la posicion original para usarla como suelo
      this.posY = this.gameHeight / 2;
      this.velY = 8;
      this.gravity = 0.4;
    //   this.image.frames = 3; //Indicamos el numero de frames que tiene la imagen
    //   this.image.framesIndex = 0; //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage
      this.keys = keys;
    //   this.bullets = []; //Array de balas
      this.setListener(); //Llamamos al listener para que desde el primer momento el jugador responda.
    }

    draw() {
      
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);

        // this.ctx.drawImage(
        //   this.image,
        // // //   this.image.framesIndex * Math.floor(this.image.width / this.image.frames), //Punto x donde empieza a recortar
        // // //   0, //Punto y donde empieza a recortar
        // // //   Math.floor(this.image.width / this.image.frames), //Punto x donde termina de recortar
        // // //   this.image.height, //Punto y donde termina de recortar
        //   this.posX,
        //   this.posY,
        //   this.width,
        //   this.height
        // );
        // this.animate(framesCounter); //Funcion que anima los frames.
        // this.bullets.forEach(bullet => bullet.draw()); //El player dibuja las balas.
      }

     

    
    move(){
        this.posY -= this.velY;
        this.velY -= this.gravity;
        if(this.posY === this.gameHeight) {
            this.posY=this.gameHeight;
            console.log("Has perdido");
        } 


    }

    setListener() {
        document.addEventListener('keydown', e => {
            if (e.keyCode === 81) {
                this.velY = 8;
                console.log("Hola")
            }
            
        });
    }
}





    //   setListeners() {
    //     document.addEventListener("keydown", e => {
    //       if (e.keyCode) {
    //            this.keys.TOP:
    //       }
    //           if (this.posY >= this.posY0) {
    //             this.posY -= 40;
    //             this.velY -= 8;
    //             console.log("SALTANDO!");
    //           }



    