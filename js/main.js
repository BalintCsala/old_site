let face = (function() {

    let output = document.getElementById("output");

    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        output.srcObject = stream;
    });

    let c = document.getElementById("canvas");
    c.width = Math.min(innerWidth, innerHeight);
    c.height = c.width;
    let ctx = c.getContext("2d");

    let points = [
        { x: 0.5, y: 0.3 },
        { x: 0.2, y: 0.7 },
        { x: 0.8, y: 0.7 }
    ];

    (function rendering() {
        ctx.drawImage(output, (c.width - output.width) / 2, (c.height - output.height) / 2);
        ctx.beginPath();

        requestAnimationFrame(rendering);
    })();

}());
