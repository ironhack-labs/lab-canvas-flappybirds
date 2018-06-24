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
            if (event.keyCode === 32) { // if I press the space bar, it jumps (i.e., gravity points to the top)
                that.gravity = -8;
            }
        }
        document.onkeyup = function(event) {
            if (event.keyCode === 32) { // if I don't jump, gravity pulls the bird to hell (points to the bottom)
                that.gravity = 8; 
            }
        }
        this.y += this.gravity; // Here the y position of the bird changes -10 or +10 depending on if you are jumping or not respectively.
        if (this.y < 0) this.y = 0; // Here we set some limits: if it goes upper than 0 then don't let thim fly beyond! set y to 0 no matter if you jump.
        else if (this.y > 435) this.y = 435; // and if it reaches the ground (doesn't match with the canvas.height for the image dimensions probably) then let it walk.
    }
}

var flappy = new Player();
