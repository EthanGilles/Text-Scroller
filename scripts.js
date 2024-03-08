var canvas = document.getElementById('background-canvas');
var ctx = canvas.getContext('2d');

const enemyColor = "#FF4242";
const exploSize = 100; //number of particles in an explosion
const totalStars = 400; //Total number of stars on the screen
const speed = 4; //Max speed of stars on the screen
const size = 2.5; //Max size of stars on the screen
const colors = ["#FFFFF0", "#DEFBFF", "#FFEFC4", "#FCE4BD", "#F6F7E6", "#FA8787", "#FFDB78", "#7FB0DB", "#668ED4"]; //Color options for stars on the screen
//Color options are all muted White, Blues, Yellows and Reds.
const exploColors = ["#FA8787", "#C95151", "#C43737", "#F72020", "#FF4242"];
//Color options of different reds for the explosion particles.

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

class Explosion {
    constructor(position, length) {
        this.init(position, length)
    }
    init(position, length){
        this.color = exploColors[randomInt(0,exploColors.length)];
        this.size = 4;
        this.position = {
            x: position + (length*30),
            y: window.innerHeight / 2 -40
        }
        this.velocity = {
            x: (Math.random() * (speed+speed)) +0.8,
            y: (Math.random() * (speed+speed)) +0.8
        }

        if(Math.random() < 0.5) {
            this.velocity.x *= -1;
        }
        if(Math.random() < 0.5) {
            this.velocity.y *= -1;
        }
    }
    draw() {
        ctx.globalAlpha = 0.7;
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
        this.draw();
    }
    isDead() {
        return this.position.x < 0 || this.position.x > window.innerWidth || 
        this.position.y < 0 || this.position.y > window.innerWidth;
    }

}

class Word {
    constructor() {
        this.init();
    }
    init() {
        this.untyped = "hello";
        this.typed = new String();
        this.explosions = [];
        this.isTyped = false;

        this.position = {
            x: -(this.untyped.length * 60),
            y: window.innerHeight / 2
        }
        this.velocity = {
            x: 4,
            y: 0
        }
    }
    draw() {
        ctx.globalAlpha = 1;
        ctx.font = "100px Kode Mono";

        ctx.fillStyle = enemyColor;
        ctx.fillText(this.typed, this.position.x, this.position.y);

        let offset = this.typed.length*60;
        ctx.fillStyle = "#DEFBFF";
        ctx.fillText(this.untyped, this.position.x+offset, this.position.y);
    }
    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.untyped.charAt(0) == lastKey) {
            this.typed += lastKey;
            this.untyped = this.untyped.substr(1);
            lastKey = null;
        }

        if(this.untyped.length == 0 && !this.isTyped) { //if the word has been typed
            this.explosions = Array.from(Array(exploSize), () => new Explosion(this.position.x, this.typed.length));
            this.isTyped = true;
        }

        if(!this.isTyped) {
            this.draw(); 
        }
        else {
            this.explosions.forEach(explo => explo.update());
        }

        if(this.isDead()) {
            this.init();
        }
    }
    isDead() {
        let allGone = true;
        for(let i = 0; i < this.explosions.length; i++) {
            allGone = allGone && this.explosions[i].isDead();
        }
        return this.explosions.length > 0 && allGone;
    }
}

function drawWord(word) {
    ctx.font = "100px Kode Mono";
    ctx.fillStyle = 'white';
    ctx.fillText(word, 0, 300);
}

let lastKey = null;
let stars = Array.from(Array(totalStars), () => new Star());
let enemy = new Word();

function animate() {
    ctx.fillStyle = "#05061F";
    ctx.globalAlpha = 0.75;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    stars.forEach(star => star.update());
    enemy.update();
    requestAnimationFrame(animate);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
//MAIN
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', resizeCanvas, false);
document.addEventListener("keydown", (ev) => { lastKey = ev.key; });
animate();
// (CenterX, CenterY, Radius, Start angle, End angle)


 