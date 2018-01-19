function Board(ctx) {
    this.ctx = document.getElementById('canvas').getContext('2d');
    this.canvasSize = {w: 480, h: 640};
    this.image = new Image();
    this.image.src = 'images/bg.png';
    this.scale = 900/504;
    this.x = 0;
    this.y = 0;
    // this.imgW = this.image.width * scale;
    // this.imgH = this.image.height * scale;
}


Board.prototype.render = function (ctx){
    ctx.drawImage(this.image, this.x, this.y, 640*this.scale,640);
}

Board.prototype.clean = function (ctx) {
    this.ctx.clearRect(0, 0, 480, 640);
}