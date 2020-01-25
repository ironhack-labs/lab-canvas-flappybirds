const game = {
    canvas: undefined,
    ctx: undefined,
    screenWidth: 500,
    screenHeight: 500,
    bird:{
        birdWidth:50,
        birdHeight:50,
        birdUrl: "./images/flappy.png",
        birdPosY: 250,
        birdPosX: 50,
        birdVel: 0,
        birdGravity: 0.1,
        birdImage:new Image(),
       },
       
       
       init() {
           this.canvas=document.getElementById("canvas");
           this.ctx=this.canvas.getContext("2d");
           this.canvas.width=this.screenWidth;
           this.canvas.height=this.screenHeight;
           this.background = new Background(this.ctx,this.screenWidth,this.screenHeight);
           this.background.draw();
           
           console.log(this.ctx)
           this.obstacle = new Obstacles(this.ctx,this.screenWidth)

        console.log(this.screenHeight)
},

    drawAll() {
        setInterval(()=> {
            this.clear();
            this.background.draw();
            this.birdDraw();
            this.birdMove();
            this.obstacle.draw()

        },10)

        
    },

    clear(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    },

    birdDraw(){
  
        this.bird.birdImage.src=this.bird.birdUrl;
        this.ctx.drawImage(this.bird.birdImage, this.bird.birdPosX, this.bird.birdPosY, this.bird.birdWidth, this.bird.birdHeight);
 
    },



    birdMove(){

        this.bird.birdVel += this.bird.birdGravity,
        this.bird.birdPosY = this.bird.birdPosY + this.bird.birdVel,

        document.onkeydown = e => {
          if(e.keyCode===32){
              
              this.bird.birdVel = -5
           
          }
        }

    }

    


};

game.init();
game.drawAll();
