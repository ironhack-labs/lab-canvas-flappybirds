class Bird {
    constructor(ctx, w, h, keys) {
        this.ctx = ctx;
        this.gameWidth = w;
        this.gameHeight = h;
        
        this.image = new Image();
        this.image.src = './images./flappy.png';

        this.width = 60;
        this.height = 60;

        this.posX = 150;
        this.posY = this.gameHeight / 2;

        this.velY = 8;
        this.gravity = 0.6;

        this.setListener()

    }

    draw(){
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);

    }

    move(){
        this.posY -= this.velY;
        this.velY -= this.gravity;

        if(this.posY >= 550) {
            this.posY = 535;
        } 
        

    }

    setListener() {
        document.addEventListener('keydown', e => {
            if (e.keyCode === 87) {
                this.velY = 9;
            }
        })
    }

}