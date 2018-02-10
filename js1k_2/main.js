d = document;
a = d.getElementById("canvas");
b = d.body;
c = a.getContext("2d");

/*w = a.width;
h = a.height;
p = [0, 0];
e = [];
s = [];
for (i = 0; i < 200; i++) s.push([(Math.random() - .5) * w, (Math.random() - .5) * h, Math.random() * 2 + 1]);

a.onmousemove = e => p = [e.clientX - w / 2, e.clientY - h / 2];

a.style.backgroundColor = "#000";

(l = t => {
    a.width |= 0;
    c.translate(w / 2, h / 2);

    c.fillStyle = "#fff";
    s.map(x => c.fillRect(x[0], x[1], x[2], x[2]));

    for (z = 3 - (t / 5000) % 0.08; z > 0.08; z-= 0.08)
        for (x = -1; x < 1; x += 0.08)
            c.beginPath(),
            [[0, 0], [0.08, 0], [0.08, 0.08], [0, 0.08], [0, 0]].map(m => c.lineTo((x + m[0]) * w / 2 / (z + m[1]), (h / 6 + Math.sin(x + m[0]) ** 2 * 60 + (z + m[1]) ** 2 * 50 - 10 / Math.hypot(Math.abs(x + m[0]) - 0.6, (z + m[1] + t / 5000) % 1 - .5)) / (z + m[1]))),
            c.fillStyle = `hsl(200, 100%, ${(x+1)*30+30}%`,
            c.fill(),
            c.stroke();

    u = [];


    Math.random() < 0.12 && e.push([(Math.random() - .5) * w, (Math.random() - .5) * h, 20]);

    e = e.filter(x => x[2] > 0.3);
    e.map(x => (u.push([x[0], x[1], x[2], 200, `hsl(${30 - x[2]}, 100%, 20%`]), x[2] -= 0.2));

    for (i = 0; i < 20; i++) u.push([p[0] + i / 2, p[1] + i / 2, i / 40 + 1, 40 - i, "#fff"]);

    [[-100, -50], [100, 50], [-100, 50], [100, -50]].map(x => {for(i = 2; i < 7; i++) u.push([p[0] + x[0], p[1] + x[1], (i / 40 + 1), 20, "#fff"])});

    u.sort((x, b) => b[2] - x[2]).map(x => (c.fillStyle = x[4], c.fillRect((x[0] - x[3] / 2) / x[2], (x[1] - x[3] / 2) / x[2], x[3] / x[2], x[3] / x[2])));

    c.strokeStyle = "#fff";
    c.lineWidth = 20;

    i = 2;
    c.beginPath();
    c.moveTo((p[0] - 100) / (i / 40 + 1), (p[1] - 50) / (i / 40 + 1));
    c.lineTo((p[0] + 100) / (i / 40 + 1), (p[1] + 50) / (i / 40 + 1));
    c.stroke();
    c.beginPath();
    c.moveTo((p[0] - 100) / (i / 40 + 1), (p[1] + 50) / (i / 40 + 1));
    c.lineTo((p[0] + 100) / (i / 40 + 1), (p[1] - 50) / (i / 40 + 1));
    c.stroke();


    c.fillStyle = "#fff";
    c.fillText((t / 1000).toFixed(1) + `s`, -w / 2 + 10, -h / 2 + 20);

    e.some(x => x[2] < 1.5 && Math.hypot(p[0] - x[0], p[1] - x[1]) < 100) || requestAnimationFrame(l)
})(0)*/

for(_='`hsl(~x[3]/W50V);Ui/40+1TV)/(T)UR[1]Q,pQP0.O;iNMath.LLrandom()K(K-.5)*J.push([IIJw,Jh,H),G100EE)/(TG(pQD/2x[2]-x[3])/,[0],xQ,,Lhypot(a.width=[];=>20for(i=0N<t/V00)%e.client(x+m)](N++)uIp+0,c[c.fy]=	(C+mQ],[Rl(p+Dc.stroke()"#fff".mapO08;baUm(p-Di in c)c[i+[i[6]]]=i;w=;h=a.height;p=[0];es0N++)sHK*2+1]Ua.onmousemove=ep=[X-w,Y-h];a.style.backgroundColor="#000";(l=t{|=0;taw,hU	;sfcx)UC=3-(;C>;C-=)for=-1;x<1;x+=)baG[[0,0,0]].map(ml*w/G(h/6+Lsin**2*60+)**2*V-10/Labs-O6,+1-.5))/))G	~E%,${+1)*30+30}%`,c.fill(G;uK<O12&&eH]Ue=e.filter>O3Ue(uIx~${30-},E%,%`]G-=O2)UiP+i,T,40-i,]U[[-10-V10V-10V10-V]]{i=2N<7xP+xQ,(TG2])}Uu.sort(,b)b[2]-)(	x[4],fcQW,W))UsS]=;ld]=N=2-+R+-R;	;fx(t/E0).toFixed(1)+`s`,-w+1-h+Ue.some<1.5&&p-xP-xQ)<E)||requestAnimationFrame(l)})(0)';G=/[^ -CFMSX-}]/.exec(_);)with(_.split(G))_=join(shift());eval(_)
