<template>
  <div>
    <p>defineProps接收的name：{{ name }}</p>
    <p>computed后的name：{{ computedName }}</p>
    <p>
      自定义v-model:
      <el-input v-model.lazy.trim="Val" style="width: 200px" clearable />
    </p>
    <p>
      自定义穿透：
      <span v-bind="attrs">v-bind="attrs" 穿透局部继承class</span>
    </p>
  </div>
</template>
<script setup>
  // defineModel() 返回的值是一个 ref
  const [Val, modelModifiers] = defineModel({
    // get我们这里不需要
    set(value) {
      return value;
    },
  });
  // console.log('原始值', Val); // 原始值
  // console.log('修饰符', modelModifiers); // 修饰符

  let { name } = defineProps({
    name: {
      type: [String, Object, null],
      // 只有为undefined 或者 ref() 为空值时才会触发default函数
      // 为null不会触发default函数
      default(rawProps) {
        console.log(rawProps);
        return '97897';
      },
    },
  });

  let computedName;
  watch(
    () => name,
    val => {
      computedName = computed(() => {
        return `watch里写computed${val}`;
      });
    },
  );

  let emit = defineEmits({
    // 没有校验
    otherEmit: null,
    childEmit(data) {
      // data为emit()方法的第二个参数（返回的数据）
      // 通过返回值为 `true` 还是为 `false` 来判断验证是否通过，
      // 不通过时不会向上触发父组件的事件
      return true;
    },
  });
  // 只有子组件定义了 defineExpose，父组件才能读取到子组件的属性、方法
  defineExpose({ toEmit });
  function toEmit() {
    emit('otherEmit', Math.trunc(Math.random() * 100));
  }

  // 让子组件局部继承attribute
  defineOptions({ name: 'child1', inheritAttrs: false });
  // “透传 attribute”指的是传递给一个组件，却没有被该组件声明为 props
  // 或 emits 的 attribute 或者 v-on 事件监听器。
  const attrs = useAttrs(); // 访问一个组件的所有透传 attribute
  // console.log(attrs);
</script>
<style scoped>
  .testAttr {
    color: brown;
  }
</style>
