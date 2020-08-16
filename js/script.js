const $canvas = document.querySelector("canvas")
const ctx = $canvas.getContext("2d")

let intervalId,
    frames = 0,
    obstacles = [],
    score = 0
    gravity = 0.98