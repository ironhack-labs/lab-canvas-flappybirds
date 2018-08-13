function Bird(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.img = new Image();
  this.img.src = "images/flappy.png";
  this.draw = function (){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  this.moveRight = function(){
    this.x += 5;
  }
  this.moveLeft = function(){
    this.x -= 5;
  }
  this.moveUp = function(){
    this.y -= 5;
  }
  this.moveDown = function(){
    this.y += 5;
  }
  
  this.left = function() { return this.x }
  this.right = function(){ return this.x + this.width }
  this.top = function(){ return this.y }
  this.bottom = function(){ return this.y + this.height}

}

var b1 = new Bird(10, 200, 40, 40);

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 38:
      b1.moveUp();
      break;
    case 40:
      b1.moveDown();
      break;
    case 37:
      b1.moveLeft();
      break;
    case 39:
      b1.moveRight();
      break;
  }
  updateCanvas();
};