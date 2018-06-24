function Player(game) {
  this.game = game;
 
  this.x = 50;
  this.y = 190;
  this.vy = 0;
  this.userPull = 0;
  this.imgScale=900/490;
  this.img = new Image();
  this.img.src = "images/flappy.png"
  this.gravity = 0.10;

  this.setListeners();
}


Player.prototype.draw = function() { 
  this.game.ctx.drawImage(this.img, this.x, this.y, 20 * imgScale, 40); 
};


Player.prototype.setListeners = function() {
  document.onkeydown = function(e) {
    if(e.keyCode == 32){
      this.userPull = 0.05;
    }
  }
  document.onkeyup = function(e) {
    if (e.keyCode == 32) {
      this.userPull = 0;
    }
  }
  };


Player.prototype.move = function(){
  this.vy = this.gravity;
  this.y += this.vy;
  if((this.y+this.vy) >= canvas.height || (this.y+this.vy) <= 0){
    this.vy *= -0.8;
  }
  
  if(this.y >= canvas.height){
    this.y = canvas.height;
  }
}
