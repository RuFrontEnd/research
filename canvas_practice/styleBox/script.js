const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d")

// variables
const blockWidth = 200;
const PI = Math.PI,
    PI2 = Math.PI * 2


// assign canvas size
canvas.width = blockWidth * 3
canvas.height = blockWidth * 3

ctx.fillCircle = function (x, y, r) {
    this.beginPath()
    this.arc(x, y, r, 0, PI2)
    this.fill()
}

// colors
const color = {
    red: "#F74456",
    white: "#fff",
    yellow: "#F1DA56",
    blue: "#036FAF"
}

// draw grid 
ctx.beginPath()
for (let i = 1; i < 3; i++) {
    const x = blockWidth * i
    ctx.moveTo(x, 0)
    ctx.lineTo(x, canvas.height)
}
for (let i = 1; i < 3; i++) {
    const y = blockWidth * i
    ctx.moveTo(0, y)
    ctx.lineTo(canvas.width, y)
}
ctx.strokeStyle = "rgba(0, 0, 0, 0.1)"
ctx.stroke()
ctx.closePath()

// draw grid text
ctx.beginPath()
ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
for (let i = 0; i < 3; i++) {
    const x = blockWidth * i
    ctx.fillText(i, x, 10)
}
for (let i = 1; i < 3; i++) {
    const y = blockWidth * i + 10
    ctx.fillText(i, 0, y)
}
ctx.closePath()

function drawBlock(pos, bgColor, draw, time) {
    ctx.save()

    ctx.translate(pos.x * blockWidth, pos.y * blockWidth) // translate => move origin position
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, blockWidth, blockWidth)
    ctx.translate(100, 100) // move origin to center of the block
    draw()

    ctx.restore()
}

// drawBlock({ x: 0, y: 2 }, color.blue, () => {
//     // drawing a white circle
//     ctx.beginPath()
//     ctx.arc(0, 0, 30, 0, PI2)
//     ctx.fillStyle = 'white'
//     ctx.fill()
// }, 0)

let time = 0
function draw() {
    time++
    let sTime = parseInt(time / 20)
    // 1.
    drawBlock({ x: 0, y: 0 }, color.blue, () => {
        // drawing a white circle
        ctx.beginPath()
        ctx.arc(0, 0, 30 / (sTime % 3 + 1), 0, PI2)
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 15
        ctx.stroke()
        for (let i = 0; i < 8; i++) {
            ctx.fillStyle = sTime % 8 === i ? color.red : 'white'
            if ((i + sTime) % 4 != 0) {
                ctx.fillRect(60, -4, 20, 8)
            }
            ctx.rotate(PI2 / 8)
        }
    }, time)

    // 2.
    drawBlock({ x: 1, y: 0 }, color.red, () => {
        ctx.save()
        ctx.scale(0.8, 0.8)
        ctx.translate(-60, -60)
        for (let i = 0; i < 3; i++) {
            ctx.save()
            for (let o = 0; o < 3; o++) {
                ctx.beginPath()
                ctx.arc(0, 0, 20, 0, PI2)
                ctx.fillStyle = color.white
                if ((i + o * 2 + sTime) % 5 === 0) {
                    ctx.fillStyle = color.yellow
                }
                ctx.fill()
                ctx.translate(0, 60)
            }
            ctx.restore()
            ctx.translate(60, 0)
        }
        ctx.restore()
    }, time)

    // 3.
    drawBlock({ x: 2, y: 0 }, color.yellow, () => {
        for (let i = 0; i < 4; i++) {
            ctx.beginPath()
            ctx.moveTo(0, 0)
            ctx.lineTo(80, 20)
            ctx.lineTo(80, 80) -
                ctx.closePath()
            ctx.fillStyle = 'white'
            ctx.fill()

            if (sTime % 4 === i) {
                ctx.beginPath()
                ctx.arc(60, 40, 6, 0, PI2)
                ctx.fillStyle = color.red
                ctx.fill()
            }

            ctx.rotate(PI / 2)
        }
    }, time)

    // 4.
    drawBlock({ x: 0, y: 1 }, color.yellow, () => {
        ctx.translate(-60, -60)
        ctx.fillStyle = color.white
        ctx.fillRect(0, 0, 60, 60)
        ctx.translate(30, 30) // let the origin move to the center of white square
        ctx.rotate(-PI / 4) // rotate 45 degree counterclockwise
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(40, 0)
        ctx.arc(40, 40, 40, -PI / 2, PI / 2) // 180 degree
        ctx.lineTo(0, 80)
        ctx.closePath()
        ctx.fillStyle = color.red
        ctx.fill()

        ctx.translate(-100 + 10 * Math.sin(time / 10), 60)
        ctx.fillStyle = color.blue
        ctx.fillRect(0, 0, 100, 40)

        ctx.translate(100 + 10 * Math.cos(time / 10), 40)
        ctx.fillStyle = color.white
        ctx.fillRect(0, 0, 50, 20)
    }, time)

    // 5.
    drawBlock({ x: 1, y: 1 }, color.white, () => {
        // drawing a white circle
        ctx.fillStyle = color.red
        let angle1 = (time % 100) / 100 * PI2,
            angle2 = (time % 50) / 50 * PI2
        ctx.beginPath()
        ctx.moveTo(0, 0) // this step will make arc know where to close the arc path
        ctx.arc(0, 0, 80, angle1, angle2)
        ctx.fill()
        ctx.fillStyle = color.yellow
        ctx.fillCircle(60, 60, 30)


    }, time)

    // 6.
    drawBlock({ x: 2, y: 1 }, color.blue, () => {
        // drawing a white circle
        ctx.beginPath()
        ctx.fillStyle = 'white'
        ctx.fill()
    }, time)


    // 7.
    drawBlock({ x: 0, y: 2 }, color.red, () => {
        // drawing a white circle
        ctx.beginPath()
        ctx.fillStyle = 'white'
        ctx.fill()
    }, time)

    // 8.
    drawBlock({ x: 1, y: 2 }, color.blue, () => {
        // drawing a white circle
        ctx.beginPath()
        ctx.fillStyle = 'white'
        ctx.fill()
    }, time)

    // 9.
    drawBlock({ x: 2, y: 2 }, color.yellow, () => {
        // drawing a white circle
        ctx.beginPath()
        ctx.fillStyle = 'white'
        ctx.fill()
    }, time)

    requestAnimationFrame(draw)
}

requestAnimationFrame(draw)





