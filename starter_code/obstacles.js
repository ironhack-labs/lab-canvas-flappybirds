class ObstaclesTop {
    constructor(ctx, x, y, w, h) {
       this.ctx = ctx;
       
        this.x = x;
        this.y = y;
        this.gameWidth = w;
        this.gameHeight = h;
        
        this.image = new Image();
        this.image.src = './images./obstacle_top.png';

        this.width = 60;
        this.height = 300;

        this.posX = this.w / 2;
        this.posY = this.h / 2;

    }

  
    draw(){
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);

    }

}



