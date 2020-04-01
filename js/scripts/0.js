(() => {
   
    const GRAVITY = 1;
    
    let c, ctx;
    let ball;
    let lastMouse;
    let mouse;
    let lastDragging = false;
    let dragging = false;
    
    function main() {
        let container = document.querySelector(".container");
        let size = container.getBoundingClientRect();
        
        c = document.createElement("canvas");
        c.style.position = "absolute";
        c.style.top = "0px";
        c.style.left = "0px";
        c.width = size.width;
        c.height = size.height;
        c.style.width = size.width + "px";
        c.style.height = size.height + "px";
        container.appendChild(c);
        ctx = c.getContext("2d");
        
        ball = {
            pos: vec(150, 150),
            vel: vec(0, 0),
            onSlider: true
        };
        lastMouse = vec(-100, -100);
        mouse = vec(-100, -100);
        
        let setMouse = e => {
            let offsX = (innerWidth - 300) / 2;
            let offsY = 100;
            mouse = vec(e.clientX - offsX, e.clientY - offsY);
            if (lastDragging && !dragging)
                ball.vel = vec(e.movementX * 3, e.movementY * 3);
            
            lastDragging = dragging;
        };
        
        document.addEventListener("mousemove", setMouse);
    
        document.addEventListener("mousedown", e => {
            setMouse(e);
            if (mag(sub(mouse, ball.pos)) <= 8) {
                dragging = true;
            }
        });
    
        document.addEventListener("mouseup", e => {
            setMouse(e);
            dragging = false;
        });
        
        loop();
    }
    
    function getPercentage() {
        return (ball.pos.x - 50) / 200;
    }
    
    function loop() {
        if (dragging) {
            ball.pos.x = Math.min(Math.max(mouse.x, 18), 282)
            if (!ball.onSlider)
                ball.pos.y = Math.min(mouse.y, 282);
            let perc = getPercentage();
            if (ball.onSlider && (perc < 0 || perc > 1)) {
                dragging = false;
                ball.onSlider = false;
                ball.vel = sub(mouse, lastMouse);
            }
        }
        if (!ball.onSlider && !dragging) {
            ball.vel.y += GRAVITY;
            let newPos = add(ball.pos, ball.vel);
            
            let t = (150 - ball.pos.y) / (newPos.y - ball.pos.y);
            let pos = add(ball.pos, mul(sub(newPos, ball.pos), t));
            if (t >= 0 && t <= 1 && pos.x >= 50 && pos.x <= 250) {
                ball.pos = pos;
                ball.onSlider = true;
            } else {
                ball.pos = newPos;
                if (ball.pos.x < 18) {
                    ball.pos.x = 18;
                    ball.vel.x *= -0.8;
                }
                if (ball.pos.x > 282) {
                    ball.pos.x = 282;
                    ball.vel.x *= -0.8;
                }
                if (ball.pos.y > 282) {
                    ball.pos.y = 282;
                    ball.vel.y *= -0.6;
                }
                ball.vel.x *= 0.98;
            }
        }
        
        ctx.clearRect(0, 0, 300, 300);
        
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.lineTo(10, 0);
        ctx.lineTo(10, 290);
        ctx.lineTo(290, 290);
        ctx.lineTo(290, 0);
        ctx.stroke();
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.lineTo(50, 150);
        ctx.lineTo(250, 150);
        ctx.stroke();
        
        ctx.font = "18px Arial";
        let percentage = Math.min(0.99, Math.max(0, getPercentage()));
        let emoji = String.fromCodePoint(128264 + Math.floor(percentage * 3));
        ctx.fillText(emoji, 20, 156);
        
        ctx.beginPath();
        ctx.arc(ball.pos.x, ball.pos.y, 8, 0, 2 * Math.PI);
        ctx.fill();
        
        let text = "";
        if (ball.pos.y === 150) {
            text = Math.round(getPercentage() * 100) + "%";
        } else {
            let imag = (ball.pos.y - 150) / 2;
            text = Math.round(getPercentage() * 100) + (imag >= 0 ? " - " : " + ") + Math.floor(Math.abs(imag)) + "i %";
        }
        let w = ctx.measureText(text).width;
        ctx.fillText(text, (300 - w) / 2, 100);
        
        lastMouse = mouse;
        
        requestAnimationFrame(loop);
    }
    
    main();
    
})();