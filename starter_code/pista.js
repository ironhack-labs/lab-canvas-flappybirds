function Background(ctx) {
     this.ctx=ctx;
     this.img = new Image();
     this.img.src = 'images/bg.png';
   
     this.x = 0;
     this.y = 0;
   
     this.dx = 5;
   }
   
   Background.prototype.draw = function(ctx) {
    this.ctx.drawImage(this.img, this.x, this.y, 800, 800);
    this.ctx.drawImage(this.img, this.x + 800, this.y, 800, 800);
   };
   
   Background.prototype.move = function() {
     this.x -= this.dx;
   
     if (this.x < -800) this.x = 0;
   }

     Background.prototype.update=function(){
          this.draw();
          this.move();
   };
