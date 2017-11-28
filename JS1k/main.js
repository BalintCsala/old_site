
a = document.getElementById("canvas");
b = document.body;
c = a.getContext("2d");
d = document;


U= E = L= 0, f = r => {
    for (s = (a, b = a) => ({
            x: a,
            y: b
        }), M = [...(k=Array(33))].map((r, y) => [...(k=Array(33))].map((r, x) => x % 2 & y % 2)), I = s(1.5), u = v = 32, p = s(3), C = (a, b) => s(a.x + b.x, a.y + b.y), o = (a, b) => s(a.x / b, a.y / b), h = (p, i=1) => [s(-2, 0), s(2, 0), s(0, -2), s(0, 2)].filter(e => g(C(p, e)) == i), t = p => s(Math.cos(p), Math.sin(p)), g = p => (M[p.y | 0] || 0)[p.x | 0] | 0, S = (a, b) => M[a.y | 0][a.x | 0] = b; S(p, 2);) {
        
        if ((A = h(p))[m = 0] ? !(l = C(p, A[Math.random() * A.length | 0])): 1) {
            for (x = 0; x < u; x++)
                for (y = 0; y < v; y++) g(s(x + 1, y + 1)) - 1 || !h(D = s(x + 1, y + 1), 2)[0] || (p = C(h(D = s(x + 1, y + 1), 2)[0], l = D), m = x = y = u);
            if (!m) break
        }
        S(o(C(p, p = l), 2), 2)
    }
    u = 1, v = 5;
    for (x = 0; x < u; x++)
        for (y = 0; y < v; y++) S(s(Math.random() * 32 | 0 + 1, Math.random() * 32 | 0 + 1), 3)
};f();
u = "onkeydown";
d[u] = e => k[e.keyCode] = 1;
u = "onkeyup";
d[u] = e => k[e.keyCode] = 0;
(k=_=>{
    g(I) - 3 || (S(I, 2), E++);
    d = o(t(L), 396/(-U+(U=_)));
    T = 5e-2;
    i=36;
    k[++i] && (L += -T);
    k[++i] && g(n = C(I, d)) && (I = n);
    k[++i] && (L += T);
    d = o(d, -1);
    k[++i] && g(n = C(I, d)) && (I = n);
    I.x + I.y < 62 || !E || E % 5 || f();
    c.fillStyle = "#24f";
    c.fillRect(0, 0, u = 400, u);
    c.fillStyle = "#333";
    c.fillRect(0, h = 200, u, h);
    v = 1e4;
    for (x = 0; x < u; x++)
        for (y = 0; y < v; y++) w = C(I, o(t(L + (z=(x - u/2) / u)), 150 / y * Math.cos(z))), g(w) && g(w)^3 || (c.fillStyle = ["#999", "#bbb", "#ddd"][(w.x%3 + w.y) % 3|0], g(w) - 3 || (c.fillStyle = "#0f0"), c.fillRect(x, h - u / y / 1e-2 / 2, 2, u / y / 1e-2), y = v,x++);
    u = v = 33;
    for (x = 0; x < u; x++)
        for (y = 0; y < v; y++) c.fillStyle = ["#000", "#fff", "#fff", "#0f0"][M[y][x]], c.fillRect(x * 3, y * 3, 3, 3);
    c.fillStyle = "#f00";
    c.fillRect(I.x * 3 - 1, I.y * 3 - 1, 3, 3);
    c.fillRect(93, 93, 3, 3);
    requestAnimationFrame(k)
})()