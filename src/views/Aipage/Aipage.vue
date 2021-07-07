<template>
  <div class="result-container">
    <img
      class="background"
      src="@/assets/images/aiforum-backgrouond.png"
      alt="submit-button"
    />
    <div @click="formModelShow()" class="button-img">
      <img src="@/assets/images/aiforum-button-1.png" alt="submit-button" />
    </div>
    <ResultForm />
  </div>
</template>
<script>
import ResultForm from "./components/ResultForm";
export default {
  name: "Result",
  components: {
    ResultForm,
  },
  data() {
    return {};
  },
  methods: {
    formModelShow() {
      this.$store.commit("setFormModelShow", true);
    },
  },
};
</script>
<style lang="less" scoped>
.result-container {
  position: relative;
  min-height: 100vh;

  z-index: 2;
  background-color: rgba(0, 15, 71);
  .background {
    width: 100%;
  }

  .button-img {
    position: absolute;
    left: 50%;
    top: 86%;
    transform: translate(-50%);
    img {
      width: 250px;
    }
  }
}
</style>
