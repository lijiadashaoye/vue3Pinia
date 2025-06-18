<template>
  <div class="page">
    <div>
      <h3>IconsResolver使用</h3>
      <p style="color: red">
        使用自动导入的element图标：ep+图标名
        <ep-search/> &nbsp; <epSearch/>
      </p>
      <p style="color: blue">
        使用自动导入的svg图标文件：文件夹名+文件名
        <svg-ppp /> &nbsp; <svgPpp />
      </p>
      <p>
        链接文字：
        <el-link type="primary">
          <template #icon>
            <epedit />
          </template>
          Check
          <el-icon class="el-icon--right"><epBell /></el-icon>
        </el-link>
      </p>
      <p>
        <el-text line-clamp="2" style="width: 58%">
          两行：多行文字超出部分显示省略号 多行文字超出部分显示省略号 多行文字超出部分显示省略号
          多行文字超出部分显示省略号
        </el-text>
      </p>
      <p>
        <el-text line-clamp="1" style="width: 50%">
          一行：单行文字超出部分显示省略号单行文字超出部分显示省略号
        </el-text>
      </p>
      <p class="toLong">手撸文字超长时显示省略号</p>
      <p class="toLongMore">手撸文字超长时显示省略号手撸文字超长时显</p>
      <div class="badges">
        <el-badge :value="12" :max="10">
          <el-button>提示徽章</el-button>
        </el-badge>
        <el-badge value="16" max="15">
          <el-button>自定义提示内容</el-button>
          <template #content="{ value }">
            <epMessage />
            <span>{{ value }}</span>
          </template>
        </el-badge>
        <el-badge is-dot class="item" :offset="[2, -1]">只有一个红点</el-badge>
      </div>

      <div>
        <h3>图片预览</h3>
        <div style="display: flex; justify-content: space-around">
          <el-image
            style="width: 100px; height: 100px"
            title="点击查看大图"
            :src="url"
            :preview-src-list="srcList"
            show-progress
            :zoom-rate="1.2"
            fit="cover"
            lazy
          >
            <template #toolbar="{ activeIndex }">
              <el-icon @click="download(activeIndex)"><epDownload /></el-icon>
            </template>
          </el-image>

          <el-result icon="success" title="成功！成功！" sub-title="子标题">
            <template #extra>
              <el-button type="primary" size="small">返回</el-button>
            </template>
          </el-result>
        </div>
      </div>
    </div>

    <div>
      <h3>滚动条+无限滚动</h3>
      <el-button @click="toScrolltop">竖向随机滚动</el-button>
      <el-button @click="toScrollleft">横向随机滚动</el-button>
      <p>{{ scrollVal }}</p>
      <h3>使用element指令 v-infinite-scroll 实现无限滚动</h3>
      <el-scrollbar
        class="scrollBarWrap"
        max-height="100%"
        ref="scrollbarRef"
        @scroll="setScrollVal"
      >
        <div class="scrollbar-flex-content">
          <p v-for="item in 15" :key="item" class="scrollbar-demo-item2">
            {{ item }}
          </p>
        </div>
        <div v-infinite-scroll="load" style="background: #b63e4726" :infinite-scroll-distance="100">
          <p v-for="item in count" :key="item" class="scrollbar-demo-item1">
            {{ item }}
          </p>
        </div>
      </el-scrollbar>
      <div>
        <h4 style="margin: 3px 0">当父元素使用 didplay:grid</h4>
        <p>grid是以默认的 content-box 为父元素grid尺寸划分</p>
        <p>margin、padding 不计算在 grid 尺寸内</p>
        <p>如果父元素设置了 box-sizing:border-box; 则在grid尺寸划分时，要包含border和padding尺寸</p>
      </div>
    </div>

    <div>
      <h3>grid布局</h3>
      <!-- https://segmentfault.com/a/1190000044171347 -->
      <p>
        自适应尺寸计算：repeat(3, calc((100% - 20px) / 3))
        <br />
        自适应最低尺寸：repeat(auto-fit, minmax(400px, 1fr));
        <br />
        grid布局的尺寸计算：
        <br />
        grid-template-columns + grid-gap = body.offiectWidth
        <br />
        fr 只是一种度量，设置多少都可以，最后所有fr的和就是父元素的尺寸
      </p>
      <h3>自适应尺寸</h3>
      <div class="gridLearn resizable">
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
      </div>
      <div>
        <h3>固定子元素尺寸</h3>
        <ul class="gridTest resizable">
          <li v-for="t in 13" :key="t">{{ t }}</li>
        </ul>
      </div>
      <div>
        <h3>两头固定尺寸，中间自适应</h3>
        <ul class="gridTest1 resizable">
          <li v-for="t in 3" :key="t">{{ t }}</li>
        </ul>
      </div>

      <div>
        <h3>上下固定尺寸，中间自适应</h3>
        <ul class="gridTest2 resizable2">
          <li v-for="t in 3" :key="t">{{ t }}</li>
        </ul>
      </div>
    </div>

    <div>
      <h3>自定义项表单</h3>
      <el-form
        ref="formRef"
        style="max-width: 500px"
        :model="formData"
        label-width="auto"
        class="demo-ruleForm"
        label-suffix=":"
        require-asterisk-position="right"
        scroll-to-error
        :scroll-into-view-options="{ behavior: 'smooth', block: 'start' }"
      >
        <el-form-item
          v-for="t in initForm"
          :key="t.label"
          :label="t.label"
          :prop="t.prop"
          :rules="t.rules"
        >
          <el-input placeholder="自定义placeholder样式" v-model="formData[t.prop]" type="text" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
          <el-button @click="resetForm(formRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div>
      <h3>文件上传</h3>
      <el-upload
        ref="uploadRef"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :auto-upload="false"
        list-type="text"
        multiple
      >
        <template #trigger>
          <!-- 触发文件选择框的内容 -->
          <el-button type="primary">选择文件</el-button>
        </template>
        <template #tip>
          <p style="font-size: 12px">提示内容</p>
        </template>
        <el-button style="margin-left: 10px" type="success" @click="submitUpload(uploadRef)">
          执行上传
        </el-button>
      </el-upload>
    </div>

    <div>
      <h3>左右滑动走马灯</h3>
      <el-carousel
        indicator-position="none"
        :interval="4000"
        type="card"
        :cardScale="0.7"
        height="110px"
        arrow="never"
      >
        <el-carousel-item v-for="item in 6" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      <h3>上下滑动走马灯</h3>
      <el-carousel
        indicator-position="none"
        direction="vertical"
        :interval="4000"
        type="card"
        height="140px"
      >
        <el-carousel-item v-for="item in 6" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div>
      <h3>表格展示数据</h3>
      <el-descriptions title="列表标题" label-width="60" :column="3" size="small" border>
        <template #extra>
          <el-button type="primary" size="small">按钮</el-button>
        </template>

        <el-descriptions-item>
          <template #label>
            <div>
              <el-icon>
                <epIphone />
              </el-icon>
              标题
            </div>
          </template>
          第一行第二列内容
        </el-descriptions-item>

        <el-descriptions-item :rowspan="2">
          <template #label>
            <div>
              <el-icon>
                <epUser />
              </el-icon>
              标题
            </div>
          </template>
          跨两行内容
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div>
              <el-icon>
                <epLocation />
              </el-icon>
              标题
            </div>
          </template>
          第一行第三列内容
        </el-descriptions-item>

        <el-descriptions-item
          label="不用插槽"
          label-align="right"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          第二行第一列内容
        </el-descriptions-item>

        <el-descriptions-item
          label="不用插槽"
          label-align="right"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          第二行第三列内容
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div>
              <el-icon>
                <epLocation />
              </el-icon>
              标题
            </div>
          </template>
          第三行第一列内容
        </el-descriptions-item>

        <el-descriptions-item align="center">
          <template #label>
            <div>
              <el-icon>
                <epLocation />
              </el-icon>
              标题
            </div>
          </template>
          第三行第二列内容
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <div>
      <h3>表格</h3>
      <el-table
        allow-drag-last-column
        border
        highlight-current-row
        max-height="300"
        row-key="id"
        empty-text="暂无数据"
        ref="isTable1"
        :tooltip-formatter="tooltipFormatter"
        :data="tableData.list"
        header-cell-class-name="tableHeader"
        :row-class-name="setRowClassName"
        :default-sort="tableData.sort"
        @current-change="rowSelect"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" type="selection" width="55" />
        <el-table-column align="center" type="index" label="序号" width="50" fixed="left" />
        <el-table-column
          show-overflow-tooltip
          :sortable="t.sortable"
          v-for="t in tableData.title"
          :key="t.label"
          :prop="t.prop"
          :fixed="t.fixed"
          :label="t.label"
          :min-width="t.minWidth"
          align="center"
        >
          <template #default="scope" v-if="!t.actions">
            <span>{{ scope.row[t.prop] }}</span>
          </template>
          <template #default="scope" v-else>
            <el-button
              v-for="s in t.actions"
              :key="s.label"
              link
              :type="s.type"
              size="small"
              @click.prevent="deleteRow(s.label, scope.row)"
            >
              {{ s.label }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="isPation">
        <div>
          <el-button size="small" type="primary" @click="onAddItem">添加</el-button>
          <el-button size="small" type="warning" @click="setSelect">选中</el-button>
          <el-button size="small" type="info" @click="removeSelect">清空复选框</el-button>
          <el-button size="small" type="success" @click="clearCurrent">清除选中行</el-button>
        </div>
        <el-pagination
          :current-page="tableData.currentPage"
          size="small"
          background
          layout="slot, prev, pager, next,"
          :total="tableData.total"
          :paper-count="5"
          @current-change="handleCurrentChange"
        >
          <template #default>
            <span>共{{ tableData.total }}条</span>
          </template>
        </el-pagination>
      </div>
    </div>

    <div>
      <h3>多级表头表格</h3>
      <el-table
        border
        highlight-current-row
        max-height="300"
        row-key="id"
        :tooltip-formatter="tooltipFormatter"
        :row-class-name="setRowClassName"
        :default-sort="moreHeaderTable.sort"
        empty-text="暂无数据"
        header-cell-class-name="tableHeader"
        ref="isTable2"
        :data="moreHeaderTable.list"
        @current-change="rowSelect"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" type="selection" width="55" />
        <el-table-column align="center" type="index" label="序号" width="50" fixed="left" />
        <el-table-column
          v-for="t in moreHeaderTable.title"
          :key="t.label"
          :sortable="t.sortable"
          :fixed="t.fixed"
          :label="t.label"
          :min-width="t.minWidth"
          align="center"
        >
          <template #default="scope1" v-if="!t.actions">
            <span v-if="!t.children">{{ scope1.row[t.prop] }}</span>
            <el-table-column
              v-else
              v-for="child in t.children"
              :key="child.label"
              :label="child.label"
              :min-width="child.minWidth"
            >
              <template #default="scope2">
                <span v-if="!child.children">
                  {{ scope2.row[child.prop] }}
                </span>
                <el-table-column
                  v-for="grandson in child.children"
                  :key="grandson.label"
                  show-overflow-tooltip
                  :label="grandson.label"
                  v-else
                  :prop="grandson.prop"
                  :min-width="grandson.minWidth"
                  :formatter="formatter"
                ></el-table-column>
              </template>
            </el-table-column>
          </template>

          <template #default="scope" v-else>
            <el-button
              v-for="s in t.actions"
              :key="s.label"
              link
              :type="s.type"
              size="small"
              @click.prevent="deleteRow(s.label, scope.row)"
            >
              {{ s.label }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="isPation">
        <span></span>
        <el-pagination
          :current-page="moreHeaderTable.currentPage"
          size="small"
          background
          layout="slot, prev, pager, next,"
          :total="moreHeaderTable.total"
          :paper-count="5"
          @current-change="handleCurrentChange1"
        >
          <template #default>
            <span>共{{ moreHeaderTable.total }}条</span>
          </template>
        </el-pagination>
      </div>
    </div>

    <div>
      <h3>锚点</h3>
      <div class="affix" ref="affix">
        <div ref="anchorWap" class="affixWap">
          <div id="one">one</div>
          <div id="two">two</div>
          <div id="three">
            <p style="height: 200px">three</p>
            <div id="three_one">three_one</div>
            <div id="three_two">three_two</div>
          </div>
        </div>
        <div>
          <el-anchor
            :select-scroll-top="true"
            :bound="50"
            :offset="10"
            direction="vertical"
            :container="anchorWap"
          >
            <el-anchor-link title="第一栏" href="#one"></el-anchor-link>
            <el-anchor-link title="第二栏" href="#two"></el-anchor-link>
            <el-anchor-link title="第三栏" href="#three">
              <template #sub-link>
                <el-anchor-link title="子第一栏" href="#three_one"></el-anchor-link>
                <el-anchor-link title="子第二栏" href="#three_two"></el-anchor-link>
              </template>
            </el-anchor-link>
          </el-anchor>
          <el-button type="primary" size="small" @click="loadingFn(true)">局部Loading</el-button>
          <el-button type="primary" size="small" @click="loadingFn(false)">全屏Loading</el-button>
          <el-button @click="showMessage" size="small" type="primary">二次确认弹框</el-button>
          <el-tooltip :visible="visible" effect="light" :offset="6">
            <template #content>
              <span>ContentContentContentContentContent</span>
            </template>
            <el-button @click="visible = !visible" size="small">手动触发显示隐藏</el-button>
          </el-tooltip>
          <el-button @click="messageFn" size="small" type="primary">messageFn</el-button>
          <el-button @click="batteryFn" size="small" type="primary">查看电池</el-button>
        </div>
      </div>
    </div>

    <div>
      <h3>elementUI自带动画</h3>
      <el-button @click="collapseType = !collapseType">
        {{ collapseType ? '折叠' : '展开' }}
      </el-button>
      <el-collapse-transition>
        <div v-show="collapseType" style="height: 100px">
          <div class="transition-box">el-collapse-transition</div>
          <div class="transition-box">el-collapse-transition</div>
        </div>
      </el-collapse-transition>

      <div>
        <h3>elementUI国际化</h3>
        <el-button @click="toggle">切换语言：{{ locale === 'zh-cn' ? '中文' : '英文' }}</el-button>
        <el-pagination :total="30" />
        <p>
          自定义翻译：
          <span v-In18:[locale]>lp</span>
        </p>
      </div>

      <div style="display: grid; grid-template-columns: 50% 50%">
        <div>
          <h3>同源多页面实时通信</h3>
          <el-button @click="guangbo">guangbo</el-button>
        </div>
        <div>
          <h3>使用hidden显示隐藏标签</h3>
          <el-button @click="isHidden = !isHidden">{{ isHidden ? '显示' : '隐藏' }}</el-button>
          <span :hidden="isHidden">标签</span>
        </div>
        <div>
          <h3>标签全屏显示</h3>
          <el-button @click="toFullScreenFn">全屏显示</el-button>
          <span ref="toFullScreen" class="full">全屏标签</span>
        </div>
        <div>
          <h3>桌面通知</h3>
          <el-button @click="tongzhi">触发通知</el-button>
        </div>
      </div>
    </div>

    <div>
      <h3>可编辑div标签</h3>
      <div contenteditable="true" class="editDiv"></div>
    </div>

    <div style="display: flex">
      <div>
        <h3>粘连</h3>
        <p>
          让滚动元素每次都自动吸附到规定位置
          <br />
          start center end 三种方式可选
        </p>
        <div class="snap">
          <p v-for="t in 30" :key="t">{{ t === 2 ? 'sticky 粘连' : t }}</p>
        </div>
      </div>
      <div>
        <div class="backgrounds">
          <h3>文字轮廓剪切背景图</h3>
          <p>文字轮廓剪切背景图</p>
        </div>

        <div>
          <h3>投影</h3>
          <div class="hexagon"></div>
        </div>
        <div>
          <h3>径向渐变应用</h3>
          <div class="radialGradient"></div>
        </div>
        <div>
          <h3>内圆弧实现</h3>
          <div class="radialInner"></div>
        </div>
      </div>
    </div>

    <div>
      <h3>剪切板操作</h3>
      <p>鼠标选取复制，用鼠标选取文字</p>
      <p>{{ clipContent1 }}</p>
      <p>使用 navigator.clipboard 复制</p>
      <el-input type="text" v-model="inp">
        <template #append>
          <el-button @click="copy">复制</el-button>
        </template>
      </el-input>
      <p>{{ clipContent2 }}</p>
    </div>

    <div>
      <h3>渐变</h3>
      <div style="display: grid; grid-template-columns: 50% 50%">
        <div>
          <p>
            锥形渐变conic-gradient
            <br />
            径向渐变radial-gradient：
          </p>
          <div class="zhuixing"></div>
        </div>
        <div>
          <p>重复渐变：</p>
          <div class="zhuixing2"></div>
        </div>
        <div>
          <p>径向重复渐变：</p>
          <div class="jingxiang"></div>
        </div>
        <div>
          <p>线形渐变：</p>
          <div class="xianxing"></div>
          <p>重复渐变：</p>
          <div class="chongfu1"></div>
        </div>
      </div>
    </div>

    <div>
      <h3>canvas擦除</h3>
      <el-button @click="makeCanvas">生成Canvas</el-button>
      <div>
        <canvas ref="clipCanvas"></canvas>
      </div>
      <h3>渐变canvas</h3>
      <el-button @click="makeLinerCanvas">生成Canvas</el-button>
      <div>
        <canvas ref="linerCanvas"></canvas>
      </div>
    </div>

    <div>
      <h3>sort排序</h3>
      <p>{{ sortDatas1 }}</p>
      <el-button @click="smallToBig">小到大</el-button>
      <p>{{ sortDatas2 }}</p>
      <el-button @click="bigToSmall">大到小</el-button>
      <h3>Promise执行顺序</h3>
      <el-button @click="promiseTest">执行</el-button>
      {{ actionSort }}
      <p>
        new Promise是同步执行的
        <br />
        then是微任务，但需要执行resolve后才加入到执行队列
        <br />
        await 放到同步队列他就同步执行，放到微任务、setTimeout中，他就让出执行队列给同步任务
      </p>
    </div>
  </div>
</template>
<script setup>
  // 无限滚动
  let scrollVal = ref(0);
  let scrollbarRef = ref(null);
  const count = ref(8);
  const load = () => {
    count.value += 2;
  };
  let toScrolltop = () => {
    let num = Math.floor(
      Math.random() * scrollbarRef.value.$el.children[0].children[0].offsetHeight,
    );
    scrollbarRef.value.setScrollTop(num);
  };
  let toScrollleft = () => {
    let num = Math.floor(Math.random() * scrollbarRef.value.wrapRef.offsetWidth * 0.6);
    scrollbarRef.value.setScrollLeft(num);
  };
  let setScrollVal = ({ scrollTop, scrollLeft }) => {
    scrollVal.value = `top:${Math.trunc(scrollTop)} left:${Math.trunc(scrollLeft)}`;
  };

  // 表单
  const formRef = ref(null);
  const initForm = ref([]);
  Array.from({ length: 5 }, (_, i) => {
    initForm.value.push({
      label: '年龄' + i,
      prop: 'age' + i,
      rules: [{ required: true, message: `请输入年龄${i}`, trigger: 'blur' }],
    });
  });
  let formData = reactive(
    initForm.value.reduce((all, now) => {
      all[now.prop] = '';
      return all;
    }, {}),
  );
  const submitForm = formEl => {
    formEl.validate(valid => {
      if (valid) {
        console.log(formData);
      } else {
        console.log('error submit!');
      }
    });
  };
  const resetForm = formEl => {
    formEl.resetFields();
  };

  // 上传
  const uploadRef = ref(null);
  const submitUpload = e => {
    console.log(e);
  };
  // 图片放大查看
  const url = 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg';
  const srcList = [
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
  ];
  let download = tar => {
    console.log(tar);
  };

  // 表格
  let tableData = reactive({
    title: [
      {
        label: 'Name',
        prop: 'name',
        fixed: 'left',
        minWidth: 60,
      },

      {
        label: 'Other',
        prop: 'other',
        sortable: true,
        minWidth: 90,
      },
      {
        label: 'Address',
        prop: 'address',
        minWidth: 150,
      },
      {
        label: 'State',
        prop: 'state',
        minWidth: 90,
      },
      {
        label: '操作',
        fixed: 'right',
        minWidth: 115,
        actions: [
          {
            label: '删除',
            type: 'danger',
          },
          {
            label: '编辑',
            type: 'info',
          },
        ],
      },
    ],
    list: [],
    currentPage: 1,
    total: 0,
    sort: {
      prop: 'other',
      order: 'descending', // 升序 'ascending' 降序 'descending'
    },
  });
  tableData.list = Array.from({ length: 4 }, (_, index) => ({
    id: index,
    name: 'Tom',
    state: 'California',
    other: `${Math.trunc(Math.random() * 1000000)}`,
    address: 'No. 18, Grove St, Los Angeles',
  }));

  let deleteRow = tar => {
    console.log(tar);
  };
  let onAddItem = () => {
    let arr = Array.from({ length: 10 }, (_, index) => ({
      id: tableData.list.length + index,
      name: 'Tom',
      state: 'California',
      other: `${Math.trunc(Math.random() * 1000000)}`,
      address: 'No. 18, Grove St, Los Angeles',
    }));
    tableData.list.push(...arr);
  };
  // 复选框
  function handleSelectionChange(val) {
    console.log(val);
  }
  // 分页
  watch(
    () => tableData.list.length,
    () => {
      tableData.total = tableData.list.length;
    },
    { immediate: true },
  );
  function handleCurrentChange(num) {
    tableData.currentPage = num;
  }
  let isTable1 = ref(null);
  function setSelect() {
    let num = Math.trunc(Math.random() * tableData.list.length);
    isTable1.value.toggleRowSelection(tableData.list[num]);
  }
  // 清空复选框
  function removeSelect() {
    isTable1.value.clearSelection();
  }
  // 动态设置表格行样式
  function setRowClassName({ row, rowIndex }) {
    if (rowIndex === 0) {
      return 'warning-row';
    } else if (rowIndex === 1) {
      return 'success-row';
    } else if (rowIndex === 2) {
      return 'danger-row';
    } else if (rowIndex > 2 && (rowIndex + 1) % 2) {
      return 'striped-row';
    }
  }
  // 表格行选中
  function rowSelect(val) {
    console.log(val);
  }
  // 清空表格选中行
  let clearCurrent = () => {
    isTable1.value.setCurrentRow(null);
  };
  let tooltipFormatter = tip => {
    return `提示：${tip.cellValue}`;
  };

  // 多级表头表格
  let moreHeaderTable = reactive({
    title: [
      {
        label: '第一列',
        prop: 'one',
      },
      {
        label: '第二列',
        children: [
          {
            label: '第二列第一行',
            prop: 'two',
            minWidth: 60,
          },
          {
            label: '第二列第二行',
            children: [
              {
                label: '第二列第二行第一列',
                prop: 'three',
                minWidth: 155,
                filter: true,
              },
              {
                label: '第二列第二行第二列',
                prop: 'four',
                minWidth: 140,
              },
            ],
          },
        ],
      },
      {
        label: '操作',
        fixed: 'right',
        minWidth: 115,
        actions: [
          {
            label: '删除',
            type: 'danger',
          },
          {
            label: '编辑',
            type: 'info',
          },
        ],
      },
    ],
    list: [],
    currentPage: 1,
    total: 0,
    sort: {
      prop: 'other',
      order: 'descending', // 升序 'ascending' 降序 'descending'
    },
  });
  // 分页
  watch(
    () => moreHeaderTable.list.length,
    () => {
      moreHeaderTable.total = moreHeaderTable.list.length;
    },
  );
  moreHeaderTable.list = Array.from({ length: 4 }, (_, index) => ({
    id: index,
    one: 'Tom',
    two: 'California',
    three: `${Math.trunc(Math.random() * 1000000)}`,
    four: 'No. 18, Grove St, Los Angeles',
  }));
  function handleCurrentChange1(num) {
    tableData.currentPage = num;
  }
  function formatter(row, column, cellValue, index) {
    return `格式化显示:${cellValue}`;
  }
  // 监听滚动变更导航
  let anchorWap = ref(null);
  let affix = ref(null);
  // 遮罩层
  import MyIcon from '@/assets/svg/ppp.svg?raw'; // 返回svg代码
  import MyIcon1 from '@/assets/svg/ppp.svg?url'; // 返回base64码
  function loadingFn(type) {
    let config = {
      lock: true,
      text: '加载中...',
      background: 'rgba(0, 0, 0, 0.15)',
      svg: MyIcon,
      customClass: 'isLoading',
    };
    if (type) {
      config.target = affix.value;
    } else {
      config.fullscreen = true;
    }
    const loading = ElLoading.service(config);
    setTimeout(() => {
      loading.close();
    }, 3000);
  }
  function showMessage() {
    ElMessageBox.confirm('确定要执行此操作吗？', '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        ElMessage.success('操作成功!');
      })
      .catch(() => {
        ElMessage.error('已取消操作');
      });
  }

  function messageFn() {
    ElMessage('This is a message.');
  }
  function batteryFn() {
    navigator.getBattery().then(battery => {
      ElMessage(
        `电池是否正在充电：${battery.charging ? '是' : '否'} 电量：${battery.level * 100}%`,
      );
    });
  }
  // tooltip
  let visible = ref(false);
  // el-collapse-transition
  let collapseType = ref(false);

  // 切换语言
  let { locale } = storeToRefs(localStore()); // store的解构写法
  function toggle() {
    if (locale.value === 'zh-cn') {
      locale.value = 'en';
    } else {
      locale.value = 'zh-cn';
    }
  }

  let channel = new BroadcastChannel('11');
  // 发送数据到频道，从而使同频道内都能接受数据
  function guangbo() {
    window.open(window.location.href);
    setTimeout(() => {
      channel.postMessage('同源跨页面传递数据');
      channel.close(); // 关闭
    }, 2000);
  }
  // 消息监听 方式一
  channel.onmessage = ({ data }) => {
    // 这里写具体的业务逻辑
    if (confirm(data)) {
      window.close();
    }
  };
  // 使用hidden显示隐藏标签
  let isHidden = ref(false);

  // 标签全屏显示
  let toFullScreen = useTemplateRef('toFullScreen');
  function toFullScreenFn() {
    toFullScreen.value.requestFullscreen(); // 使元素全屏
    toFullScreen.value.style.lineHeight = '100vh';
    setTimeout(() => {
      toFullScreen.value.style.lineHeight = '0';
      document.exitFullscreen(); // 退出全屏
    }, 3000); // 退出全屏
  }

  function tongzhi() {
    Notification.requestPermission(status => {
      // default：用户还未被询问是否授权，所以通知不会被显示。
      // granted：表示之前已经询问过用户，并且用户已经授予了显示通知的权限。仅当值为 "granted" 时显示通知
      // denied：用户已经明确的拒绝了显示通知的权限。

      // new Notification(title, options)：title 必填，
      // options 选填，可选参数：
      //{
      // body: 通知中额外显示的字符串
      // tag: 赋予通知一个ID，以便在必要的时候对通知进行刷新、替换或移除。如果tag值相同，只显示一次
      // icon: 一个图片的URL，将被用于显示通知的图标。由于通知不是建立在当前页面的，所以要用完整的图片url
      // vibrate：指定震动模式
      // silent：通知是否静音，false是默认值；true使通知保持沉默。目前还未被实现
      // requireInteraction: true,通知是否持久显示，默认false，一段时间后关闭
      // data: 传递一些数据给监听事件，通知被点击时作为参数传递
      // renotify:true, 新通知替换旧通知后是否应通知用户。默认值为false，这意味着它们不会被通知。需要有tag属性
      //}

      // 显示通知
      let notify = new Notification('通知', {
        vibrate: [100],
        dir: 'rtl',
        body: '通知内容',
        tag: 'one',
        data: 'I like peas.',
        renotify: true,
        image: url,
        icon: url,
      });
      notify.onclick = event => {
        notify.close();
        console.log(notify.data);
        console.log(event);
        window.open('https://www.baidu.com/', '_blank');
      };
      notify.onshow = event => {
        console.log(notify.data);
      };
    });
  }
  // canvas擦除
  let clipCanvas = ref(null);
  function makeCanvas() {
    let x,
      y,
      width = 350,
      height = 150;
    let ctx = clipCanvas.value.getContext('2d');
    clipCanvas.value.width = width;
    clipCanvas.value.height = height;
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, width, height);

    clipCanvas.value.addEventListener('mousedown', e => {
      x = e.offsetX;
      y = e.offsetY;
    });
    clipCanvas.value.addEventListener('mouseup', e => {
      x = y = null;
    });
    clipCanvas.value.addEventListener('mousemove', e => {
      if (x && y) {
        x = e.offsetX;
        y = e.offsetY;
        ctx.save();
        ctx.moveTo(x, y);
        ctx.beginPath();
        /*
          context.arc(x,y,r,sAngle,eAngle,counterclockwise);
            x：圆心的 x 坐标
            y：圆心的 y 坐标
            r：圆的半径
            sAngle：起始角，以弧度计（弧的圆形的三点钟位置是 0 度）
            eAngle：结束角，以弧度计
          */
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.clip();
        ctx.clearRect(0, 0, width, height);
        ctx.restore();
      }
    });
  }
  // 渐变canvas
  let linerCanvas = ref(null);
  function makeLinerCanvas() {
    let width = 350,
      height = 100;
    let ctx = linerCanvas.value.getContext('2d');
    linerCanvas.value.width = width;
    linerCanvas.value.height = height;
    var grd = ctx.createLinearGradient(0, 0, 0, height);
    grd.addColorStop(0, 'pink');
    grd.addColorStop(0.5, 'black');
    grd.addColorStop(1, 'yellow');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);
  }

  // 剪切板操作
  let inp = ref('');
  let clipContent1 = ref('');
  let clipContent2 = ref('');
  document.addEventListener('mouseup', () => {
    let str = window.getSelection().toString();
    if (str) {
      clipContent1.value = str;
    }
  });
  function copy() {
    // 查询浏览器权限
    navigator.permissions.query({ name: 'clipboard-write' }).then(result => {
      // console.log(result);
      // 往剪贴板写入任意文本或二进制数据。
      if (result.state == 'granted' || result.state == 'prompt') {
        navigator.clipboard.writeText(inp.value).then(
          () => {
            console.log('写入成功');
            // navigator.clipboard.readText() 和 navigator.clipboard.read()
            // 方法让你从剪贴板读取任意文本或二进制数据。
            navigator.clipboard.readText().then(t => (clipContent2.value = t));
          },
          () => {
            console.log('写入失败');
          },
        );
      }
    });
  }

  let actionSort = ref([]);
  async function promiseTest() {
    actionSort.value = [];
    actionSort.value.push(1);
    let a = await Promise.resolve(13);
    actionSort.value.push(a);
    setTimeout(() => {
      actionSort.value.push(18);
    });
    let aa = await Promise.resolve(19);
    actionSort.value.push(aa);
    new Promise(async resolve => {
      actionSort.value.push(2);
      setTimeout(async () => {
        actionSort.value.push(3);
        actionSort.value.push(await Promise.resolve(14));
        resolve(9);
        actionSort.value.push(4);
      });
      setTimeout(() => {
        actionSort.value.push(11);
      });
      let c = await Promise.resolve(15);
      actionSort.value.push(c);
      actionSort.value.push(5);
    }).then(async res => {
      let d = await Promise.resolve(16);
      actionSort.value.push(d);
      setTimeout(() => {
        actionSort.value.push(12);
      });
      actionSort.value.push(6);
      setTimeout(() => {
        actionSort.value.push(10);
      });
      let e = await Promise.resolve(17);
      actionSort.value.push(e);
      actionSort.value.push(res);
      actionSort.value.push(7);
    });
    actionSort.value.push(8);
  }

  // 小到大
  let sortDatas1 = ref([12, 23, 16, 21, 45, 3]);
  function smallToBig() {
    sortDatas1.value = sortDatas1.value.sort((a, b) => a - b);
  }
  // 大到小
  let sortDatas2 = ref([12, 23, 16, 21, 45, 3]);
  function bigToSmall() {
    sortDatas2.value = sortDatas2.value.sort((a, b) => b - a);
  }
