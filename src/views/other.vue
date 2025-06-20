<template>
  <div class="page">
    <div>
      <p>二维码插件</p>
      <el-input v-model="text"></el-input>
      <el-button size="small" @click="makeQr" :disabled="!text">生成二维码</el-button>
      <el-button size="small" @click="reset">重置</el-button>
      <el-button size="small" @click="showQr = !showQr" :disabled="!imgSrc" type="success">
        transition-model
      </el-button>
      <el-button size="small" @click="readQr" :disabled="!showQr">{{ read }}</el-button>
      <el-button size="small" @click="readQrFile" type="warning">
        {{ ReadQrFileText }}
      </el-button>
      <div>
        <transition mode="out-in" name="fade">
          <img :src="qq" style="width: 200px; height: 200px" v-if="!showQr" />
          <img :src="imgSrc" ref="isImg" style="width: 200px; height: 200px" v-else />
        </transition>
      </div>
    </div>

    <div>
      <el-button @click="showDocx" type="primary" ref="docxBtn">渲染docx</el-button>
      <el-button @click="showExcel" type="success">读取excel</el-button>
      <el-button @click="downLoadExcel" type="warning">下载excel</el-button>
      <el-button @click="readPpt" type="danger">读取Ppt</el-button>
      <el-button @click="makePdf" type="info">生成Pdf</el-button>
      <div class="files">
        <div ref="docxDiv" :style="{ height: height + 'px' }"></div>
        <div style="height: 100%">
          <div ref="excelDiv"></div>
          <div ref="pptDiv"></div>
        </div>
      </div>
    </div>

    <div>
      <p class="useVar">使用全局scss变量</p>
      <h3>引入图片的三种写法</h3>
      <p>写死在标签 src="@/assets/imgs/3.png"</p>
      <img src="@/assets/imgs/3.png" width="200" height="100" />
      <p>使用 import ftexture from "@/assets/f-texture.png";之后 :src="ftexture"</p>
      <img :src="ftexture" width="200" height="100" />
      <p>
        使用 let imgs = new URL('@/assets/imgs/star.jpg', import.meta.url).href; 之后 :src="imgs"
      </p>
      <img :src="imgs" width="200" height="100" />
    </div>

    <div>
      <h3>矢量加法</h3>
      <img src="@/assets/imgs/+.png" width="100%" />
    </div>

    <div>
      <h3>矢量减法</h3>
      <img src="@/assets/imgs/-.png" width="98%" height="220" />
    </div>
    <div>
      <h3>scene的坐标系</h3>
      <img src="@/assets/imgs/11.png" width="98%" height="300" />
    </div>
    <div>
      <h3>scene的树级关系</h3>
      <img src="@/assets/imgs/12.png" width="98%" height="300" />
    </div>

    <div>
      <span style="color: red">在 ThreeJS 中长度单位默认是米（meter）</span>
      <br />
      通常使用修改 position 值来实现平移；
      <br />
      通过修改 rotation 值来实现旋转；
      <br />
      使用设置 scale 来实现缩放。
      <br />
      <span style="color: red">scene 中可添加Mesh对象、光照对象、相机对象等。</span>
      <br />
      Mesh 内部还涉及到局部空间和局部坐标系
      <br />
      Mesh 上还可以添加 Mesh（将一个Mesh作为另一个Mesh的children， child Mesh 位置变换就会相对于
      parent Mesh 的局部坐标系进行变换计算）
      <br />
      <span style="color: red">OrthographicCamera（正交相机）</span>
      在这种投影模式下，无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变。这对于渲染2D场景或者UI元素是非常有用的。
      <br />
      <span style="color: red">PerspectiveCamera （透视相机）</span>
      这一投影模式被用来模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式。
      <br />
      <span style="color: red">ArrayCamera</span>
      包含着一组子摄像机，常用于多人同屏的渲染，更好地提升VR场景的渲染性能
      <br />
      <span style="color: red">StereoCamera （双透视摄像机-立体相机）</span>
      常用于创建 3D 立体影像，比如 3D 电影之类或 VR
      <br />
      <span style="color: red">CubeCamera（立方体相机）</span>
      有6个渲染，分别是立方体的6个面，常用于渲染环境、反光等
    </div>

    <div>
      <h3>顶点UV坐标</h3>
      <img src="@/assets/imgs/uv.png" width="100%" height="270" />
      <p>
        顶点UV坐标是一个取值范围在0~1之间的二维顶点坐标；
        <br />
        顶点UV坐标的作用是从纹理贴图上提取像素，并映射到网格模型Mesh的几何体表面上；
        <br />
        顶点UV坐标 geometry.attributes.uv 和顶点位置坐标 geometry.attributes.position 是一一对应的。
      </p>
    </div>
    <div>
      <h3>纹理贴图细节</h3>
      <p>
        材质发生变换。你需要设置：material.needsUpdate = true
        <br />
        如果更改了图像，画布，视频和数据纹理，则需要设置以下标志：texture.needsUpdate = true;
        <br />
        如果要在第一次渲染后更改position数值，则需要设置：line.geometry.attributes.position.needsUpdate
        = true; 相机的位置和目标就会自动更新
        <br />
        如果你需要改变fov、aspect、near、far，需要设置：camera.updateProjectionMatrix();
      </p>
    </div>
    <div>
      <h3>材质</h3>
      <img src="@/assets/imgs/caizhi1.png" width="400" height="340" />
    </div>

    <div>
      <h3>旋转角度正负值判断</h3>
      右手定则：
      <span style="color: red">逆时针旋转（正值）</span>
      <span style="color: brown; margin-left: 50px">顺时针旋转（负值）</span>
      <img src="@/assets/imgs/reg.jpg" width="400" height="300" />
    </div>

    <div>
      <h3>渲染管线</h3>
      <p style="font-size: 16px; width: 100%">
        片元着色器输出的颜色缓冲并不是最终屏幕上呈现的颜色缓冲，还必须经过模板测试、深度测试和混合测试后才能得到最终用来输出的颜色缓冲
      </p>
      <img src="@/assets/imgs/xuanranguanxian1.png" width="100%" height="120" />
      <br />
      Stencil 的本质是镂空，通过这样的板子就可以方便的画出某个特定的形状。 模板测试的核心是
      持有一个模板缓冲，每个像素/片段都有一个模板值，通常每个模板值是8 位(用掩码表示)， 也就是可以有
      256 种不同的值，这样就可以通过设置我们想要的模板值来丢弃或保留这个片段
      <br />
      <img src="@/assets/imgs/xuanranguanxian2.png" width="100%" />
    </div>

    <div style="display: flex">
      <div>
        <h3>模板比较原理</h3>
        <img src="@/assets/imgs/muban.png" width="240" height="550" />
      </div>
      <div style="margin-left: 5px">
        <h3>深度比较原理</h3>
        <img src="@/assets/imgs/shendu.png" width="240" height="550" />
      </div>
    </div>

    <div>
      <h3>基础概念</h3>
      <span style="color: red">场景(Scene)</span>
      场景是 Three.js 中所有 3D 对象的容器。它定义了 3D空间中的位置、方向和光照。
      <br />
      <span style="color: red">相机(Camera)</span>
      相机定义了 3D场景中的视角。通过设置相机的位置和角度，可以控制场景中的视觉效果。
      <br />
      <span style="color: red">渲染器(Renderer)</span>
      渲染器将场景和相机中的 3D 对象渲染到屏幕上。Three.js提供了多个渲染器，包括
      CanvasRenderer、WebGLRenderer 和 SVGRenderer。
      <br />
      <span style="color: red">几何体(Geometry)</span>
      几何体定义了 3D
      对象的形状。Three.js提供了多个几何体，如立方体、球体、圆柱体等等，也可以自定义几何体。
      <br />
      <span style="color: red">材质(Material)</span>
      材质定义了 3D对象的外观。材质可以包括纹理、颜色、反射和透明度等等。
      <br />
      <span style="color: red">网格(Mesh)</span>
      是几何体和材质的组合体。它将几何体的形状和材质的外观结合在一起，并添加到场景中进行渲染。

      <p>
        <span style="color: red">法向：</span>
        曲线上某点的法向是垂直于该点切线的向量
        <br />
        <span style="color: red">次法线：</span>
        设质点沿着某一空间曲线MN运动，在轨道MN上的任意点P作密切平面，在密切平面内过P点作切线τ和法线n，
        再作直线b，使三者的方向关系为即互相垂直，则b称为次法线。即与切线、法线构成的平面垂直的线
      </p>
      <img src="@/assets/imgs/ci.png" width="540" height="180" />
    </div>
  </div>
