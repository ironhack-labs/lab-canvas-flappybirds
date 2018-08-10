function Faby(width, height, speedX, speedY, gravity, gravitySpeed){
  this.width = width;
  this.height = height;
  this.speedX = speedX;
  this.gravity = gravity;
  this.gravitySpeed = gravitySpeed;
  var image = new Image();
  image.src = "images/flappy.png";
  context.drawImage(image, 0, 0);
}

var bird1 = new Faby(30, 30, 1, 1, 1, 1);