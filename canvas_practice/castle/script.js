const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d")

// assign canvas size
canvas.width = 400
canvas.height = 400

let time = 0

function draw() {
    // draw grid
    ctx.clearRect(0, 0, 400, 400)
    ctx.beginPath()
    for (let i = 0; i < 10; i++) {
        let pos = i * 50
        ctx.moveTo(pos, 0)
        ctx.lineTo(pos, 400)
        ctx.fillText(pos, pos, 10) // text, x, y

        ctx.moveTo(0, pos)
        ctx.lineTo(400, pos)
        ctx.fillText(pos, 0, pos)
    }
    ctx.strokeStyle = "rgba(0, 0, 0, 0.1)"
    ctx.stroke()

    // draw floor
    ctx.beginPath()
    ctx.moveTo(25, 350)
    ctx.lineTo(375, 350)
    ctx.lineWidth = 2
    ctx.strokeStyle = "black"
    ctx.stroke()
    ctx.closePath()

    // draw orange wall
    ctx.beginPath()
    ctx.fillStyle = "#ed5a2a";
    ctx.fillRect(300, 300, 50, 50)
    ctx.strokeRect(300, 300, 50, 50) // draw stroke rectangle => x, y, w, h
    ctx.closePath()

    // draw yellow wall
    ctx.beginPath()
    ctx.rect(250, 250, 50, 100)
    ctx.rect(50, 300, 50, 50)
    ctx.fillStyle = "#ffc12c"
    ctx.fill()
    ctx.stroke()
    ctx.closePath()

    // draw door
    ctx.beginPath()
    ctx.rect(100, 250, 50, 100)
    ctx.rect(200, 250, 50, 100)
    ctx.fillStyle = "#ff9f51"
    ctx.fill()
    ctx.stroke()
    ctx.closePath()

    // draw arch
    ctx.beginPath()
    ctx.moveTo(100, 200)
    ctx.lineTo(250, 200)
    ctx.lineTo(250, 250)
    ctx.lineTo(200, 250)
    ctx.arc(175, 250, 25, Math.PI * 2, Math.PI, true) // 175, 200 means the location of center of circle / 25 means radius / Math.PI * 2, Math.PI means startAngle & endAngle / true means clockwise 
    ctx.lineTo(100, 250)
    ctx.closePath()
    ctx.fillStyle = "white"
    ctx.fill() // can not fill th color before define the path 
    ctx.stroke()

    // draw roof
    ctx.beginPath()
    ctx.moveTo(100, 200)
    ctx.lineTo(175, 150) // roof peak
    ctx.lineTo(250, 200)
    ctx.closePath()
    ctx.fillStyle = "#ed5a2a"
    ctx.fill()
    ctx.stroke()

    // draw flag
    ctx.beginPath()
    ctx.moveTo(175, 150)
    ctx.lineTo(175, 100 - mouse.y / 5)
    ctx.lineTo(200, 110 - (time % 5) - mouse.y / 5)
    ctx.lineTo(175, 120 - mouse.y / 5)
    ctx.closePath()
    ctx.fillStyle = `hsl(${mouse.x % 360}, 50%, 50%)`
    ctx.fill()
    ctx.stroke()


    // draw car
    ctx.fillStyle = "white"
    time++
    let carx = time % 440 - 40
    ctx.fillRect(carx, 325, 40, 25)
    ctx.strokeRect(carx, 325, 40, 25)
    ctx.beginPath()
    ctx.arc(carx + 10, 350, 5, 0, Math.PI * 2)
    ctx.arc(carx + 30, 350, 5, 0, Math.PI * 2)
    ctx.fillStyle = "black"
    ctx.fill()
    ctx.stroke()

    // draw black dot with mouse
    ctx.beginPath()
    ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2)
    ctx.fillStyle = "black"
    ctx.fill()
}

setInterval(draw, 30)

let mouse = { x: 0, y: 0 }
canvas.addEventListener('mousemove', (evt) => {
    mouse.x = evt.offsetX
    mouse.y = evt.offsetY
})





