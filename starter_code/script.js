//se tiene que crear una cariable para jalar el canvas del html
var canvas = document.getElementById('mainGame')
var ctx = canvas.getContext('2d')

//////////// UPDATE ES LA FUNCION MAS IMPORTANTE DE TODAS ///////
/*classes
    tengo que crear una clase de tipo fondo, Board funciona bien para poner scores etc
    para identificar que es una clase, hay que ponerlo en MAYUSCULA

    this,  son variables que pueden ser accesadas desde afuera
    hay variables privadas, "var _bliss=..." que no son accesibles desde afuera*/

function Board(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height= canvas.height;
    //PONER ATENCION A TODO EL PROCESO DE LA IMAGEN, ABAJO:
    this.img = new Image();//image es instancia de la clase img
    this.img.src = "http://ellisonleao.github.io/clumsy-bird/data/img/bg.png";
    this.score = 0;
    this.music = new Audio();
    this.music.src = "./assets/mario.mp3" //aqui se inserta el link o la fuente del audio, es una propiedad el board
    this.img.onload = function(){
        this.draw();
    }.bind(this);//esta funcion se le esta dando a .onload, por eso es necesario el .bind
    
    
    //Metodo para mover el board sobre su eje x
    this.move= function(){
        this.x--; //esta funcion indica que el board se movera sobre su eje x -1 cada que se haga un update
        if(this.x < -canvas.width) this.x = 0; //se tiene que que poner un - a canvas para aclarar que hablas de su parte negativa
}


    //metodo principal de cualquier clase, que se dibuje asi misma=
    this.draw = function (){
        this.move(); //aqui se indica que cada que se ejecute el metodo draw, se va a ejecutar el metodo move
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);//esto es asi porque si cambia algo, no hace falta que se cambie en el dibujo
        ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height); //se tiene que agregar una segunda imagen para darle efecto de movimiento infinito i si posicion en x tiene que ser la misma + lo ancho del canvas, asi es como se mueve hasta el final del canvas 
    };

    this.drawScore = function(){ //se queda separado del this.draw para que se dibuje el score despues de dibujar los pipes y quede encima
       this.score = Math.floor (frames / 60);
        ctx.font = "50px Avenir"
        ctx.fillStyle = "orange";
        ctx.fillText(this.score, canvas.width/2,this.y+50);
        };

};           //END OF BOARD CLASS
    

     //Flappy
function Flappy(){
    this.x = 150;
    this.y=150;
    this.width = 50;
    this.height= 50;
    this.img = new Image();
    this.img.src= "https://lh3.googleusercontent.com/k6c5BYhnp-C9e3tROiI9twKZp6bYKLPtR06V4jZ8KnsrkpDTMAF4duTtTTh0eq4uIPSiYfzw-_68ELOn_71c7g=s400"
    
    this.img.onload = function(){
        this.draw();
    }.bind(this);
    this.draw = function(){
        this.y += 1; //cada que flappy se redibuje con updare, va a estar mas abajo para dar efecto de gravedad
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        //esto es una validacion, esta funcion podria estar tanto en update como this.move the flappy
        if(this.y < 0 || this.y > canvas.height - this.height) gameOver() //se ejecuta game over si flappy se sale del canvas
    }

    this.move= function(){
        this.y -= 50;
    }

    this.isTouching = function(pipe){ 
        return (this.x < pipe.x + pipe.width)&&
                (this.x + this.width > pipe.x) &&
                (this.y < pipe.y + pipe.height) &&
                (this.y + this.height > pipe.y);
    };//se tienen que combinar los 4 trues de abajo para distinguir si flappy está tocando un pipe, se calcula un area y se indica si un area esta dentro de otra areas


}           //END OF FLAPPY CLASS


        //PIPES
function Pipe(y,height){
    this.x = canvas.width; //cambiar
    this.y = y; //y no esta definida, porque van a ser random, la idea es que los pipes sean de diferentes tamaños
    this.width = 50;
    this.height = height;

    this.draw = function(){
        this.x--;
        ctx.fillStyle = "green"
        ctx.fillRect(this.x, this.y , this.width,this.height) //para dibujarse a si misma
    }
}

            //END OF PIPES CLASS

