function createFlappy(ctx, canvasX,canvasY){
  var flappy = {
      x: 40,
      y: 40,   
      vx: 0,
      vy: 0, 
      userPull: 0,
      render: function () {
          // NOTE: Optimizar, no renderiza cuando no se ve la bola 
          //if(this.y > canvasSize.h + this.radius){ return; }
          //if(this.x > canvasSize.w + this.radius){ return; }
          var imgFlappy = new Image();
          imgFlappy.src = 'images/flappy.png';
          ctx.drawImage(imgFlappy, this.x, this.y,50, 35);
          
      },
      update: function(){
          this.vy += (window.gravity - this.userPull);
          this.x += this.vx;
          this.y += this.vy;
          if (this.y + this.vy > canvasY|| this.y + this.vy < 0) {
              this.vy *= -1.0;
          }
          if (this.x + this.vx > canvasX || this.x + this.vx < 0) {
              this.vx *= -1.0;
          }
      }
  };
  return flappy;
}
