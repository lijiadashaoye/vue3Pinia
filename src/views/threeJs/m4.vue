<template>
  <div style="display: flex; align-items: flex-start">
    <canvas ref="can" width="550" height="350"></canvas>

    <ul class="rightAction">
      <li style="margin: 5px" v-for="(t, i) in data.list" :key="i">
        <el-button link size="large" :type="subSelect === t ? 'primary' : ''" @click="showType(t)">
          {{ t }}
        </el-button>
      </li>
    </ul>
  </div>
</template>

<script setup>
  let { data } = defineProps(['data']);
  let can = useTemplateRef('can'),
    subSelect = ref('');
  let gl = null,
    pointArray = [],
    program = null;
  onMounted(() => {
    gl = can.value.getContext('webgl');
    let verCode = `
        attribute vec2 point;
        void main(){
            gl_Position=vec4(point,0.0,1.0);
        }`,
      fragCode = `void main(){gl_FragColor=vec4(0.1,0.2,0.3,1);}`,
      verShader = gl.createShader(gl.VERTEX_SHADER),
      fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(verShader, verCode);
    gl.shaderSource(fragShader, fragCode);
    gl.compileShader(verShader);
    gl.compileShader(fragShader);

    program = gl.createProgram();
    gl.attachShader(program, verShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    let pointBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer);
    showType(data.list[0]);
  });

  function showType(type) {
    subSelect.value = type;
    gl.viewport(0, 0, can.value.width, can.value.height);
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    if (
      subSelect.value === 'LINES' ||
      subSelect.value === 'LINE_STRIP' ||
      subSelect.value === 'LINE_LOOP' ||
      subSelect.value === 'TRIANGLE_STRIP'
    ) {
      pointArray = [-0.4, 0.4, 0.4, 0.4, -0.4, -0.4, 0.5, -0.5];
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointArray), gl.STATIC_DRAW);
      let point = gl.getAttribLocation(program, 'point');
      gl.vertexAttribPointer(point, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(point);

      switch (subSelect.value) {
        case 'LINES':
          gl.drawArrays(gl.LINES, 0, pointArray.length / 2);
          break;
        case 'LINE_STRIP':
          gl.drawArrays(gl.LINE_STRIP, 0, pointArray.length / 2);
          break;
        case 'LINE_LOOP':
          gl.drawArrays(gl.LINE_LOOP, 0, pointArray.length / 2);
          break;
        case 'TRIANGLE_STRIP':
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, pointArray.length / 2);
          break;
      }
    } else if (subSelect.value === 'TRIANGLES') {
      pointArray = [-0.4, 0.4, 0.4, 0.4, -0.4, -0.4, -0.4, -0.4, 0.4, 0.4, 0.4, -0.4];
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointArray), gl.STATIC_DRAW);
      let point = gl.getAttribLocation(program, 'point');
      gl.vertexAttribPointer(point, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(point);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, pointArray.length / 2);
    } else if (subSelect.value === 'TRIANGLE_FAN') {
      pointArray = [
        0.6, -0.8, -0.6, -0.5, -0.8, -0.1, -0.7, 0.1, -0.6, 0.2, -0.4, 0.3, -0.5, 0.8, -0.1, 0.4,
      ];
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointArray), gl.STATIC_DRAW);
      let point = gl.getAttribLocation(program, 'point');
      gl.vertexAttribPointer(point, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(point);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, pointArray.length / 2);
    }
  }
</script>
