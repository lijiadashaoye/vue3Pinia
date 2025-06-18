<template>
  <p class="test">5555-{{ num }}</p>
</template>

<script>
  export default {
    props: ['num'],
  };
</script>

<style scoped>
  .test {
    color: red;
    margin: 0;
  }
</style>
