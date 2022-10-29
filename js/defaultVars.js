/**
 * Archivo para variables globales | Se comparten con todos los archivos
 * Éste script se debe importar antes que todos 
 */

// Ejemplo 
/*
const defaultDavid = {
    vida: 100,
    fuerza:90, 
    defensa:80
}
*/

const canvas = document.getElementById('my-canvas') ; // Esenciales
const ctx = canvas.getContext('2d'); // Esenciales

let frames = 0; // *Importante
const gravity = .1; // *Importante

// Array con los objetos a esquivar
const arrPipes = []; // *Importante 
let points = 0; 

let hardLevel = 1; // Dificultad
let requestId; // Para validar que está corriendo *Importante

 
const audio = new Audio()
audio.src =  'audio/drama.mp3'; 
 audio.volume = .2
 audio.loop = true;
 