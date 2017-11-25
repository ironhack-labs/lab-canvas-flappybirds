function Game(canvas) {
    this.animationId = null;
    this.bg = new Bg(canvas);
}

Game.prototype.draw = function() {
    this.bg.draw();
    this.animationId = window.requestAnimationFrame(this.draw.bind(this));
}