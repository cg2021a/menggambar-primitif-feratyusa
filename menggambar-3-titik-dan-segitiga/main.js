function main(){
    /**
    * @type {HTMLCanvasElement} canvas
    */
    const canvas = document.getElementById('my-canvas');

    /**
    * @type {WebGLRenderingContext} gl
    */
    const gl = canvas.getContext('webgl');


    // Menggambar posisi 3 titik
    /**
     * A (-0.5, 0.5)
     * B (-0.5, -0.5)
     * C (0.5, -0.5)
     */
    var vertices =[
        -0.5, 0.5, // Titik A
        -0.5, -0.5, // Titik B
        0.5, -0.5, // Titik C
        0.5, -0.5, // Titik C
        0.5, 0.5, // Titik B
        -0.5, 0.5, // Titik A
    ];

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // var vertexShaderCode = document.getElementById("vertexShaderCode").text;
    var vertexShaderCode = `
    attribute vec2 a_Position;
    void main(){
        gl_Position = vec4(a_Position, 0.0, 1.0);
        gl_PointSize = 20.0;
    }`;

    // Membuat vertex atau titik
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    // var fragmentShaderCode = document.getElementById("fragmentShaderCode").text;
    var fragmentShaderCode = `
    void main(){
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }`;

    // Membuat warna
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    // Membuat package program agar data dapat dieksekusi
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    // Mendefisnisikan Background
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
}