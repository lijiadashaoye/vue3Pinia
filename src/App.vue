<template>
  <ul class="nav">
    <li
      v-for="t in store.navList"
      :key="t.title"
      @click="toRoute(t)"
      :class="{ beSelect: store.nowNav && store.nowNav.type === t.type }"
    >
      {{ t.title }}
      <sub>{{ t.type }}</sub>
    </li>

    <a
      target="_blank"
      style="margin-right: 10px"
      href="https://g2plot.antv.antgroup.com/manual/introduction"
    >
      g2plot官网
    </a>
    <a target="_blank" style="margin-right: 10px" href="https://zhuanlan.zhihu.com/p/394932478">
      计算机图形学
    </a>
    <a target="_blank" style="margin-right: 10px" href="https://dev.nodejs.cn/learn">node文档</a>
    <a
      target="_blank"
      style="margin-right: 10px"
      href="https://x6.antv.antgroup.com/tutorial/getting-started"
    >
      X6
    </a>
    <a
      target="_blank"
      style="margin-right: 10px"
      href="https://gitlab.com/dashboard/projects/personal"
    >
      gitlab
    </a>
    <a target="_blank" style="margin-right: 10px" href="https://zhuanlan.zhihu.com/p/133315049">
      线性代数教程
    </a>
    <a target="_blank" style="margin-right: 10px" href="https://zhuanlan.zhihu.com/p/642594871">
      线性代数笔记
    </a>
    <a target="_blank" style="margin-right: 10px" href="https://zhuanlan.zhihu.com/p/362462011">
      线性代数的本质
    </a>
    <a target="_blank" style="margin-right: 10px" href="https://zhuanlan.zhihu.com/p/453305373">
      线性代数知识点总结
    </a>
  </ul>
  <div class="note">
    <p class="tip">使用了transition的组件，必须只有一个根元素</p>
    <p class="tip">读取文件的写法：new URL('@/assets/files/1.docx', import.meta.url).href</p>
    <p class="globalTip">使用 :global(.class){} 选择器在 &#60;style scoped&#62;中写全局样式</p>
  </div>
  <div class="wap">
    <el-config-provider v-bind="config" :locale="locale === 'en' ? en : zhCn">
      <router-view v-slot="{ Component }">
        <Transition mode="out-in" name="page">
          <keep-alive>
            <component :is="Component">
              <span>路由插槽</span>
            </component>
          </keep-alive>
        </Transition>
      </router-view>
    </el-config-provider>
  </div>
</template>
<script setup>
  let store = appStore();
  let { locale } = storeToRefs(localStore());
  let router = useRouter();
  onMounted(async () => {
    if (!store.navList.length) {
      store.navList = await api.getMethod('/getNav');
      store.nowNav = store.navList[0]; // 直接修改状态
    }
    for (let i = store.navList.length; i--; ) {
      router.addRoute({
        path: `/${store.navList[i].type}`,
        name: store.navList[i].type,
        component: () => import(`@/views/${store.navList[i].type}.vue`),
      });
    }
    toRoute(store.nowNav);
  });

  // 路由跳转
  function toRoute(tar) {
    store.nowNav = tar; // 直接修改状态
    router.push({ name: tar.type });
  }

  import zhCn from '@/assets/files/zh-cn';
  import en from '@/assets/files/en';
  // elementUI 全局配置
  let config = reactive({
    button: {
      // 两个中文字符之间自动插入空格(仅当文本长度为 2 且所有字符均为中文时才生效)
      autoInsertSpace: true,
    },
    zIndex: 500,
    link: { underline: 'never' },
    message: {
      max: 3, // 最大显示数
      showClose: true,
      offset: 100, // 消息框距离顶部的偏移量
      duration: 1000, // 显示时间，单位为毫秒
    },
    valueOnClear: () => null, // 清空时的值
    emptyValues: [undefined, null], // 被认为是空值的数组
  });

  // 依赖注入
  let formApp = ref(0);
  function changeFormApp() {
    formApp.value++;
  }
  provide('formApp', { formApp, changeFormApp });
</script>
<style lang="scss" scoped>
  :global(.globalTip) {
    color: brown;
    padding: 0 10px !important;
  }
  .note {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    background-color: #f5f5f5;
  }
</style>
