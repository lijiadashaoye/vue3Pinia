<template>
  <div ref="container" style="height: 100%"></div>
</template>
<script setup>
  import { initSheet, changeText, disposeAll } from './init';
  let emit = defineEmits(['saveData', 'xsheetShowImgs', 'closeLoading', 'OtherFn', 'selectChange','resetAllListener']);
  let container = ref(null);
  let resolveData = ref(null);
  let { datas } = defineProps({
    datas: {
      type: Array,
      default: () => [],
    },
  });
  defineExpose({
    changeText,
    resolveData,
    OtherFn,resetAllListener
  });
  onMounted(() => {
    initSheet(container.value, datas, emit).then(res => {
      resolveData.value = res;
    });
  });
  watch(
    () => resolveData.value,
    () => {
      emit('selectChange', {
        row: resolveData.value.select.row,
        col: resolveData.value.select.col,
      });
    },
    { deep: true },
  );
  onUnmounted(() => {
    disposeAll();
  });
</script>

