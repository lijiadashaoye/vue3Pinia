<template>
  <div>
    动态组件2-{{ inputProps }}
    <p v-bind="$attrs">组件可能含有多个根节点时自定义指令将会被忽略</p>
  </div>
</template>
<script setup>
  defineOptions({ inheritAttrs: false });
  let { inputProps } = defineProps({ inputProps: { type: String } });
</script>
<style scoped lang="scss">
  .attrs {
    color: rgb(180, 2, 133);
  }
</style>
