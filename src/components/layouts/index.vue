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
  name: "AppLayout",
  data() {
    return {};
  },
  methods: {},
};
</script>
<style>
.app-container {
  padding: 0 !important;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #143558;
}
</style>
