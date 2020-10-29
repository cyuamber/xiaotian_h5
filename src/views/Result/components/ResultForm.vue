<!-- home -->
<template>
   <van-popup
          v-model="formModelShow"
          :style="{ width: '80%', height: '50%', 'border-radius':'15px', 'background-image': 'linear-gradient(rgba(49,141,253,0.9), rgba(45,91,209,1))' }"
        >

  </van-popup>
</template>

<script>
export default {
  name: 'ResultForm',
  computed: {
    formModelShow: {
      get() {
        return this.$store.state.app.formModelShow
      },
      set(val) {
        this.$store.commit('setFormModelShow', false)
      }
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>

</style>
