let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight

let ctx = canvas.getContext("2d");

// // Fill rect
// ctx.fillStyle = "red";
// ctx.fillRect(20, 20, 50, 10);

// ctx.fillStyle = "blue";
// ctx.fillRect(200, 20, 50, 10);

// // Stroke rect
// ctx.lineWidth = 5;
// ctx.strokeStyle = "blue"
// ctx.strokeRect(20, 100, 50, 100);

// // clear Rect
// ctx.clearRect(25, 25, 42, 2);


// // Fill text
// ctx.font = "50px sans"
// ctx.fillStyle = "purple"
// ctx.fillText("My text", 400, 200)

// // Fill text
// ctx.font = "50px sans"
// ctx.strokeStyle = "purple"
// ctx.strokeText("My text 2", 400, 300)


// Path
ctx.strokeStyle = "green";
ctx.lineWidth = 3;
ctx.beginPath()
ctx.moveTo(50, 50);
ctx.lineTo(50, 100);
ctx.lineTo(200, 100);
ctx.lineTo(200, 50)
ctx.lineTo(50, 50);
// ctx.closePath();
ctx.stroke();

// Rect
ctx.beginPath();
ctx.fillStyle = "teal"
ctx.rect(100, 50, 300, 100);
ctx.fill();

// Arc(Circle)
ctx.beginPath();
let centerX = canvas.width /2;
let centerY = canvas.height /2;
// draw the head
ctx.arc(centerX, centerY, 200, 0, Math.PI * 2, false);
ctx.moveTo(centerX + 100, centerY);

// Draw mouth
ctx.arc(centerX, centerY, 100, 0, Math.PI, false);

// move to eye
ctx.moveTo(centerX - 60, centerY - 80);

// Draw left eye
ctx.arc(centerX - 80, centerY - 80, 20, 0, Math.PI * 2)

// Move right eye
ctx.moveTo(centerX + 100, centerY - 80);

// draw right eye
ctx.arc(centerX + 80, centerY - 80, 20, 0, Math.PI * 2);

ctx.stroke();

// ctx.stroke()
