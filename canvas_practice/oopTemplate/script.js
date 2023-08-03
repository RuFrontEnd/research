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
console.log(person.fullname)

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

console.log('worker.frontname', worker.frontname)
console.log('worker.backname', worker.backname)
console.log('worker.work', worker.work)
worker.sayHello()


// example
let updateFPS = 30,
    showMouse = true,
    time = 0,
    bgColor = 'black'

let controls = {
    value: 0
}

let gui = new dat.GUI()
gui.add(controls, "value", -2, 2).step(0.01).onChange(function (value) {

})

// ---
class Vec2 {
    constructor(x, y) {
        this.x = x
        this.y = y
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
    hh = canvas.height = window.innerHeight
}

initCanvas()

function init() {

}

function update() {
    time++
}

function draw() {
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, ww, hh)

    // ---
    // draw here

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