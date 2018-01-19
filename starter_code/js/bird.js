var img = new Image();
function createBird(ctx, canvasSize){
  var bird = {
      x: 40,
      y: 40,   
      //vx: 0,
      vy: 0, 
      userPull: 0,
      radius: 25,
      color: '#2e7d32',
      imgScale: 500/350,
  
      render: function () {
          img.src="./images/flappy.png";
          ctx.drawImage(img, this.x, this.y, 50*this.imgScale,50);

      },
      update: function(){
          this.vy += (window.gravity - this.userPull);
          //this.x += this.vx;
          this.y += this.vy;
          if (this.y + this.vy > canvasSize.h - 47 || this.y + this.vy < 0) {
              this.vy *= -1.0;
              window.alert("GAME OVER!!");
          }
          // if (this.x + this.vx > canvasSize.w || this.x + this.vx < 0) {
          //     this.vx *= -1.0;
          // }
      }
  };
  return bird;
}



