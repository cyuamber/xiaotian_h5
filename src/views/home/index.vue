<!-- home -->
<template>
  <div class="index-container">
    <div class="warpper">
      <img class="index-img" src="@/assets/images/dashboard.png"  />
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
      this.$router.replace({ path: '/robotpage' })
    }
  }
}
</script>
<style lang="scss" scoped>
.index-container {
  height: 100vh;
  width: 100%;
  overflow: auto;
  background-color: rgb(20,3,40);
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
    .index-img {
        width: 100%;
        height: auto;
        position: absolute;
        top:0;
        left: 0;
    }
    .dashboard-button{
      width: 80%;
      height: 53px;
      position: absolute;
      top: 660px;
      display:flex;
      align-items:center;
      justify-content:center;
      img {
        width: 100%;
        height: auto;
        display: inline-block;
    }
    }
  }
}
</style>
