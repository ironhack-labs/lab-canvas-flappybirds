class Player {
    constructor(ctx, w, h, keys) {
        this.ctx = ctx
        this.gameWidth = w
        this.gameHeight = h

        this.image = new Image()
        this.image.src = "images/flappy.png"


        this.width = 50
        this.height = 50
        this.posX = 40
        this.posY0 = this.gameHeight * 0.98 - this.height     //Guardamos la posicion original para usarla como suelo
        this.posY = this.gameHeight * 0.98 - this.height

        this.velY = 1
        this.keys = keys

        this.setListeners()       //Llamamos al listener para que desde el primer momento el jugador responda.
    }
    draw(framesCounter) {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)

    }
    move() {
        let gravity = 0.4
        if (this.posY <= this.posY0) {          //COmprobamos que el player nunca sobrepase el suelo.

            this.posY += this.velY
            this.velY += gravity
        } else {                              //Si lo hace reseteamos posición y velocidad
            this.velY = 1
            this.posY = this.posY0
        }
    }
    setListeners() {
        document.onkeydown = (e) => {
            switch (e.keyCode) {                   //Gestion del movimiento.
                case this.keys.KEY_A:
                    this.posY -= 30
                    this.velY -= 10
                    break;
            }
            //Añadimos algo de velocidad al salto para generar el efecto de suavidad y que la gravedad no tire directamente de él

        }
    }

};