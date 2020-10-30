<!-- home -->
<template>
  <van-popup
    v-model="formModelShow"
    :style="{
      width: '85%',
      height: '60%',
      top: '45%',
      'border-radius': '15px',
      'background-image':
        'linear-gradient(rgba(49,141,253,0.9), rgba(45,91,209,1))'
    }"
  >
    <div class="content">
      <p class="title">标题</p>
      <van-tabs
        class="vans-tabs"
        background="transparent"
        color="#00F0FF"
        title-inactive-color="#ffffff"
        title-active-color="#00F0FF"
      >
        <van-tab title="手动录入">
          <van-form @submit="onSubmit" class="form">
            <van-field
              class="van-field-box"
              v-for="(item, index) in formInputs"
              :key="index"
              v-model="item.value"
              :label='item.lable'
              :name="item.name"
              :type="item.type"
              :center='true'
              :border='false'
              label-width='3em'
              label-class='lable'
              maxlength='20'
              :rules="[{ required: true, validator:item.type === 'digit' ? telPhoneValidator: null, message: item.message }]"
            >
            <template #button>
             <div class="dividing-line"></div>
            </template>
            </van-field>
            <div class="submit">
               <van-button type="info" native-type="submit" class="van-submit-button"></van-button>
            </div>
          </van-form>
        </van-tab>
        <van-tab title="名片上传" class="card-upload-content">
          <div class="preview">
            <img src="@/assets/images/uploadCard.png" alt="预览">
          </div>
          <div class="footer-button">
            <img class="takephoto" src="@/assets/images/takePhoto.png" alt="拍照">
            <img class="uploadphoto" src="@/assets/images/upload-button.png" alt="上传">
          </div>
        </van-tab>
      </van-tabs>
      <p class="footer-text">
        *可通过手动填写或上传名片来录入您的信息
      </p>
    </div>
  </van-popup>
</template>

<script>
import { FORMINPUTS } from '../../../const/constant'
export default {
  name: 'ResultForm',
  data() {
    return {
      formInputs: FORMINPUTS,
      phoneValidator: /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/
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
    }
  },
  mounted() {},
  methods: {
    onSubmit(values) {
      console.log('-------submit-values', values)
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
    }
  }
}
</script>
<style lang="less" scoped>
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
</style>
