const $canvas = document.querySelector('canvas')
const ctx = $canvas.getContext('2d')
const gravity = 0.8

let frames,
    intervalId,
    score;