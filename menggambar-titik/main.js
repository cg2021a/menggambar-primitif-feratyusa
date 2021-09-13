function main(){
    // Akses canvas atau media untuk menggambar
    var canvas = document.getElementById("my-canvas");
    var context = canvas.getContext("webgl");

    // Definisi Vertex atau titik yang dibuat
    var vertexShaderCode = `
    void main(){
        gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
        gl_PointSize = 10.0;
    }`;

    // Membuat vertex atau titik
    var vertexShader = context.createShader(context.VERTEX_SHADER);
    context.shaderSource(vertexShader, vertexShaderCode);
    context.compileShader(vertexShader);

    // Definisi Color atau Fragment
    var fragmentShaderCode = `
    void main(){
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }`;

    // Membuat fragment atau color
    var fragmentShader = context.createShader(context.FRAGMENT_SHADER);
    context.shaderSource(fragmentShader, fragmentShaderCode);
    context.compileShader(fragmentShader);

    // Membuat package program agar data dapat dieksekusi
    var shaderProgram = context.createProgram();
    context.attachShader(shaderProgram, vertexShader);
    context.attachShader(shaderProgram, fragmentShader);
    context.linkProgram(shaderProgram);
    context.useProgram(shaderProgram);

    // Definisikan background
    context.clearColor(0.0, 0.0, 0.0, 0.0);

    // Clear monitor dan menggambar
    context.clear(context.COLOR_BUFFER_BIT);
    context.drawArrays(context.POINT, 1, 1);
}