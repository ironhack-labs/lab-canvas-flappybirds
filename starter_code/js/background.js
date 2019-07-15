class Background{
constructor(ctx,width,height){
  this.ctx = ctx
  this.width= width
  this.height = height

  this.image = new Image()
  this.image.src = 'images/bg.png'

  this.posX =0
  this.posY= 0

  this.velX= 0.5
}


draw(){
  this.ctx.drawImage(this.image,this.posX,this.posY,this.width,this.height)
  this.ctx.drawImage(this.image,this.posX + this.width, this.posY,this.width,this.height)
}

move(){

}


move() {
  this.posX -= this.velX
  //Cuando la primera imagen salga por completo de la pantalla restablecemos la posicion de ambas, generando un bucle.
  if(this.posX <= -this.width){ this.posX= 0}
}


}