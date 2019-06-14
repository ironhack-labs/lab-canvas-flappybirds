const canvas = document.querySelector('#flappyCanvas')
const ctx = canvas.getContext('2d')

//
let interval
let frames = 0
let pipes = []
let animateHelper = 1

//Aquí se ejecuta el constructor de Board con canvas y ctx disponible
const board = new Board()
const flappy = new Flappy()

