class Player {
    constructor(ctx, w, h, keys) {
      this.ctx = ctx
      this.gameWidth = w
      this.gameHeight = h
  
      this.image = new Image()
      this.image.src = "images/flappy.png"
  
  
      this.width = 30
      this.height = 30
  
      this.posX = 40
      this.posY0 = 250 
      //Suelo

      this.posY = 250
  
      this.velY = 1
  
      this.keys = keys
  
      this.bullets = [] 
  
      this.setListeners()      
    }
  
    draw() {
      this.ctx.drawImage(
        this.image, 
        this.posX,
        this.posY,
        this.width, 
        this.height)
  
         //Funcion que anima los frames.
  
      this.bullets.forEach(bullet => bullet.draw())      //El player dibuja las balas.
    }
  
    move() {
  
      let gravity = 0.4
  
      if(this.posY <= 453){          //COmprobamos que el player nunca sobrepase el suelo.
  
        this.posY += this.velY
        this.velY += gravity                
      } else {                              //Si lo hace reseteamos posición y velocidad
        this.velY = 1
        this.posY = this.posY0
      }
  
      this.bullets.forEach( bullet => bullet.move())      //Movemos las balas
    }
  
  
  
    setListeners() {
      document.onkeydown = (e) => {
        if (e.keyCode === this.keys.TOP_KEY){
              this.posY -= 10//Quizas aqui comienza el problema de aceleracion.
              this.velY -= 10
            }
        }
      }
  
      //Para crear mas proyectiles
    shoot() {
      this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.posY0, this.height))
  
    }
  }