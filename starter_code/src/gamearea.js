class GameArea {
    constructor(){
        this.canvas = document.createElement("canvas");
        this.canvas.width = 480;
        this.canvas.height = 640;
        this.ctx = this.canvas.getContext('2d');
        this.bgImg = new Image();
        this.bgImg.src = "images/bg.png";
        this.bgX = 0;
        this.bgWidth = 600;
        this.bgHeight = this.canvas.height;
    }
    start(){
        document.body.appendChild(this.canvas, document.querySelector('#game-board'));
    }
    clear(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height); 
    }
    drawBg(){
        this.ctx.drawImage(this.bgImg,0,0,
            640,480,
            this.bgX,0,
            this.bgWidth, this.bgHeight
        )
        this.ctx.drawImage(this.bgImg,0,0,
            640,480,
            this.bgX+this.bgWidth,0,
            this.bgWidth, this.bgHeight
        )
    }
    update(){
        this.bgX -= 3;
        if(this.bgX < -this.bgWidth) {
        this.bgX += this.bgWidth;
        }
    }
}