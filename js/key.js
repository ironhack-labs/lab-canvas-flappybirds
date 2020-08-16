document.addEventListener("keydown",()=>{
  switch(event.keyCode){
    case 32:
      if(!intervalId){
        intervalId = setInterval(start, 1000/60)
      }
      flappy.jump()
    break;
    default:
      break;
  }
})