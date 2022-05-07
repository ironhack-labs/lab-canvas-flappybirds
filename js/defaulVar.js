/** 
 * Archivo para las variables que utiliza las variables mi videojuego
 * declaramos el canvas y su contexto
 */

const canvas = document.getElementById('my-canvas')
const ctx = canvas.getContext('2d');

//
let frames = 0;
const gravity = 0.1;

// pipes = array = [{...},{...},{...}]
const pipes = [];

//points
let points = 0;

//los extras
let difficultad = 1; // es un ejemplo

let requestId; // este nos va a servir para detener el juego o seguir jugando

//audio!!
const audio = new Audio()
//vamos a colocar el audio de la carpeta
audio.src = "audio/drama.mp3"
//loop para que siemre esté corriendo
audio.loop = true

//imagen de Game Over
const dead = new Image()
dead.src = "https://www.muylinux.com/wp-content/uploads/2014/01/mljuegos0.png"



// si quieren resetear al heroe!!
let mapyDefault = {
    vida: 3,
    status: 'pequeño',
    monedas: 0,
    x: 100,
    y: 10,
}