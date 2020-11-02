<!-- home -->
<template>
  <div></div>
</template>

<script>
import { mapState } from 'vuex'
import API from '../../../utils/api'
import { axiosPost } from '../../../utils/http.js'
export default {
  name: 'Uploadimage',
  components: {
  },
  data() {
    return {
      userId: localStorage.getItem('userId'),
      beforSubmit: true
    }
  },
  computed: {
    formModelShow: {
      get() {
        return this.$store.state.app.formModelShow
      },
      set(val) {
        this.$store.commit('setFormModelShow', false)
      }
    },
    ...mapState({
      LoadingShow: (state) => state.app.LoadingShow
    })
  },
  mounted() {},
  methods: {
    onSubmit(values) {
      console.log('-------submit-values', values)
      const url = API.port8085.saveUserInfo
      let params = {
        userId: this.userId
      }
      params = Object.assign(params, values)
      this.$store.commit('setLoadingShow', true)
      axiosPost(url, params, params)
        .then((res) => {
          console.log(res)
          if (res && res.code === 200) {
            this.formInputs.map(item => {
              item.value = null
            })
          }
          this.$nextTick(() => {
            this.beforSubmit = false
            this.$store.commit('setLoadingShow', false)
          })
        })
        .catch(() => {
          this.formInputs.map(item => {
            item.value = null
          })
          this.$store.commit('setLoadingShow', false)
        })
    },
    postSend() {

    },
    telPhoneValidator(val) {
      const validatorResult = this.phoneValidator.test(val)
      if (!validatorResult) {
        this.formInputs.map(item => {
          if (item.name === 'phoneNumber') {
            item.value = null
            item.message = '请输入正确的手机号'
          }
        })
      }
      return validatorResult
    },
    closed() {
      this.beforSubmit = true
    }
  },
  beforeDestroy() {
  }
}
</script>
<style lang="less" scoped>
.van-popup-background{
  background: transparent!important;
  top:50%!important;
  height: 50%!important;
  /deep/ .van-icon{
    left: 45%;
    bottom: 25%;
  }
}
.content {
  color: #fff;
  width: 80%;
  height: 95%;
  margin: 0 auto;
  p.title {
    width: 100%;
    text-align: center;
    margin: 15px auto;
    font-size: 16px;
    font-weight: 700;
  }
  .vans-tabs {
    color: #fff;
    .form{
      margin: 10px auto;
      .van-field-box{
        width: 100%;
        color: #fff!important;
        background: transparent;
        border-radius: 10px;
        margin: 15px auto;
        border:1px solid #cfe3ff;
        /deep/ .van-field__label, /deep/ .van-field__control{
          color: #fff!important;
        }
        /deep/ .van-field__error-message{
          position: absolute;
          top:0;
          z-index: -1;
        }
        .dividing-line{
          width: 1px;
          height: 100%;
          border-right:1px solid #cfe3ff;
          position: absolute;
          left: -13%;
          top: 0;
        }
      }
      .submit{
        .van-submit-button{
          background: url('../../../assets/images/formSubmit.png') no-repeat;
          background-size: cover;
          width: 108%;
          border:none;
          margin-left: -10px;
        }
        /deep/ .van-button::before{
          background: transparent;
        }
      }
    }
    .card-upload-content{
      .preview{
        width: 100%;
        height: auto;
        margin: 10px auto;
        img{
          width: 100%;
        }
      }
      .footer-button{
        width: 108%;
        text-align: center;
        margin-left: -9px;
        .takephoto,.uploadphoto{
          width: 50%;
        }
      }
    }
  }
  .footer-text{
    color: #7FA2E9;
    width: 100%;
    margin: 10px auto;
    font-size: 12px;
  }
}
.submit-success{
  width: 80%;
  height: auto;
  text-align: center;
  margin: 0 auto;
  img{
    width: 100%;
  }
}
</style>
