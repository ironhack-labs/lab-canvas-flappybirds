//canvas
var canvas = document.getElementById('c')
var ctx = canvas.getContext('2d')
//variables
var interval
var frames = 0
var images = {
    bg:"https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/bg.png?raw=true",
    flappy:"https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/flappy.png?raw=true",
    logo:"https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/logo.png?raw=true",
    obstaclebottom:"https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_bottom.png?raw=true",
    obstacletop:"https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_top.png?raw=true"

}
var pipes=[]
//clases
function Board(){
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.image = new Image()
    this.image.src = images.bg
    //this.image.onload=()=>this.draw()
    this.draw = function(){
        
        this.x--
        if(this.x < -this.width)this.x=0

        ctx.drawImage(this.image,this.x,this.y, this.width, this.height)
        ctx.drawImage(this.image,this.x+this.width,this.y, this.width, this.height)
        this.drawScore()
    }
    this.drawScore = function(){
        ctx.font ="bold 24 Avenir"
        ctx.fillText(Math.floor(frames/60),50,50)

    }
}
function Flappy(){
    Board.call(this)
    this.x =50
    this.y = 300
    this.width = 50
    this.height = 50
    this.image = new Image()
    this.image.src = images.flappy
    this.draw = function(){
        this.boundaries() 
        
        ctx.drawImage(this.image,this.x,this.y, this.width, this.height)
    }
    this.boundaries = function(){
        if(this.y+this.height> canvas.height-10){
            this.y = canvas.height-this.height}
        
        else if(this.y<10){
            this.y = 10}

        else this.y*= 1.01
    }
    this.isTouching = function(item){
        return (this.x < item.x+item.width) && (this.x+this.width>item.x)&&(this.y<item.y+item.height)&& (this.y+this.height>item.y)
    }
}
function Pipe(height, position){
    this.width = 40
    this.height = height
    this.x = canvas.width+60
    this.y = position ==="top"? 0:canvas.height -this.height
   
    this.image = new Image()
    this.image.src = position ==="top" ?images.obstacletop: images.obstaclebottom
    this.draw = function(){
        this.x--
        ctx.drawImage(this.image,this.x,this.y, this.width, this.height)

    }
}
function audio(evento){
    this.audio = new Audio()
    console.log('ya entro')
    this.audio.src = "http://soundbible.com/mp3/Flapping Wings 3-SoundBible.com-1900341762.mp3"
    switch(evento){
        case("ala"):
        this.audio.src = "http://soundbible.com/mp3/Flapping Wings 3-SoundBible.com-1900341762.mp3"
        case("inicio"):
        this.audio.src = "megaman_x4.mp3"
        default:
        this.audio.src = "megaman_x4.mp3"
    }
    this.play = function(){
        this.audio.play()
    }
    
}
//instancias
var bg = new Board()
var flappy = new Flappy()
var pipe = new Pipe()
var aud = new audio("ala")
//main functions
function start(){
    pipes =[]
    frames = 0
    flappy = new Flappy()
    if(!interval){
    interval = setInterval(update,1000/60)}
}
function update(){
    frames++
    ctx.clearRect(0,0,canvas.width, canvas.height)
    bg.draw()
    flappy.draw()
    pipe.draw()
    
    drawPipes()
    checkFlappyCollition()
}
function gameOver(){
    clearInterval(interval)
    interval = null
    ctx.font="bold 80px Helvetica"
    ctx.fillStyle = "red"
    ctx.fillText("Game over",150,200)
}
//aux functions
function drawCover(){

    var img = new Image()
    img.src = images.logo
    img.onload = function(){
        bg.draw()
        ctx.drawImage(img,50,100,300,100)
        ctx.font = "bold 24px Avenir"
        ctx.fillText("Presiona la tecla enter para comenzar",50,300)
    }
}
function generatePipes(){
    if(frames%300 ===0){
        var height = Math.floor(Math.random()*300)
        
        
        pipes.push(new Pipe(height,'top'))
        pipes.push(new Pipe(canvas.height-height-80,'rene'))
    }
    
}
function drawPipes(){
    generatePipes()
    pipes.forEach(function(pipe){
        pipe.draw()
    })
}
function checkFlappyCollition(){
    for(var pipe of pipes){
        if(flappy.isTouching(pipe)){
            gameOver()
        }
    }
}
//listeners
addEventListener('keyup',function(e){
    switch(e.keyCode){
        case 13:
        start()
        var audio = new audio("inicio")
        audio.play()


        
        break
        default:
        return
    }
})
addEventListener('keyup',function(e){
    switch(e.keyCode){
        case 32:
        flappy.y -=50
        aud.play()

        return
        
        default:
        return
    }
})
drawCover()
