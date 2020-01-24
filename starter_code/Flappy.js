class Flappy {
    constructor(ctx, w, h, keys) {
        this.ctx = ctx;
        this.width = w;
        this.height = h;
        this.image = new Image();
        this.image.src = "./images/flappy.png"
        this.width = 100;
        this.height = 140;
        this.posX = 40;
        this.posY = 50
        this.velY = 1;
        this.keys = keys;

    }

   
  



    draw() {
        this.ctx.drawImage(this.image, 300, 400, 50, 50);
    }

    move() {
        setListener() {
            document.addEventListener("keydown", e => {
                if (e.keyCode === 32) this.Flappy.posY -= 4;
                console.log(this.Flappy.posY);
            });
        }
    }
}




