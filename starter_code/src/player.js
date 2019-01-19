class Player {
    constructor(){
        this.img = new Image();
        this.img.src = "images/flappy.png"
        this.width = 60;
        this.height = 40;
        this.direction = 0; //0 - right, 1 - up, 2 - down
        this.x = myGameArea.canvas.width/2 - this.width/2;
        this.y = myGameArea.canvas.height/2 - this.height/2;
        this.gravity = 0.1;
    }
    clear(){
        this.direction = 0; //0 - right, 1 - up, 2 - down
        this.x = myGameArea.canvas.width/2 - this.width/2;
        this.y = myGameArea.canvas.height/2 - this.height/2;
        this.gravity = 0.1
    }
    update(){
        this.gravity += 0.1;
        this.y += this.gravity;
        if(this.gravity > 5) this.direction = 2
    }
    draw(){
        this.ctx = myGameArea.ctx;
        //rotate flappy based on his direction
        if (this.direction === 0) this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        else {
            this.ctx.save();
            this.ctx.translate(this.x+this.width/2, this.y+this.height/2)
            switch(this.direction){
                case 1: this.ctx.rotate(-Math.PI/4); break;
                case 2: this.ctx.rotate(Math.PI/4); break;
            }
            this.ctx.drawImage(this.img, -this.width/2, -this.height/2, this.width, this.height);
            this.ctx.restore();
        } 
    }
    outOfGrid(){
        if(this.y + this.height > myGameArea.canvas.height) return true;
        else return false;
    }
    crashWith(obstacle) {
        if(((this.y + this.height < myGameArea.canvas.height - obstacle
            .heightBottom) &&
        (this.y > obstacle.y + obstacle.heightTop)) ||
        (this.x + this.width < obstacle.x) ||
        (this.x > obstacle.x + obstacle.width))
            return false;
      else return true;
    }
}