</script>

<style lang="scss" scoped>
  .resizable {
    resize: horizontal;
    border: 1px solid rgb(187, 187, 187);
    padding: 3px;
    overflow-x: hidden;
  }
  .resizable2 {
    resize: vertical;
    border: 1px solid rgb(187, 187, 187);
    padding: 3px;
    overflow-x: hidden;
  }

  .gridLearn {
    box-sizing: border-box;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
    grid-gap: 10px;
    background-color: #ded7ee;
    > p {
      text-align: center;
    }
    p:nth-child(1) {
      background-color: #ff40b66f;
    }
    p:nth-child(2) {
      background-color: #40ffbf6f;
    }
    p:nth-child(3) {
      background-color: #ff40606f;
    }
    p:nth-child(4) {
      background-color: #e2ff406f;
    }
    p:nth-child(5) {
      background-color: #ff63406f;
    }
  }
  .gridTest {
    background-color: #ff40b66f;
    list-style-type: none;
    display: grid;
    // repeat() 的括号内做很多事情。它接收两个参数，中间用逗号隔开。
    // 第一个参数代表"计数"，第二个参数代表"轨道"，轨道是一列或一行的通用名称
    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr)); // 1fr，即可用空间的几分之一
    grid-gap: 5px 10px;
    justify-content: space-between;
    li {
      background-color: #40ff5d;
      align-self: center;
      justify-self: center;
      text-align: center;
      width: 100%;
    }
  }
  .transition-box {
    width: 200px;
    height: 40px;
    border-radius: 4px;
    background-color: #409eff;
    text-align: center;
    color: #fff;
    padding: 0 10px;
    box-sizing: border-box;
    margin-bottom: 5px;
  }
  :deep(.scrollBarWrap) {
    height: 180px;
    outline: 2px solid #f38ecc;
    outline-offset: 1px;
  }
  .scrollbar-flex-content {
    display: flex;
    position: sticky;
    top: 0;
  }
  .scrollbar-demo-item1,
  .scrollbar-demo-item2 {
    flex-shrink: 0;
    background-color: rgb(195, 140, 246);
    margin: 0 10px 10px 0;
  }
  .scrollbar-demo-item1 {
    width: 95%;
    height: 20px;
  }
  .scrollbar-demo-item2 {
    width: 40px;
    height: 20px;
  }

  .demo-ruleForm ::placeholder {
    color: rgba(165, 162, 162, 0.461);
    font-size: 12px;
    text-indent: 5px;
  }

  .gridTest1 {
    background-color: #ff40b66f;
    list-style-type: none;
    display: grid;
    grid-template-columns: 20px auto 20px;

    li {
      align-self: center;
      justify-self: center;
      text-align: center;
      width: 100%;
    }
    li:nth-child(1) {
      background-color: #40ff5d;
    }
    li:nth-child(2) {
      background-color: #6ca5da;
    }
    li:nth-child(3) {
      background-color: #f2ff40;
    }
  }
  .gridTest2 {
    background-color: #ff40b66f;
    list-style-type: none;
    display: grid;
    height: 100%;
    grid-template-rows: 20px auto 20px;
    li {
      align-self: center;
      text-align: center;
      width: 100%;
    }
    li:nth-child(1) {
      background-color: #40ff5d;
      height: 20px;
    }
    li:nth-child(2) {
      background-color: #6ca5da;
      align-self: auto;
    }
    li:nth-child(3) {
      background-color: #f2ff40;
      height: 20px;
    }
  }

  .badges {
    display: grid;
    grid-template-columns: 30% 35% 35%;
    grid-gap: 10px;
  }

  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 50px;
    margin: 0;
    text-align: center;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }

  :deep(.my-label) {
    background: var(--el-color-success-light-9) !important;
  }
  :deep(.my-content) {
    background: var(--el-color-danger-light-9);
  }

  :deep(.warning-row) {
    background-color: rgb(247, 247, 86);
  }
  :deep(.success-row) {
    background-color: rgb(122, 255, 122);
  }
  :deep(.danger-row) {
    background-color: rgb(255, 133, 154);
  }
  :deep(.striped-row) {
    background-color: rgb(247, 247, 247);
  }
  :deep(.tableHeader) {
    background-color: #f80505 !important;
    color: #5c022b;
  }
  .isPation {
    padding: 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
  }
  .affix {
    height: 350px;
    display: grid;
    grid-template-columns: 70% 30%;
    .affixWap {
      height: 100%;
      overflow-y: auto;
    }
    #one {
      height: 300px;
      background: #409eff;
    }
    #two {
      height: 200px;
      background: #40ff59;
    }
    #three {
      background: #fff240;
    }
    #three_one {
      height: 330px;
      background: #f540ff;
    }
    #three_two {
      height: 320px;
      background: #40ffa0;
    }
  }

  .editDiv {
    width: 300px;
    height: 300px;
    background-color: #ccc;
    resize: vertical;
    overflow: auto;
  }

  .snap {
    width: 200px;
    height: 200px;
    background: #d3dce6;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    p {
      background: #99a9bf;
      padding: 20px 0;
      text-align: center;
      &:not(:last-child) {
        margin-bottom: 30px;
      }
      scroll-snap-align: start; //  center | end;
      &:nth-of-type(2) {
        background: #40ff59;
        position: sticky;
        top: 0px;
      }
    }
  }

  .backgrounds p {
    display: inline-block;
    width: 160px;
    text-align: center;
    line-height: 30px;
    font-size: 30px;
    font-weight: bold;
    letter-spacing: 5px;
    /* transparent：透明效果 */
    color: transparent;
    background-image: url('@/assets/imgs/f.png');
    background-size: cover;
    background-clip: text;
    background-origin: content-box;
    background-position: top 0px right 0px;
  }

  .toLong {
    width: 140px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .toLongMore {
    width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .zhuixing {
    display: inline-block;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background:
      radial-gradient(#fff 0%, #fff 25%, transparent 25%, pink 100%),
      conic-gradient(
        #f1462c 0,
        #f1462c 11.5%,
        #fba73e 12.5%,
        #fba73e 25%,
        #e0fa4e 25%,
        #e0fa4e 37.5%,
        #12dd7e 37.5%,
        #12dd7e 50%,
        #0a6e3f 50%,
        #0a6e3f 62.5%,
        #fff 62.5%,
        #fff 100%
      );
  }
  .zhuixing2 {
    display: inline-block;
    width: 120px;
    height: 120px;
    background: conic-gradient(#fff 90deg, #000 90deg 180deg, #fff 180deg 270deg, #000 270deg) left
      top/25% 25%;
  }

  .jingxiang {
    display: inline-block;
    width: 120px;
    height: 120px;
    background: repeating-radial-gradient(circle at 60% 40%, red 30%, blue 50%);
  }
  .xianxing {
    height: 30px;
    color: white;
    background: linear-gradient(40deg, red 30%, blue 70%);
  }
  .chongfu1 {
    height: 30px;
    /*
      to top, to bottom, to left 和 to right这些值会被转换成角度0度、180度、270度和90度。
      其余值会被转换为一个以向顶部中央方向为起点顺时针旋转的角度。
      渐变线的结束点与其起点中心对称。
    */
    background: repeating-linear-gradient(30deg, lightpink 0, lightpink 5px, white 5px, white 10px);
  }

  .full {
    background: #fff;
    text-align: center;
  }

  .hexagon {
    display: inline-block;
    width: 60px;
    height: 40px;
    background-color: #99a9bf;
    filter: drop-shadow(10px 10px 3px #000);
  }

  .radialGradient {
    width: 100px;
    height: 50px;
    /*通过radial-gradient，用径向渐变创建 "图像"*/
    /*定义了形状:圆形，位置：左下角，颜色：透明，半径：10，背景色：f5f5f5，背景位置：左右各一个*/
    background:
      radial-gradient(circle at top left, transparent 10px, red 35px) left,
      radial-gradient(circle at bottom right, transparent 10px, blue 10px) right;
    /*对应上面左右各一个，这里把背景横向平分50%宽 100%高*/
    background-size: 50% 95%;
    /*必须设置否则去掉上面某些样式，会有多个透明扇形出现*/
    background-repeat: no-repeat;
    border-radius: 10px;
  }
  .radialInner {
    position: relative;
    width: 40px;
    height: 40px;
    background: radial-gradient(
      circle at top left,
      transparent 0%,
      transparent 71%,
      #f32a8f 71%,
      #f32a8f 100%
    );
  }
</style>
