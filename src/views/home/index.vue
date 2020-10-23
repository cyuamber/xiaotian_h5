<!-- home -->
<template>
  <div class="index-container">
    <div class="warpper">
      <img src="@/assets/images/dashboard.png"  />
      <div class="dashboard-button" @click="hrefRobotTestBtn">
        <img src="@/assets/images/dashboard-button.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    hrefRobotTestBtn() {
      this.$router.push({ path: '/robotpage' })
    }
  }
}
</script>
<style lang="scss" scoped>
.index-container {
  height: 100vh;
  width: 100%;
  overflow: auto;
  .warpper {
    width: 100%;
    height: 100%;
    position: relative;
    text-align: center;
    display:flex;
    align-items:center;
    justify-content:center;
//  background: url('../../assets/images/dashboard.jpg') no-repeat center;
//  background-size: cover;
    img {
      width: 100%;
      height: auto;
      display: inline-block;
    }
    .dashboard-button{
      width: 80%;
      height: 53px;
      position: absolute;
      bottom: 0;
      display:flex;
      align-items:center;
      justify-content:center;
    }
  }
}
</style>
