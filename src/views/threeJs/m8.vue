<template>
  <canvas ref="can" width="550" height="350"></canvas>
</template>

<script setup>
  let can = useTemplateRef('can');
  onMounted(() => {
    let gl = can.value.getContext('webgl');

    // 每次绘制新形状时，都需要重复以下这些步骤
    // 获取webgl图形执行
    let vertices = [-0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0];
    let vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    let vertCode =
      'attribute vec4 coordinates;' +
      'uniform mat4 u_xformMatrix;' +
      'void main(void) {' +
      '  gl_Position = u_xformMatrix * coordinates;' +
      '}';
    let vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertCode);
    gl.compileShader(vertShader);

    let fragCode = 'void main(void) {' + 'gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);' + '}';
    let fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, fragCode);
    gl.compileShader(fragShader);

    let shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    let coordinatesVar = gl.getAttribLocation(shaderProgram, 'coordinates');
    gl.enableVertexAttribArray(coordinatesVar);
    gl.vertexAttribPointer(coordinatesVar, 3, gl.FLOAT, false, 0, 0);

    let Sx = 1.0,
      Sy = 1.5,
      Sz = 1.0;
    let xformMatrix = new Float32Array([
      Sx,
      0.0,
      0.0,
      0.0,
      0.0,
      Sy,
      0.0,
      0.0,
      0.0,
      0.0,
      Sz,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ]);
    // 获取顶点着色器程序中的 uniform 变量
    let u_xformMatrix = gl.getUniformLocation(shaderProgram, 'u_xformMatrix');
    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);

    gl.clearColor(0.5, 0.5, 0.5, 0.9);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, can.value.offsetWidth, can.value.offsetHeight); // 设置视图端口
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  });
</script>
