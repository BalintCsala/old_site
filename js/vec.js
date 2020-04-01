function vec(x, y) {
    return { x, y };
}

function add(a, b) {
    return vec(a.x + b.x, a.y + b.y);
}

function sub(a, b) {
    return vec(a.x - b.x, a.y - b.y);
}

function mag(v) {
    return Math.hypot(v.x, v.y);
}

function mul(v, n) {
    return vec(v.x * n, v.y * n);
}