class Person {
    constructor(f, b) {
        this.frontname = f
        this.backname = b
    }

    sayHello() {
        console.log(`Hello I'm ${this.backname}`)
    }

    get fullname() { // let a method become as the object property
        return `${this.frontname} ${this.backname}`
    }

    set fullname(nv) { // invoke a method by using change property way
        this.frontname = nv.split(" ")[0]
        this.backname = nv.split(" ")[1]
    }
}

let person = new Person("wu", 'majer')
person.fullname = 'chen frank'
// console.log(person.fullname)

class Worker extends Person {
    constructor(f, b, w) {
        super(f, b) // define which param pass to the Person class
        this.work = w
    }

    sayHello() {
        console.log(`Hello I'm ${this.backname}, I am a ${this.work}`)
    } // replace the sayHello method with new one
}

let worker = new Worker("wu", "majer", "designer")

// console.log('worker.frontname', worker.frontname)
// console.log('worker.backname', worker.backname)
// console.log('worker.work', worker.work)
worker.sayHello()


// example
let updateFPS = 30,
    showMouse = true,
    time = 0,
    bgColor = 'black'

let controls = {
    value: 0,
    gcount: 1,
    ay: 0.6, // gravity
    fade: 0.99,
    v: 5,
    clearForce: function () {
        forcefields = []
    }
}

let gui = new dat.GUI()
gui.add(controls, "gcount", 0, 30).step(1).onChange(function (value) { })
gui.add(controls, "ay", -1, 1).step(0.01).onChange(function (value) { })
gui.add(controls, "fade", 0, 1).step(0.01).onChange(function (value) { })
gui.add(controls, "v", 0, 30).step(0.01).onChange(function (value) { })
gui.add(controls, "clearForce")

// ---
class Vec2 {
    constructor(x, y) {
        this.x = x || 0
        this.y = y || 0
    }

    set(x, y) {
        this.x = x
        this.y = y
    }

    move(x, y) {
        this.x += x
        this.y += y
    }

    add(v) {
        return new Vec2(this.x + v.x, this.y + v.y)
    }

    sub(v) {
        return new Vec2(this.x - v.x, this.y - v.y)
    }

    mul(s) {
        return new Vec2(this.x * s, this.y * s)
    }

    clone() {
        return new Vec2(this.x, this.y)
    }

    toString() {
        return `(${this.x}, ${this.y})`
    }

    equal(v) {
        return this.x === v.x && this.y === v.y
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    get angle() {
        return Math.atan2(this.y, this.x)
    }

    get unit() {
        return this.mul(1 / this.length)
    } // one unit length must be 1

    set length(nv) {
        let temp = this.unit.mul(nv)
        this.set(temp.x, temp.y)
    }
}

class Particle {
    constructor(args) {
        let def = {
            p: new Vec2(),
            v: new Vec2(1, 0),
            a: new Vec2(),
            r: Math.random() * 20,
            color: `rgb(255,${parseInt(Math.random() * 255)},${parseInt(Math.random() * 150)})` // more red because the multiply value of B is less
        } // default value
        Object.assign(def, args) // assgin customize value
        Object.assign(this, def) // assgin this instance with above properties
    }

    draw() {
        ctx.save()
        ctx.translate(this.p.x, this.p.y)
        ctx.beginPath()
        ctx.arc(0, 0, this.r, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.restore()
    }

    update() {
        this.p = this.p.add(this.v)
        this.v = this.v.add(this.a)
        this.v.move(0, controls.ay)
        this.v = this.v.mul(0.99)
        this.r *= controls.fade

        // check boundary
        if (this.p.y + this.r > wh) {
            this.v.y = -Math.abs(this.v.y)
        }
        if (this.p.x + this.r > ww) {
            this.v.x = -Math.abs(this.v.x)
        }
        if (this.p.x + this.r < 0) {
            this.v.x = Math.abs(this.v.x)
        }
        if (this.p.x - this.r < 0) {
            this.v.x = Math.abs(this.v.x)
        }

    }
}

class Forcefield {
    constructor(args) {
        let def = {
            p: new Vec2(),
            value: 100, // negtive value will appeal the particles, ex: -100
        }
        Object.assign(def, args)
        Object.assign(this, def)
    }

    draw() {
        ctx.save()
        ctx.translate(this.p.x, this.p.y)
        ctx.beginPath()
        ctx.arc(0, 0, Math.sqrt(Math.abs(this.value)), 0, Math.PI * 2)
        ctx.fillStyle = "white"
        ctx.fill()
        ctx.restore()
    }

