<template>
  <div>
    <ul class="topNav">
      <li
        v-for="file in glList"
        :key="file.file"
        @click="showIt(file)"
        :style="{ color: showObj.file === file.file ? 'red' : '' }"
      >
        {{ file.title }}
        <sub>{{ file.file }}</sub>
      </li>
    </ul>
    <component :is="useCom" :data="showObj"></component>
  </div>
</template>
<script setup>
  import webglUtils from './threeJs/file/webgl-utils';
  import primitives from './threeJs/file/primitives';

  let showObj = shallowRef('');
  let glList = [
    { title: '两点画平面三角形', file: 'm1' },
    { title: '三点画三维空间里的三角形', file: 'm2' },
    { title: '使用索引画三维空间的三角形', file: 'm3' },
    {
      title: 'drawArrays第一个参数',
      file: 'm4',
      list: ['LINES', 'LINE_STRIP', 'LINE_LOOP', 'TRIANGLE_STRIP', 'TRIANGLES', 'TRIANGLE_FAN'],
    },
    { title: '使用索引画矩形', file: 'm5' },
    { title: '使用索引画随机颜色的矩形', file: 'm6' },
    { title: '二维移动', file: 'm7' },
    { title: '二维缩放', file: 'm8' },
    { title: '二维旋转', file: 'm9' },
    { title: '三维旋转', file: 'm10' },
    { title: '鼠标操作旋转', file: 'm11' },
    {
      title: '纹理',
      file: 'm12',
      list: ['多图片重合', '图片边缘处理', '正常覆盖'],
    },
    { title: '图片处理（模糊）', file: 'm13' },
    { title: '随机生成', file: 'm14' },
    {
      title: '二维平面变换',
      file: 'm15',
      list: [
        {
          label: 'x:',
          type: 'range',
          min: 0.1,
          max: 550,
          step: 1,
          prop: 'x',
          x: 100,
        },
        {
          label: 'y:',
          type: 'range',
          min: 0.1,
          max: 350,
          step: 1,
          prop: 'y',
          y: 100,
        },
        {
          label: '旋转:',
          type: 'range',
          min: -360,
          max: 360,
          step: 0.1,
          prop: 'rotate',
          rotate: 0,
        },
        {
          label: 'x缩放:',
          type: 'range',
          min: 0.1,
          max: 10,
          step: 0.1,
          prop: 'scaleX',
          scaleX: 1,
        },
        {
          type: 'range',
          prop: 'scaleY',
          label: 'y缩放:',
          min: 0.1,
          max: 10,
          step: 0.1,
          scaleY: 1,
        },
      ],
    },
    { title: 'gl.POINTS 使用', file: 'm16' },
    {
      title: '三维旋转',
      file: 'm17',
      list: [
        {
          label: 'x:',
          min: -250,
          max: 250,
          step: 1,
          type: 'range',
          prop: 'x',
          x: 0,
        },
        {
          label: 'y:',
          min: -150,
          max: 150,
          step: 1,
          type: 'range',
          prop: 'y',
          y: 0,
        },
        {
          label: 'z:',
          min: -1000,
          type: 'range',
          max: -0.1,
          step: 1,
          prop: 'z',
          z: -800,
        },
        {
          label: '绕X轴旋转:',
          type: 'range',
          min: 0,
          max: 360,
          step: 0.1,
          prop: 'rotateX',
          rotateX: 30,
        },
        {
          type: 'range',
          label: '绕Y轴旋转:',
          min: 0,
          max: 360,
          step: 0.1,
          prop: 'rotateY',
          rotateY: 40,
        },
        {
          label: '绕Z轴旋转:',
          min: 0,
          max: 360,
          step: 0.1,
          type: 'range',
          prop: 'rotateZ',
          rotateZ: 50,
        },
        {
          label: 'x轴缩放:',
          type: 'range',
          min: 0.1,
          max: 5,
          step: 0.1,
          prop: 'scaleX',
          scaleX: 1,
        },
        {
          label: 'y轴缩放:',
          type: 'range',
          min: 0.1,
          max: 5,
          step: 0.1,
          prop: 'scaleY',
          scaleY: 1,
        },
        {
          label: 'z轴缩放:',
          type: 'range',
          min: 0.1,
          max: 10,
          step: 0.1,
          prop: 'scaleZ',
          scaleZ: 1,
        },
        {
          label: '视锥角度度:',
          type: 'range',
          min: 0.1,
          max: 100,
          step: 1,
          prop: 'deg',
          deg: 50,
        },
      ],
    },
    {
      title: '摄像机',
      file: 'm18',
      list: [
        {
          label: '盯着一个看:',
          type: 'checkbox',
          prop: 'isPoint',
          isPoint: false,
        },
        {
          label: 'cameraAngle:',
          type: 'range',
          min: 0,
          max: 360,
          step: 1,
          prop: 'deg',
          deg: 50,
        },
      ],
    },
    {
      title: '平行光+雾化',
      file: 'm19',
      list: [
        {
          label: 'y轴旋转:',
          type: 'range',
          min: -5,
          max: 5,
          step: 0.01,
          prop: 'rotateY',
          rotateY: 0,
        },
        {
          label: 'z轴移动:',
          type: 'range',
          min: -160,
          max: 250,
          step: 0.1,
          prop: 'moveZ',
          moveZ: 0,
        },
        {
          label: '雾的近面:',
          type: 'range',
          min: 0,
          max: 200,
          step: 0.1,
          prop: 'near',
          near: 10,
        },
        {
          label: '雾的远面:',
          type: 'range',
          min: 200,
          max: 1000,
          step: 0.1,
          prop: 'far',
          far: 800,
        },
      ],
    },
    {
      title: '点光源',
      file: 'm20',
      list: [
        {
          label: 'y轴旋转:',
          type: 'range',
          min: 0,
          max: 360,
          step: 1,
          prop: 'rotateY',
          rotateY: 0,
        },
        {
          label: '光的距离:',
          type: 'range',
          min: 0,
          max: 200,
          step: 1,
          prop: 'distance',
          distance: 250,
        },
        {
          label: '光的颜色:',
          type: 'color',
          prop: 'color',
          color: '#ffffff',
        },
        {
          label: '使用透明度:',
          type: 'checkbox',
          prop: 'isOpacity',
          isOpacity: true,
        },
        {
          label: '透明度:',
          type: 'range',
          min: 0,
          max: 1,
          step: 0.01,
          prop: 'opacity',
          opacity: 1,
        },
      ],
    },
    {
      title: '聚光灯',
      file: 'm21',
      list: [
        {
          label: 'y轴旋转:',
          type: 'range',
          min: -360,
          max: 360,
          step: 1,
          prop: 'rotateY',
          rotateY: 0,
        },
        {
          label: 'y移动:',
          type: 'range',
          min: -1,
          max: 1,
          step: 0.001,
          prop: 'moveY',
          moveY: 0,
        },
        {
          label: 'x移动:',
          type: 'range',
          min: -1,
          max: 1,
          step: 0.001,
          prop: 'moveX',
          moveX: 0,
        },
        {
          label: '光的距离:',
          type: 'range',
          min: 0,
          max: 20,
          step: 1,
          prop: 'distance',
          distance: 0,
        },
        {
          label: '光的颜色:',
          type: 'color',
          prop: 'color',
          color: '#F0F099',
        },

        {
          label: '高光范围:',
          type: 'range',
          min: 0,
          max: 30,
          step: 0.01,
          prop: 'innerlimit',
          innerlimit: 10,
        },
        {
          label: '光晕范围:',
          type: 'range',
          min: 30,
          max: 100,
          step: 0.01,
          prop: 'outerlimit',
          outerlimit: 40,
        },
      ],
    },
    {
      title: '使用浓度设置雾化',
      file: 'm22',
      list: [
        {
          label: '雾的浓度:',
          type: 'range',
          min: 0,
          max: 1,
          step: 0.01,
          prop: 'nongdu',
          nongdu: 0.3,
        },
      ],
    },
    { title: '投影视图+纹理模板', file: 'm23' },
    { title: '帧缓冲（framebuffer）使用', file: 'm24' },
    { title: '贴图 + 多个program共存', file: 'm25' },
    {
      title: '投影视图+纹理模板',
      file: 'm26',
      list: [
        {
          label: 'cameraX:',
          type: 'range',
          min: -10,
          max: 10,
          step: 0.01,
          prop: 'cameraX',
          cameraX: 0.3,
        },
        {
          label: 'cameraY:',
          type: 'range',
          min: 1,
          max: 10,
          step: 0.01,
          prop: 'cameraY',
          cameraY: 6,
        },
      ],
    },
    { title: '立方体贴图', file: 'm27' },
    { title: '天空盒', file: 'm28' },
    { title: '综合运用', file: 'm29' },
    { title: '使用片元着色器传数据', file: 'm30' },
    { title: 'SCISSOR_TEST 使用', file: 'm31' },
    { title: '使用图片表达文字', file: 'm32' },
    { title: '双摄像机', file: 'm33' },
    { title: '同时绘制多个物体的基础格式', file: 'm34' },
    { title: '场景图', file: 'm35' },
  ];
  let useCom = shallowRef(null);
  onMounted(() => {
    let show = sessionStorage.getItem('show');
    if (show) {
      let tar = glList.find(s => s.file === show);
      showIt(tar);
    } else {
      showIt(glList[0]);
    }
  });
  function showIt(tar) {
    showObj.value = tar;
    useCom.value = defineAsyncComponent(() => import(`./threeJs/${tar.file}.vue`));
  }
</script>
<style scoped lang="scss">
  ul {
    list-style: none;
  }
  .topNav {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    & > li {
      padding: 0 8px;
      border: 1px solid rgb(216, 214, 214);
      border-radius: 5px;
      cursor: pointer;
      margin-right: 8px;
      margin-bottom: 6px;
    }
  }
</style>
<style lang="scss">
  .rightAction {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    list-style-type: none;
    & li {
      width: 500px;
      padding: 0 5px;
      display: flex;
      align-items: center;
      .one {
        display: inline-block;
        width: 85px;
        text-align: right;
        padding-right: 20px;
        flex-shrink: 0;
      }
      .two {
        display: inline-block;
        width: 60px;
        text-align: left;
        padding-left: 10px;
        flex-shrink: 0;
      }
      :deep(.el-slider__button) {
        width: 15px;
        height: 15px;
      }
    }
  }
</style>
