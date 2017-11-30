function Flappy(id) {
  var canvas = document.getElementById("canvas");
  canvas.width = 1000;
  canvas.height = 400;
  this.ctx = canvas.getContext("2d");

  var img = new Image();
  img.src = "./images/flappy.png";

  img.onload = (function() {
    this.ctx.drawImage(img, 0, 0, 50, 50);
  }).bind(this);

  function Fly(){
  this.x = 50;
  this.y = 50;
  this.sx = 2;
  this.sy = 2;
}

  this.x += this.sx;
  this.y += this.sy;


  setInterval(function() {
    Fly.update();
  }, 20);

}
