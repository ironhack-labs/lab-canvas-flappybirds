function Game(canvas) {
    this.animationId = null;
    this.bg = new Bg(canvas);
    this.flappy = new Flappy(canvas);
    document.onkeydown = this.onKeyDown.bind(this);
    document.onkeyup = this.onKeyUp.bind(this);
}

Game.prototype.draw = function() {
    this.bg.draw();
    this.flappy.draw();
    this.animationId = window.requestAnimationFrame(this.draw.bind(this));
}

Game.prototype.onKeyDown = function(event) {
    if(event.keyCode == "38") {
        this.flappy.moveUp();
    }
}

Game.prototype.onKeyUp = function(event) {
    if(event.keyCode == "38") {
        this.flappy.moveDown();
    }
}