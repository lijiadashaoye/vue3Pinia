<template>
  <canvas ref="can" width="550" height="350"></canvas>
</template>

<script setup>
  let can = useTemplateRef('can'),
    donghua;
  onMounted(() => {
    let gl = can.value.getContext('webgl');

    var vertices = [-1, -1, -1, 1, -1, -1, 1, 1, -1];
    var colors = [1, 1, 1, 1, 1, 1, 1, 1, 1];
    var indices = [0, 1, 2];

    var vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var color_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    var index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    var vertCode = `
          attribute vec3 position;
          uniform mat4 Pmatrix;
          uniform mat4 Vmatrix;
          uniform mat4 Mmatrix;
          attribute vec3 color;
          varying vec3 vColor;
          void main(void) {
           gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1);
           vColor = color;
          }`;
    // 片段着色器没有默认精度，所以我们需要设置一个精度
    // mediump 代表“medium precision”（中等精度）
    var fragCode = `
          precision mediump float;
          varying vec3 vColor;
          void main(void) {
            gl_FragColor = vec4(vColor, 1.);
          }`;
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vertShader, vertCode);
    gl.shaderSource(fragShader, fragCode);
    gl.compileShader(vertShader);
    gl.compileShader(fragShader);

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    var position = gl.getAttribLocation(shaderProgram, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
    var color = gl.getAttribLocation(shaderProgram, 'color');
    gl.enableVertexAttribArray(color);
    gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0);

    var Pmatrix = gl.getUniformLocation(shaderProgram, 'Pmatrix');
    var Vmatrix = gl.getUniformLocation(shaderProgram, 'Vmatrix');
    var Mmatrix = gl.getUniformLocation(shaderProgram, 'Mmatrix');
    var proj_matrix = get_projection(40, can.value.offsetWidth / can.value.offsetHeight, 1, 100);
    var mov_matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    var view_matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -6, 1];

    var time_old = 0;
    function animate(time) {
      var dt = time - time_old;
      rotateZ(mov_matrix, dt * 0.002);
      time_old = time;

      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
      gl.clearColor(0.5, 0.5, 0.5, 0.9);
      gl.clearDepth(1.0);
      gl.viewport(0.0, 0.0, can.value.offsetWidth, can.value.offsetHeight);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.uniformMatrix4fv(Pmatrix, false, proj_matrix);
      gl.uniformMatrix4fv(Vmatrix, false, view_matrix);
      gl.uniformMatrix4fv(Mmatrix, false, mov_matrix);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

      // gl.UNSIGNED_BYTE,无符号字节，UInt8Array
      // gl.SHORT，短整形，Int16Array
      // gl.UNSIGNED_SHORT,无符号短整形，Uint16Array
      // gl.INT,整形，Int32Array
      // gl.UNSIGNED_INT, 无符号整形，Uint32Array
      // gl.FLOAT,浮点型，Float32Array
      donghua = requestAnimationFrame(animate);
    }
    animate(0);
  });
  onBeforeUnmount(() => {
    cancelAnimationFrame(donghua);
  });
  function get_projection(angle, a, zMin, zMax) {
    var ang = Math.tan((angle * 0.3 * Math.PI) / 180);
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
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    var mv0 = m[0],
      mv4 = m[4],
      mv8 = m[8];
    m[0] = c * m[0] - s * m[1];
    m[4] = c * m[4] - s * m[5];
    m[8] = c * m[8] - s * m[9];
    m[1] = c * m[1] + s * mv0;
    m[5] = c * m[5] + s * mv4;
    m[9] = c * m[9] + s * mv8;
  }
</script>
