var obArray = [];

function Obstacle(name, x, y, width, height, vx, vy){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.vx = vx;
  this.vy = vy;
  this.img = new Image();
  this.img.src = "images/obstacle_" + name + ".png";
  this.draw = function (){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  this.left = function(){ return this.x }
  this.right = function(){ return this.x + this.width}
  this.top = function(){ return this.y }
  this.bottom = function(){ return this.y + this.height}
}

Obstacle.prototype.boMove = function(){
  this.y -= this.vy;
  if(this.y <= 220){
    this.vy *= -1;
  } else if(this.y >= 300){
    this.vy *= -1;
  }
}
Obstacle.prototype.topMove = function(){
  this.y += this.vy;
  if(this.y >= -140){
    this.vy *= -1;
  } else if(this.y <= -240){
    this.vy *= -1;
  }

}

// var ob1 = new Obstacle("bottom", 150, 280, 50, 350, 0.5, 0.5)
// var ob2 = new Obstacle("top", 150, -180, 50, 350, 0.5, 0.5)
// var ob3 = new Obstacle("bottom", 350, 280, 50, 350, 0.5, 0.5)
// var ob4 = new Obstacle("top", 350, -180, 50, 350, 0.5, 0.5)

obArray.push(new Obstacle("bottom", 150, 280, 50, 350, 0.5, 0.5),
             new Obstacle("top", 150, -180, 50, 350, 0.5, 0.5),
             new Obstacle("bottom", 350, 280, 50, 350, 0.5, 0.5),
             new Obstacle("top", 350, -180, 50, 350, 0.5, 0.5))

