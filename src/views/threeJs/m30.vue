<template>
  <canvas ref="can" width="550" height="350"></canvas>
</template>

<script setup>
  let can = useTemplateRef('can'),
    donghua;
  onMounted(() => {
    let gl = can.value.getContext('webgl');

    let width = can.value.offsetWidth,
      height = can.value.offsetHeight;
    gl.viewport(0, 0, width, height); // 设置视图端口
    gl.getExtension('OES_texture_float'); // 使用浮点型纹理

    let vertexCode1 = `
          attribute vec4 a_position;
          attribute vec4 a_weight;
          attribute vec4 a_boneNdx;
          
          uniform mat4 projection;
          uniform mat4 view;
          uniform sampler2D boneMatrixTexture;
          uniform float numBones;
          
          // 这些偏移假设纹理每行4像素
          #define ROW0_U ((0.5 + 0.0) / 4.)
          #define ROW1_U ((0.5 + 1.0) / 4.)
          #define ROW2_U ((0.5 + 2.0) / 4.)
          #define ROW3_U ((0.5 + 3.0) / 4.)
          
          mat4 getBoneMatrix(float boneNdx) {
            // 选取某个特定像素，那么公式是：(n + .5) / width，n表示第几个像素，从0开始
            float v = (boneNdx + 0.5) / numBones;
            return mat4(
              texture2D(boneMatrixTexture, vec2(ROW0_U, v)),
              texture2D(boneMatrixTexture, vec2(ROW1_U, v)),
              texture2D(boneMatrixTexture, vec2(ROW2_U, v)),
              texture2D(boneMatrixTexture, vec2(ROW3_U, v)));
          }
          
          void main() {
            gl_Position = projection * view *
                          (getBoneMatrix(a_boneNdx[0]) * a_position * a_weight[0] +
                           getBoneMatrix(a_boneNdx[1]) * a_position * a_weight[1] +
                           getBoneMatrix(a_boneNdx[2]) * a_position * a_weight[2] +
                           getBoneMatrix(a_boneNdx[3]) * a_position * a_weight[3]);
          }`,
      fragCode1 = `
          precision mediump float;
          uniform vec4 color;
          void main () {
            gl_FragColor = color;
          }`,
      vertexCode2 = `
          attribute vec4 a_position;

          uniform mat4 projection;
          uniform mat4 view;
          uniform mat4 model;          

          void main() {
            gl_Position = projection * view * model * a_position;
          }`;
    let programInfo = webglUtils.createProgramInfo(gl, [vertexCode1, fragCode1]);
    let arrays = {
      // 顶点数据
      position: {
        numComponents: 2,
        data: [0, 1, 0, -1, 2, 1, 2, -1, 4, 1, 4, -1, 6, 1, 6, -1, 8, 1, 8, -1],
      },
      boneNdx: {
        numComponents: 4,
        data: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 2, 0, 0, 1, 2,
          0, 0, 2, 0, 0, 0, 2, 0, 0, 0,
        ],
      },
      // 权重数据
      weight: {
        numComponents: 4,
        data: [
          1, 0, 0, 0, 1, 0, 0, 0, 0.5, 0.5, 0, 0, 0.5, 0.5, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0.5, 0.5,
          0, 0, 0.5, 0.5, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
        ],
      },
      // 索引数据
      indices: {
        numComponents: 2,
        data: [0, 1, 0, 2, 1, 3, 2, 3, 2, 4, 3, 5, 4, 5, 4, 6, 5, 7, 6, 7, 6, 8, 7, 9, 8, 9],
      },
    };
    let bufferInfo = webglUtils.createBufferInfoFromArrays(gl, arrays);
    let numBones = 4;
    let boneArray = new Float32Array(numBones * 16);

    let boneMatrixTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, boneMatrixTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    let uniforms = {
      projection: primitives.M4.orthographic(-20, 20, -10, 10, -1, 1),
      view: primitives.M4.translation(-6, 0, 0),
      boneMatrixTexture,
      numBones,
      color: [1, 0, 0, 1],
    };
    let boneMatrices = []; // the uniform data
    let bones = []; // the value before multiplying by inverse bind matrix
    let bindPose = []; // the bind matrix
    for (let i = 0; i < numBones; ++i) {
      boneMatrices.push(new Float32Array(boneArray.buffer, i * 4 * 16, 16));
      bindPose.push(primitives.M4.identity());
      bones.push(primitives.M4.identity());
    }

    function computeBoneMatrices(bones, angle) {
      let m = primitives.M4.identity();
      primitives.M4.zRotate(m, angle, bones[0]);
      primitives.M4.translate(bones[0], 4, 0, 0, m);
      primitives.M4.zRotate(m, angle, bones[1]);
      primitives.M4.translate(bones[1], 4, 0, 0, m);
      primitives.M4.zRotate(m, angle, bones[2]);
    }

    computeBoneMatrices(bindPose, 0);

    let bindPoseInv = bindPose.map(function (m) {
      return primitives.M4.inverse(m);
    });
    let time = 0;
    function render(t) {
      // requestAnimationFrame 会自动传入时间（毫秒）作为第一个参数
      // console.log(t)
      gl.viewport(0, 0, width, height);
      const aspect = width / height;
      primitives.M4.orthographic(-aspect * 10, aspect * 10, -10, 10, -1, 1, uniforms.projection);

      time += 0.01;
      computeBoneMatrices(bones, Math.sin(time) * 0.8);

      bones.forEach(function (bone, ndx) {
        primitives.M4.multiply(bone, bindPoseInv[ndx], boneMatrices[ndx]);
      });

      gl.useProgram(programInfo.program);
      webglUtils.setBuffersAndAttributes(gl, programInfo, bufferInfo);

      gl.bindTexture(gl.TEXTURE_2D, boneMatrixTexture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0, // level
        gl.RGBA, // internal format
        4, // width 4 pixels, each pixel has RGBA so 4 pixels is 16 values
        numBones, // one row per bone
        0, // border
        gl.RGBA, // format
        gl.FLOAT, // type
        boneArray,
      );

      webglUtils.setUniforms(programInfo, uniforms);
      webglUtils.drawBufferInfo(gl, bufferInfo, gl.LINES);
      drawAxis(uniforms.projection, uniforms.view, bones);
      donghua = requestAnimationFrame(render);
    }

    let axisProgramInfo;
    let axisBufferInfo;
    function drawAxis(projection, view, bones) {
      if (!axisProgramInfo) {
        axisProgramInfo = webglUtils.createProgramInfo(gl, [vertexCode2, fragCode1]);
        axisBufferInfo = webglUtils.createBufferInfoFromArrays(gl, {
          position: {
            numComponents: 2,
            data: [0, 0, 1, 0],
          },
        });
      }

      let uniforms = {
        projection: projection,
        view: view,
      };

      gl.useProgram(axisProgramInfo.program);
      webglUtils.setBuffersAndAttributes(gl, axisProgramInfo, axisBufferInfo);

      for (let i = 0; i < 3; ++i) {
        drawLine(bones[i], 0, [0, 1, 0, 1]);
        drawLine(bones[i], Math.PI * 0.5, [0, 0, 1, 1]);
      }

      function drawLine(mat, angle, color) {
        uniforms.model = primitives.M4.zRotate(mat, angle);
        uniforms.color = color;
        webglUtils.setUniforms(axisProgramInfo, uniforms);
        webglUtils.drawBufferInfo(gl, axisBufferInfo, gl.LINES);
      }
    }
    render();
  });
  onBeforeUnmount(() => {
    cancelAnimationFrame(donghua);
  });
</script>
