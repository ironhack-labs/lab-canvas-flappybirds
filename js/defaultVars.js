/**
 *  Archivo para vairables que utiliza mi videojuego!!!! 
 */

/*
const gameVar = {
    canvas: "",
}
*/

const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");

let frames = 0;
const gravity = 0.1;

//pipes  newArry = [...array, {...} ] newArray = [{...}, ...array ] spread operator 
let pipes = [];

//bala
let bullets = [];
//
let points = 0;

//algo extra
let diff =  1; // dificultad

let requestId; 

//audio
const audio = new Audio();
audio.src = "audio/drama.mp3";
audio.loop = true;

//heroe default ejemplo 
let dylanDefault = {
    vida:3,
    status:"pequeño",
    monedas:0,
}

