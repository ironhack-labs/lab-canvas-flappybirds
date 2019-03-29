// var canvas = document.querySelector("#game-board")

// /** @type {CanvasRenderingContext2D} */
// var ctx = canvas.getContext('2d')

// canvas.setAttribute("height", window.innerHeight)
// canvas.setAttribute("width", window.innerWidth)

// let w = window.innerWidth
// let h = window.innerHeight
// let w2 = w / 2
// let h2 = h / 2

// var boton = document.querySelector("#start-button")
// var logo = document.querySelector("img")

// boton.onclick = function () {
//   debugger
//   alert('sads')
//   hideHtml()
//   fondo()

// }

// function hideHtml() {
//   // var boton = document.querySelector("button")
//   logo.setAttribute("display", "none")
//   boton.setAttribute("display", "none")

// }

// function fondo(params) {
//   function bg(params) {
//     var img1 = new Image();   // Create new <img> element
//     img1.src = './images/bg.png';
//     ctx.drawImage(img1.src,0,0)
//   }
//   bg()
// }

window.onload = function () {
  var canvas = document.querySelector("#game-board");

  /** @type {CanvasRenderingContext2D} */
  var ctx = canvas.getContext("2d");

  canvas.setAttribute("height", window.innerHeight);
  canvas.setAttribute("width", window.innerWidth);

  let w = window.innerWidth;
  let h = window.innerHeight;
  let w2 = w / 2;
  let h2 = h / 2;

  // var boton = ;
  // var logo = ;

  document.getElementById("start-button").onclick = function () {
    startGame();
  };

  function startGame() {
    bg()
    flappy()
    obstacle_bottom()
    obstacle_top()
    hideHtml()

    function draw() {
      var PI2 = 2 * Math.PI
      //   var img1 = new Image();   // Create new <img> element
      // img1.src = './images/bg.png';
      // ctx.drawImage('./images/bg.png',0,0)

      ctx.beginPath()
      ctx.fillStyle = this.color;
      ctx.arc(3, 3, 20, 0, PI2)
      ctx.fill()
      ctx.closePath()
    }
    draw()

    function hideHtml() {
      // debugger
      // var boton = document.querySelector("#img")
      document.getElementById("main").classList.toggle("hola");
    }

    function bg() {
      var img = new Image();
      imgScale = 15 / 31;
      img.onload = function () {
        ctx.drawImage(img, 0, 0, w, h);
      };
      img.src = "./images/bg.png";

      // ctx.beginPath()
      // var img1 = new Image(); // Create new <img> element
      // img1.src = "./images/bg.png";
      // ctx.drawImage("./images/bg.png", 0, 0);
      // ctx.closePath()
    }


    function flappy() {
      var flappy = new Image();
      flappyScale = 10 / 30;
      flappy.onload = function () {
        ctx.drawImage(flappy, 20, h2, 100, 80);
      };
      flappy.src = "./images/flappy.png";
    }





    function obstacle_bottom() {
      var obstacle_bottom = new Image();
      obstacle_bottom.src = "./images/obstacle_bottom.png";
      obstacle_bottom.onload = function () {
        ctx.drawImage(obstacle_bottom, w2, h - 80);
      };
    }

    function obstacle_top() {
      var obstacle_top = new Image();
      obstacle_top.onload = function () {
        ctx.drawImage(obstacle_top, w2, -400);
      };
      obstacle_top.src = "./images/obstacle_top.png";
    }

    // function obsAbajo() {
    //   var obsAbajo = new Image();

    //   obsAbajo.src = "./images/obstacle_bottom.png";
    //   obsAbajoScale = 10 / 30;
    //   obsAbajo.onload = function () {
    //     ctx.drawImage(obsAbajo, w2, h, w2, h2);
    //   };
    // }
    // obsAbajo()
  }
};