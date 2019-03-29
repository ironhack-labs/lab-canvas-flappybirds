var BlurApp = {
    ctx: undefined,
    flower: undefined,
    drawWithSepia: function () {
        var ctx = this.ctx
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        ctx.filter = `sepia(${sepiaAmount += .01})`
        ctx.drawImage(this.flower, 300, 200)
    },
    init: function (callback) {
        var that = this
        var canvasDOMEl = document.getElementById("test")

        canvasDOMEl.setAttribute("height", window.innerHeight)
        canvasDOMEl.setAttribute("width", window.innerWidth)

        /** @type {CanvasRenderingContext2D} */
        this.ctx = canvasDOMEl.getContext("2d")

        this.flower = new Image()
        this.flower.src = "./gazania.jpg"

        function draw() {
            // var sepiaAmount = 0

            // this will apply the filter progressively as an animation
            setInterval(function () {
                that.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

                that.ctx.filter = `sepia(${window.sepiaApplicationValue})`
                that.ctx.drawImage(that.flower, 300, 200)
            }, 10)

            // var blurScale = d3.scaleLinear().domain([1, 50]).range([0, 5])
            // var colorScale = d3.scaleLinear().domain([1, 50]).range(["green", "red"])
            // ctx.filter = `none`
            // function drawCircles() {
            //     for (var i = 0; i < 100; i++) {
            //         ctx.beginPath()
            //         let r = Math.random() * 50 + 1
            //         ctx.fillStyle = colorScale(r)



            //         ctx.arc(
            //             Math.random() * window.innerWidth,
            //             Math.random() * window.innerHeight,
            //             r,
            //             0,
            //             2 * Math.PI
            //         )
            //         ctx.fill()
            //         ctx.closePath()
            //     }
            // }

            // drawCircles()
        }

        this.flower.onload = function () {
            console.log("flor cargada")
            draw()
            callback()
            // draw()
        }
    }
}