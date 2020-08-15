const $canvas = document.querySelector("canvas")
const ctx = $canvas.getContext("2d")
const $button = document.querySelector("button")

const gravity = 0.98
let intervalId
let frames = 0
const obstacles = []