const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d")

ww = canvas.width = window.innerWidth
wh = canvas.height = window.innerHeight

const Ball = function () {
    this.p = {
        x: ww / 2, // size of window divided by 2
        y: wh / 2
    }
    this.v = {
        x: 5,
        y: 5
    }
    this.a = {
        x: 0,
        y: 1
    }
    this.r = 50
    this.dragging = false
} // create Ball constructor

Ball.prototype.draw = function () {
    ctx.beginPath()
    ctx.save()
    ctx.translate(this.p.x, this.p.y)
    ctx.arc(0, 0, this.r, 0, Math.PI * 2)
    ctx.fillStyle = 'white'
    ctx.fill()
    ctx.restore()
}
Ball.prototype.update = function () {
    this.p.x += this.v.x
    this.p.y += this.v.y
}

let ball
function init() {
    ball = new Ball() // create ball instance
}
init()

function update() {
    ball.update()
}

setInterval(update, 1000 / 30) // excute 30 times per 1s 

function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.5)"
    ctx.fillRect(0, 0, ww, wh)

    ball.draw()

    requestAnimationFrame(draw)
}

requestAnimationFrame(draw) // use fastest speed to re-render browser view







