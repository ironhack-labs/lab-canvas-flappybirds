var canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

function Obstacles() {
  this.imgTop = new Image();
  this.imgTop.src = "./images/obstacle_top.png";
  this.imgBtm = new Image();
  this.imgBtm.src = "./images/obstacle_bottom.png";
  this.x=900;
  this.yTop=-550;
  this.yBtm=250;


  // this.hObsTop=-300;
  // this.hObsBtm=500; 


  this.speed=-1; //uso la misma velocidad que background

}

Obstacles.prototype.drawTop=function(){
  
  ctx.drawImage(this.imgTop, this.x, this.yTop);

}

Obstacles.prototype.drawBtm=function(){
  
  ctx.drawImage(this.imgBtm, this.x+350, this.yBtm);
}


Obstacles.prototype.move=function(){
  this.x+=this.speed;
}


  // this.left   = function() { return this.x                 }
  // this.right  = function() { return (this.x + this.width)  }
  // this.top    = function() { return this.y                 }
  // this.bottom = function() { return this.y + (this.height) }
  
  //   this.crashWith = function(obstacle) {
  //   return !((this.bottom() < obstacle.top())    ||
  //            (this.top()    > obstacle.bottom()) ||
  //            (this.right()  < obstacle.left())   ||
  //            (this.left()   > obstacle.right())) 
  // }

