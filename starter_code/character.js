class Player{
  constructor (w, h, ctx, keys){
    this.canvasW = w;
    this.canvasH = h;
    this.ctx = ctx;
    this.kesys = keys;

    //flappy character
    this.img = newImage();
    this.img.src = "images/flappy.png";

    //número de imagenes diferentes



    this.setListeners();

  }
}
