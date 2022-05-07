/* FILE CONTANING MY VIDEGAMES VARIABLES
- WE DECLARE CANVAS AND CTX
*/

const canvas= document.getElementById('my-canvas');
const ctx = canvas.getContext("2d");

//
let frames = 0;
const gravity = 0.1;

//pipes
const pipes = [];

//points
let points = 0;

//requestId, helps us stop the game
let requestId;

//audio
const audio = new Audio()
//audio.src ="";
//audio.loog = true;

// if we would like to reset the hero
let birdDefault = {
    vida: 3,
    status: "pequeño",
    monedas: 0,
    x: 100,
    y: 10
}

//extras
let diff = 1; //difficulty lvl example