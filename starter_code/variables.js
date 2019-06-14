//instancia de 
const canvas = document.querySelector('#flappyCanvas')
const ctx = canvas.getContext('2d')

//Aqui se ejecuta el constructor de Board con el canvas y el contexto 
let animateHelper = 1
let interval
let frames = 0
let pipes = []//se van a almacenar los obstaculos en un array

const board = new Board()
const flappy = new Flappy()