<template>
  <canvas ref="can" width="550" height="350"></canvas>
</template>

<script setup>
  let can = useTemplateRef('can');
  onMounted(() => {
    let gl = can.value.getContext('webgl');
    let width = can.value.width,
      height = can.value.height;

    gl.viewport(0, 0, width, height); // 设置视图端口
    gl.clearColor(1, 1, 1, 1);
    gl.enable(gl.DEPTH_TEST); // 启用深度测试
    gl.clear(gl.COLOR_BUFFER_BIT); // 清除色彩缓冲位，会清空画布

    let vertShader = gl.createShader(gl.VERTEX_SHADER); // 创建顶点着色器
    let vertCode = `
        attribute vec3 position;
        varying float pointsize;
        void main() {
          gl_Position = vec4(position,1);
          gl_PointSize = 30.0;
          pointsize = gl_PointSize;
        }`;
    gl.shaderSource(vertShader, vertCode); // 将着色器代码附加到着色器
    gl.compileShader(vertShader); // 编译程序

    /*
  内置变量	       含义	                         值数据类型
  gl_PointSize	 点渲染模式，方形点区域渲染像素大小 	float
  gl_Position	   顶点位置坐标	                     vec4
  gl_FragColor	 片元颜色值	                       vec4
  gl_FragCoord	 片元坐标，单位像素	                vec2
  gl_PointCoord	 点渲染模式对应点像素坐标	           vec2
*/
    // 片段着色器代码，为每个像素附颜色时运行的代码
    let fragShader = gl.createShader(gl.FRAGMENT_SHADER); // 创建片段着色器
    let fragCode = `
      precision mediump float;
      uniform vec3 color;
      varying float pointsize;
      void main() { 
        // distance() 两点之间的欧几里德距离
        float juli = distance(gl_PointCoord,vec2(0.5,0.5));
        if(juli>0.5){
          discard;
        }
        gl_FragColor = vec4(color, 1.0);
      }`;
    gl.shaderSource(fragShader, fragCode); // 将着色器代码附加到着色器
    gl.compileShader(fragShader); // 编译程序

    // 创建一个程序对象
    let shaderProgram = gl.createProgram();
    // 附加着色器
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    // 链接着色器
    gl.linkProgram(shaderProgram);
    // 使用程序
    gl.useProgram(shaderProgram);

    let posData = [0.0, 0.0, 0.0];
    let positionLocation = gl.getAttribLocation(shaderProgram, 'position');
    let colorLocation = gl.getUniformLocation(shaderProgram, 'color');
    // 第一种方式
    gl.vertexAttrib2fv(positionLocation, posData);
    // 第二种方式
    // let position = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, position)
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(posData), gl.STATIC_DRAW)
    // gl.enableVertexAttribArray(positionLocation);
    // gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.POINTS, 0, 1);
    let arr = []; // 点位数据
    can.value.addEventListener('click', e => {
      gl.clear(gl.COLOR_BUFFER_BIT); // 清除色彩缓冲位，会清空画布

      let x = e.offsetX,
        y = e.offsetY;
      let color = [Math.random(), Math.random(), Math.random()];
      posData = [(x / width) * 2 - 1, 1 - (y / height) * 2];
      arr.unshift([posData, color]);
      for (let i = 0; i < arr.length; i++) {
        gl.vertexAttrib2fv(positionLocation, arr[i][0]);
        gl.uniform3fv(colorLocation, arr[i][1]);
        gl.drawArrays(gl.POINTS, 0, 1);
      }
    });
  });
</script>
