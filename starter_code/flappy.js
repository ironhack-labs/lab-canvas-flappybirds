class Player {
    constructor(ctx, w, h) {

        this.ctx = ctx
        this.gameWidth = w
        this.gameHeight = h


        //fuente bicho
        this.image = new Image()
        this.image.src = "images/flappy.png"

        //dimensiones bicho
        this.width = 100
        this.height = 400    //me esta tomando este omo eje Y
        this.posY = 80
        this.posX = 60
        this.posY0 = this.gameHeight * 0.98 - this.height
        this.posY1 = this.gameHeight*0.98 - this.height

        this.velY = 2


        // this.setListeners()


        
    }

    draw() {
      this.ctx.drawImage(
      this.image,                           
      this.width,                                                        
      this.height,
      this.posY, 
      this.posX)

      this.setListeners
    }


    move() {
      
      
         let gravity = 0.4
         console.log(this.posY)
         if(this.posY1 < this.posY0){ 

          
          this.velY += gravity          
          this.posY += this.velY
                        
        } 
      
        }

       

    // setListeners() {
    //     document.onkeydown = (e) => {
    //         e.keyCode === 37 ? this.Player.goUp() : null }
    //         }

            







  }