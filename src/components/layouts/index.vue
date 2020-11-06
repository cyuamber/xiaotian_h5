<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppLayout',
  data() {
    return {}
  },
  methods: {}
}
</script>
<style>
*{
   -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.app-container {
  background-color: #063399;
  padding: 0 !important;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  /* background: url('../../assets/images/dashboard.jpg') no-repeat center;
  background-size: cover; */
}
</style>
