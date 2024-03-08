//CANVAS VARIABLES
var canvas = document.getElementById('background-canvas');
var ctx = canvas.getContext('2d');

//ENEMY VARIABLES
const enemyColor = "#FF4242";
const maxEnemies = 4;
const enemies = [];
const words = ["hello", "airplane", "mobile", "maybe", "nevermind", "snack", "several", "train", "goggles"];

//EXPLOSION VARIABLES
const exploSize = 100; //number of particles in an explosion
const exploColors = ["#FA8787", "#C95151", "#C43737", "#F72020", "#FF4242"];
//Color options of different hues of reds for the explosion particles.

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
        this.position.y < 0 || this.position.y > window.innerHeight;
    }

}

class Word {
    constructor() {
        this.init();
    }
    init() {
        this.untyped = words[randomInt(0,words.length)];
        this.typed = new String();
        this.explosions = [];
        this.isTyped = false;

        this.position = {
            x: -(this.untyped.length * 60),
            y: randomInt(100, window.innerHeight-100)
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

        //if the word has been typed 
        if(this.untyped.length == 0 && !this.isTyped) { 
            this.explosions = Array.from(Array(exploSize), () => new Explosion(this.position.x, this.typed.length));
            this.isTyped = true;
            if(enemies.length <= maxEnemies) 
                enemies.push(new Word());
        }

        if(this.untyped.charAt(0) == lastKey) {
            this.typed += lastKey;
            this.untyped = this.untyped.substr(1);
            lastKey = null;
        }
        
        if(this.isDead()) {
            this.init();
        }

        if(!this.isTyped) {
            this.draw(); 
        }
        else {
            this.explosions.forEach(explo => explo.update());
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

//initialize variables for the animation
let lastKey = null;
let stars = Array.from(Array(totalStars), () => new Star());
enemies.push(new Word());

//ANIMATION FUNCTION
function animate() {
    //Clear screen
    ctx.fillStyle = "#05061F";
    ctx.globalAlpha = 0.75;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    
    //update stars
    stars.forEach(star => star.update());

    //update word enemies
    enemies.forEach(e => e.update());

    //animate
    requestAnimationFrame(animate);
}

//added to event listener to widen the canvas realtime.
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


 