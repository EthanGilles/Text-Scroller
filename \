//CANVAS VARIABLES
var canvas = document.getElementById('background-canvas');
var ctx = canvas.getContext('2d');

//STAR VARIABLES
const totalStars = 400; //Total number of stars on the screen
const speed = 4; //Max speed of stars on the screen
const size = 2.5; //Max size of stars on the screen
const colors = ["#FFFFF0", "#DEFBFF", "#FFEFC4", "#FCE4BD", "#F6F7E6", "#FA8787", "#FFDB78", "#7FB0DB", "#668ED4"]; //Color options for stars on the screen
//Color options are all muted White, Blues, Yellows and Reds.

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function speedToSize(speed) { //maps size to speed for 3d effect
    return -((speed/size) * speed + size);
}

class Star {
    constructor() {
        this.init();
    }
    init(){
        this.color = colors[randomInt(0,colors.length)];
        this.size = Math.random() * size;
        this.position = {
            x: randomInt(0,window.innerWidth),
            y: randomInt(-5, window.innerHeight+5)
        }
        this.velocity = {
            x: (Math.random() * -speed) -0.2,
            y: 0
        }
    }
    reset(){
        this.color = colors[randomInt(0,colors.length)];
        this.size = Math.random() * size;
        this.position = {
            x: window.innerWidth + randomInt(20,100),
            y: randomInt(-5, window.innerHeight+5)
        }
        this.velocity = {
            x: (Math.random() * -speed) -0.2,
            y: 0
        }
    }
    draw() {
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        if(Math.random() < 0.8 ) { //provides glow effect
            ctx.globalAlpha = 0.1;
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.position.x, this.position.y, this.size*2, 0, Math.PI * 2);
            ctx.fill();
        }

    }
    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        ctx.globalCompositionOperation = 'lighter'; //if circles overlap make them lighter
        if(this.isDead()) {
            this.reset();
        }
        this.draw();
    }

    isDead() {
        return this.position.x < 0;
    }
}

function playButton() {
  ctx.globalAlpha = 1;
  
  //Make the background of the button
  ctx.fillStyle = '#6da5ed';
  ctx.fillRect(
    canvas.width/2 - canvas.width/6,
    canvas.height/2 - canvas.height/10,
    canvas.width/3,
    canvas.height/10);

  //Make the outline around the button
  ctx.strokeStyle = '#c94c36';
  ctx.lineWidth = 4;
  ctx.strokeRect(
    canvas.width/2 - canvas.width/6,
    canvas.height/2 - canvas.height/10,
    canvas.width/3,
    canvas.height/10);

  //Draw the text
  ctx.fillStyle = 'black';
  ctx.font = "bold italic 50px Courier New";
  ctx.fillText("PLAY GAME",
    canvas.width/2 - 135, 
    canvas.height/2 - canvas.height/30);

}

function animate() {
  playButton();

  //Clear screen
  ctx.fillStyle = "#05061F";
  ctx.globalAlpha = 0.75;
  ctx.fillRect(0,0,canvas.width,canvas.height);

  //update stars
  stars.forEach(star => star.update());

  playButton();

  requestAnimationFrame(animate);
}

//added to event listener to widen the canvas realtime.
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

//MAIN
let stars = Array.from(Array(totalStars), () => new Star());
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', resizeCanvas, false);

animate();
