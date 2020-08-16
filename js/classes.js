class Background{
  constructor() {
    this.x=0;
    this.y=0;
    this.width=canvas.width
    this.heigth=canvas.height
    this.img=new Image();
    this.img.src="../images/bg.png"
  }
  draw(){
    this.x--
    if(this.x < -canvas.width){
      this.x=0;
    }
    ctx.drawImage(this.img, this.x, this.y, this.width, this.heigth)
    ctx.drawImage(this.img, this.x+canvas.width, this.y, this.width, this.heigth)
  }
}

class Character{
  constructor(x,y) {
    this.x=x
    this.y=y
    this.width=50
    this.height=50
    this.speedY=0;
    this.img=new Image();
    this.img.src="../images/flappy.png"
    this.gravity=0.98
  }
  draw(){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  jump(){
    this.speedY= -10;
  }
  touch(ob){
    return(
      this.x<ob.x+ob.width&&
      this.x+this.width>ob.x&&
      this.y<ob.y+ob.height&&
      this.y+this.height>ob.y
    )
  }
  updatePos(){
    this.y += this.speedY
    this.speedY += this.gravity
  }
}

class Obs{
  constructor(y) {
    this.x=canvas.width
    this.y=y
    this.width=138
    this.height=793
    this.btmImg=new Image();
    this.btmImg.src="../images/obstacle_bottom.png"
    this.topImg=new Image();
    this.topImg.src="../images/obstacle_top.png"
  }
  draw(){
    this.x--;
    if(this.y<0){
      ctx.drawImage(this.topImg, this.x, this.y, this.width, this.height)
    }else{
      ctx.drawImage(this.btmImg, this.x, this.y, this.width, this.height)
    }
  }
}