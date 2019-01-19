class Player {
    constructor(){
        this.img = new Image();
        this.img.src = "images/flappy.png"
        this.width = 60;
        this.height = 40;
        this.x = myGameArea.canvas.width/2 - this.width/2;
        this.y = myGameArea.canvas.height/2 - this.height/2;
        this.speedY = 0;
        this.gravity = 0.1;
        this.gravitySpeed = 0;
    }
    update(){
        this.gravity += this.gravitySpeed;
        this.speedY += this.gravity;
        this.y += this.speedY;
    }
    draw(){
        this.ctx = myGameArea.ctx;
        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}