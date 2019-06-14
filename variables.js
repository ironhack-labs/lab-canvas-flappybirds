const canvas = document.querySelector('#flappyCanvas')
const context = canvas.getContext('2d');


let interval
let frames = 0
let animateHelper = 0
let pipes = []

const board = new Board()
const flappy = new Flappy()