let circles = (() => {

    const MIN_PIXEL_DIST = 3;

    let c, ctx;

    let mouse;

    let points = [];
    let click = false;
    let mousedown = false;

    function main() {
        c = document.getElementById("canvas");
        c.width = c.height = Math.min(innerWidth, innerHeight) - 100;
        ctx = c.getContext("2d");

        onresize = () => {
            c.width = c.height = Math.min(innerWidth, innerHeight) - 100;
            ctx = c.getContext("2d");
        };

        mouse = new Vec(0, 0);
        c.addEventListener("mousemove", e => {
            mouse.x = (e.clientX - c.offsetLeft) / c.width;
            mouse.y = (e.clientY - c.offsetTop) / c.height;
        });

        c.addEventListener("mousedown", e => {
            mousedown = true;
            click = true;
        });

        document.addEventListener("mouseup", e => {
            mousedown = false;
        });

        document.getElementById("convert").onclick = () => {

            // Convert to circles

        }

        loop();
    }

    function loop() {
        update();
        render();
        requestAnimationFrame(loop);
    }

    function update() {
        if (click) {
            points.push(new Vec(mouse));
        } else if (mousedown) {
            if (points[points.length - 1].sub(mouse).mag() > MIN_PIXEL_DIST / c.width) {
                points.push(new Vec(mouse));
            }
        }

        click = false;
    }

    function render() {
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.lineWidth = 5;
        ctx.beginPath();
        for (let point of points) {
            ctx.lineTo(point.x * c.width, point.y * c.height);
        }
        ctx.stroke();
        ctx.fillStyle = "red";
        if (points.length > 0) {
            ctx.beginPath();
            ctx.arc(points[points.length - 1].x * c.width, points[points.length - 1].y * c.height, 5, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    main();

})();
