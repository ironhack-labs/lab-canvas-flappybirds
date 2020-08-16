// Apuntamos al canvas
const $canvas = document.querySelector("canvas")

// Creamos el contexto del canvas
 const ctx = $canvas.getContext("2d")

// Apuntamos al boton
const $button = document.querySelector("button")

// Creamos un aconstante con la gravedad con la que caera el objecto
const gravity = 0.98

// Creamos una variable para el intervalo, los frames y los obstaculos
let intervalId
let frames = 0
const obstacles = []