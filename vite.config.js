import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite'; // 自动导入
import Components from 'unplugin-vue-components/vite'; // 组件自动按需导入
import { viteMockServe } from 'vite-plugin-mock'; // npm i vite-plugin-mock mockjs -D
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite'; // 自动导入 Element Plus 组件
import Icons from 'unplugin-icons/vite'; // 自动导入图标
import IconsResolver from 'unplugin-icons/resolver'; // 自动导入图标
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import viteCompression from 'vite-plugin-compression'; // 使用 gzip 或者 brotli 来压缩资源
import postcssPxtorem from 'postcss-pxtorem'; // 自动将 px 转换为 rem

// postcss-preset-env 集成了 autoprefixer
// postcss-preset-env 将被用来转换 CSS，
import postcssPresetEnv from 'postcss-preset-env';
import html from 'vite-plugin-htmlx';

// 解决在旧版浏览器上的兼容性问题
// @vitejs/plugin-legacy https://juejin.cn/post/7447106198498312218

import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'; // 图片压缩
import svgLoader from 'vite-svg-loader'; // svg 作为组件使用

// import './readFiles.js'
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  let env = loadEnv(mode, process.cwd());
  let obj = null;
  let main = {
    base: env.VITE_BASE,
    clearScreen: true, // 设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('src', import.meta.url)),
        '@utils': fileURLToPath(new URL('utils', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // css的预处理器选项
          additionalData: `@use "@/styles/_variable.scss" as *;`, //自定义主题色及其自定义样式变
        },
      },
      postcss: {
        plugins: [
          postcssPresetEnv(), // 自动添加浏览器前缀
          postcssPxtorem({
            rootValue: 16, // 1rem的大小
            propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
            exclude: /node_modules/,
            prolist: ['*'],
          }),
        ],
      },
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            // 将所有带lp-的标签名都视为自定义元素，写webComponent用
            isCustomElement: tag => tag.includes('lp-'),
          },
        },
      }),
      // 按需定制主题配置，表示使用源代码而不是编译后的样式文件
      ElementPlus({
        useSource: true,
      }),
      Components({
        directoryAsNamespace: true, // 启用目录作为命名空间防止冲突
        dirs: ['./src/**'], // 可以随意使用组件和页面了
        resolvers: [
          ElementPlusResolver({ importStyle: 'sass' }),
          IconsResolver({
            // 需要安装 @iconify-json/ep 包
            prefix: false, // 自动引入组件的统一前缀
            customCollections: ['svg'], // 自定义本地图标模块集合
          }),
        ],
      }),
      Icons({
        compiler: 'vue3', // 编译方式
        customCollections: {
          // 自定义图标文件路径
          svg: FileSystemIconLoader(
            './src/assets/svg',
            svg => svg.replace(/(?<=fill=)['"].+?['"]/gi, '"currentColor"'), // 让svg的颜色跟随使用处的设置
          ),
        },
      }),
      svgLoader({
        defaultImport: 'raw',
        svgoConfig: {
          multipass: true,
          svgo: true,
          plugins: ['cleanupAttrs'],
        },
      }), // raw返回svg代码 url返回base64码
      AutoImport({
        imports: [
          'vue-router',
          'vue',
          'pinia',
          {
            // 编译为：import http from "/src/http/axios_set.js"; 相对于使用的文件位置
            '../axios_set.js': [['default', 'http']], // 给导入的 API 起别名
          },
        ],
        // 编译为：import api from "/src/http/api.js";
        api: [['default', 'api']], // 给导入的 API 起别名
        dirs: ['./src/**', './utils/**'], // 目录下模块导出的自动导入
        // 自动引入修改主题色添加这一行，使用预处理样式
        resolvers: [
          ElementPlusResolver({ importStyle: 'sass' }),
          IconsResolver({
            //配置前缀，效果等用于Components中的 prefix
            componentPrefix: false,
            enabledCollections: ['ep'], // 启用哪些集合，需要安装 @iconify-json/ep 包
          }),
        ],
      }),
      html({
        minify: true, // 是否压缩 html
        page: {
          inject: {
            data: {
              title: env.VITE_GLOB_APP_TITLE, // 将数据注入ejs模板
            },
          },
        },
      }),
    ],
  };
  if (command === 'serve') {
    obj = {
      // dev 独有配置
      // 跨域
      server: {
        hmr: true,
        host: true, // 指定服务器应该监听哪个 IP 地址
        strictPort: false, // 若端口已被占用是否自动切换
        https: false, // 启用 TLS + HTTP/2
        open: true, // 启动时自动在浏览器中打开应用程序
        cors: true, // 配置 CORS
        force: true, // 强制使依赖预构建
        clientFiles: ['./src/**'],
        proxy: {
          // 配置自定义代理规则，这里写了代理，就不需要再axios中配置baseURL，与axios是互斥的
          '/plot': {
            target: env.VITE_APP_BASE_URL,
            changeOrigin: true,
            rewrite: path => path.replace(/^\/plot/, ''),
          },
          '/cai': {
            target: env.VITE_APP_BASE_URL_PRO,
            changeOrigin: true,
            rewrite: path => path.replace(/\/cai/, ''),
          },
        },
      },
      plugins: [
        // mock 数据
        viteMockServe({
          mockPath: './mock', // 解析根目录下的mock文件夹
        }),
      ],
    };
  } else {
    obj = {
      plugins: [
        ViteImageOptimizer({
          // 图片压缩，sharp  不作为软件包的一部分安装，需要自行安装
          logStats: false, // 是否输出压缩结果
          ansiColors: false, // 是否使用 ANSI 颜色
        }),
        viteCompression({
          algorithm: 'gzip', // 压缩算法
          threshold: 1024 * 50, // 如果体积大于阈值，则进行压缩，单位为b,当前为50kb
          verbose: false, // 是否在控制台中输出压缩结果
          deleteOriginFile: true, // 压缩后是否删除源文件
          minRatio: 0.8, // 压缩率小于0.8才会压缩
        }),
      ],
      build: {
        chunkSizeWarningLimit: 30000, // 单位kb  打包后文件大小警告的限制
        rollupOptions: {
          output: {
            experimentalMinChunkSize: 1024 * 500, // 当chunk大小小于此值时，Vite会将其与其他chunk合并
            entryFileNames: `js/[name]-[hash].js`,
            chunkFileNames: `js/[name]-[hash].js`,
            assetFileNames(assetInfos) {
              if (!assetInfos.name.endsWith('.css') && !assetInfos.name.endsWith('.js')) {
                return `imgs/[name]-[hash].[ext]`;
              }
              return `[ext]/[name]-[hash].[ext]`;
            },
          },
        },
      },
      esbuild: {
        drop: ['console', 'debugger'], // 删除 所有的console 和 debugger
      },
    };
  }
  // 合并
  Object.entries(obj).forEach(([key, value]) => {
    let type = Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
    switch (type) {
      case 'string':
        main[key] = value;
        break;
      case 'object':
        if (main[key]) {
          main[key] = { ...main[key], ...value };
        } else {
          main[key] = value;
        }
        break;
      case 'array':
        if (main[key]) {
          main[key] = [...main[key], ...value];
        } else {
          main[key] = value;
        }
        break;
    }
  });
  return main;
});
/*
nvm ls  查看已安装的node列表
cd dist
http-server -g

*/
