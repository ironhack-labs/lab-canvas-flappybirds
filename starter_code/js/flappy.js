function Flappy(game){
    this.game = game;
   
    this.x=200;
    this.y=200;
    this.width = game.canvas.width * 0.08;
    this.height = game.canvas.width * 0.11;
    this.userPull = 0;

    this.img= new Image();
    this.img.src ='./images/flappy.png';
    
    this.velocity = 2;
    this.grav = 0.08;
    this.w = this.width;
    this.h = this.height;

    this.setListeners();
    
}
Flappy.prototype.draw = function(){
    this.game.ctx.drawImage(this.img,this.x,this.y,this.width,this.height
      );
};

Flappy.prototype.setListeners = function() {
      document.onkeydown = function(event) {
        if (event.keyCode === 32) {
          this.userPull = 0.30;
        }
      }.bind(this);
      document.onkeyup = function(e) {
        if (e.keyCode == 32) {
          this.userPull = 0;
       }
      }.bind(this);
    };

Flappy.prototype.move = function() {
    this.velocity += this.grav - this.userPull;
    this.y += this.velocity;
    if((this.y + this.velocity) >= canvas.height - 40) {
      
    }    

}

