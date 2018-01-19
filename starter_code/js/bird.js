function createBird(ctx, canvasSize){
  var bird = {
      x: 40,
      y: 40,   
      //vx: 0,
      vy: 0, 
      userPull: 0,
      radius: 25,
      color: '#2e7d32',
      render: function () {
          // NOTE: Optimizar, no renderiza cuando no se ve la bola 
          //if(this.y > canvasSize.h + this.radius){ return; }
          //if(this.x > canvasSize.w + this.radius){ return; }
  
          ctx.font = "15px Arial";
          ctx.save()
          ctx.translate(this.x + 30, this.y + 30);
          var txt = " vy: " + this.vy.toFixed(2);
          ctx.fillText(txt,10,50);
          ctx.restore()
          var img = new Image();
          imgScale = 500/350;
          img.src="./images/flappy.png";
        //img.onload = function() {
            ctx.drawImage(img, this.x, this.y, 50*imgScale,50);
          //}

      },
      update: function(){
          this.vy += (window.gravity - this.userPull);
          //this.x += this.vx;
          this.y += this.vy;
          if (this.y + this.vy > canvasSize.h || this.y + this.vy < 0) {
              this.vy *= -1.0;
          }
          // if (this.x + this.vx > canvasSize.w || this.x + this.vx < 0) {
          //     this.vx *= -1.0;
          // }
      }
  };
  return bird;
}
