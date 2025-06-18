<template>
  <div class="page">
    <div>
      <p>cryptojs 加密解密</p>
      <el-input v-model="jmWord" placeholder="请输入要加密的内容" style="max-width: 400px">
        <template #append>
          <el-button size="small" @click="toEncrypt">加密</el-button>
          <el-button size="small" type="danger" @click="toDecrypt">解密</el-button>
        </template>
      </el-input>

      <el-button @click="changeChild">向子组件传数据</el-button>
      <div>自定义返回值：{{ childModel }}</div>
      <el-button @click="toEmit">emit测试</el-button>
      <span>{{ emitData }}</span>
      <Child1
        @otherEmit="otherEmit"
        :name="child1"
        ref="isChild1"
        class="testAttr"
        v-model.kk="childModel"
      />
      <p>给computed传递参数：{{ templateRef('computed接收的参数') }}</p>

      <el-button @click="changeObj" type="danger">watch后置刷新</el-button>
      <p ref="age">
        <span>age：{{ obj.age }}</span>
        &nbsp;&nbsp;&nbsp;
        <span>ageAfterWatch： {{ ageAfterWatch }}</span>
      </p>
      <p ref="year">
        <span>year：{{ obj.year }}</span>
        &nbsp;&nbsp;&nbsp;
        <span>yearAfterWatch：{{ yearAfterWatch }}</span>
      </p>

      <div>
        <p>http代理</p>
        <el-button @click="test(true)">plot</el-button>
        <el-button @click="test(false)">cai</el-button>
      </div>
    </div>

    <div>
      <el-button @click="changeSlot">动态插槽</el-button>
      <slot></slot>
      <Child>
        <template #default>
          <span>默认插槽</span>
          <el-button size="small" @click="comType = !comType">动态切换组件+自定义指令</el-button>
          <component
            :is="AsyncComp"
            v-highlight:pink="'14px'"
            class="attrs"
            :inputProps="'传入的props'"
          />
        </template>

        <template #header="{ count }">
          <div class="header">
            header插槽
            <br />
            <span>子组件通过插槽返值给父组件：{{ count }}</span>
          </div>
        </template>

        <template #content>
          <p class="sp1">样式写在父组件里</p>
          <p class="sp2">样式写在子组件里</p>
        </template>

        <template #[slotVar]="{ nowSlot }">
          <span>动态切换插槽 {{ nowSlot }}</span>
        </template>

        <template #foot>
          <!-- 插槽内容无法访问子组件的数据。
        Vue 模板中的表达式只能访问其定义时所处的作用域 -->
          父组件中调用子组件时，插槽template无所谓先写谁，只要在子组件中写好位置、顺序即可
        </template>
      </Child>
    </div>

    <div ref="aiEditor" style="height: 400px"></div>

    <div style="display: grid; grid-template-columns: 50% 50%">
      <div>
        <h3>SSE</h3>
        <div>
          <el-button @click="useSSE">useSSE</el-button>
          {{ sseData }}
        </div>
      </div>
      <div>
        <h3>WebSocket</h3>
        <div>
          <el-button @click="openWebSocket">open</el-button>
          <el-button @click="closeWebSocket">close</el-button>
          {{ webSocketData }}
        </div>
      </div>
      <div>
        <h3>socket.io</h3>
        <div>
          <el-button @click="openIO">open</el-button>
          <el-button @click="closeIO">close</el-button>
          {{ ioData }}
        </div>
      </div>
      <div>
        <h3>Worker</h3>
        <div>
          <el-button @click="useWorker">Worker</el-button>
          {{ workerData }}
        </div>
      </div>
      <div>
        <h3>使用自定义组件</h3>
        <lp-text num="88"></lp-text>
      </div>
    </div>

    <div>
      <h3>生成压缩文件</h3>
      <div>
        <el-button @click="selectFile">选择文件</el-button>
        <span>{{ fileNumber }} 个文件</span>
        <br />
        <el-button @click="makeZip1">for循环生成</el-button>
        <el-button @click="makeZip2">forEach生成</el-button>
        <el-button @click="readZip">解压</el-button>
        {{ readFileNumber.join(' ') }}
        <p>
          当for循环中有异步时，会阻止程序向下执行，直到异步执行完， 循环结束；
          <br />
          而forEach循环不会阻止程序向下执行（不支持await），从而导致异步还未执行完，就执行循环后边的了
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  let jmWord = ref(''); // 加密文本
  function toEncrypt() {
    jmWord.value = Encrypt(jmWord.value);
  }
  function toDecrypt() {
    jmWord.value = Decrypt(jmWord.value);
  }

  let child1 = ref(null);
  let isChild1 = ref(null);
  function changeChild() {
    child1.value = `${Math.floor(Math.random() * 10)}`.repeat(3);
  }
  function toEmit() {
    // 触发子组件的事件
    isChild1.value.toEmit();
  }

  let childModel = ref('自定义组件的 v-model');

  let emitData = ref('');
  function otherEmit(val) {
    emitData.value = '父组件接收子组件传过来的值：' + val;
  }

  let templateRef = computed(() => item => {
    return `这是${item}`;
  });

  let obj = reactive({
    age: 1,
    year: 1,
  });
  let age = ref(null);
  let year = ref(null);
  let ageAfterWatch = ref('');
  let yearAfterWatch = ref('');
  function changeObj() {
    obj.age++;
    obj.year++;
  }
  watch(
    () => obj.age,
    () => {
      ageAfterWatch.value = age.value.children[0].innerText;
    },
    {
      // watch后置刷新，可以获取到最新的dom
      flush: 'post',
    },
  );
  watch(
    () => obj.year,
    () => {
      yearAfterWatch.value = year.value.children[0].innerText;
    },
  );

  function test(type) {
    let url = '';
    if (type) {
      url = `/plot/os/antfincdn/j5ADHaMsZx/scatter.json`;
    } else {
      url = `/cai/try/ajax/json_demo.json`;
    }
    api.getMethod(url).then(res => {
      console.log(res);
    });
  }

  let slotVar = ref('slotIf');
  function changeSlot() {
    slotVar.value = slotVar.value === 'slotIf' ? 'slotElse' : 'slotIf';
  }

  let comType = ref(true);
  let AsyncComp = ref(null);
  watch(comType, () => {
    AsyncComp.value = defineAsyncComponent(
      () => import(`@/components/defineCom${toValue(comType) ? 1 : 2}.vue`),
      // toValue() 是一个在 3.3 版本中新增的 API。它的设计目的是将 ref 或 getter 规范化为值
    );
  });

  // https://aieditor.com.cn/docs/zh/api/aieditor.html
  import { AiEditor } from 'aieditor';
  import 'aieditor/dist/style.css';
  let editor = useTemplateRef('aiEditor');
  onMounted(() => {
    new AiEditor({
      element: editor.value,
      placeholder: '点击输入内容...',
      toolbarSize: 'medium', // 默认 small，可选 'small' | 'medium' | 'large'
      toolbarKeys: [
        'undo',
        'redo',
        'brush',
        'eraser',
        'heading',
        'font-family',
        'font-size',
        'bold',
        'italic',
        'underline',
        'strike',
        'link',
        'subscript',
        'superscript',
        'hr',
        'todo',
        'emoji',
        'highlight',
        'font-color',
        'align',
        'line-height',
        'bullet-list',
        'ordered-list',
        'indent-decrease',
        'indent-increase',
        'break',
        'image',
        'video',
        'attachment',
        'quote',
        'table',
        'fullscreen',
        'printer',
        {
          icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" fill="currentColor"><path d="M4 19H20V12H22V20C22 14.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19ZM13 9V16H11V9H6L12 3L18 9H13Z"></path></svg>',
          onClick: (event, editor) => {
            //点击事件
          },
          tip: '导出',
        },
      ],
      // 上传图片：image, 上传视频：video, 上传附件：attachment 配置
      image: {
        uploadUrl: 'https://your-domain/image/upload',
        uploader: (
          // 自定义 uploader 代码示例
          file,
          uploadUrl,
        ) => {
          const formData = new FormData();
          let formName = 'formName';
          formData.append(formName, file);
          return new Promise((resolve, reject) => {
            fetch(uploadUrl, {
              method: 'post',
              headers: { Accept: 'application/json' },
              body: formData,
            })
              .then(resp => resp.json())
              .then(json => {
                resolve(json);
              })
              .catch(error => {
                reject(error);
              });
          });
        },
        uploaderEvent: {
          onUploadBefore: (file, uploadUrl, headers) => {
            //监听图片上传之前，此方法可以不用回任何内容，但若返回 false，则终止上传
          },
          onSuccess: (file, response) => {
            //监听图片上传成功
            //注意：
            // 1、如果此方法返回 false，则图片不会被插入到编辑器
            // 2、可以在这里返回一个新的 json 给编辑器
          },
          onFailed: (file, response) => {
            //监听图片上传失败，或者返回的 json 信息不正确
          },
        },
      },
      fontFamily: {
        values: [
          { name: '宋体', value: 'SimSun' },
          { name: '自定义字体', value: 'selfFont' },
        ],
      },
      textSelectionBubbleMenu: {
        // 浮动菜单
        enable: false,
      },
      htmlPasteConfig: {
        pasteAsText: false, // 移除所有的非文本内容以及 html 标签
        pasteClean: false, // 移除所有的内容样式
        clearLineBreaks: true, // 移除所有的换行符，默认为 true
        // pasteProcessor: (t) => {
        //   // 自定义对 html 内容进行处理。
        //   console.log(t.trim())
        //   return t
        // },
      },
      // editable: false, // 是否可编辑
      onSave: editor => {
        //通过这里进行保存的逻辑操作
      },
      onChange: aiEditor => {
        // 监听到用编辑器内容发生变化了，控制台打印编辑器的 html 内容...
      },
      onCreated: aiEditor => {
        // 编辑器创建完成后，控制台打印编辑器的 html 内容...
      },
    });
  });

  // eventsource适用于简单的推送场景（单向通信），websocket适用于双向通信场景
  let sseData = ref('');
  function useSSE() {
    let es = new EventSource('http://localhost:2342/sse');
    es.onmessage = e => {
      let name = JSON.parse(e.data).name;
      console.log(name);
      if (name !== 'close') {
        sseData.value = name;
      } else {
        es.close();
      }
    };
  }
  // websocket具有极低的延迟，适用于实时游戏、聊天应用等场景。
  // 它使用ws或wss协议，能够在浏览器和服务器之间建立长时间的连接
  let webSocketData = ref('');
  let socket,
    num = 1,
    time;
  function openWebSocket() {
    socket = new WebSocket('ws://localhost:5555');
    socket.onopen = () => {
      time = setInterval(() => {
        if (num < 11) {
          socket.send(num++);
        } else {
          closeWebSocket();
        }
      }, 1000);
    };
    socket.onmessage = e => {
      webSocketData.value = e.data;
    };
    socket.onclose = () => {
      console.log('关闭了');
    };
    socket.onerror = error => {
      console.log(error);
    };
  }
  function closeWebSocket() {
    clearInterval(time);
    socket.close();
    num = 1;
  }

  import { io } from 'socket.io-client';
  let ioData = ref('');
  let socketIO;
  function openIO() {
    if (socketIO) {
      closeIO();
    }
    socketIO = io('http://localhost:3333');
    socketIO.on('connect', () => {
      console.log('connect'); // true
      time = setInterval(() => {
        if (num < 11) {
          socketIO.emit('clientMessage', num++);
        } else {
          closeIO();
        }
      }, 1000);
    });
    socketIO.on('serverMessage', data => {
      ioData.value = data;
    });
  }
  function closeIO() {
    clearInterval(time);
    time = null;
    num = 1;
    socketIO.disconnect();
    socketIO = null;
  }

  let workerData = ref('');
  function useWorker() {
    let worker = new Worker(new URL('@utils/Worker.js', import.meta.url));
    worker.onmessage = msg => {
      workerData.value = msg.data;
    };
    setTimeout(() => {
      worker.postMessage('2222');
    }, 1000);
  }

  import JSZip from 'jszip';
  let files = {};
  let fileNumber = ref(0);
  function selectFile() {
    let input = document.createElement('input');
    input.type = 'file';
    input.multiple = 'multiple';
    input.onchange = e => {
      let arr = [...e.target.files];
      fileNumber.value = arr.length;
      arr.forEach(t => {
        if (!files[t.name]) {
          files[t.name] = t;
        }
      });
    };
    input.click();
  }
  async function makeZip1() {
    let zip1 = new JSZip();
    let arr = Object.entries(files);
    for (let i = 0; i < arr.length; i++) {
      let file = await new Promise(resolve => {
        let fileReader = new FileReader();
        fileReader.readAsArrayBuffer(arr[i][1]);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
      });
      zip1.file(arr[i][0], file);
    }
    zip1.generateAsync({ type: 'blob' }).then(zipFile => {
      var save_link = document.createElement('a');
      save_link.href = URL.createObjectURL(zipFile);
      save_link.download = `${new Date().getTime()}.zip`;
      save_link.click();
    });
  }
  function makeZip2() {
    let zip1 = new JSZip();
    Object.entries(files).forEach(async arr => {
      let file = await new Promise(resolve => {
        let fileReader = new FileReader();
        fileReader.readAsArrayBuffer(arr[1]);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
      });
      zip1.file(arr[0], file);
    });
    zip1.generateAsync({ type: 'blob' }).then(zipFile => {
      var save_link = document.createElement('a');
      save_link.href = URL.createObjectURL(zipFile);
      save_link.download = `${new Date().getTime()}.zip`;
      save_link.click();
    });
  }

  let readFileNumber = ref([]);
  function readZip() {
    readFile().then(file => {
      JSZip.loadAsync(file).then(zip => {
        readFileNumber.value = Object.keys(zip.files);
      });
    });
  }
</script>

<style lang="scss" scoped>
  .sp1 {
    color: red;
  }
</style>