</template>
<script setup>
  import qq from '@/assets/imgs/2.jpeg';
  import webp from '@/assets/imgs/1.webp';
  import ftexture from '@/assets/imgs/f-texture.png';
  let imgs = new URL('@/assets/imgs/star.jpg', import.meta.url).href;

  let imgSrc = ref(null);
  let text = ref('');
  let showQr = ref(false);
  // 生成二维码
  function makeQr() {
    MakeQr({
      text: 'adfasdfsdfasdf',
      size: 200,
      // logo: qq,
      background: webp,
      opacity: 0.3,
    }).then(url => {
      imgSrc.value = url;
    });
  }
  let isImg = ref(null);
  let read = ref('解析二维码');
  function readQr() {
    read.value = ReadQr(isImg.value);
  }
  let ReadQrFileText = ref('解析二维码文件');
  function readQrFile() {
    ReadQrFile(ReadQrFileText);
  }
  function reset() {
    showQr.value = false;
    imgSrc.value = null;
    text.value = '';
    read.value = '解析二维码';
    ReadQrFileText.value = '解析二维码文件';
  }

  import { renderAsync } from 'docx-preview';
  let docxDiv = ref(null);
  let height = ref(0);
  function showDocx() {
    readFile().then(file => {
      let fileType = file.name.split('.');
      if (['doc', 'docx'].includes(fileType[fileType.length - 1])) {
        let fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = () => {
          let option = {
            className: 'docx', // 添加到渲染的容器的类名
            inWrapper: true, // 启用包装器，会显示背景
            ignoreWidth: true, // 禁用页面的渲染宽度
            ignoreHeight: true, // 禁用页面的渲染高度
          };
          height.value = docxDiv.value.offsetWidth * 1.414;
          renderAsync(fileReader.result, docxDiv.value, null, option);
          // .then((res) => { console.log(res) })
        };
      } else {
        ElMessage.error('请选择word文件');
      }
    });
  }

  let docxBtn = ref(null);
  import JsPDF from 'jspdf';
  function makePdf() {
    const pdf = new JsPDF('p', 'px', 'a4', true); // 第四个参数表示是否压缩
    ElMessageBox.confirm('使用自定义字体？', '提示', {
      confirmButtonText: '使用',
      cancelButtonText: '不使用',
      type: 'warning',
    })
      .then(() => {
        readFile().then(file => {
          let fileType = file.name.match(/.(ttf|TTF)/g)[0].toLowerCase();
          if (['.ttf'].includes(fileType)) {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              let name = file.name.split('.')[0];
              pdf.addFileToVFS(file.name, fileReader.result.replace(/.+base64,/, ''));
              pdf.addFont(file.name, name, 'normal');
              pdf.setFont(name, 'normal');
              makePdf();
            };
          } else {
            ElMessage.error('请选择ttf字体文件');
          }
        });
      })
      .catch(makePdf);
    function makePdf() {
      pdf.setFontSize(30);
      pdf.text('asdfasdf发水电费', 10, 250);
      let app = document.querySelector('#app');
      pdf.html(app, {
        dpi: 300, // 将分辨率提高到特定的dpi,默认值为96
        scale: 2 * window.devicePixelRatio,
        width: pdf.getPageWidth(),
        windowWidth: app.clientWidth,
        backgroundColor: null,
        useCORS: true, // 启用CORS
        allowTaint: false,
        callback: doc => {
          doc.save('example.pdf');
        },
      });
    }
  }

  import digital from './digital.vue';
  import { makeExcel, downLoadExcel } from '@utils/makeExcel';
  let excelDiv = ref(null);
  function showExcel() {
    makeExcel(excelDiv.value);
  }
  import { init } from 'pptx-preview';
  let pptDiv = ref(null);
  function readPpt() {
    readFile().then(file => {
      let fileType = file.name.match(/(?<=.+).+/g)[0];
      if (['.ppt', '.pptx'].includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = () => {
          //调用库的init方法生成一个预览器
          let pptxPrviewer = init(pptDiv.value, {
            width: pptDiv.value.clientWidth,
            height: 290,
            mode: 'list',
          });
          pptxPrviewer.wrapper.className = 'pptWapper';
          pptxPrviewer.preview(fileReader.result);
        };
      } else {
        ElMessage.error('请选择ppt文件');
      }
    });
  }
</script>
<style scoped lang="scss">
  button {
    padding: 8px 12px;
  }
  .files {
    display: grid;
    grid-template-columns: 50% 50%;
    box-sizing: border-box;
  }
  :deep(.docx-wrapper) {
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    padding: 5px;
  }
  :deep(.docx) {
    width: 100%;
    height: 100%;
    padding: 5px !important;
    margin: 0 !important;
    overflow-y: auto;
    p,
    img,
    div,
    span {
      width: 100% !important;
    }
  }
  :deep(.pptWapper) {
    background: rgba(188, 187, 187, 0.732) !important;
    overflow-y: auto;
    > div {
      width: 100% !important;
      margin: 0 !important;
    }
    > div:not(:last-child) {
      margin-bottom: 5px !important;
    }
  }
  :deep(::-webkit-scrollbar) {
    width: 3px;
  }
  :deep(::-webkit-scrollbar-thumb) {
    background: #aaa;
  }
  :global(.el-overlay) {
    z-index: 1000 !important;
  }

  .useVar {
    color: $main-color;
  }
</style>
