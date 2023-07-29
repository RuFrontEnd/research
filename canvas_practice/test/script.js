const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d")

// assign canvas size
canvas.width = window.innerWidth*2
canvas.height = window.innerHeight*2

ctx.fillStyle = 'blue';
ctx.fillRect(50, 50, 100, 75);

canvas.addEventListener('click', (event) => {
    // Get the click position relative to the canvas
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if the click position is inside the rectangle
    if (x >= 50 && x <= 150 && y >= 50 && y <= 125) {
        console.log('Clicked on the rectangle!');
    }
});





