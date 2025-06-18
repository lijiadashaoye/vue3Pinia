<template>
  <canvas ref="can" width="550" height="350"></canvas>
</template>

<script setup>
  let can = useTemplateRef('can'),
    donghua;
  onMounted(() => {
    let gl = can.value.getContext('webgl');

    let vertices = [
      -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1,
      -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, -1, -1, -1, -1,
      -1, 1, 1, -1, 1, 1, -1, -1, -1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1,
    ];

    let colors = [
      5, 3, 7, 5, 3, 7, 5, 3, 7, 5, 3, 7, 1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 3, 0, 0, 1, 0, 0, 1, 0,
      0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1,
      0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
    ];

    let indices = [
      0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18,
      16, 18, 19, 20, 21, 22, 20, 22, 23,
    ];

    let vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    let color_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    let index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    let vertCode = `
    attribute vec3 position;
    uniform mat4 Pmatrix;
    uniform mat4 Vmatrix;
    uniform mat4 Mmatrix;
    attribute vec3 color;
    varying vec3 vColor;
    void main(void) { 
      gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.0);
      vColor = color;
    }`;
    let fragCode = `
    precision mediump float;
    varying vec3 vColor;
    void main(void) {
      gl_FragColor = vec4(vColor, 1.0);
    }`;
    let vertShader = gl.createShader(gl.VERTEX_SHADER);
    let fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vertShader, vertCode);
    gl.shaderSource(fragShader, fragCode);
    gl.compileShader(vertShader);
    gl.compileShader(fragShader);

    let shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    let Pmatrix = gl.getUniformLocation(shaderProgram, 'Pmatrix');
    let Vmatrix = gl.getUniformLocation(shaderProgram, 'Vmatrix');
    let Mmatrix = gl.getUniformLocation(shaderProgram, 'Mmatrix');

    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    let position = gl.getAttribLocation(shaderProgram, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
    let color = gl.getAttribLocation(shaderProgram, 'color');
    gl.enableVertexAttribArray(color);
    gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0);

    // 获取投影视图矩阵
    let proj_matrix = get_projection(40, can.value.offsetWidth / can.value.offsetHeight, 1, 100);
    let mov_matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    let view_matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -5, 1];

    let time_old = 0;
    function animate(time) {
      let dt = time - time_old;
      rotateZ(mov_matrix, dt * 0.0005);
      rotateY(mov_matrix, dt * 0.0006);
      rotateX(mov_matrix, dt * 0.0007);
      time_old = time;

      gl.enable(gl.DEPTH_TEST);
      // 是一个指定深度比较函数，它设置像素将被绘制的条件
      // gl.LEQUAL（如果传入值小于或等于深度缓冲区值，则通过）
      gl.depthFunc(gl.LEQUAL);
      gl.clearColor(0.5, 0.5, 0.5, 0.6);
      gl.clearDepth(1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.uniformMatrix4fv(Pmatrix, false, proj_matrix);
      gl.uniformMatrix4fv(Vmatrix, false, view_matrix);
      gl.uniformMatrix4fv(Mmatrix, false, mov_matrix);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
      gl.viewport(0.0, 0.0, can.value.offsetWidth, can.value.offsetHeight);
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

      // gl.UNSIGNED_BYTE,无符号字节，UInt8Array
      // gl.SHORT，短整形，Int16Array
      // gl.UNSIGNED_SHORT,无符号短整形，Uint16Array
      // gl.INT,整形，Int32Array
      // gl.UNSIGNED_INT, 无符号整形，Uint32Array
      // gl.FLOAT,浮点型，Float32Array

      donghua = requestAnimationFrame(animate);
    }
    animate(0.01);
  });
  onBeforeUnmount(() => {
    cancelAnimationFrame(donghua);
  });
  function get_projection(angle, a, zMin, zMax) {
    let ang = Math.tan((angle * 0.4 * Math.PI) / 180);
    return [
      0.5 / ang,
      0,
      0,
      0,
      0,
      (0.5 * a) / ang,
      0,
      0,
      0,
      0,
      -(zMax + zMin) / (zMax - zMin),
      -1,
      0,
      0,
      (-2 * zMax * zMin) / (zMax - zMin),
      0,
    ];
  }
  function rotateZ(m, angle) {
    let c = Math.cos(angle);
    let s = Math.sin(angle);
    let mv0 = m[0],
      mv4 = m[4],
      mv8 = m[8];
    m[0] = c * m[0] - s * m[1];
    m[4] = c * m[4] - s * m[5];
    m[8] = c * m[8] - s * m[9];
    m[1] = c * m[1] + s * mv0;
    m[5] = c * m[5] + s * mv4;
    m[9] = c * m[9] + s * mv8;
  }
  function rotateX(m, angle) {
    let c = Math.cos(angle);
    let s = Math.sin(angle);
    let mv1 = m[1],
      mv5 = m[5],
      mv9 = m[9];
    m[1] = m[1] * c - m[2] * s;
    m[5] = m[5] * c - m[6] * s;
    m[9] = m[9] * c - m[10] * s;
    m[2] = m[2] * c + mv1 * s;
    m[6] = m[6] * c + mv5 * s;
    m[10] = m[10] * c + mv9 * s;
  }
  function rotateY(m, angle) {
    let c = Math.cos(angle);
    let s = Math.sin(angle);
    let mv0 = m[0],
      mv4 = m[4],
      mv8 = m[8];
    m[0] = c * m[0] + s * m[2];
    m[4] = c * m[4] + s * m[6];
    m[8] = c * m[8] + s * m[10];
    m[2] = c * m[2] - s * mv0;
    m[6] = c * m[6] - s * mv4;
    m[10] = c * m[10] - s * mv8;
  }
</script>
