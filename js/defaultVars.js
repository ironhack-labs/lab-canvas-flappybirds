/* este es un archivo para las variables que utiliza mi videojuego 
aqui declaramos el canvas y su contexto*/

const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

//
let frames = 0;
const gravity = 0.1;

const pipes = [] //aquí guardo los enemigos. Arreglo de multiples objetos. [{},{},{}]

let points = 0;

// los extras
let dificultad = 1 //

let requestId;//este nos sirve para iniciar o detener el juego.


const dead = new Image()
dead.src="https://w7.pngwing.com/pngs/359/749/png-transparent-death-certificate-sword-art-online-gamebanana-died-text-rectangle-logo.png"
    

//audio:
const audio = new Audio ();
//vamos a colocar el audio :

audio.src = "audio/drama.mp3"
audio.loop = true;

//si quieren resetear al hero:

let dylanDefault ={
    //vida:3,
    //status:"pequeño",
    //monedas:0,
    y:100,
    vy:2,
    x:100
}



