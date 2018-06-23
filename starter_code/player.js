function Player(game){
    this.game = game;
    this.img = new Image();
    this.img.src = "images/flappy.png"

    this.x = 100;
    this.y = 250;
  //  this.dx = 0;
    this.dy = 0;
    this.gravity = 0.2;
    this.userPull = 0;
    this.setListeners();
}

Player.prototype.draw = function(){
    this.game.ctx.drawImage(this.img,
                            this.x,
                            this.y,
                            50,50);
}

Player.prototype.move = function(delta){  
    //this.x -= 1;
    console.log(this.userPull);
    var g = this.gravity / delta;
    var pull = this.userPull;
    this.dy += g - pull;
    //this.x += this.dx * delta;
    this.y += this.dy * delta; 

/*     // Limits in X axis for canvas
    if((this.x+this.dx) >= this.game.canvas.width || (this.x+this.dx) <= 0){
      this.dx *= -0.8;
    }
     */
    
    // Limits in Y axis for canvas
     if((this.y+this.dy) >= this.game.canvas.height || (this.y+this.dy) <= 0){
      this.dy *= -0.8;
    }
    
    if(this.y >= this.game.canvas.height){
      this.y = this.game.canvas.height;
    }
}

 Player.prototype.setListeners = function(){
    document.onkeydown = function (e){
        if (e.keyCode === 32) {
            this.userPull = 0.05;
        }
    }.bind(this);
    document.onkeyup = function (e){
        if (e.keyCode === 32) {
            this.userPull = 0;
        }
    }.bind(this);
} 

