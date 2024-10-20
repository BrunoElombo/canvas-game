let canvas = document.getElementById("canvas");
canvas.width = 1250;
canvas.height = 500;
canvas.style.overflow = "hidden";
let ctx = canvas.getContext("2d");

let image = document.getElementById("character");
let image2 = document.getElementById("character2");
let pause = document.getElementById("pause");
let tennisSound = document.getElementById("tennis-sound");
let isPaused = false;
let player = {
    w: 80,
    h: 100,
    x: 20,
    y: 200,
    speed: 5,
    dx: 0,
    dy: 0,
    score: 0
}


let player2 = new Player(canvas.width - 100, canvas.height/2 - 50, canvas.width - 100, 0, 80, 100);


function drawScore(){
    ctx.font = "30px sans"
    ctx.fillStyle = "white"
    ctx.fillText(`Score : Player1: ${player.score} - Player2: ${player2.getScore()}`, canvas.width/2 -200, 50);
}


function drawPlayer(){
    ctx.drawImage(image, player.x, player.y, player.w, player.h);
    ctx.drawImage(image2, player2.getX(), player2.getY(), player2.getWidth(), player2.getHeight());
} 

function drawPause(){
    ctx.drawImage(pause, canvas.width/2 - 150, canvas.height/2-200, 300, 300);
}

let circle = {
    originX: canvas.width/2, 
    originY: canvas.height/2,
    raduis: 10,
    dx: Math.random() * 20 - 10,
    dy: Math.random() * 20 - 10 
};

function drawCircle(){
    ctx.beginPath();
    ctx.arc(circle.originX, circle.originY, circle.raduis, 0, Math.PI * 2);
    ctx.fillStyle = "orange";
    ctx.fill();
}

function clear(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
}

function newPosition(){
    player.x += player.dx;
    player.y += player.dy;

    player2.setX(player2.getX() + player2.getDx());
    player2.setY(player2.getY() + player2.getDy());

    // Change circle position
    circle.originX += circle.dx;
    circle.originY += circle.dy;

    detectWalls();
    detectObject();
}

function playTennisHit(){
    let playAttribute = tennisSound.getAttribute("play");
    playAttribute = true;
}
function stopTennisHit(){
    let playAttribute = tennisSound.getAttribute("play");
    playAttribute = false;
}

function detectWalls(){
    // Player 1 walls detections
    if(player.x < 0){
        player.x = 0;
    }
    if(player.x + player.w > canvas.width / 2 - 100){
        player.x = canvas.width / 2 -  player.w - 100;
    }
    if(player.y < 0){
        player.y = 0;
    }
    if(player.y + player.h> canvas.height){
        player.y = canvas.height - player.h;
    }

    // Player 2 walls detections
    if(player2.getX() + player2.getWidth() > (canvas.width)){
        player2.setX(canvas.width - 100);
    }
    if(player2.getX() < canvas.width / 2 + 100){
        player2.setX(canvas.width / 2+ 100);
    }
    if(player2.getY() < 0){
        player2.setY(0);
    }
    if(player2.getY() + player2.getHeight() > canvas.height){
        player2.setY(canvas.height - player.h);
    }
    

    // walls detection
    if(circle.originX + circle.raduis > canvas.width || circle.originX - circle.raduis < 0){
        playTennisHit();
        circle.dx *= -1;
    }
    if(circle.originY + circle.raduis > canvas.height || circle.originY - circle.raduis < 0){
        playTennisHit();
        circle.dy *= -1;
    }else{
        stopTennisHit();
    }
}


function detectObject(){
    // Detect player 1
    const distX = circle.originX - (player.x + player.w / 2);
    const distY = circle.originY - (player.y + player.h / 2);
    const distance = Math.sqrt(distX * distX + distY * distY);

    // Detect player 2
    const dist2X = circle.originX - (player2.getX() + player2.getWidth() / 2);
    const dist2Y = circle.originY - (player2.getY() + player2.getHeight() / 2);
    const distance2 = Math.sqrt(dist2X * dist2X + dist2Y * dist2Y);
    
    if (distance < circle.raduis + (player.w / 2) || distance2 < circle.raduis + (player2.getWidth()/2)) {
        circle.dx *= -1;
        circle.dy *= -1;
        playTennisHit();
    }else{
        stopTennisHit();
    }

}

function startBall(){
    circle.originX = canvas.width/2;
    circle.originY = canvas.height/2;
    const fixedSpeed = 5; 
    circle.dx = fixedSpeed * (Math.random() < 0.5 ? -1 : 1);
    circle.dy = fixedSpeed * (Math.random() < 0.5 ? -1 : 1); 
}

function detectScore(){
    if(circle.originX + circle.raduis > canvas.width){
        playTennisHit();
        player.score += 1;
        startBall();        
    }   

    if(circle.originX - circle.raduis < 0){
        player2.setScore(player2.getScore() + 1);
        startBall();
    }
}

function update(){
    clear();
    drawScore();
    drawPlayer();
    drawCircle();
    detectScore();
    if(isPaused){
        drawPause();
    }
    if(!isPaused){
        newPosition();
    }

    requestAnimationFrame(update);
}

update();

// Player1 keys
function moveRight(){
    player.dx = player.speed;
}

function moveLeft(){
    player.dx = -player.speed;
}

function moveUp(){
    player.dy = -player.speed;
}

function moveDown(){
    player.dy = player.speed;
}


// Player2 keys
function player2Up(){
    player2.setDy(-player2.getSpeed());
}

function player2Down(){
    player2.setDy(player2.getSpeed());
}

function player2Left(){
    player2.setDx(-player2.getSpeed());
}

function player2Right(){
    player2.setDx(player2.getSpeed());
}

function pauseAndResume(){
    isPaused = !isPaused;
}
function keyDown(e){
    
    // Player 1 keys down
    if(e.key === "ArrowLeft" || e.key === "Left"){
        moveLeft();
        image.setAttribute('src', './assets/img/character back.png');
    }
    else if(e.key === "ArrowRight" || e.key === "Right"){
        moveRight();
        image.setAttribute('src', './assets/img/character.png');
    }
    else if(e.key === "ArrowUp" || e.key === "Up"){
        moveUp();
    }
    else if(e.key === "ArrowDown" || e.key === "Down"){
        moveDown();
    }
    else if(e.key === "A" || e.key === "a"){
        player2Left();
        image2.setAttribute('src', './assets/img/character back.png');
    }
    else if(e.key === "D" || e.key === "d"){
        player2Right()
        image2.setAttribute('src', './assets/img/character.png');
    }
    else if(e.key === "W" || e.key === "w"){
        player2Up()
    }
    else if(e.key === "S" || e.key === "s"){
        player2Down();
    }

    else if(e.key === " "){
        pauseAndResume()
    }

}

function keyUp(e){
    // Player  key up
    if(
        e.key === "ArrowDown" || 
        e.key === "Down" ||
        e.key === "ArrowUp" || 
        e.key === "Up" ||
        e.key === "ArrowLeft" || 
        e.key === "Left"||
        e.key === "ArrowRight" || 
        e.key === "Right"
    ){
        player.dx = 0;
        player.dy = 0;
    }

    // Player 2 key up
    if(
        e.key === "S" || 
        e.key === "s" ||
        e.key === "W" || 
        e.key === "w"
    ){
        player2.setDy(0);
    }
    if(
        e.key === "A" || 
        e.key === "a" ||
        e.key === "D" || 
        e.key === "d"
    ){
        player2.setDx(0);
    }
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
