<!-- home -->
<template>
  <div class="index-container">
    <div class="warpper">
      <div class="bannar-img">
        <img src="@/assets/xiaotian.png" />
      </div>
      <div style="text-align: left">
        <p class="bannar-title">
          您好，欢迎来到中国移动合作伙伴大会，我是移动“融智”战略下诞生的智能机器人小天，兼任本次大会的智能导览员～
        </p>
        <p class="bannar-title">
          接下来请跟随我一起游览展台吧～游览过程中完成以下任务，即可获取精美盲盒哦～
        </p>
        <p class="clock-instructions">
          1. 在大会现场找到中移九天公众号二维码并通过微信扫描，打开推送链接<br />
          2.
          根据地图指引，在CHBN打卡点处拍照并上传，小天会自动判断是否打卡成功（每个类别有多个打卡点，只要打卡一次上传成功即可）<br />
          3. 集齐CHBN共4个类别的打卡点，获取小天为您准备的大会独家记忆<br />
          4. 凭本人记忆页面展示给工作人员，即可领取盲盒<br />
        </p>
      </div>
      <button @click="hrefRobotTestBtn">开启打卡之旅</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    hrefRobotTestBtn() {
      this.$router.push({ path: "/robotpage" });
    },
  },
};
</script>
<style lang="scss" scoped>
.index-container {
  height: 100vh;
  width: 100%;
  overflow: auto;
  .warpper {
    background: #fff;
    width: 100%;
    height: 100%;
    text-align: center;
    .bannar-img {
      text-align: center;
      width: 5.5rem;
      height: 5.1rem;
      margin: 0 auto;
      img {
        width: 100%;
      }
    }
    background-color: #143558;
    .bannar-title,
    .clock-instructions {
      text-indent: 0.5rem;
      color: #b8bdc7;
      padding: 0.18rem 1rem;
      line-height: 0.5rem;
    }
    .clock-instructions {
      text-indent: 0;
    }
    button {
      background-color: rgb(0, 195, 255);
      color: #ffffff;
      border-radius: 50px;
      border: none;
      width: 80%;
      height: 1rem;
      font-size: 14px;
      margin: 20px auto;
    }
    span {
      margin-left: 16px;
      font-weight: 500;
    }
  }
}
</style>
