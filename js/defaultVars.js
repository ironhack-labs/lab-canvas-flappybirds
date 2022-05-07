/**
 * Archivo para las variables que se utiliza mi videojuego
 * declaramos aqui el canvas y su ctx
 * 
 * 
 */

const canvas = document.getElementById("my-canvas")
const ctx = canvas.getContext("2d");

let frames = 0;
const gravity =0.1;

//pipes = array=[{..},{...}] => arreglo de multiples objetos
const pipes=[];

//points
let points=0;

//los extras

let dificultad= 1;

let requestId; //este nos va a servir para detener el juego

// audio!!
const audio= new Audio()
audio.src="audio/drama.mp3"
audio.loop=true

//si quieren resetear al heroe!!
let dylanDefault={
    vida:3,
    status:"pequeño",
    monedas:0
}