function Game(id){
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.fps = 60;
    this.x=0;
    this.y=0;
    this.width=900;
    this.height=900;
    this.img= new Image();
    this.src= "images/bg.png";

}

Game.prototype.init = function(){

    setInterval(function(){
        this.clear();
        this.drawBackground();
    }.bind(this),1000 / this.fps)
    
}

Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  };

Game.prototype.drawBackground = function(){
    this.img.src = this.src;
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}   