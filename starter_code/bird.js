function Bird(x, y) {
     this.x = x;
     this.y = y;
     this.sY = 0;
     this.gravity = 0.2;
     this.img = new Image();
     this.img.src = "images/flappy.png";
}

Bird.prototype.draw = function (ctx) {
     ctx.drawImage(this.img, this.x, this.y, 50, 50);
}



Bird.prototype.userPull = function () {
     this.sY+=this.gravity;
     this.y += this.sY;
}


Bird.prototype.update = function (ctx) {
     this.draw(ctx);
     this.userPull();
}

