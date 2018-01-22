window.onload = function () {
  document.getElementById("start-button").onclick = function () {

function startGame() {

 function  

  draw();
}
var canvas = document.getElementById('flappy-canvas');
var ctx = canvas.getContext('2d');


var img2= new Image();
img.src = './images/bg.png';
var backgroundImage = {
  img: img,
  x: 1,
  speed: -02,
  move: function() {
    this.x += this.speed;
    this.x %= canvas.width;
  },

  draw: function() {
    ctx.drawImage(this.img, this.x, 0);
    if (this.speed < 0) {
      ctx.drawImage(this.img, this.x + canvas.width, 0);
    } else {
      ctx.drawImage(this.img, this.x - this.img.width, 0);
    }
  },
};

function updateCanvas() {
  backgroundImage.move();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  backgroundImage.draw();

  requestAnimationFrame(updateCanvas);
}

img.onload = updateCanvas;

};

};
