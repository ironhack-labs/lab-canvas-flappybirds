function Player (game){
    this.game = game;
    this.x = this.game.canvas.width * 0.08;
    this.y0 = this.game.canvas.height * 0.08;
    this.y = this.game.h / 2;

    this.img = new Image();
    this.img.src = './images/flappy.png';   

    this.w = 50;
    this.h = 75;
       

    this.speedX = 0
    this.speedY = 0.0
    this.gravitySpeed = 0
    this.setListeners()


}
Player.prototype.draw =  function() {
    this.game.ctx.drawImage (this.img, 300, 400, this.w, this.h)      
   }


Player.prototype.move = function (){
    var gravity = 0;
    this.speedY += this.gravity
    this.y += this.speedY
}    
   Player.prototype.setListeners = function () {
       document.onkeydown = function(e) {
           if (e.keyCode === this.game.keys.SPACE && this.y == this.y0)
           cponsole.log("keys")
           this.speedY += 5
           
       }
       
   }.bind(this)   
   