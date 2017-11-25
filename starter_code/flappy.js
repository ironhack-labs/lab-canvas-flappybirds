function Flappy(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = 200;
    this.y = 200;
    this.scale = 0.1;
}

Flappy.prototype.draw = function() {
    this.sprite = new Image();
    this.sprite.src = "images/flappy.png"
    this.ctx.drawImage(this.sprite, this.x, this.y, this.sprite.width * this.scale, this.sprite.height * this.scale);
    if(this.y <= this.canvas.height - (this.sprite.height * this.scale)) {
        this.y += 2;
    }
    else {
        this.y = this.canvas.height - (this.sprite.height * this.scale);
    }
}

Flappy.prototype.moveUp = function() {
    this.y -= 50;
}


Car.prototype.onKeyDown = function(event) {
    this.y += 5;
}