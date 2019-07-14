class Bird {
  constructor(ctx, w, h, keys) {
    this.ctx = ctx;
    this.gameWidth = w; // le pasamos al jugador la width y height del juego como referencia
    this.gameHeight = h;

    this.image = new Image();
    this.image.src = "images/flappy.png";

    this.width = 100;
    this.height = 100;

    this.posX = 50;
    this.posY0 = this.gameHeight * 0.98 - this.height; //Guardamos la posicion original para usarla como suelo
    this.posY = this.gameHeight / 2 - this.height; // determin

    this.velY = 5;

    this.keys = keys;

    this.setListeners();
  }

  draw(framesCounter) {
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    this.animate(framesCounter); //Funcion que anima los frames.
  }

  move() {
    let gravity = 0.3;

    this.posY += this.velY;
    this.velY += gravity;
  }

  animate(framesCounter) {
    if (framesCounter % 5 == 0) {
      this.image.framesIndex++; //Cambiamos el frame de la imagen cada 5 fps.
      if (this.image.framesIndex > 2) {
        this.image.framesIndex = 0;
      }
    }
  }

  setListeners() {
    document.onkeydown = e => {
      if (e.keyCode === this.keys.W) {
        this.posY -= 30; //Añadimos algo de velocidad al salto para generar el efecto de suavidad y que la gravedad no tire directamente de él
        this.velY -= 10;
        console.log("hola");
      }
    };
  }

  isCollision() {
    // this.obstacles.some(obs => {
    //   if (this.player.posX + this.player.width >= obs.posX && this.player.posY + this.player.height >= obs.posY && this.player.posX <= obs.posX + obs.width) {
    //fin del juego, detenemos intervalo
    if (this.posY <= this.gameHeight) {
      this.gameOver();
    }
  }

  // });
  //}
}
