function Bird(game) {
    this.game = game;

    this.x = 100;
    this.y = 300;

    this.width = 70;
    this.height = 70;

    this.speedY = 0;
    this.gravity = 15;

    this.img = new Image();
    this.img.src = "images/flappy.png";

    this.setListener();
}

Bird.prototype.draw = function() {
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}

var prevTime = 0;
Bird.prototype.move = function(time) {
    var delta = time - prevTime;
    prevTime = time;

    this.speedY -= this.gravity;
    this.y -= this.speedY * delta/1000;

    if(this.y > 700){
        window.location.reload();
    }
}

Bird.prototype.setListener = function() {
    document.addEventListener('keydown', (event)=>{
        if(event.keyCode == 32){
            event.preventDefault();
            this.speedY = 300;
        }
    });

    document.addEventListener('keyup', (event)=>{
        if(event.keyCode == 32){
            event.preventDefault();
            //this.gravity = 7;
        }
    });
}