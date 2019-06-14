const canvas = document.querySelector("#flappyCanvas")
const ctx = canvas.getContext("2d")

// 
let interval
let frames = 0
let pipes = []
let animateHelper = 0

// Aquí se ejecuta el constructor de Board con Canvas y contexto (ctx) disponible
const board = new Board()
const flappy = new Flappy()


