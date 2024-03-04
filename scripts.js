let canvas = document.getElementById("background-canvas")
var window_height = window.screen.height;
var window_width = window.screen.width;
//TOTAL STARS SEEN ONSCREEN
const totalStars = 75;
const stars = [];

class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateStars() {
    const offset = 2; //how many pixels from the edge the stars will be generated at.
    console.log("generating started");
    for(let i = 0; i <= totalStars; i++) {
        let xRan = randomInt(offset,300-offset);
        let yRan = randomInt(offset,150-offset);
        stars.push(new Star(xRan, yRan));
        console.log(xRan + " " + yRan);
    } 
}

let context = canvas.getContext("2d");

// Canvas styling
canvas.style.background = "#040c24"; 


//Canvas drawing
generateStars();
context.fillStyle = "white";
for(let i = 0; i < stars.length; i++) {
    context.fillRect(stars[i].x, stars[i].y, 0.8, 0.8);
}



