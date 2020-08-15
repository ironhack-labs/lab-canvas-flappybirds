const $canvas = document.querySelector("canvas")
const ctx = $canvas.getContext("2d")
const $button = document.querySelector("button")

const gravity = 0.98
let intervalId
let frames = 0
const obstacles = []

let board = new Board()
let flappy = new Flappy(320, 100)

let reboot = false;