const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//ctx is executed with object board
const board = new Board();
const flappy = new Flappy();

let interval;
let frames = 0;
let pipes = [];
let animateHelper = 1;
