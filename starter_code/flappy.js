var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


function ComponentFlappy() {
this.img = new Image();
this.img.src="./images/flappy.png";
this.width = 60;
this.height = 50;
this.x=400;
this.y=250;
this.speedX = 0;
this.speedY = 0;
this.gravity = 1.5;
}

ComponentFlappy.prototype.move = function() {
    var that = this;
    
    document.onkeydown = function(e) {
        if(e.keyCode===32) {
            that.gravity=-1; 
        }
    }
    that.y += that.gravity; 
    document.onkeyup = function(e) {
    if(e.keyCode===32) {
        that.gravity=1; 
    }
    }
    that.y += that.gravity; 
}

ComponentFlappy.prototype.draw = function(){
    ctx.drawImage(this.img,this.x, this.y,this.width,this.height);
}




// ComponentFlappy.prototype.crashWith = function(obstacle) {
//     this.left   = function() { return this.x                 }
//     this.right  = function() { return (this.x + this.width)  }
//     this.top    = function() { return this.y                 }
//     this.bottom = function() { return this.y + (this.height) }
    
//     return !((this.bottom() < obstacle.top())    ||
//                 (this.top()    > obstacle.bottom()) ||
//                 (this.right()  < obstacle.left())   ||
//                 (this.left()   > obstacle.right())) 
//     }




