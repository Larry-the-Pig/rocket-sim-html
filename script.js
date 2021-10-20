window.onload=function() {
    canv = document.getElementById("gc");
    ctx = canv.getContext("2d");
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
    setInterval(game,30);
}

var earth = new Image();
earth.src = "res/earth.png";

var rocketpic = new Image();
rocketpic.src = "res/rocket-no-flame.png";

let upPress = false;



let rocket = {
    x: 15.0,
    y: 15.0,
    rotation: 0.0,
    width: 29,
    height: 20,
    speedX: 0.0,
    speedY: 0.0
}

let hole = {
    x: 70,
    y: 70,
    width: 50,
    height: 50
}

let mouse = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
}

function game() {
    if (Math.abs(rocket.speedX) > 0) {
        rocket.speedX = 0.999 * rocket.speedX;
    }
    if (Math.abs(rocket.speedY) > 0) {
            rocket.speedY = 0.999 * rocket.speedY;
    }

    if (Math.abs(rocket.speedX) < 0.01) {
        rocket.speedX = 0.0;
    }
    if (Math.abs(rocket.speedY) < 0.01) {
        rocket.speedY = 0.0;
    }

    //Collision with left wall
    if (rocket.x < 0) {
        rocket.x = 0;
        rocket.speedX = -rocket.speedX;
    }

    //Collision with right wall
    if (rocket.x > canv.width - rocket.width) {
        rocket.x = canv.width - rocket.width;
        rocket.speedX = -rocket.speedX;
    }

    //Collision with ceiling
    if (rocket.y < 0) {
        rocket.y = 0;
        rocket.speedY = -rocket.speedY;
    }

    //Collision with floor
    if (rocket.y > canv.height - rocket.height) {
        rocket.y = canv.height - rocket.height;
        rocket.speedY = -rocket.speedY;
    }

    if ((Math.floor(rocket.x) + rocket.width >= hole.x && Math.floor(rocket.x) <= hole.x + hole.width) && (Math.floor(rocket.y) + rocket.height >= hole.y && Math.floor(rocket.y) <= hole.y + hole.height)) {
        newGame();
    }

    if (Math.abs(rocket.rotation) == 2 * Math.PI)
        rocket.rotation = 0.0;

    if (upPress) {
        rocket.speedX += (Math.cos(rocket.rotation) * 0.5);

        rocket.speedY += (Math.sin(rocket.rotation) * 0.5);
    }
    console.log(rocket.rotation);
    rocket.x+=rocket.speedX;
    rocket.y+=rocket.speedY;

    draw();
}


function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);

    ctx.drawImage(earth, hole.x, hole.y);

    ctx.translate(rocket.width / 2 + rocket.x, rocket.height / 2 + rocket.y);
    ctx.rotate(rocket.rotation);
    ctx.translate(-(rocket.width / 2 + rocket.x), -(rocket.height / 2 + rocket.y));
    ctx.drawImage(rocketpic, Math.floor(rocket.x), Math.floor(rocket.y));

    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function newGame() {
    rocket.speedX = 0.0;
    rocket.speedY = 0.0;
    
    rocket.x = Math.floor(Math.random() * (canv.width - rocket.width));
    rocket.y = Math.floor(Math.random() * (canv.height - rocket.height));
    
    hole.x = Math.floor(Math.random() * (canv.width - hole.width));
    hole.y = Math.floor(Math.random() * (canv.height - hole.height));
}
function keyDown(evt) {
    switch (evt.keyCode) {
        case 38:
            upPress = true;
            rocketpic.src = "res/rocket.png";
            break;
        case 37:
            rocket.rotation -= Math.PI / 10;
            break;
        case 39:
            rocket.rotation += Math.PI / 10;
            break;
    }
}

function keyUp(evt) {
    if (evt.keyCode == 38) {
        upPress = false;
        rocketpic.src = "res/rocket-no-flame.png";
    }
}