d = document;
a = d.getElementById("canvas");
b = d.body;
c = a.getContext("2d");


w = 0.08;
v = 3
p = [0, 0];
e = [];
s = [];
for (i = 0; i < 200; i++)
    s.push([(Math.random() - .5) * a.width, (Math.random() - .5) * a.height, Math.random() * 2 + 1])
a.onmousemove = e => p = [e.clientX - a.offsetLeft - a.width / 2, e.clientY - a.offsetTop - a.height / 2];

a.style.backgroundColor = "black";
c.translate(a.width / 2, a.height / 2);

(l = t => {
    c.clearRect(-a.width / 2, -a.height / 2, a.width, a.height);

    c.fillStyle = "white";
    s.map(x => c.fillRect(x[0], x[1], x[2], x[2]));

    for (z = v - (t / 5000) % w; z > w; z-= w)
        for (x = -1; x <= 1; x += w) {
            c.beginPath();
            c.lineWidth = 1;
            c.lineTo(x * a.width / 2 / z, (a.height / 6 + Math.sin(x ** 2) * 60 + z ** 2 * 50 - 10 / Math.hypot(Math.abs(x) - 0.6, ((z + t / 5000) % 1 + 1) % 1 - .5)) / z);
            c.lineTo((x + w) * a.width / 2 / z, (a.height / 6 + Math.sin((x + w) ** 2) * 60 + z ** 2 * 50 - 10 / Math.hypot(Math.abs(x + w) - 0.6, ((z + t / 5000) % 1 + 1) % 1 - .5)) / z);
            c.lineTo((x + w) * a.width / 2 / (z - w), (a.height / 6 + Math.sin((x + w) ** 2) * 60 + (z - w) ** 2 * 50 - 10 / Math.hypot(Math.abs(x + w) - 0.6, ((z - w + t / 5000) % 1 + 1) % 1 - .5)) / (z - w));
            c.lineTo(x * a.width / 2 / (z - w), (a.height / 6 + Math.sin(x ** 2) * 60 + (z - w) ** 2 * 50 - 10 / Math.hypot(Math.abs(x) - 0.6, ((z - w + t / 5000) % 1 + 1) % 1 - .5)) / (z - w));
            c.lineTo(x * a.width / 2 / z, (a.height / 6 + Math.sin(x ** 2) * 60 + z ** 2 * 50 - 10 / Math.hypot(Math.abs(x) - 0.6, ((z + t / 5000) % 1 + 1) % 1 - .5)) / z);
            c.fillStyle = `hsl(200, 100%, ${(x+1)*30+30}%)`
            c.fill();
            c.strokeStyle = "black"
            c.stroke();
        }

    u = [];

    if (Math.random() < 0.04)
        e.push([(Math.random() - .5) * a.width, (Math.random() - .5) * a.height, 10]);

    e = e.filter(x => x[2] > 0.3);
    e.map(x => (u.push([x[0] - 100, x[1] - 100, 200, x[2], "brown"]), x[2] -= 0.05));

    for (i = 0; i < 20; i++)
        u.push([p[0] - 20 + i / 2, p[1] - 20 + i / 2, 40 - i, i / 40 + 1, "white"]);

    [[-100, -50], [100, 50], [-100, 50], [100, -50]].map(x => {for(i = 0; i < 5; i++) u.push([p[0] + x[0] - 10, p[1] + x[1] - 10, 20, ((i + 2) / 40 + 1), "white"])})

    u.sort((a, b) => b[3] - a[3]).map(x => (c.fillStyle = x[4], c.fillRect(x[0] / x[3], x[1] / x[3], x[2] / x[3], x[2] / x[3])));

    c.strokeStyle = "white";
    c.lineWidth = 20;
    i = 2
    c.beginPath();
    c.lineTo((p[0] - 100) / (i / 40 + 1), (p[1] - 50) / (i / 40 + 1));
    c.lineTo((p[0] + 100) / (i / 40 + 1), (p[1] + 50) / (i / 40 + 1));
    c.stroke();
    c.beginPath();
    c.lineTo((p[0] - 100) / (i / 40 + 1), (p[1] + 50) / (i / 40 + 1));
    c.lineTo((p[0] + 100) / (i / 40 + 1), (p[1] - 50) / (i / 40 + 1));
    c.stroke();

    requestAnimationFrame(l)
})(0)
