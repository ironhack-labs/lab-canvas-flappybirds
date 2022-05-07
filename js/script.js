window.onload = function() {
  //siempre declarar las const o lets que utilizamos en este archivo
  //llamar a una clase
  // new Nombreclase
  const bg=new Background (canvas.width,canvas.height)
  const flappy=new Flappy (50,40,35,35)
  const dead =new Image()
   dead.src="https://w7.pngwing.com/pngs/359/749/png-transparent-death-certificate-sword-art-online-gamebanana-died-text-rectangle-logo.png"
  //const pipe= new Pipe("top",100,100,100) //solo era para ver si mostraba mis pipes
  document.getElementById("start-button").onclick = function() {
    if(!requestId){//validacion para que no se mueva toda la pagina

      startGame();
    }
    
  };

  function startGame() {
    
    //iniciar juego v0.01
    //updateGame()

    //cuando inicie el juego vamos a darle play al audio
    audio.play()

    requestId=requestAnimationFrame(updateGame)

  }


 function gameOver(){

audio.pause()
ctx.drawImage(dead,300,200,400,400)
requestId = undefined

 }
function resetGame(){
  flappy.y=dylanDefault.y
 

}
 function winGame(){


 }

 //funcion motora del juego
 function updateGame(){
   frames ++; //aumento de los frames
   //1.-limpiamos el canvas
   ctx.clearRect(0,0,canvas.width,canvas.height)
   bg.draw()
   flappy.draw()
   generatePipes()
   drawPipes()
   ctx.font="40px Arial"
   ctx.fillText(`Poinst:${points}`,canvas.width -200,100)
   //pipe.draw() //pipe de ejemplo

//vamos a terminar el juego si el flappy toca el fondo
    if(flappy.y + flappy.height > canvas.height){
      gameOver()
    }

   if(requestId){
    requestAnimationFrame(updateGame)
   }

   
 }

function generatePipes(){
 
//limitar que mi arreglo se llene de pipes
if(!(frames % 160 === 0)){
  return true
}
// height random
//Math.floor( Math.random()*(max * 0.6) ) + 35

const height=Math.floor(Math.random()* (canvas.height * 0.6)) +35;
const pipe1=new Pipe ("top",canvas.width,0,height)    
  
                      // pos      ,           y,               altura dinamica
const pipe2= new Pipe("down",canvas.width,height +120,canvas.height-120 -height)
pipes.push(pipe1,pipe2)
}
function drawPipes(){
  /**arreglos para iterar en un arreglo
   * forEach -> no retorna nada solo sirve para revisar el arreglo
   * for of -> este no retorna nada
   * for -> no rerorna nada
   * map -> retorna un nuevo arreglo (hace copia del original)
   * reduce-> reduce un arreglo, un objeto,un numero , un string
   * filter -> nos regresa un arreglo nuevo totalmente filtrado
   * 
   */

  pipes.forEach((pipe,index_pipe)=>{

    //splice para ir eliminando los pipes que se salgan del canvas (0)
    if(pipe.x + pipe.width <= 0){
      //splice solo se puede utilizar en arreglos 
      points++;
      pipes.splice(index_pipe,1)
    }
    
    
    //voy a dibujar los pipes
    pipe.draw()

    //validamos que flappy golpee contra un pipe
    if(flappy.collision(pipe)){
      gameOver()

    }

  })



}



addEventListener("keydown",(event)=>{
  event.preventDefault(); ///evitamos que haga sus acciones por defecto 
  if(event.keyCode === 32){
    //flappy.y -=10; para la gravedad ya noposicionamos nuestra y

    flappy.userPull =0.3;

  }
})
addEventListener("keyup",(event)=>{
  event.preventDefault()
  if(event.keyCode === 32){
    flappy.userPull=0;
  }
})




};//end onload (funcion padre )
