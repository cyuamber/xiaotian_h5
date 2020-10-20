<template>
    <van-loading type="spinner" color="#1989fa" class="loading" />
</template>

<script>
export default {
  name: 'Loading',
  data() {
    return {}
  },
  methods: {
  }
}
</script>

<style>
.loading {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