    affect(particle) {
        let delta = particle.p.sub(this.p),
            len = this.value / (1 + delta.length),
            force = delta.unit.mul(len);

        particle.v.move(force.x, force.y)
    }
}

// ---

let canvas = document.getElementById('mycanvas'),
    ctx = canvas.getContext("2d");

ctx.circle = function (v, r) {
    this.arc(v.x, v.y, r, 0, Math.PI * 2)
}

ctx.line = function (v1, v2) {
    this.moveTo(v1.x, v1.y)
    this.lineTo(v2.x, v2.y)
}

function initCanvas() {
    ww = canvas.width = window.innerWidth
    wh = canvas.height = window.innerHeight
}

initCanvas()

let particles = [],
    forcefields = []

function init() {

}

function update() {
    particles = particles.concat(Array.from({ length: controls.gcount }, (d, i) => {
        return new Particle({
            p: mousePos.clone(),
            v: new Vec2(Math.random() * controls.v - controls.v / 2, Math.random() * controls.v - controls.v / 2)
        })
    }))

    let sp = particles.slice() // shallow copy particles

    sp.forEach((p, pi) => {
        p.update()
        forcefields.forEach(f => {
            f.affect(p)
        })
        if (p.r < 0.1) {
            let pp = sp.splice(pi, 1)
            delete pp
        }
    }) // filter too big particles
    particles = sp
}

function draw() {
    time++
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, ww, wh)

    // ---
    // draw here

    let degToPi = Math.PI / 180

    // draw cross
    ctx.beginPath()
    ctx.moveTo(ww / 2, 0)
    ctx.lineTo(ww / 2, wh)
    ctx.moveTo(0, wh / 2)
    ctx.lineTo(ww, wh / 2)
    ctx.strokeStyle = "rgba(255,255,255,0.5)"
    ctx.stroke()

    ctx.save()

    ctx.translate(ww / 2, wh / 2)
    let delta = mousePos.sub(new Vec2(ww / 2, wh / 2)),
        mouseAngle = delta.angle,
        mouseDistance = delta.length

    // draw radius
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(delta.x, delta.y)
    ctx.stroke()

    // circle
    ctx.beginPath()
    ctx.arc(0, 0, mouseDistance, 0, Math.PI * 2)
    ctx.stroke()

    // hint deg & r
    ctx.fillStyle = "white"
    ctx.fillText(`${parseInt(mouseAngle / degToPi)} deg`, 10, -10)
    ctx.fillText(`r=${mouseDistance}`, mouseDistance + 10, 0)

    ctx.beginPath()
    ctx.moveTo(0, 0)
    let light_r = mouseDistance

    ctx.save()
        

    ctx.restore()

    ctx.restore()

    // ---

    ctx.fillStyle = 'red'
    ctx.beginPath()
    ctx.circle(mousePos, 3)
    ctx.fill()

    ctx.save()
    ctx.beginPath()
    ctx.translate(mousePos.x, mousePos.y)
    ctx.strokeStyle = 'red'
    let len = 20
    ctx.line(new Vec2(-len, 0), new Vec2(len, 0))
    ctx.fillText(mousePos, 10, -10)
    ctx.stroke()
    ctx.rotate(Math.PI / 2)
    ctx.line(new Vec2(-len, 0), new Vec2(len, 0))
    ctx.stroke()
    ctx.restore()

    requestAnimationFrame(draw)
}

function loaded() {
    initCanvas()
    init()
    requestAnimationFrame(draw)
    setInterval(update, 1000 / updateFPS); // re render every 1/30 second
}

let mousePos = new Vec2(0, 0),
    mousePosDown = new Vec2(0, 0),
    mousePosUp = new Vec2(0, 0)

window.addEventListener('load', loaded)
window.addEventListener('resize', initCanvas)
window.addEventListener('mousemove', mousemove)
window.addEventListener('mouseup', mouseup)
window.addEventListener('mousedown', mousedown)
window.addEventListener('dblclick', dblclick)

function dblclick(evt) {
    mousePos.set(evt.x, evt.y)
    forcefields.push(new Forcefield({
        p: mousePos.clone()
    }))
}

function mousemove(evt) {
    mousePos.set(evt.x, evt.y)
    // console.log('mousePos', mousePos)
}

function mouseup(evt) {
    mousePos.set(evt.x, evt.y)
    mousePosUp = mousePos.clone()
    // console.log('mousePosUp', mousePosUp)
}

function mousedown(evt) {
    mousePos.set(evt.x, evt.y)
    mousePosDown = mousePos.clone()
    // console.log('mousePosDown', mousePosDown)
}