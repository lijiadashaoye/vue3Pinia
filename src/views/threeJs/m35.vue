<template>
  <canvas ref="can" width="550" height="350"></canvas>
</template>

<script setup>
  let can = useTemplateRef('can');
  onMounted(() => {
    let gl = can.value.getContext('webgl');

    let width = can.offsetWidth,
      height = can.offsetHeight;
    gl.viewport(0, 0, width, height); // 设置视图端口
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    let vertexCode = `
            attribute vec4 a_position;
            attribute vec4 a_color;
            
            uniform mat4 u_matrix;
            
            varying vec4 v_color;
            
            void main() {
              gl_Position = u_matrix * a_position;
            
              v_color = a_color;
            }`,
      fragCode = `
            precision mediump float;
            varying vec4 v_color;
            
            uniform vec4 u_colorMult;
            uniform vec4 u_colorOffset;
            
            void main() {
               gl_FragColor = v_color * u_colorMult + u_colorOffset;
            }`;

    class TRS {
      constructor() {
        this.translation = [0, 0, 0];
        this.rotation = [0, 0, 0];
        this.scale = [1, 1, 1];
      }
    }

    TRS.prototype.getMatrix = function (dst) {
      dst = dst || new Float32Array(16);
      var t = this.translation;
      var r = this.rotation;
      var s = this.scale;
      primitives.M4.translation(t[0], t[1], t[2], dst);
      primitives.M4.xRotate(dst, r[0], dst);
      primitives.M4.yRotate(dst, r[1], dst);
      primitives.M4.zRotate(dst, r[2], dst);
      primitives.M4.scale(dst, s[0], s[1], s[2], dst);
      return dst;
    };
    class Node {
      constructor(source) {
        this.children = [];
        this.localMatrix = primitives.M4.identity();
        this.worldMatrix = primitives.M4.identity();
        this.source = source;
      }
    }

    Node.prototype.setParent = function (parent) {
      if (this.parent) {
        var ndx = this.parent.children.indexOf(this);
        if (ndx >= 0) {
          this.parent.children.splice(ndx, 1);
        }
      }
      if (parent) {
        parent.children.push(this);
      }
      this.parent = parent;
    };

    Node.prototype.updateWorldMatrix = function (parentWorldMatrix) {
      var source = this.source;
      if (source) {
        source.getMatrix(this.localMatrix);
      }
      if (parentWorldMatrix) {
        primitives.M4.multiply(parentWorldMatrix, this.localMatrix, this.worldMatrix);
      } else {
        primitives.M4.copy(this.localMatrix, this.worldMatrix);
      }
      var worldMatrix = this.worldMatrix;
      this.children.forEach(function (child) {
        child.updateWorldMatrix(worldMatrix);
      });
    };

    const cubeBufferInfo = primitives.createCubeWithVertexColorsBufferInfo(gl, 1);
    var programInfo = webglUtils.createProgramInfo(gl, [vertexCode, fragCode]);

    function degToRad(d) {
      return (d * Math.PI) / 180;
    }

    var fieldOfViewRadians = degToRad(60);
    var objectsToDraw = [];
    var objects = [];
    var nodeInfosByName = {};

    var blockGuyNodeDescriptions = {
      name: 'point between feet',
      draw: false,
      children: [
        {
          name: 'waist',
          translation: [0, 2, 0],
          children: [
            {
              name: 'torso',
              translation: [0, 1.5, 0],
              children: [
                {
                  name: 'neck',
                  translation: [0, 1.1, 0],
                  children: [
                    {
                      name: 'head',
                      translation: [0, 1.1, 0],
                    },
                  ],
                },
                {
                  name: 'left-arm',
                  translation: [-1, 0, 0],
                  children: [
                    {
                      name: 'left-forearm',
                      translation: [-1, 0, 0],
                      children: [
                        {
                          name: 'left-hand',
                          translation: [-1, 0, 0],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'right-arm',
                  translation: [1, 0, 0],
                  children: [
                    {
                      name: 'right-forearm',
                      translation: [1, 0, 0],
                      children: [
                        {
                          name: 'right-hand',
                          translation: [1, 0, 0],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: 'left-leg',
              translation: [-1, -1, 0],
              children: [
                {
                  name: 'left-calf',
                  translation: [0, -1, 0],
                  children: [
                    {
                      name: 'left-foot',
                      translation: [0, -1, 0],
                    },
                  ],
                },
              ],
            },
            {
              name: 'right-leg',
              translation: [1, -1, 0],
              children: [
                {
                  name: 'right-calf',
                  translation: [0, -1, 0],
                  children: [
                    {
                      name: 'right-foot',
                      translation: [0, -1, 0],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    function makeNode(nodeDescription) {
      var trs = new TRS();
      var node = new Node(trs);
      nodeInfosByName[nodeDescription.name] = {
        trs: trs,
        node: node,
      };
      trs.translation = nodeDescription.translation || trs.translation;
      if (nodeDescription.draw !== false) {
        node.drawInfo = {
          uniforms: {
            u_colorOffset: [0, 0, 0.6, 0],
            u_colorMult: [0.4, 0.4, 0.4, 1],
          },
          programInfo: programInfo,
          bufferInfo: cubeBufferInfo,
        };
        objectsToDraw.push(node.drawInfo);
        objects.push(node);
      }
      makeNodes(nodeDescription.children).forEach(function (child) {
        child.setParent(node);
      });
      return node;
    }

    function makeNodes(nodeDescriptions) {
      return nodeDescriptions ? nodeDescriptions.map(makeNode) : [];
    }

    var scene = makeNode(blockGuyNodeDescriptions);

    function drawScene(time) {
      time *= 0.001;

      var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
      var projectionMatrix = primitives.M4.perspective(fieldOfViewRadians, aspect, 1, 2000);
      var cameraPosition = [4, 3.5, 10];
      var target = [0, 3.5, 0];
      var up = [0, 1, 0];
      var cameraMatrix = primitives.M4.lookAt(cameraPosition, target, up);
      var viewMatrix = primitives.M4.inverse(cameraMatrix);

      var viewProjectionMatrix = primitives.M4.multiply(projectionMatrix, viewMatrix);
      scene.updateWorldMatrix();

      var adjust;
      var speed = 3;
      var c = time * speed;
      adjust = Math.abs(Math.sin(c));
      nodeInfosByName['point between feet'].trs.translation[1] = adjust;
      adjust = Math.sin(c);
      nodeInfosByName['left-leg'].trs.rotation[0] = adjust;
      nodeInfosByName['right-leg'].trs.rotation[0] = -adjust;
      adjust = Math.sin(c + 0.1) * 0.4;
      nodeInfosByName['left-calf'].trs.rotation[0] = -adjust;
      nodeInfosByName['right-calf'].trs.rotation[0] = adjust;
      adjust = Math.sin(c + 0.1) * 0.4;
      nodeInfosByName['left-foot'].trs.rotation[0] = -adjust;
      nodeInfosByName['right-foot'].trs.rotation[0] = adjust;
      adjust = Math.sin(c) * 0.4;
      nodeInfosByName['left-arm'].trs.rotation[2] = adjust;
      nodeInfosByName['right-arm'].trs.rotation[2] = adjust;
      adjust = Math.sin(c + 0.1) * 0.4;
      nodeInfosByName['left-forearm'].trs.rotation[2] = adjust;
      nodeInfosByName['right-forearm'].trs.rotation[2] = adjust;
      adjust = Math.sin(c - 0.1) * 0.4;
      nodeInfosByName['left-hand'].trs.rotation[2] = adjust;
      nodeInfosByName['right-hand'].trs.rotation[2] = adjust;
      adjust = Math.sin(c) * 0.4;
      nodeInfosByName['waist'].trs.rotation[1] = adjust;
      adjust = Math.sin(c) * 0.4;
      nodeInfosByName['torso'].trs.rotation[1] = adjust;
      adjust = Math.sin(c + 0.25) * 0.4;
      nodeInfosByName['neck'].trs.rotation[1] = adjust;
      adjust = Math.sin(c + 0.5) * 0.4;
      nodeInfosByName['head'].trs.rotation[1] = adjust;
      adjust = Math.cos(c * 2) * 0.4;
      nodeInfosByName['head'].trs.rotation[0] = adjust;

      objects.forEach(function (object) {
        object.drawInfo.uniforms.u_matrix = primitives.M4.multiply(
          viewProjectionMatrix,
          object.worldMatrix,
        );
      });

      var lastUsedProgramInfo = null;
      var lastUsedBufferInfo = null;

      objectsToDraw.forEach(function (object) {
        var programInfo = object.programInfo;
        var bufferInfo = object.bufferInfo;
        var bindBuffers = false;

        if (programInfo !== lastUsedProgramInfo) {
          lastUsedProgramInfo = programInfo;
          gl.useProgram(programInfo.program);
          bindBuffers = true;
        }
        if (bindBuffers || bufferInfo !== lastUsedBufferInfo) {
          lastUsedBufferInfo = bufferInfo;
          webglUtils.setBuffersAndAttributes(gl, programInfo, bufferInfo);
        }
        webglUtils.setUniforms(programInfo, object.uniforms);
        gl.drawArrays(gl.TRIANGLES, 0, bufferInfo.numElements);
      });
      requestAnimationFrame(drawScene);
    }
    requestAnimationFrame(drawScene);
  });
</script>
