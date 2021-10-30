class Player {
    constructor(ctx, posX, posY, width, height, speedY) {
        this.ctx = ctx
    
        this.pos = {
            x : posX,
            y : posY,
            initialY : 200,
        } 

        
        this.size = {
          width: width,
          height: height
        }
        
        this.speed = {
            y : speedY
        }

        this.image = undefined

        this.physics = {
          gravity: 0.2
        } 
    
        this.startGame()
      }


      startGame() {
    
        this.image = new Image();
        this.image.src = './images/flappy.png';
      }


      draw() {
        this.ctx.drawImage(this.image, this.pos.x, this.pos.y, this.size.width, this.size.height)
      }

      
      move() {
        this.pos.y += this.speed.y
        this.speed.y += this.physics.gravity

        if (this.pos.y >= 520) {
          this.pos.y = 520
        } else if (this.pos.y <= 10) {
          this.pos.y = 10
        }
                
      }


      
      jump() {
               
        this.pos.y -= 80;
        this.speed.y = this.physics.gravity;


      }


      
      outOfLimits() {
        if ((this.pos.y + this.size.height) >= 600) {
          this.stop()
        }
        //TODO OUT OF LIMITS CORRECT
      }
    
      



    


}