var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); 

function Background(){
    this.img = new Image();
    this.img.src = "images/bg.png";
    this.x = 0;
    this.y = 0;
    this.speed = -1;
    this.draw = function() {
        ctx.drawImage(this.img, this.x, this.y);
        ctx.drawImage(this.img, this.x + canvas.width, this.y);
    },
    this.move = function() {
        this.x += this.speed;
        this.x %= canvas.width;
    }
}

var background = new Background();
