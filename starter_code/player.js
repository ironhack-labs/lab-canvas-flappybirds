var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); 

function Player(){
    this.img = new Image();
    this.img.src = "images/flappy.png";
    this.x = 50;
    this.y = 120;
    this.width = 70;
    this.heigth = 60;
    this.gravity = 8;
    this.draw = function() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.heigth); 
    }
    this.move = function() {
        that = this;
        document.onkeydown = function(event) {
            if (event.keyCode === 32) { 
                that.gravity = -8;
            }
        }
        document.onkeyup = function(event) {
            if (event.keyCode === 32) { 
                that.gravity = 8; 
            }
        }
        this.y += this.gravity; 
    }
}

var flappy = new Player();
