## npm install --- npm start

## 添加unplugin-auto-import/vite 和 unplugin-vue-components/vite 插件

可以直接使用vue3的api，不需要import导入，如 let kk=ref(null)<br/>
可以直接使用写好的 pinia方法，不需要import导入，如 let store = appStore();<br/>
可以直接使用路由方法，不需要import导入，如 let router = useRouter();<br/>
@/http/every_http文件夹是存放具体请求方法的文件夹，需要在
@/http/api.js 文件中引入后，可以全局直接使用api.XXX，<br/>
compoents文件夹下的组件，不需要import导入，直接用即可<br/>
可以直接使用 element-plus 组件，不需要import导入，如 ElMessage({type:'success', message: '操作成功'});<br/>

## 添加 unplugin-icons/vite 和 unplugin-icons/resolver 和 unplugin-icons/vite 插件

可以直接使用 element-plus 图标，不需要import导入，如 <epSearch />，ep+图标名<br/>
可以直接使用 @/assets/svg 文件夹内的svg文件作为图标，图标跟随使用处定义颜色，不需要import导入，如 <span style="color: blue"><svgPpp /></span>， svg+文件名<br/>

## 添加 vite-plugin-htmlx 插件

可以在 .env 文件中定义 VITE_GLOB_APP_TITLE 作为页面标题<title>

## 添加 vite-plugin-image-optimizer 图片压缩

## 添加 vite-svg-loader 插件

使 svg 文件可以作为组件使用:<br/>
&lt;MyIconCom style="width: 22px; height: 22px" /&gt;<br/>
import MyIconCom from '@/assets/svg/ppp.svg?component';<br/>
使 svg 文件可以作为url使用:<br/>
&lt;img :src="MyIcon" style="width: 20px; height: 20px" /&gt;<br/>
import MyIcon from '@/assets/svg/ppp.svg?url';<br/>

## 添加 vite-plugin-mock 插件

在 mock\index.js 内自定义url和返回数据，即可模拟接口返回数据<br/>

## 添加 postcss-preset-env 插件

自动添加前缀，并可以在 @/styles/\_variable.scss 内定义全局scss变量和更改element默认样式<br/>

## 添加 postcss-pxtorem 插件

将px单位转换为rem单位，16px=1rem<br/>

## 添加 vite-plugin-compression 插件

压缩文件，超过20kb就压缩并根据文件类型导出<br/>

## .prettierrc.json 配置文件参数说明

    查看prettier默认配置 "https://json.schemastore.org/prettierrc",
    "printWidth": 120, //指定每行应该保持多少字符以内，超过后会进行换行。
    "tabWidth": 2,       //一个制表符等于的空格数。
    "useTabs": true,     //是否使用制表符进行缩进。
    "semi": true,        // 结尾是否使用分号
    "singleQuote": true,   //  是否使用单引号而不是双引号。
    "quoteProps": "as-needed",   //更改引用对象中的属性的时间。
    "jsxSingleQuote": false,    //在 JSX 中使用单引号而不是双引号。
    "trailingComma": "es5",    //尽可能在多行逗号分隔的句法结构中打印尾随逗号。（例如，单行数组永远不会出现尾随逗号。
    "bracketSpacing": true,    //在对象文本中打印括号之间的空格。
    "bracketSameLine": false, //将多行HTML（HTML、JSX、Vue、Angular 元素放在最后一行的末尾，而不是单独放在下一行，不适用于自闭合元素
    "arrowParens": "always",  //在唯一箭头函数参数周围包含括号。
    "requirePragma": false, //Prettier 可以将自己限制为仅格式化文件顶部包含特殊注释（称为杂注）的文件。这在逐渐将大型未格式化的代码库转换为 Prettier 时非常有用。
    "insertPragma": false,  //Prettier 可以在文件顶部插入一个特殊 @format 标记，指定文件已使用 Prettier 格式化。当与 --require-pragma 该选项一起使用时，这很有效。如果文件顶部已经有一个文档块，那么此选项将使用 @format 标记向其添加一个换行符。
    "proseWrap": "preserve",   //什么都不做，保持散文原样。
    "htmlWhitespaceSensitivity": "css",   //HTML 空格敏感度
    "vueIndentScriptAndStyle": true,  //为 <script> 和 <style> 标签内的内容添加缩进，以匹配父元素的缩进级别。
    "endOfLine": "lf",   //线路结束规则
    "embeddedLanguageFormatting": "auto", //嵌入式语言格式
    "singleAttributePerLine": true,   //是否强制在 HTML、Vue 和 JSX 中强制执行每行单个属性。