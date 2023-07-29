const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d")

// assign canvas size
canvas.width = 400
canvas.height = 400

// fillRect => create filled rectangle
// ctx.fillStyle = 'red'
// ctx.fillRect(100, 100, 200, 200) // x y width hieght
// ctx.fillRect(300, 300, 100, 100)

// strokeRect => create stroke rectangle
// ctx.strokeStyle = 'red'
// ctx.strokeRect(100, 100, 200, 200) // x y width hieght
// ctx.strokeRect(300, 300, 100, 100)

// ctx.beginPath()
// ctx.moveTo(100, 100) // intial coordinate => origin point is at the canvas left-top side
// ctx.lineTo(300, 100)
// ctx.lineTo(300, 200)
// ctx.lineTo(100, 300)
// // ctx.closePath() // using ctx.fill can ignore this code to close path
// // ctx.stroke() // use stroke to display
// ctx.rect(300,300,50,50)
// ctx.fill() // use fillment to display

// ctx.beginPath()
// ctx.arc(200, 200, 100, 0, 2 * Math.PI) // x, y, radius, startAngle, endAngle, anticlockwise
// // ctx.fill()
// ctx.stroke()





