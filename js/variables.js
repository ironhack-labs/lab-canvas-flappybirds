const $canvas = document.querySelector('canvas')
const ctx = $canvas.getContext('2d')
const gravity = 0.7

let board = new Board()
let flappy = new Flappy()
let obstacles = []

let frames = 0,
    intervalId = 0,
    score = 0;