let face = (function() {

    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {

        test.src = stream.url;
    });

}());
