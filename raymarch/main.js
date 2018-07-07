(function() {
    
    const CAMERA_SPEED = 0.2;
    const CAMERA_ANGULAR_SPEED = Math.PI / 720;
    
    let c, gl;
    let vertexSource, fragmentSource;
    let program;
    
    let cameraPosition = [0, 1, -5];
    let cameraRotation = [0, 0];
    
    let uResolution;
    let uTime;
    let uFloorHeight;
    let uCameraPosition;
    let uCameraRotation;
    let uHeatmap;
    let uTex0;
    let uTex1;
    let uTex2;
    let uTex3;
    let uSun;
    
    let keys = [];
    let mouse = false;
    let mouseDelta = [0, 0];
    
    let codeBase, error;
    
    function main() {
        c = document.getElementById("canvas");
        c.width = innerWidth;
        c.height = innerHeight;
        
        codeBase = document.getElementById("code-base");
        error = document.getElementById("error");
                
        for (let overlay of document.getElementsByClassName("overlay")) {
            overlay.onclick = e => {
                e.stopPropagation();
            }
        }
        
        onresize = e => {
            c.width = innerWidth;
            c.height = innerHeight;
        };
        
        gl = c.getContext("webgl2");
        
        
        c.onmousedown = e => {
            mouse = true;
        };
        c.onmouseup = e => {
            mouse = false;
        };
        let keydownListener = e => {
            keys[e.keyCode] = true;
        };
        let keyupListener = e => {
            keys[e.keyCode] = false;
        }
        
        c.onmousemove = e => {
            mouseDelta = [e.movementX, e.movementY];
            addEventListener("keydown", keydownListener);
            addEventListener("keyup", keyupListener);
        };
        onmouseout = e => {
            mouse = false;
            removeEventListener("keydown", keydownListener);
            removeEventListener("keyup", keyupListener);
            keys = [];
        };
        
        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1,
            1, -1,
            -1, 1,
            1, 1
        ]), gl.STATIC_DRAW);
        
        let heatmapTex = gl.createTexture();
        let image = new Image();
        image.src = "heatmap.png";
        image.onload = () => {
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, heatmapTex);
            console.log(image);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        };
        
        let vertex = gl.createShader(gl.VERTEX_SHADER);
        let fragment = gl.createShader(gl.FRAGMENT_SHADER);
        
        let vertexSource, fragmentSource;
        
        document.getElementById("run").onclick = e => {
            gl.deleteProgram(program)
            program = gl.createProgram();
            let vertex = gl.createShader(gl.VERTEX_SHADER);
            let fragment = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(vertex, vertexSource);
            gl.shaderSource(fragment, fragmentSource.replace("[MAP]", codeBase.innerText));
            gl.compileShader(vertex);
            gl.compileShader(fragment);
            error.innerText = gl.getShaderInfoLog(fragment);
            gl.attachShader(program, vertex);
            gl.attachShader(program, fragment);
            gl.linkProgram(program);
            gl.useProgram(program);
            let pPos = gl.getAttribLocation(program, "p");
            gl.enableVertexAttribArray(pPos);
            gl.vertexAttribPointer(pPos, 2, gl.FLOAT, false, 0, 0);
        
            uResolution = gl.getUniformLocation(program, "resolution");
            uTime = gl.getUniformLocation(program, "time");
            uFloorHeight = gl.getUniformLocation(program, "floorHeight");
            uCameraPosition = gl.getUniformLocation(program, "cameraPosition");
            uCameraRotation = gl.getUniformLocation(program, "cameraRotation");
            uHeatmap = gl.getUniformLocation(program, "heatmap");
            uTex0 = gl.getUniformLocation(program, "tex0");
            uTex1 = gl.getUniformLocation(program, "tex1");
            uTex2 = gl.getUniformLocation(program, "tex2");
            uTex3 = gl.getUniformLocation(program, "tex3");
            uSun = gl.getUniformLocation(program, "sun");
            
            gl.deleteShader(vertex);
            gl.deleteShader(fragment);
        };
        
        fetch("raymarch.vert")
            .then(response => {
                return response.text();
            })
            .then(response => {
                vertexSource = response;
                fetch("raymarch.frag")
                    .then(response => {
                        return response.text();
                    })
                    .then(response => {
                        fragmentSource = response;
                        gl.shaderSource(vertex, vertexSource);
                        gl.shaderSource(fragment, fragmentSource.replace("[MAP]", codeBase.innerText));
                        gl.compileShader(vertex);
                        gl.compileShader(fragment);
                        error.innerText = gl.getShaderInfoLog(fragment);
                        program = gl.createProgram();
                        gl.attachShader(program, vertex);
                        gl.attachShader(program, fragment);
                        gl.linkProgram(program);
                        gl.useProgram(program);
                        let pPos = gl.getAttribLocation(program, "p");
                        gl.enableVertexAttribArray(pPos);
                        gl.vertexAttribPointer(pPos, 2, gl.FLOAT, false, 0, 0);
                        gl.deleteShader(vertex);
                        gl.deleteShader(fragment);
                    
                        uResolution = gl.getUniformLocation(program, "resolution");
                        uTime = gl.getUniformLocation(program, "time");
                        uFloorHeight = gl.getUniformLocation(program, "floorHeight");
                        uCameraPosition = gl.getUniformLocation(program, "cameraPosition");
                        uCameraRotation = gl.getUniformLocation(program, "cameraRotation");
                        uHeatmap = gl.getUniformLocation(program, "heatmap");
                        uTex0 = gl.getUniformLocation(program, "tex0");
                        uTex1 = gl.getUniformLocation(program, "tex1");
                        uTex2 = gl.getUniformLocation(program, "tex2");
                        uTex3 = gl.getUniformLocation(program, "tex3");
                        uSun = gl.getUniformLocation(program, "sun");
                        loop();
                    });
            });
    }
    
    function loop(t) {
        update(t);
        render(t);
        requestAnimationFrame(loop);
    }
    
    function update(t) {
        if (keys[87] || keys[90] || keys[38]) { // Forward
            cameraPosition[2] += Math.cos(cameraRotation[1]) * CAMERA_SPEED;
            cameraPosition[0] += Math.sin(cameraRotation[1]) * CAMERA_SPEED;
        }
        if (keys[83] || keys[40]) { // Backward
            cameraPosition[2] -= Math.cos(cameraRotation[1]) * CAMERA_SPEED;
            cameraPosition[0] -= Math.sin(cameraRotation[1]) * CAMERA_SPEED;
        }
        if (keys[65] || keys[81] || keys[37]) { // Left
            cameraPosition[2] -= Math.cos(cameraRotation[1] + Math.PI / 2) * CAMERA_SPEED;
            cameraPosition[0] -= Math.sin(cameraRotation[1] + Math.PI / 2) * CAMERA_SPEED;
        }
        if (keys[68] || keys[39]) { // Right
            cameraPosition[2] += Math.cos(cameraRotation[1] + Math.PI / 2) * CAMERA_SPEED;
            cameraPosition[0] += Math.sin(cameraRotation[1] + Math.PI / 2) * CAMERA_SPEED;
        }
        if (keys[32]) {
            cameraPosition[1] += CAMERA_SPEED;
        }
        if (keys[16]) {
            cameraPosition[1] -= CAMERA_SPEED;
        }
        if (mouse) {
            cameraRotation[0] -= mouseDelta[1] * CAMERA_ANGULAR_SPEED;
            cameraRotation[1] += mouseDelta[0] * CAMERA_ANGULAR_SPEED;
            mouseDelta = [0, 0];
        }
    }
    
    function render(t) {
        gl.viewport(0, 0, c.width, c.height);
        
        uResolution && gl.uniform2f(uResolution, c.width, c.height);
        uTime && gl.uniform1f(uTime, performance.now() / 1000);
        uFloorHeight && gl.uniform1f(uFloorHeight, document.getElementById("floor_height").value);
        uCameraPosition && gl.uniform3f(uCameraPosition, cameraPosition[0], cameraPosition[1], cameraPosition[2]);
        uCameraRotation && gl.uniform2f(uCameraRotation, cameraRotation[0], cameraRotation[1]);
        if (uSun) {
            let x = document.getElementById("sunX").value;
            let y = document.getElementById("sunY").value;
            let z = document.getElementById("sunZ").value;
            gl.uniform3f(uSun, x, y, z);
        }
        
        uHeatmap && gl.uniform1i(uHeatmap, 0);
        uTex0 && gl.uniform1i(uTex0, 1);
        uTex1 && gl.uniform1i(uTex1, 2);
        uTex2 && gl.uniform1i(uTex2, 3);
        uTex3 && gl.uniform1i(uTex3, 4);
        
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    
    main();
    
}());
