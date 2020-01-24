class Background {
    constructor(ctx, w, h, src) {
        this.ctx = ctx;
        this.width = w;
        this.height = h;

        this.img = new Image()
        this.img.src = './images./bg.png';
        

        this.posX = 0;
        this.posY = 0;

        this.velX = 0.3;
    } 

    draw() {
        this.ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
        this.ctx.drawImage(this.img, this.posX + this.width, this.posY, this.width, this.height);
        
    }

    move() {
        
        if (this.posX <= -this.width) {
            this.posX = 0;
        } this.posX -= this.velX
    }
        
    
}