<template>
  <div style="display: flex; align-items: flex-start">
    <canvas ref="can" width="550" height="350"></canvas>

    <ul class="rightAction">
      <li v-for="(t, i) in data.list" :key="i">
        <span class="one">{{ t.label }}</span>
        <el-slider
          :show-tooltip="false"
          :step="t.step"
          @input="rangeFn"
          v-model="obj[t.prop]"
          :min="t.min"
          :max="t.max"
        />
        <span class="two">{{ obj[t.prop] }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
  let { data } = defineProps(['data']);
  let gl,
    width,
    height,
    program,
    pointArray = [],
    can = useTemplateRef('can'),
    obj = reactive({});
  onMounted(() => {
    gl = can.value.getContext('webgl');
    width = can.value.offsetWidth;
    height = can.value.offsetHeight;

    gl.viewport(0, 0, width, height); // 设置视图端口
    gl.clearColor(1, 1, 1, 1);

    let vertexCode = `
      attribute vec2 a_position;
      uniform mat3 u_matrix;
      void main() {
          gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
      }`;
    let fragCode = `
      precision mediump float;
      uniform vec4 u_color;
      void main() {
         gl_FragColor = u_color;
      }`;
    let vertexShader = gl.createShader(gl.VERTEX_SHADER);
    let fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vertexShader, vertexCode);
    gl.shaderSource(fragShader, fragCode);
    gl.compileShader(vertexShader);
    gl.compileShader(fragShader);

    program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    let positionLocation = gl.getAttribLocation(program, 'a_position');
    // 设置点着色器
    let positionBuffer = gl.createBuffer();
    pointArray = [
      // 左竖
      0, 0, 20, 0, 0, 100, 0, 100, 20, 0, 20, 100,
      // 上横
      20, 0, 80, 0, 20, 20, 20, 20, 80, 0, 80, 20,
      // 中横
      20, 40, 65, 40, 20, 60, 20, 60, 65, 40, 65, 60,
    ].map(t => t * 0.5);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointArray), gl.STATIC_DRAW);

    let colorLocation = gl.getUniformLocation(program, 'u_color');
    let color = [Math.random(), Math.random(), Math.random(), 1];
    gl.uniform4fv(colorLocation, color);

    data.list.forEach(now => {
      obj[now.prop] = now[now.prop];
    });
    watch(
      () => obj,
      () => {
        setPosition();
      },
      { deep: true },
    );
    setPosition();
  });

  function setPosition() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    let matrixLocation = gl.getUniformLocation(program, 'u_matrix');
    let translationArr = [obj.x, obj.y];
    let angleInRadians = (obj.rotate * Math.PI) / 180;
    let scale = [obj.scaleX, obj.scaleY];
    let projectionMatrix = projection(can.value.clientWidth, can.value.clientHeight); // 将坐标原点重设
    let translationMatrix = translation(translationArr[0], translationArr[1]); // 计算移动
    let rotationMatrix = rotation(angleInRadians); // 计算旋转
    let scaleMatrix = scaling(scale[0], scale[1]); // 计算缩放
    let moveOriginMatrix = translation(-12.5, -25); // 初始移动
    let matrix = multiply(projectionMatrix, translationMatrix); // 计算初始移动
    matrix = multiply(matrix, rotationMatrix);
    matrix = multiply(matrix, scaleMatrix);
    matrix = multiply(matrix, moveOriginMatrix);
    // 设置矩阵
    // 对象包含了要修改的 uniform attribute 位置
    // 指定是否转置矩阵。必须为 false
    // 矩阵数据
    gl.uniformMatrix3fv(matrixLocation, false, matrix);
    gl.drawArrays(gl.TRIANGLES, 0, pointArray.length / 2);
  }

  function translation(tx, ty) {
    return [1, 0, 0, 0, 1, 0, tx, ty, 1];
  }
  function rotation(angleInRadians) {
    let c = Math.cos(angleInRadians);
    let s = Math.sin(angleInRadians);
    return [c, -s, 0, s, c, 0, 0, 0, 1];
  }
  function scaling(sx, sy) {
    return [sx, 0, 0, 0, sy, 0, 0, 0, 1];
  }
  function multiply(a, b) {
    let a00 = a[0];
    let a01 = a[1];
    let a02 = a[2];
    let a10 = a[3];
    let a11 = a[4];
    let a12 = a[5];
    let a20 = a[6];
    let a21 = a[7];
    let a22 = a[8];
    let b00 = b[0];
    let b01 = b[1];
    let b02 = b[2];
    let b10 = b[3];
    let b11 = b[4];
    let b12 = b[5];
    let b20 = b[6];
    let b21 = b[7];
    let b22 = b[8];
    return [
      b00 * a00 + b01 * a10 + b02 * a20,
      b00 * a01 + b01 * a11 + b02 * a21,
      b00 * a02 + b01 * a12 + b02 * a22,
      b10 * a00 + b11 * a10 + b12 * a20,
      b10 * a01 + b11 * a11 + b12 * a21,
      b10 * a02 + b11 * a12 + b12 * a22,
      b20 * a00 + b21 * a10 + b22 * a20,
      b20 * a01 + b21 * a11 + b22 * a21,
      b20 * a02 + b21 * a12 + b22 * a22,
    ];
  }
  function projection(width, height) {
    return [2 / width, 0, 0, 0, -2 / height, 0, -1, 1, 1];
  }
</script>
