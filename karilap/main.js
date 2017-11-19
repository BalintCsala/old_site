var c, ctx;

var particles = [];

var ball;
var PADDLE_WIDTH = 20;
var PADDLE_HEIGHT = 150;
var BALL_SIZE;
var SPEED = 700;
var paddle1, paddle2;
var px, py, ex, ey;
var bx, by, vx, vy;

var score1 = 0;
var score2 = 0;

var keys = [];

document.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});

document.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
});

function main() {
	c = document.getElementById("canvas");
	
	c.width = window.innerWidth;
	c.height = window.innerHeight;
	
	ctx = c.getContext("2d");
	
    ball = document.getElementById("angel");
    
    BALL_SIZE = ball.width;
    
	snowLayer = new SnowLayer();
	
	for (var i = 0; i < 1500; i++) {
		particles[i] = new Snow(Math.random() * (c.width + 300) - 300, Math.random() * c.height);
	}
    paddle1 = document.createElement("div");
    paddle1.style.width = PADDLE_WIDTH + "px";
    paddle1.style.height = PADDLE_HEIGHT + "px";
    paddle1.style.backgroundColor = "magenta";
    paddle1.style.position = "absolute";
    document.body.appendChild(paddle1);
    
    paddle2 = document.createElement("div");
    paddle2.style.width = PADDLE_WIDTH + "px";
    paddle2.style.height = PADDLE_HEIGHT + "px";
    paddle2.style.backgroundColor = "magenta";
    paddle2.style.position = "absolute";
    document.body.appendChild(paddle2);
    
    init();
    setPos(0);
	
	loop();
}

var last = 0;
function loop(dt) {
	update(dt - last | 0);
	render(dt - last | 0);
    last = dt;
	
	requestAnimationFrame(loop);
}

var snowCount = 2;
var particlesLength = 1501;
var snowLayer;

function update(dt) {
	var currentSnowCount = snowCount;
	for (var i in particles) {
		if (particles[i].y > c.height) {
			particles[i] = new Snow(Math.random() * c.width, 0);
			currentSnowCount--;
		}
	}
	
	for (var i = 0; i < currentSnowCount; i++) {
		particles[particlesLength] = new Snow(Math.random() * c.width, 0);
		particlesLength++;
	}
	
	for (var particle in particles) {
		particles[particle].update();
	}
	
	snowLayer.update();
    
    if (keys[87]) {
        // P1 up
        py -= SPEED * dt / 1000;
    }
    if (keys[83]) {
        // P1 down
        py += SPEED * dt / 1000;
    }
    if (keys[38]) {
        // P2 up
        ey -= SPEED * dt / 1000;
    }
    if (keys[40]) {
        // P2 down
        ey += SPEED * dt / 1000;
    }
    
    setPos(dt);
    
}

function render() {
	ctx.fillStyle = "#000055";
	ctx.fillRect(0, 0, c.width, c.height);
	for (var particle in particles) {
		particles[particle].render();
	}
	
	snowLayer.render();
}

function init() {
    px = 50 - PADDLE_WIDTH / 2;
    py = innerHeight / 2 - PADDLE_HEIGHT / 2;
    
    ex = innerWidth - 50 - PADDLE_WIDTH / 2;
    ey = c.height / 2 - PADDLE_HEIGHT / 2;
    
    bx = innerWidth / 2 - BALL_SIZE / 2;
    by = innerHeight / 2 - BALL_SIZE / 2;
    
    vx = Math.random() > 0.5 ? SPEED : -SPEED;
    vy = 0;
}

function setPos(dt) {
    if (py < 0)
        py = 0;
    if (py + PADDLE_HEIGHT > innerHeight)
        py = innerHeight - PADDLE_HEIGHT;
    
    if (ey < 0)
        ey = 0;
    if (ey + PADDLE_HEIGHT > innerHeight)
        ey = innerHeight - PADDLE_HEIGHT;
    
    if (by < 0) {
        by = 0;
        vy *= -1;
    }
    
    if (by + BALL_SIZE > innerHeight) {
        by = innerHeight - BALL_SIZE;
        vy *= -1;
    }
    
    if (aabb(bx, by, BALL_SIZE, BALL_SIZE, px, py, PADDLE_WIDTH, PADDLE_HEIGHT)) {
        bx = px + PADDLE_WIDTH;
        var h = py + PADDLE_HEIGHT / 2 - (by + BALL_SIZE / 2);
        var angle = Math.PI / 4 * (h / (PADDLE_HEIGHT / 2 + BALL_SIZE / 2));
        vx = Math.cos(angle) * SPEED;
        vy = -Math.sin(angle) * SPEED;
        if (Math.abs(angle) > Math.PI / 4 * 0.85) {
            vx *= 1.5;
            vy *= 1.5;
        }
    }
    
     if (aabb(bx, by, BALL_SIZE, BALL_SIZE, ex, ey, PADDLE_WIDTH, PADDLE_HEIGHT)) {
        bx = ex - BALL_SIZE;
        var h = ey + PADDLE_HEIGHT / 2 - (by + BALL_SIZE / 2);
        var angle = Math.PI / 4 * (h / (PADDLE_HEIGHT / 2 + BALL_SIZE / 2));
        vx = -Math.cos(angle) * SPEED;
        vy = -Math.sin(angle) * SPEED;
        if (Math.abs(angle) > Math.PI / 4 * 0.85) {
            vx *= 1.5;
            vy *= 1.5;
        }
    }
    
    if (bx < 0) {
        score2++;
        document.getElementById("score2").innerHTML = score2;
        
        init();
        vx = -SPEED;
    }
    
    if (bx > innerWidth - BALL_SIZE) {
        score1++;
        document.getElementById("score1").innerHTML = score1;
        
        init();
        vx = SPEED;
    }
        
    bx += vx * dt / 1000;
    by += vy * dt / 1000;
    
    paddle1.style.left = px + "px";
    paddle1.style.top = py + "px";
    paddle2.style.left = ex + "px";
    paddle2.style.top = ey + "px";
    ball.style.left = bx + "px";
    ball.style.top = by + "px";
}

function aabb(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 <= x2 + w2 && x1 + w1 >= x2 && y1 <= y2 + h2 && y1 + h1 >= y2;
}

function Snow(x, y) {
	this.x = x;
	this.y = y;
	this.vy = 1;
	this.vx = Math.random() * 2 - 1;
}

Snow.prototype.update = function() {
	this.x += this.vx;
	this.y += this.vy;
}

Snow.prototype.render = function() {
	ctx.fillStyle = "white";
	ctx.fillRect(this.x - 1, this.y - 1, 2, 2);
}
var count;

function SnowLayer() {
	count = c.width / 20 + 1;
	
	this.points = [];
	for (var i = 0; i < count; i++) {
		this.points[i] = new Vector2(i * c.width / (c.width / 50), c.height-10);
	}
}
var growth = 0.5;

SnowLayer.prototype.update = function() {
	var r = Math.floor(Math.random() * count);
	
	this.points[r].y -= growth;
	if (r > 0) {
		this.points[r-1].y -= growth / 2;
	}
	if (r < count-1) {
		this.points[r + 1].y -= growth / 2;
	}
}

SnowLayer.prototype.render = function() {
	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.moveTo(0, c.height);
	for (var i = 0; i < count; i++) {
		ctx.lineTo(this.points[i].x, this.points[i].y);
	}
	ctx.lineTo(c.width, c.height);
	ctx.closePath();
	ctx.fill();
}

function Vector2(x, y) {
	this.x = x;
	this.y = y;
}

main();