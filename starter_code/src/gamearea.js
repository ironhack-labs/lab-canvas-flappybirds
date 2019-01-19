class GameArea {
    constructor(){
        this.canvas = document.createElement("canvas");
        this.canvas.width = 480;
        this.canvas.height = 640;
        this.ctx = this.canvas.getContext('2d');
        this.bgX = 0;
        this.bgWidth = 600;
        this.bgHeight = this.canvas.height;
        this.speed = 2;
        this.frames = 0;
    }
    start(){
        this.frames = 0;
        this.speed = 2;
        document.querySelector('#game-board').appendChild(this.canvas);
    }
    clear(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height); 
    }
    drawBg(){
        var bgImg = new Image();
        bgImg.src = "images/bg.png";
        this.ctx.drawImage(bgImg,0,0,
            640,480,
            this.bgX,0,
            this.bgWidth, this.bgHeight
        )
        this.ctx.drawImage(bgImg,0,0,
            640,480,
            this.bgX+this.bgWidth,0,
            this.bgWidth, this.bgHeight
        )
    }
    update(){
        this.bgX -= this.speed;
        if(this.bgX < -this.bgWidth) {
        this.bgX += this.bgWidth;
        }   
    }
}