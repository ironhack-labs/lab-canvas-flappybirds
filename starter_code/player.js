var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); 

function Player(){
    this.img = new Image();
    this.img.src = "images/flappy.png";
    this.x = 0;
    this.y = 0;
    this.width = 60;
    this.height = 50;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.draw = function() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height); 
    }
}

var flappy = new Player();

