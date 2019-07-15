class Faby{
  constructor(ctx,width,height,keys){
    this.ctx= ctx
    this.width = width
    this.height = height
    this.speedX = 0
    this.speedY = 0
    this.gravity = 0
    this.gravitySpeed = 0
    this.posX= window.innerWidth/2
    this.posY = window.innerHeight/2
    this.posY0 = window.innerHeight * 0.98 - this.height 

    this.keys = keys
    this.velY = 0.2

   // this.posY0 = this.gameHeight * 0.98 - this.height     //Guardamos la posicion original para usarla como suelo
    //this.posY = this.gameHeight*0.98 - this.height
    
    
  this.image = new Image()
  this.image.src ='images/flappy.png'

  this.setListeners()
  }

  draw(){
    this.ctx.drawImage(this.image,this.posX,this.posY,this.width,this.height)
  }

  move(){
    let gravity = 0.1
 
    if(this.posY >= 0 && this.posY < window.innerHeight){          //COmprobamos que el player nunca sobrepase el suelo.

      this.posY += this.velY
      this.velY += gravity                
    } else {                              //Si lo hace reseteamos posición y velocidad
    
     this.velY = 0.2
     this.posY = window.innerHeight - this.height
    }


  }
  
  setListeners() {
    
    document.onkeydown = (e) => {
      switch(e.keyCode){
        case this.keys.SPACE:     
       
            this.posY -= 30       
           

          }
      }

    document.onkeyup = (e) =>{
  
            this.posY += 70    //Añadimos algo de velocidad al salto para generar el efecto de suavidad y que la gravedad no tire directamente de él
        
    }}
    }

    
  
  