d = document;
a = d.getElementById("canvas");
b = d.body;
c = a.getContext("2d");


w = 0.1;
v = 2
p = [0, 0];
e = [];
a.onmousemove = e => p = [e.clientX - a.offsetLeft - a.width / 2, e.clientY - a.offsetTop - a.height / 2];

c.translate(a.width / 2, a.height / 2);
a.style.backgroundColor="black";

(l = t => {
    c.clearRect(-a.width / 2, -a.height / 2, a.width, a.height);
    for (z = v - (t / 5000) % w; z > w; z-= w) {
        for (x = -1; x <= 1; x += w) {
            k = z;
            c.beginPath();
            c.lineWidth = 1;
            c.lineTo(x * a.width / 2 / k, (a.height / 8 + Math.sin(x ** 2) * 60 + k ** 2 * 50) / k);
            c.lineTo((x + w) * a.width / 2 / k, (a.height / 8 + Math.sin((x + w) ** 2) * 60 + k ** 2 * 50) / k);
            c.lineTo((x + w) * a.width / 2 / (k - w), (a.height / 8 + Math.sin((x + w) ** 2) * 60 + (k - w) ** 2 * 50) / (k - w));
            c.lineTo(x * a.width / 2 / (k - w), (a.height / 8 + Math.sin(x ** 2) * 60 + (k - w) ** 2 * 50) / (k - w));
            c.lineTo(x * a.width / 2 / k, (a.height / 8 + Math.sin(x ** 2) * 60 + k ** 2 * 50) / k);
            c.fillStyle = `hsl(200, 100%, ${(x+1)*30+30}%)`
            c.fill();
            c.strokeStyle = "black"
            c.stroke();

            c.fillStyle = "white";
            for (i = 0; i < 20; i++) {
                c.fillRect((p[0] - 30 + i / 2) / (i / 40 + 1), (p[1] - 30 + i / 2) / (i / 40 + 1), (60 - i) / (i / 40 + 1), (60 - i) / (i / 40 + 1));
            }

            i = 2;
            c.fillStyle = "red"
            c.fillRect((p[0] - 100) / (i / 40 + 1) - 15, (p[1] - 50) / (i / 40 + 1) - 15, 30, 30);
            c.fillRect((p[0] + 100) / (i / 40 + 1) - 15, (p[1] + 50) / (i / 40 + 1) - 15, 30, 30);
            c.fillRect((p[0] - 100) / (i / 40 + 1) - 15, (p[1] + 50) / (i / 40 + 1) - 15, 30, 30);
            c.fillRect((p[0] + 100) / (i / 40 + 1) - 15, (p[1] - 50) / (i / 40 + 1) - 15, 30, 30);

            c.strokeStyle = "white";
            c.lineWidth = 30;
            c.beginPath();
            c.lineTo((p[0] - 100) / (i / 40 + 1), (p[1] - 50) / (i / 40 + 1));
            c.lineTo((p[0] + 100) / (i / 40 + 1), (p[1] + 50) / (i / 40 + 1));
            c.stroke();
            c.beginPath();
            c.lineTo((p[0] - 100) / (i / 40 + 1), (p[1] + 50) / (i / 40 + 1));
            c.lineTo((p[0] + 100) / (i / 40 + 1), (p[1] - 50) / (i / 40 + 1));
            c.stroke();
        }
    }

    requestAnimationFrame(l)
})(0)
