window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');

    var img = new Image();
    img.src = "images/bg.png";


    var gameStopped = false;
    var points = 0;

    listObstacles = [];

    // var img2 = new Image();
    // img2.src = "./images/flappy.png";

    // var faby = {
    //   x: 400,
    //   y: 200,
    //   width: 80,
    //   height: 60,
      // speedX: 0,
      // speedY: 0,
      // gravity: 0,
      // gravitySpeed: 0,
      // draw: function (){
      //   ctx.drawImage(img2, this.x, this.y, this.width, this.height);
      // },

      // update: function() {
      //   this.y += 1;
      //   // console.log(this.y);                
      // },
      // newPos: function() {
      //   var that = this;
      //   document.onkeydown = function(e) {
      //     switch (e.keyCode) {
      //       case 32:
      //       that.y -=50;
      //       // console.log("space");
      //       // console.log(that.y);
      //       break;
      //     }
      //   }
      // }
    // }

    

    var backgroundImage = {
      img: img,
      x: 0,
      speed: -1,

      move: function(){
        this.x += this.speed;
        this.x %= canvas.width;
      },

      draw: function() {
        ctx.drawImage(this.img, this.x, 0);

        if (this.speed < 0) {
          ctx.drawImage(this.img, this.x + this.img.width, 0);

        } else {
          ctx.drawImage(this.img,this.x - this.img.width, 0);
        }
      },
    }


    //Question: why do we pass the context?
    function Faby(ctx) {
      this.width = 400;
      // this.height = fabyHeight;
      this.height = 200;
      this.ctx = ctx;
      this.img = new Image();
      this.img.src = "images/flappy.png";

      // this.speedX = fabySpeedX;
      // this.speedY = 1;
      this.gravity = 1;
      // this.gravitySpeed = fabyGravitySpeed;
    }
  
    faby = new Faby(ctx);
  
    Faby.prototype.draw = function() {
      // this.img.onload = () => {
        this.ctx.drawImage(this.img,this.width, this.height,40,30);
        // console.log(this.img);
        // console.log(this.width);
        // console.log(this.height);
      // }
    }

    Faby.prototype.update = function () {
        this.height += 1 * this.gravity;
        // console.log(this.height);   
    }

    Faby.prototype.newPos = function() {
        var that = this;
        document.onkeydown = function(e) {
          switch (e.keyCode) {
            case 32:
            that.gravity = -8;
            // that.speedY = 10;
            that.height += 1 * that.gravity;
            // setTimeout(function() {
            //   that.gravity = 1;
            //   // that.speedY = 1;
            // } ,350);
            break;
          }
        }
      }

      function Obstacles(x, yTop, ctx) {
        var gap = Math.floor(Math.random() * (300-10) + 100)
        // var posYTop = Math.floor(Math.random()*(50-10)+10);
        // var posYBottom = posYTop + gap;
        var lengthTop = Math.floor(Math.random() * (300-50) + 50)

        this.x = x;
        this.yTop = yTop;
        this.lengthTop = lengthTop;
        this.gap = gap;
        this.ctx = ctx;
        this.imgTop = new Image();
        this.imgTop.src = "images/obstacle_top.png";
        this.imgBottom = new Image();
        this.imgBottom.src = "images/obstacle_bottom.png"; 
      }

      var createTimer = setInterval(createObstacle,4000);

      function createObstacle() {
        var posYTop = Math.floor(Math.random()*(50-10)+10);
        var obstacle = new Obstacles(900, 0, ctx);
        listObstacles.push(obstacle);
      }
      
      // var obstacle2 = new Obstacles(850, 0, ctx);
      // listObstacles.push(obstacle1);
      // listObstacles.push(obstacle2);

      // Obstacles.prototype.create = function () {
        // var gap = Math.floor(Math.random() * (100-50) + 50)
        // var posYTop = Math.floor(Math.random()*(50-10)+10);
        // var posYBottom = posYTop + gap;

      
      // }


      Obstacles.prototype.draw = function() {
        // var gap = Math.floor(Math.random() * (100-50) + 50)
        // var posYTop = Math.floor(Math.random()*(50-10)+10);
        // var posYBottom = posYTop + gap;
        // listObstacles.forEach(function (e) {
          // this.ctx.drawImage(this.imgTop,this.x,posYTop,50,50);
          // this.ctx.drawImage(this.imgBottom,this.x,posYBottom,50,50);

          this.x = this.x - 1;
          this.ctx.drawImage(this.imgTop,this.x,this.yTop,25,this.lengthTop);
          this.ctx.drawImage(this.imgBottom,this.x,this.lengthTop + this.gap,25,canvas.height - (this.lengthTop + this.gap));
        // })
        
      }


      function gameOver(index) {
        if ( faby.height + 30 > 500) {
          console.log("gameOver1");
          gameStopped = true;
          ctx.font = '20px Arial';
          ctx.fillText("Game Over", 400, 200);
          ctx.fillText("Your score: " + points, 400, 250);
        }

        // if ( faby.width < listObstacles[index].x && listObstacles[index].x < faby.width + 40 && faby.width < listObstacles[index].x + 25 && listObstacles[index].x + 25 < faby.width + 40 ) {
        if ( faby.width - 25 < listObstacles[index].x && listObstacles[index].x < faby.width + 15 ) {
          console.log("risk");
          // console.log("faby.height: " + faby.height);
          // console.log(typeof faby.height);
          // console.log("lengthTop: " + listObstacles[index].lengthTop);
          // console.log(typeof listObstacles[index].lengthTop);
          if( faby.height < listObstacles[index].lengthTop || faby.height + 30 > listObstacles[index].lengthTop + listObstacles[index].gap ) {
            gameStopped = true;
            ctx.font = '20px Arial';
            ctx.fillText("Game Over", 400, 200);
            ctx.fillText("Your score: " + points, 400, 250);
          }
        }
      }


    
    function updateCanvas() {
      
      if (gameStopped === false) {
      backgroundImage.move();
      ctx.clearRect(0,0,canvas.width,canvas.height);
      backgroundImage.draw();

      if (faby.gravity < 5) {
        faby.gravity += 0.35;
        // console.log("faby.gravity: " + faby.gravity);
      }
      faby.update();
      faby.newPos();
      faby.draw();
      points += 1;
      ctx.fillText("Your score: " + points, 50, 50);

      // var gap = Math.floor(Math.random() * (100-50) + 50);
      
      listObstacles.forEach(function(e) {
        e.draw();
        gameOver(listObstacles.indexOf(e));
      })


      
      

      requestAnimationFrame(updateCanvas);
    }
  }

   updateCanvas(); 

   
  //  var img2 = new Image();
  //  img2.src = "./images/flappy.png";


  

}

};
