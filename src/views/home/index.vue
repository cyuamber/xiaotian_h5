<!-- home -->
<template>
  <div class="index-container">
    <div class="warpper">
      <div class="index-content">
        <div class="index-rules">
          <div class="rule-item" v-for="(item, index) in checkRules" :key=index>
            {{index+1}}.{{item}}
          </div>
        </div>
        <div class="dashboard-button" @click="hrefRobotTestBtn">
          <img src="@/assets/images/dashboard-button.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get_UserName } from '../../utils/index.js'
import { CHECKRULES } from '../../const/constant.js'
export default {
  data() {
    return {
      checkRules: CHECKRULES,
    }
  },
  mounted() {
    if (localStorage.getItem('userId') === undefined || localStorage.getItem('userId') === null) {
      localStorage.setItem('userId', get_UserName(32))
    }
    this.$nextTick(() => {
      this.swipeHeight = window.innerHeight
    })
  },
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
  background-color: #2457CA;
  .warpper {
    width: 100%;
    height: 100%;
    position: relative;
    text-align: center;
    display:flex;
    align-items:center;
    justify-content:center;
    background: url('../../assets/images/home-background.png') no-repeat;
    background-size: 375px 720px;
    cursor: pointer;
    .index-content {
        position: absolute;
        top: 510px;
        z-index: 2;
        .index-rules {
          font-size: 14px;
          line-height: 18px;
          text-align: left;
          color: rgb(151,207,250);
          margin: 0 22px 2px 22px;
          .rule-item {
            margin-bottom: 14px;
          }
      }
        .dashboard-button{
          width: 80%;
          height: 53px;
          margin: 0 auto;
          img {
            width: 100%;
            height: auto;
            display: inline-block;
          }
      }
    }
  }
}
</style>
