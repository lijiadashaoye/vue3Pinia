<template>
  <div class="childWap">
    <el-button size="small" @click="changeFormApp">动态provide {{ formApp }}</el-button>
    <el-button size="small" @click="count++">子组件通过slot向父组件传数据</el-button>
    <slot name="header" :count="count"></slot>
    <p class="deepTest">
      :slotted(.class)：可以在子组件中定义父组件中，写在插槽之间的标签的样式
      <br />
      <span class="use_ref">用 v-bind() 将变量</span>
      <span class="use_reactive">作为CSS的值</span>
      <br />
      用 :deep(.class){} 把写在父组件里的样式，穿透作用到所有子组件里
    </p>

    <div class="content">
      <p>content插槽</p>
      <slot name="content"></slot>
    </div>

    <div class="slotIf" v-if="$slots.slotIf">
      <slot name="slotIf" :nowSlot="'slotIf'"></slot>
    </div>
    <div class="slotElse" v-if="$slots.slotElse">
      <slot name="slotElse" :nowSlot="'slotElse'"></slot>
    </div>

    <div class="foot">
      <slot name="foot"></slot>
      <!-- 可以多次渲染一个具名插槽 -->
      <slot name="content"></slot>
    </div>
    <!-- 默认插槽 -->
    <slot></slot>
  </div>
</template>
<script setup>
  let count = ref(0);
  // let solts = useSlots() // 获取当前组件的所有插槽
  // console.log(solts)

  // 定义 expose 方法，用于暴露值和函数给父组件
  defineExpose({
    count,
  });

  // 将值和函数通过 provide 方法传入
  let { formApp, changeFormApp } = inject('formApp', '这是默认值');

  let varColor = ref('blue');
  let bg = reactive({ bg: 'white' });
</script>
<style lang="scss" scoped>
  .childWap {
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: beige;
    position: relative;
    :slotted(.header) {
      width: 100%;
      text-align: center;
      background: rgb(20, 244, 169);
      box-sizing: border-box;
    }
    .content {
      width: 100%;
      background: rgb(127, 255, 153);
      display: flex;
      justify-content: space-between;
      // 用于设置插槽内容的样式
      & :slotted(.sp2) {
        color: v-bind(varColor); // 将 CSS 的值链接到动态的组件状态
      }
    }
    .use_ref {
      color: v-bind(varColor);
    }
    .use_reactive {
      margin-left: 5px;
      background-color: v-bind('bg.bg');
    }
    .foot {
      width: 100%;
      background: rgb(127, 202, 255);
      text-align: center;
    }

    .slotIf {
      color: green;
    }
    .slotElse {
      color: #ea00ff;
    }
  }
</style>
