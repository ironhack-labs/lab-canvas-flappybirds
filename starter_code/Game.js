 /** @type HTMLCanvasElement */
 const canvasDOMEl = document.getElementById("canvas");

 /** @type CanvasRenderingContext2D */
 const ctx = canvasDOMEl.getContext("2d");

 let w, h;



 const game = {
     canvas: undefined,
     ctx: ctx,
     width: w,
     height: h,
     fps: 60,
     obstacles: [],
     framesCounter: 0,
     score: undefined,
     SPACE: 32,
     obstacles: [],



     init() {
         this.canvas = document.getElementById("canvas");
         this.ctx = this.canvas.getContext("2d");
         console.log(this.canvas)
         this.setDimensions();

         game.start()
         //scoreboard.init(this.ctx);

     },

     start() {
         this.reset();
         this.interval = setInterval(() => {
            //  this.framesCounter++;

            //  if (this.framesCounter > 1000) this.framesCounter = 0;

            //  if (this.framesCounter % 100 == 0) this.score++;

             this.clear();
             this.drawAll();
             this.moveAll();
             //this.generateObstacles();
            //  this.setListener();

             //this.clearObstacles();
            //  if (this.isColision()) {
            //      this.gameOver();
            //  }

         }, 1000 / this.fps);
     },

     setDimensions() {
         this.width = window.innerWidth;
         this.height = window.innerHeight;
         this.canvas.width = this.width;
         this.canvas.height = this.height;
     },

     reset() {
         this.background = new Background(this.ctx, this.width, this.height);
         this.Flappy = new Flappy(this.ctx, 100, 100);
         this.obstacles = new Obstacle(this.ctx, 100, 100);
     },


     clear() {
         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
     },

     drawAll() {
         this.background.draw()
         this.Flappy.draw()
         this.obstacles.draw();

     },

     moveAll() {
         this.Flappy.move();


         //this.obstacles.forEach(obs => obs.move());
     },

    //  generateObstacles() {
    //      if (this.framesCounter % 70 == 0) {
    //          //Generamos obstaculos cada 70 frames.
    //          console.log(this.obstacles);
    //          this.obstacles.push(new Obstacles(this.ctx, this.canvas.width, this.player.posY0, this.player.height)); //pusheamos nuevos obstaculos
    //      }

      
    
     }
 