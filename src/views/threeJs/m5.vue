<template>
  <canvas ref="can" width="550" height="350"></canvas>
</template>

<script setup>
  let can = useTemplateRef('can');
  onMounted(() => {
    let gl = can.value.getContext('webgl');

    let vertices = [-0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.5, 0.5, 0.0],
      indices = [3, 2, 1, 3, 1, 0];

    let vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    let Index_Buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    let vertCode =
      'attribute vec3 coordinates;' +
      'void main(void) {' +
      '  gl_Position = vec4(coordinates, 1.0);' +
      '}';
    let vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertCode);
    gl.compileShader(vertShader);

    let fragCode = 'void main(void) {' + ' gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);' + '}';
    let fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, fragCode);
    gl.compileShader(fragShader);

    let shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    let coord = gl.getAttribLocation(shaderProgram, 'coordinates');
    gl.enableVertexAttribArray(coord);
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

    gl.viewport(0, 0, can.value.offsetWidth, can.value.offsetHeight); // 设置视图端口
    gl.clearColor(0.5, 0.5, 0.5, 0.9);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

    // gl.UNSIGNED_BYTE,无符号字节，UInt8Array
    // gl.SHORT，短整形，Int16Array
    // gl.UNSIGNED_SHORT,无符号短整形，Uint16Array
    // gl.INT,整形，Int32Array
    // gl.UNSIGNED_INT, 无符号整形，Uint32Array
    // gl.FLOAT,浮点型，Float32Array
  });
</script>