//DECLARACIONES.... minuscula = objeto, mayuscula = clase (board vs Board)
var board = new Board();
var flappy = new Flappy();
var pipes = []; //aqui es donde se tienen que guardar las pipes
var intervalo; //queda como undefined
var frames = 0; //esta variable existe para contar cuantas veces se ha ejecutado el juego, acuerdate que inicia, se borra y se vuelve a dibujar etc etc

//FUNCIONES AUXILIARES = AUX FUNCTIONS, son muy especificos del videojuego, como barreras, 
function generatePipes(){
    if(!(frames % 300 === 0))return; // esto sirve para indicar que se generen los pipes cada 300 frames, tiene que estar hasta arriba para que el resto
    var ventanita = 150; //esto es el espacio donde va a pasar flappy
    var randomHeight = Math.floor(Math.random() * 200) + 50;//se necesita una altura random para cada pipe
    var pipe = new Pipe(0,randomHeight); 
    var pipe2 = new Pipe(randomHeight + ventanita, canvas.height-(randomHeight + ventanita));
    pipes.push(pipe);
    pipes.push(pipe2);
}


        //funcion para pedir a las pipes que si dibujen solos
function drawPipes(){
    pipes.forEach(function(pipe){
        pipe.draw();
    });
} 

        // funcion para detener el juego cuando pierdes
function gameOver(){
    stop();
    ctx.font = "100px courier"
    ctx.strokeStyle = "orange"
    ctx.lineWidth = 8;
    ctx.strokeText("Game Over", 100,210)
    ctx.fillText("press R to start",50,300)
}
//FUNCION DE VALIDACION, tiene que validar si el juego esta terminado, te devuelve el estado del juego, personaje, puntaje etc. tiene que ser congruente con lo que se visualiza en el canvas
    //hay que validar si flkappy paso por las ventanitas o choco
function checkCollition(){
    pipes.forEach(function(pipe){ //se crea un metopdo donde se evalua/toma pipe
        var res= flappy.isTouching(pipe);
        if(res) gameOver();
    });
}

//MAIN FUNCTIONS  , 
    //update es lo que pide que se ejecute la propiedad/funcion de alguna clase
function update(){
    generatePipes();
    frames++;
    console.log(frames);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    board.draw(); //update borra y pide al tablero que se vuelva a dibujar, sin eso al oprimir el boton start todo se borra, tiene que ir encima de fkappy para que se cargue primero, queda como la base
    flappy.draw();
    drawPipes(); //se necesita definir cada que tanto tiempo se va a generar el pipe
    board.drawScore();
    checkCollition();//checar si checkcollition esta bien al final o al principio de la funcion
}


function start() {
    board.music.play(); //aqui se indica que la musica del board se tiene que reproducir
    //si ya esta corriendo, return
    if(intervalo > 0)return;//para que el fondo no se acelere, ver en function stop
    //extras que necesitemos inicializar
    intervalo = setInterval(function(){
        update();
    },1000/60) //se recomienda velociddad 1000sobre60fps, este intervalo llama al uodate       
    flappy.y = 150;
    pipes = [];
    board.score = 0
    board.music.play()
}


function stop(){
    board.music.pause();
    clearInterval(intervalo);
    intervalo = 0; //para que el fondo no se acelere, ver en function start
}



//listeners (observadores), todo a lo que le puedes dar click y ejecuta algo

        //comienza el juego

document.getElementById('startButton').addEventListener("click", start);//esto nos ahorra codigo, se puede agregar funcion anonima
document.getElementById('pauseButton').addEventListener("click",function(){
    stop()
});
addEventListener('keydown',function(e){
    if(e.keyCode === 32){
        flappy.move();
    }

    if(e.keyCodeç === 82){
        start();
    }
});

