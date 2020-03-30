var c, ctx;

var particles = [];

function main() {
	c = document.getElementById("canvas");
	
	c.width = window.innerWidth;
	c.height = window.innerHeight;
	
	ctx = c.getContext("2d");
	
	snowLayer = new SnowLayer();
	
	for (var i = 0; i < 500; i++) {
		particles[i] = new Snow(Math.random() * (c.width + 300) - 300, Math.random() * c.height);
	}
	loop();
}
var frame = Date.now();
var updater = 0;

function loop() {
	frame = Date.now();
	
	update();
	render();
	
	
	var z = ((Date.now() / 20) % 360) * (2 * Math.PI) / 360;
	document.getElementById("angyal").style.top = 120 + Math.sin(z) * 50;
	
	if (Math.abs(updater) >= 1000) {
		updater -= 1000;
		updateImages();
	}
	
	var delay = Date.now() - frame;
	updater += delay;
	
	window.requestAnimationFrame(loop);
}

var snowCount = 1;
var particlesLength = 501;
var snowLayer;

function update() {
	var currentSnowCount = snowCount;
	for (var i in particles) {
		if (particles[i].y > c.height) {
			particles[i] = new Snow(Math.random() * c.width, 0);
			currentSnowCount--;
		}
	}
	
	for (var i = 0; i < currentSnowCount; i++) {
		particles.push(new Snow(Math.random() * c.width, 0));
		particlesLength++;
	}
	
	for (var particle in particles) {
		particles[particle].update();
	}
	
	snowLayer.update();
}
function render() {
	ctx.fillStyle = "#000022";
	ctx.fillRect(0, 0, c.width, c.height);
	for (var particle in particles) {
		particles[particle].render();
	}
	
	snowLayer.render();
}

var current = 0;

var path = "diavetites/"

var h = -1;

function toggle(i) {
	h = i;
	if (h == 1) {
		document.getElementById("play").src = "images/Play_ON.png";
		document.getElementById("stop").src = "images/stop.png";
	} else {
		document.getElementById("play").src = "images/play.png";
		document.getElementById("stop").src = "images/stop_ON.png";
	}
}

function changeImage(i) {
	current += i;
	if (current == length) {
		current = 0;
	}
	if (current < 0) {
		current = length - 1;
	}
	document.getElementById("kepek").src = path + current + ".jpg";
	
	if (i == -1) {
		document.getElementById("left").src = "images/Arrow_ON.png";
	} else {
		document.getElementById("right").src = "images/Arrow_ON.png";
	}
	window.setTimeout(setBack, 100);
}

function setBack() {
	document.getElementById("left").src = "images/Arrow.png";
	document.getElementById("right").src = "images/Arrow.png";
}

var length = 13;

function updateImages() {
	if (h == 1) {
		document.getElementById("kepek").src = document.getElementById("kepek").src = path + current + ".jpg";
		current++;
		if (current >= length) {
			current = 0;
		}
	}
}

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}
var b = false;
function toggleDiv() {
	b = !b;
	if (b) {
		document.getElementById("nevjegyek-gordulo").style.display = "block";
		setHeight();
	} else {
		document.getElementById("nevjegyek-gordulo").style.display = "none";
	}
}
var a = 1;
function setHeight() {
	document.getElementById("nevjegyek-gordulo").style.height = a;
	a += 4;
	if (a <= 270 && b) {
		window.setTimeout(setHeight, 1);
	} else { 
		a = 1;
	}
}
