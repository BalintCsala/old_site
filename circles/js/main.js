let circles = (() => {

    const MIN_EDIT_DIST = 20;

    let c, ctx;

    let mouse;

    let undoQueue = [];
    let redoQueue = [];

    let points = [];
    let click = false;
    let mousedown = false;

    let holding = null;

    let precision, helper, line;

    function main() {
        c = document.getElementById("canvas");
        c.width = c.height = Math.min(innerWidth, innerHeight) - 100;
        ctx = c.getContext("2d");

        onresize = () => {
            c.width = c.height = Math.min(innerWidth, innerHeight) - 100;
            ctx = c.getContext("2d");
        };

        precision = document.getElementById("precision");
        helper = document.getElementById("helper");
        line = document.getElementById("line");

        let undo = () => {
            if (undoQueue.length > 0) {
                let action = undoQueue.pop();
                switch (action.action) {
                    case "addPoint":
                        points.pop();
                        break;
                    case "movePoint":
                        points[action.id].x = action.from.x;
                        points[action.id].y = action.from.y;
                        break;
                }
                redoQueue.push(action);
            }
        };

        let redo = () => {
            if (redoQueue.length > 0) {
                let action = redoQueue.pop();
                switch (action.action) {
                    case "addPoint":
                        points.push(action.point);
                        break;
                    case "movePoint":
                        points[action.id].x = action.to.x;
                        points[action.id].y = action.to.y;
                        break;
                }
            }
        };

        let clear = () => {
            if (confirm("Are you sure you want to delete everything?")) {
                points = [];
                redoPoints = [];
            }
        };

        document.addEventListener("keydown", e => {
            switch (e.key) {
                case "z":
                    undo();
                    break;
                case "y":
                    redo();
                    break;
                case "x":
                    clear();
                    break;
            }
        });

        document.getElementById("undo").onclick = undo;
        document.getElementById("redo").onclick = redo;
        document.getElementById("clear").onclick = clear;

        mouse = new Vec(0, 0);
        c.addEventListener("mousemove", e => {
            let rect = c.getBoundingClientRect();
            mouse.x = (e.clientX - rect.x) / c.width;
            mouse.y = (e.clientY - rect.y) / c.height;
        });

        c.oncontextmenu = e => {
            e.preventDefault();
            e.stopPropagation();
        };

        c.addEventListener("mousedown", e => {
            switch (e.button) {
                case 0:
                    mousedown = true;
                    click = true;
                    break;
                case 2:
                    let closestDist = Infinity;
                    let closest = null;
                    for (let point of points) {
                        let dist = point.sub(mouse).mag();
                        if (dist < closestDist) {
                            closestDist = dist;
                            closest = point;
                        }
                    }

                    if (closestDist < MIN_EDIT_DIST / c.width) {
                        holding = closest;
                    }

                    break;
            }
        });

        document.addEventListener("mouseup", e => {
            mousedown = false;
            holding = null;
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
        let p = new Vec(mouse);
        p.id = points.length;
        if (click) {
            points.push(p);
            undoQueue.push({ action: "addPoint", point: new Vec(p) });
            redoQueue = [];
        } else if (mousedown) {
            if (points[points.length - 1].sub(mouse).mag() > precision.value / c.width) {
                points.push(p);
                undoQueue.push({ action: "addPoint", point: new Vec(p) });
                redoQueue = [];
            }
        }

        if (holding != null) {
            undoQueue.push({ action: "movePoint", id: holding.id, from: new Vec(holding), to: new Vec(mouse) })
            holding.x = mouse.x;
            holding.y = mouse.y;
            redoQueue = [];
        }

        click = false;
    }

    function render() {
        ctx.clearRect(0, 0, c.width, c.height);

        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let point of points) {
            ctx.lineTo(point.x * c.width, point.y * c.height);
        }
        ctx.stroke();

        ctx.fillStyle = "lime";
        ctx.beginPath();
        if (helper.checked) {
            for (let point of points) {
                ctx.moveTo(point.x * c.width, point.y * c.height);
                ctx.arc(point.x * c.width, point.y * c.height, 2, 0, 2 * Math.PI);
            }
        }
        ctx.fill();

        if (line.checked && points.length > 0) {
            ctx.strokeStyle = "lightgrey";
            ctx.beginPath();
            ctx.lineTo(points[points.length - 1].x * c.width, points[points.length - 1].y * c.height);
            ctx.lineTo(mouse.x * c.width, mouse.y * c.height);
            ctx.stroke();
        }

        if (points.length > 0) {
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(points[points.length - 1].x * c.width, points[points.length - 1].y * c.height, 3, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    main();

})();
