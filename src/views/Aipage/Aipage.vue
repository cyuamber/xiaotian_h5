<template>
  <div>
    <p>
      九天深度学习平台提供一站式AI开发服务。请您拨冗注册，立即领取万元体验礼包，专业客服人员将会助您开启数智探索之旅。
    </p>
    <van-button plain type="info" @click="hrefRobotTestBtn"
      >点击跳转</van-button
    >
  </div>
</template>

<script>
export default {
  methods: {
    hrefRobotTestBtn() {
      this.$router.replace({ path: "/airesult" });
    },
  },
};
</script>

<style>
</style>