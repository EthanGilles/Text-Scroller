var canvas = document.getElementById('background-canvas');
var ctx = canvas.getContext('2d');
ctx.font = "30px Kode Mono";

const speed = 4; //Max speed of stars on the screen
const size = 2.5; //Max size of stars on the screen
const colors = ["#FFFFF0", "#DEFBFF", "#FFEFC4", "#FCE4BD", "#F6F7E6", "#FF9078", "#FFDB78"]; //Color options for stars on the screen
//Color options are all muted White, Blues, Yellows and Reds.

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

class Star {
    constructor() {
        this.init();
    }

    init(){
        this.position = {
            x: window.innerWidth + randomInt(20,100),
            y: randomInt(-5, window.innerHeight+5)
        }
        this.velocity = {
            x: (Math.random() * -speed) -0.2,
            y: 0
        }
        this.size = Math.random() * size;
        this.color = colors[randomInt(0,colors.length)];
    }
    draw() {
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        ctx.globalCompositionOperation = 'lighter'; //if circles overlap make them lighter
        if(this.isDead()) {
            this.init();
        }
        this.draw();
    }

    isDead() {
        return this.position.x < 0;
    }
}

const totalStars = 300;
let stars = Array.from(Array(totalStars), () => new Star());

function animate() {
    ctx.fillStyle = "#071330"
    ctx.fillRect(0,0,canvas.width,canvas.height);
    stars.forEach(star => star.update());

    requestAnimationFrame(animate);
}

//MAIN
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
animate();
// (CenterX, CenterY, Radius, Start angle, End angle)


