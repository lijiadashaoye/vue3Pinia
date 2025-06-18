<template>
  <ul class="myPopup">
    <li v-for="(item, i) in list" :key="i" @click="liClick(item)">
      <span>{{ item }}</span>
    </li>
  </ul>
</template>

<script setup>
  let emits = defineEmits(['liclick']);
  function liClick(tar) {
    emits('liclick', tar);
  }
  let { list } = defineProps(['list']);
</script>

<style scoped lang="scss">
  :global(.myPopup) {
    background: #e7f9fc;
    padding: 10px 10px 10px 5px;
    border-radius: 5px;
    max-height: 150px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  :global(.myPopup li) {
    width: 100%;
    font-size: 14px;
    text-indent: 3px;
    padding: 5px 0 5px 5px;
    cursor: pointer;
  }
  :global(.myPopup li:hover) {
    background: #e7e7e7;
  }
  :global(::-webkit-scrollbar) {
    width: 0;
  }
</style>
