class Obstacle {
    constructor(heightTop, heightBottom){
        this.imgTop = new Image();
        this.imgTop.src = "images/obstacle_top.png"
        this.imgBottom = new Image();
        this.imgBottom.src = "images/obstacle_bottom.png"
        this.heightTop = heightTop;
        this.heightBottom = heightBottom;
        this.width = this.imgTop.width;
        this.x = myGameArea.canvas.width;
        this.y = 0;
    }
    draw(){
        //crop the obstacles depending on their height and draw them into canvas
        this.ctx = myGameArea.ctx;
        this.ctx.drawImage(this.imgTop,
            0, this.imgTop.height-this.heightTop, 
            this.width, this.heightTop,
            this.x, this.y, 
            this.width, this.heightTop
            );
        this.ctx.drawImage(this.imgBottom,
            0,0,
            this.width,this.heightBottom,
            this.x, myGameArea.canvas.height-this.heightBottom,
            this.width, this.heightBottom);
    }
    update(){
        this.x -= myGameArea.speed;
    }
}
