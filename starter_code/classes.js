class Board{
  constructor (){
    this.x = 0
    this.y=0
    this.width = canvas.width
    this.height= canvas.height
    this.img= new Image()
    this.img.src = './images/bg.png'
    this.img.onload = () =>{
      this.draw()
    }
  }
  move(){
    this.x--
    if(this.x < -canvas.width) this.x=0
  }
  draw(){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height)
    this.move()
  }
 }
 class Flappy{
   constructor(){
     this.x = 150
     this.y = 150
     this.width = 50
     this.height = 50
     this.flappyUP = new Image()
     this.flappymid = new Image()
     this.flappydown = new Image()
     this.img = new Image()
     this.img.src='./images/yellowbird-upflap.png'
     this.flappyUP.src ='./images/yellowbird-upflap.png'
     this.flappymid.src ='./images/yellowbird-midflap.png'
     this.flappydown.src ='./images/yellowbird-downflap.png'
   }
   draw(){
     this.y+=2
     if(frames%2 === 0){
       this.img = animateHelper === 0 ? this.flappyUP :
       this.img = animateHelper === 1 ? this.flappymid :
       this.img = animateHelper === 2 ? this.flappydown : this.flappymid
       if(animateHelper < 4){
         animateHelper++
        }else{
          animateHelper = 0
        }
     }
     ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
   }
   flap(){
     this.y -= 30
   }
   isTouching(pipe){
     return (this.x < pipe.x + pipe.width && 
     this.x + this.width > pipe.x && 
     this.y > pipe.height && 
     this.y+ this.height > pipe.y)
   }
 }
 class Pipe{
   constructor(y, height, type){
     this.x = canvas.width + 50
     this.y = y
     this.width = 50
     this.height = height
     this.imgTop = new Image()
     this.imgBotton = new Image()
     this.imgBotton.src = 'images/obstacle_bottom.png'
     this.imgTop.src = 'images/obstacle_top.png'
     this.type = type
   }
   move(){
     this.x--
   }
   draw(){
     if(this.type){
       ctx.drawImage(this.imgTop, this.x, this.y, this.width, this.height)
     }else{
       ctx.drawImage(this.imgBotton, this.x, this.y, this.width, this.height)
     }
     this.move()
   }
 }