<!-- home -->
<template>
  <div class="index-container">
    <div class="warpper">
       <div class="bannar-img">
          <img src="@/assets/xiaotian.png" />
       </div>
          <p class="bannar-title">
            您好，欢迎来到中国移动合作伙伴大会，我是移动“融智”战略下诞生的智能机器人小天，兼任本次大会的智能导览员～
        </p>
        <p class="bannar-title">
          接下来请跟随我一起游览展台吧～游览过程中完成以下任务，即可获取精美盲盒哦～
        </p>
        <p class="clock-instructions">
          1. 在大会现场找到中移九天公众号二维码并通过微信扫描，打开推送链接<br/>
          2. 根据地图指引，在CHBN打卡点处拍照并上传，小天会自动判断是否打卡成功（每个类别有多个打卡点，只要打卡一次上传成功即可）<br/>
          3. 集齐CHBN共4个类别的打卡点，获取小天为您准备的大会独家记忆<br/>
          4. 凭本人记忆页面展示给工作人员，即可领取盲盒<br/>
        </p>
      <button @click="hrefRobotTestBtn">开启打卡之旅</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
  
    }
  },

  computed: {},

  mounted() {
    
   },

  methods: {
    hrefRobotTestBtn(){
      this.$router.push({ path:'/about'  })
      }
  }
}
</script>
<style lang="scss" scoped>
.index-container {
  height: 100vh;
  width: 100%;
  .warpper {
    background: #fff;
    width: 100%;
    height: 100%;
    .bannar-img{
      text-align: center;
       img {
        width: 5.5rem;
        height: 5.1rem;
        // margin-bottom: 0.25rem;
      }
    }
    background-color: #143558;
    // background-size: cover;
    .bannar-title, .clock-instructions {
        text-indent: 0.5rem;
        color:#B8BDC7;
        padding: 0.18rem 1rem;
        line-height:0.5rem
    }
    .clock-instructions{
        text-indent:0;
    }
      button {
        position: fixed;
        bottom: 15%;
        left: 50%;
        margin-left: -40%;
        background-color: rgb(0, 195, 255);
        color: #ffffff;
        border-radius: 50px;
        border: none;
        width: 80%;
        height: 1rem;
        font-size: 14px;
      }
      span {
        margin-left: 16px;
        font-weight: 500;
      }
  }
}
</style>
