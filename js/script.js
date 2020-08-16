const canvas=document.querySelector("canvas")
const ctx=canvas.getContext("2d")
const btn=document.querySelector("#start-button")

let intervalId=0;
let frames=0
let obstacles=[]
let score=0;
const bg=new Background();
const flappy=new Character(50,50)

// document.addEventListener("click",()=>{
//   intervalId=setInterval(start, 1000/60)
// })

function start(){
  frames++
  generateObs()
  clearCanvas()
  bg.draw()
  checkTouch()
  flappy.draw()
  drawObs()
  countScore()
  flappy.updatePos()
}

function clearCanvas(){
  ctx.clearRect(0,0, canvas.width, canvas.height)
}

function generateObs(){
  if(frames%400 === 0){
    const minY=-793;
    const maxY=0 ;
    const minGap=200
    const maxGap=400
    const gap=Math.floor(Math.random()*(maxGap-minGap)+minGap)
    const randomY=Math.floor(Math.random()*(maxY-minY)+minY)
    obstacles.push(new Obs(randomY))
    obstacles.push(new Obs(randomY+gap+793))
  }
}

function drawObs(){
  obstacles.forEach((o,i)=>{
    o.draw()
  })
}

function countScore(){
  ctx.font="40px Arial"
  ctx.fillStyle="red"
  if(frames%100 === 0){
    score++
  }
  ctx.fillText(`Socre ${score}`, 20, 50)
}

function checkTouch(){
  obstacles.forEach(o=>{
    if(flappy.touch(o)){
      clearInterval(intervalId);
      ctx.font="62px Arial"
      ctx.fillStyle="red"
      ctx.fillText("GAME OVER",260,380)
    }
  })
  if(flappy.y>=canvas.height){
    clearInterval(intervalId);
    ctx.font="62px Arial"
    ctx.fillStyle="red"
    ctx.fillText("GAME OVER",260,380)
  }
}