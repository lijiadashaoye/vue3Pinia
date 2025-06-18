<template>
  <canvas ref="can" width="550" height="350"></canvas>
</template>

<script setup>
  import img1 from '@/assets/imgs/neg-x.jpg';
  import img2 from '@/assets/imgs/neg-y.jpg';
  import img3 from '@/assets/imgs/neg-z.jpg';
  import img4 from '@/assets/imgs/pos-x.jpg';
  import img5 from '@/assets/imgs/pos-y.jpg';
  import img6 from '@/assets/imgs/pos-z1.jpg';

  let can = useTemplateRef('can'),
    donghua;
  onMounted(() => {
    let gl = can.value.getContext('webgl');

    let width = can.value.clientWidth,
      height = can.value.clientHeight;
    gl.viewport(0, 0, width, height);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

    let vertexCode1 = `
           attribute vec4 a_position;
           attribute vec3 a_normal;
           
           uniform mat4 u_projection;
           uniform mat4 u_view;
           uniform mat4 u_world;
           
           varying vec3 v_worldPosition;
           varying vec3 v_worldNormal;
           
           void main() {
             gl_Position = u_projection * u_view * u_world * a_position;
             v_worldPosition = (u_world * a_position).xyz;
             v_worldNormal = mat3(u_world) * a_normal;
           }`,
      fragCode1 = `
            precision highp float;
            varying vec3 v_worldPosition;
            varying vec3 v_worldNormal;
            
            uniform samplerCube u_texture;
            uniform vec3 u_worldCameraPosition;
            
            void main() {
              vec3 worldNormal = normalize(v_worldNormal);
              vec3 eyeToSurfaceDir = normalize(v_worldPosition - u_worldCameraPosition);
              vec3 direction = reflect(eyeToSurfaceDir,worldNormal);
            
              gl_FragColor = textureCube(u_texture, direction);
            }`,
      vertexCode2 = `
            attribute vec4 a_position;
            varying vec4 v_position;
            void main() {
              v_position = a_position;
              gl_Position = vec4(a_position.xy, 1, 1);
            }`,
      fragCode2 = `
            precision mediump float;

            uniform samplerCube u_skybox;
            uniform mat4 u_viewDirectionProjectionInverse;
            
            varying vec4 v_position;
            void main() {
              vec4 t = u_viewDirectionProjectionInverse * v_position;
              gl_FragColor = textureCube(u_skybox, normalize(t.xyz / t.w));
            }`;
    const envmapProgramInfo = webglUtils.createProgramInfo(gl, [vertexCode1, fragCode1]);
    const skyboxProgramInfo = webglUtils.createProgramInfo(gl, [vertexCode2, fragCode2]);
    const cubeBufferInfo = primitives.createCubeBufferInfo(gl, 1);
    const quadBufferInfo = primitives.createXYQuadBufferInfo(gl);
    // 立方体纹理
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
    const faceInfos = [
      {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
        url: img4,
      },
      {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
        url: img1,
      },
      {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
        url: img5,
      },
      {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
        url: img2,
      },
      {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
        url: img6,
      },
      {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
        url: img3,
      },
    ];
    faceInfos.forEach(faceInfo => {
      const { target, url } = faceInfo;
      const level = 0;
      const internalFormat = gl.RGBA;
      const width = 512;
      const height = 512;
      const format = gl.RGBA;
      const type = gl.UNSIGNED_BYTE;
      gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);
      const image = new Image();
      image.src = url;
      image.addEventListener('load', function () {
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
        gl.texImage2D(target, level, internalFormat, format, type, image);
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
      });
    });

    // 设置相机旋转角度
    var fieldOfViewRadians = (60 * Math.PI) / 180;
    var time = 0;
    function drawScene() {
      time += 0.02;
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      // 设置投影视图
      var aspect = width / height;
      var projectionMatrix = primitives.M4.perspective(fieldOfViewRadians, aspect, 1, 2000);
      // 设置相机视图，绕Y轴旋转
      var cameraPosition = [
        Math.cos(time * 0.1) * 2,
        Math.cos(time * 0.1) * 2,
        Math.sin(time * 0.1) * 2,
      ];
      var target = [0, 0, 0];
      var up = [0, 1, 0];
      var cameraMatrix = primitives.M4.lookAt(cameraPosition, target, up);
      // 相机视图逆矩阵
      var viewMatrix = primitives.M4.inverse(cameraMatrix);

      // 设置立方体绕Y轴的旋转
      var worldMatrix = primitives.M4.yRotation(time * 0.11);
      // 如果传入值小于深度缓冲值（在背景前），则通过
      gl.depthFunc(gl.LESS);
      // 画立方体
      gl.useProgram(envmapProgramInfo.program);
      webglUtils.setBuffersAndAttributes(gl, envmapProgramInfo, cubeBufferInfo);
      webglUtils.setUniforms(envmapProgramInfo, {
        u_world: worldMatrix,
        u_view: viewMatrix,
        u_projection: projectionMatrix,
        u_texture: texture,
        u_worldCameraPosition: cameraPosition,
      });
      webglUtils.drawBufferInfo(gl, cubeBufferInfo);

      var viewDirectionMatrix = primitives.M4.copy(viewMatrix);
      // 只关心方向所以清除移动的部分
      viewDirectionMatrix[12] = 0;
      viewDirectionMatrix[13] = 0;
      viewDirectionMatrix[14] = 0;
      var viewDirectionProjectionMatrix = primitives.M4.multiply(
        projectionMatrix,
        viewDirectionMatrix,
      );
      var viewDirectionProjectionInverseMatrix = primitives.M4.inverse(
        viewDirectionProjectionMatrix,
      );
      // 如果传入值小于或等于深度缓冲区值（在立方体后），则通过
      gl.depthFunc(gl.LEQUAL);
      // 画背景图
      gl.useProgram(skyboxProgramInfo.program);
      webglUtils.setBuffersAndAttributes(gl, skyboxProgramInfo, quadBufferInfo);
      webglUtils.setUniforms(skyboxProgramInfo, {
        u_viewDirectionProjectionInverse: viewDirectionProjectionInverseMatrix,
        u_skybox: texture,
      });
      webglUtils.drawBufferInfo(gl, quadBufferInfo);

      donghua = requestAnimationFrame(drawScene);
    }
    drawScene();
  });
  onBeforeUnmount(() => {
    cancelAnimationFrame(donghua);
  });
</script>
