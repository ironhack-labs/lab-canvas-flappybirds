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
    this.posY0 = 250    //Guardamos la posicion original para usarla como suelo
    this.posY = 250

    this.velY = 1
    
    //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage

    this.keys = keys

    this.bullets = []           //Array de balas

    this.setListeners()       //Llamamos al listener para que desde el primer momento el jugador responda.
  }

  draw() {
    this.ctx.drawImage(
      this.image, 
                                                                             //Punto y donde empieza a recortar
      this.posX,
      this.posY,                       //Punto x donde termina de recortar
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
            this.posY -= 10       //Añadimos algo de velocidad al salto para generar el efecto de suavidad y que la gravedad no tire directamente de él
            this.velY -= 10
          }
      }
    }
  

  shoot() {

    //Instanciamos nuevas balas
    this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.posY0, this.height))
    
  }
}