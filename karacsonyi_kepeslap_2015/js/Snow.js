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
	if (this.x + 2 >= 0 && this.x <= c.width && this.y + 2 >= 0 && this.y <= c.height) {
		ctx.fillRect(this.x - 1, this.y - 1, 2, 2);
	}
}