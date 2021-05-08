//todas la varibales o constantes, o arreglos etc....

const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");
const button = document.querySelector("button");

//cosas que mi juego va a necesitar
let frames = 0;
const gravity = 0.1;
let pipes = [];
let points = 0;
let diff = 1 
let requestId;

///
let mario = {
    vida:  3,
    status: "pequeño",
    mondes: 0,
}
// recuerden me poner audio!!!!
const audio = new Audio();
audio.src = "https://patrickdearteaga.com/audio/Battleship.ogg?_=27"
audio.loop = true
// son las clases!!!!!
ctx.font ="80px Arial" 
class Background{
    //constructor
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image();
        this.image.src = "./images/bg.png";
        //Cambiamos el fondo por el elmo en llamas
    }

    gameOver(){
        ctx.font ="80px Arial" 
        ctx.fillText("Te Moriste!!!",250,200)
    }
    //metodos
    draw(){
        if(this.x < -canvas.width) this.x = 0;
        this.x--;

        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        ctx.drawImage(
            this.image,
            this.x + canvas.width,
            this.y,
            this.width,
            this.height
            )
    }

}


class Flappy{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.vy = 1; //g
        this.userPull= 0;//g
        this.width = w;
        this.height = h;
        this.image = new Image();
        this.image.src = "./images/flappy.png";
    }

    collision(item){

        return(
            this.x < item.x + item.width &&
            this.x + this.width > item.x &&
            this.y < item.y + item.height &&
            this.y + this.height > item.y 
        )

    }

    draw(){
        
        this.vy = this.vy + (gravity - this.userPull)
        if(this.y <= 0){
            this.userPull= 0
            this.y = 2
            this.vy = 1
        }
        if(this.y + this.height < canvas.height){
            this.y += this.vy;
        }else {
            gameOver()
        }
      
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}


class Pipe{
    constructor(pos,y,height){
        this.x = canvas.width;
        this.y = y;
        this.width = 30;
        this.height = height;
        this.image = new Image();
        this.image.src =
             pos === "top"
             ? "./images/obstacle_top.png"
             : "./images/obstacle_bottom.png";
    }

    draw(){
        this.x -= 2;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}



//tenemos que instanciar nuestras class!!!
const background = new Background()
const flappy = new Flappy(20,40,30,30)

//nustruestras funciones para poder juegar!!

function start (){
    button.disabled = true
    requestId = requestAnimationFrame (update)
    audio.play()
}

function gameOver(){
    audio.pause()
    button.disabled = false;
    button.onclick = resetGame
    background.gameOver()
    requestId = undefined
}
function resetGame (){
    audio.currentTime= 0
    points = 0
    flappy.y = 40
    start()
}

function generatePipes(){

    if( !(frames % 160 === 0 )) return

    const height = Math.floor(Math.random() * (canvas.height * 0.6)) + 30
    const pipe1 = new Pipe("top",0,height)
    const pipe2 = new Pipe("elDeAbajo",height+120,canvas.height - 120 - height)

    pipes = [...pipes,pipe1,pipe2];
}

function drawPipes(){

    pipes.forEach((pipe,index)=>{

        if(pipe.x < -30){
            points += 0.5
            return pipes.splice(index,1)
        }

        pipe.draw()

        if(flappy.collision(pipe)){
            gameOver()
        }
    })
}
//MAs importante de todas // que se vean las animaciones de nuestro 
function update(){
    frames ++
    ctx.clearRect(0,0,canvas.width,canvas.height);

    background.draw()
    flappy.draw()
    generatePipes()
    drawPipes()
    
    ctx.fillText(points,650,60)
    if(requestId){
        requestId = requestAnimationFrame(update)
    }

}

// addEventListener("keydown",(event)=>{
//     if(event.keyCode === 32){
//         flappy.userPull = 0.3
//     }
// })

document.onkeydown = (event)=>{
        if(event.keyCode == 32){
            flappy.userPull = 0.3
        }
}

// addEventListener("keyup",(event)=>{
//     if(event.keyCode === 32){
//         flappy.userPull = 0
//     }
// })

document.onkeyup = (event)=>{
  

    if(event.keyCode == 32){
         flappy.userPull = 0
    }
}

button.onclick = start