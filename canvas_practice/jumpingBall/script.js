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
        x: 3,
        y: 3
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
    ctx.fillStyle = controls.color
    ctx.fill()
    ctx.restore()
}
Ball.prototype.update = function () {
    this.p.x += this.v.x
    this.p.y += this.v.y

    // velocity should be changed by adding acceleration
    this.v.x += this.a.x
    this.v.y += this.a.y

    this.v.x *= 0.99
    this.v.y *= 0.99

    this.v.x *= controls.fade
    this.v.y *= controls.fade

    controls.vx = this.v.x
    controls.vy = this.v.y
    controls.ay = this.a.y

    this.checkBoundary()
}
Ball.prototype.checkBoundary = function () {
    // reverse move direction when contact to the edge of window
    if (this.p.x + this.r > ww) {
        this.v.x = -Math.abs(this.v.x)
    }
    if (this.p.x - this.r < 0) {
        this.v.x = Math.abs(this.v.x)
    }
    if (this.p.y + this.r > wh) {
        this.v.y = -Math.abs(this.v.y)
    }
    if (this.p.y - this.r < 0) {
        this.v.y = Math.abs(this.v.y)
    }
}

const controls = {
    vx: 0,
    vy: 0,
    ay: 0.6,
    fade: 0.99,
    update: true,
    color: "#fff",
    step: function () {
        ball.update()
    },
    FPS: 30
}
const gui = new dat.GUI();
gui.add(controls, "vx", -50, 50).listen().onChange(function (value) {
    ball.v.x = value
})
gui.add(controls, "vy", -50, 50).listen().onChange(function (value) {
    ball.v.y = value
})
gui.add(controls, "ay", -1, 1).step(0.001).listen().onChange(function (value) {
    ball.a.y = value
})
gui.add(controls, "fade", 0, 1).step(0.01).listen()
gui.add(controls, "update")
gui.addColor(controls, "color")
gui.add(controls, "step")
gui.add(controls, "FPS", 1, 120)


let ball
function init() {
    ball = new Ball() // create ball instance
}
init()

function update() {
    if (controls.update) {
        ball.update()
    }
}

setInterval(update, 1000 / 30) // excute 30 times per 1s 

function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.5)"
    ctx.fillRect(0, 0, ww, wh)

    ball.draw()

    // requestAnimationFrame(draw)
    setTimeout(draw, 1000 / controls.FPS)
}

draw()

// requestAnimationFrame(draw) // using fastest speed to re-render browser view







