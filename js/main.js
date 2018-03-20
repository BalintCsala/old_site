let face = (function() {

    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {

        test.srcObject = stream;
        s = stream;
    });

}());
