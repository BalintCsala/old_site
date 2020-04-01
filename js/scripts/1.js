(() => {
    
    const GRAVITY = 10;
    const HOLDING_TIME = 1000;
    const MIN_DIST = 18;
    const MAX_DIST = 218;
    
    let maxAngle = 0.5 * Math.PI;
    let minAngle = 0;
    
    let c, ctx;
    let startedLaunch = null;
    let holding = false;
    let launched = null;
    let img;
    let imgLoaded = false;
    let velocity = 0;
    
    function main() {
        let container = document.querySelector(".container");
        let size = container.getBoundingClientRect();
        
        velocity = Math.sqrt(MAX_DIST * GRAVITY / 2) / Math.cos(Math.PI / 4);
        minAngle = Math.asin(MIN_DIST * GRAVITY / velocity / velocity) / 2;
        maxAngle = Math.PI / 2 - minAngle;
        
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
        
        img = new Image();
        img.src = "images/speaker.png";
        img.onload = () => imgLoaded = true;
        
        document.addEventListener("mousedown", e => {
            let offsX = (innerWidth - 300) / 2;
            let offsY = 100;
            let x = e.clientX - offsX;
            let y = e.clientY - offsY;
            if (x >= 20 && x <= 44 && y >= 138 && y <= 162) {
                startedLaunch = Date.now();
                holding = true;
                launched = null;
            }
        });
    
        document.addEventListener("mouseup", () => {
            if (holding) {
                launched = Date.now();
                holding = false;
            }
        });
        
        
        loop();
    }
    
    function loop() {
        ctx.clearRect(0, 0, 300, 300);
        let angle = 0;
        if (startedLaunch) {
            let end = launched ? launched : Date.now();
            angle = Math.min((end - startedLaunch) / HOLDING_TIME, 1) * (maxAngle - minAngle) + minAngle;
        }
        
        if (launched) {
            let totalTime = 2 * velocity * Math.sin(angle) / GRAVITY;
            if ((Date.now() - launched) / 100 >= totalTime - 0.1) {
                let dx = velocity * Math.cos(angle) * totalTime;
                let volume = (dx - MIN_DIST) / (MAX_DIST - MIN_DIST);
                let video = document.querySelector(".thingy");
                video.style.display = "block";
                video.volume = Math.min(Math.max(volume, 0), 1);
                video.play();
            }
        }
        
        if (imgLoaded) {
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.lineTo(50, 150);
            ctx.lineTo(250, 150);
            ctx.stroke();
            
            let imgX = Math.min(Math.ceil(angle / (maxAngle - minAngle) * 4), 3) * 96;
            ctx.save();
            ctx.translate(32, 150);
            ctx.rotate(-angle);
            ctx.drawImage(img, imgX, 0, 96, 96, -12, -12, 24, 24);
            ctx.restore();
            
            if (launched) {
                let totalTime = 2 * velocity * Math.sin(angle) / GRAVITY;
                let elapsed = Math.min((Date.now() - launched) / 100, totalTime);
                let dx = velocity * Math.cos(angle) * elapsed;
                let dy = velocity * Math.sin(angle) * elapsed - GRAVITY * elapsed * elapsed / 2;
                ctx.beginPath();
                ctx.arc(32 + dx, 150 - dy, 4, 0, 2 * Math.PI);
                ctx.fillStyle = "red";
                ctx.fill();
            }
        }
        
        requestAnimationFrame(loop);
    }
    
    main();
    
})();