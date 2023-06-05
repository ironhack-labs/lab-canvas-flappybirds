// @ts-nocheck
const body = document.querySelector("body")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let gameFrames = 0
let requestId
let speed = .5

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

window.onload = function () {
  // document.querySelector("#game-board").style.display = "none"
  document.getElementById("start-button").onclick = () => {
    startGame()
  }
}


function startGame() {
  // document.querySelector("#game-intro").style.display = "none"
  // document.querySelector("#game-board").style.display = ""
  if (!requestId) requestId = requestAnimationFrame(gameEngine)
}


function gameEngine() {
  gameFrames++

  clearCanvas()

  background.draw()

  if (requestId) requestAnimationFrame(gameEngine)
}