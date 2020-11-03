<!-- home -->
<template>
  <div class="result-form">
    <van-popup
      v-model="formModelShow"
      :closeable='!beforSubmit'
      close-icon="close"
      close-icon-position="bottom"
      @closed="closed()"
      :class="{'popup':true, 'van-popup-background':!beforSubmit}"
      position="top"
      :style="{
        'border-radius': '15px',
        'background-image':'linear-gradient(rgba(49,141,253,0.9), rgba(45,91,209,1))',
        'position': 'absolute', 'left': '50%', 'transform': 'translate(-50%)'
      }"
    >
      <div class="content" v-if="beforSubmit">
        <p class="title">标题</p>
        <div class="tab-line"></div>
        <van-tabs
          class="vans-tabs"
          background="transparent"
          color="#00F0FF"
          title-inactive-color="#ffffff"
          title-active-color="#00F0FF"
           @change="tabsOnChange"
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
               <img
              :src="msgSrc"
              alt="预览"
              @click="showImage(msgSrc)"
              :class="{ 'img-preview':msgSrc !== require('../../../assets/images/uploadCard.png')}">
            </div>
            <div class="footer-button">
              <div class="takephoto">
                <img  src="@/assets/images/takePhoto.png" alt="拍照">
                <Photograph :msgSrc="msgSrc" @photoMsg="photoMsg" />
              </div>
            <div class="uploadphoto">
              <img src="@/assets/images/upload-button.png" alt="上传" @click="afterRead()">
            </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <div class="submit-success" v-if="!beforSubmit">
        <img src="@/assets/images/submit-success.png" alt="提交成功">
      </div>
      <Loading v-if="LoadingShow" />
      <p class="footer-text">
        *可通过手动填写或上传名片来录入您的信息
      </p>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { FORMINPUTS } from '../../../const/constant'
import Loading from '../../../components/Loading'
import { ImagePreview } from 'vant'
import API from '../../../utils/api'
import { axiosPost } from '../../../utils/http.js'
const Photograph = () => import('../../Robotpage/components/Photograph')
export default {
  name: 'ResultForm',
  components: {
    Loading,
    Photograph
  },
  data() {
    return {
      // userName: localStorage.getItem('userName'),
      userId: localStorage.getItem('userId'),
      formInputs: FORMINPUTS,
      msgSrc: require('../../../assets/images/uploadCard.png'),
      uploadUserInfo: null,
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
        this.clearUploadData()
      }
    },
    ...mapState({
      LoadingShow: (state) => state.app.LoadingShow,
      beforSubmit: (state) => state.app.beforSubmit
    })
  },
  mounted() {},
  methods: {
    tabsOnChange() {
      this.clearUploadData()
    },
    onSubmit(values) {
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
            this.clearUploadData()
          }
          this.$nextTick(() => {
            this.$store.commit('setBeforSubmit', false)
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
    telPhoneValidator(val) {
      const validatorResult = this.phoneValidator.test(val)
      if (!validatorResult) {
        this.formInputs.map(item => {
          if (item.name === 'phone') {
            item.message = '请输入正确的手机号'
            item.value = null
          }
        })
        return false
      }
    },
    closed() {
      this.$store.commit('setBeforSubmit', true)
    },
    photoMsg(uploadUserInfo) {
      console.log(uploadUserInfo)
      this.uploadUserInfo = uploadUserInfo
      this.msgSrc = uploadUserInfo.msgPreviewSrc
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      if (this.uploadUserInfo !== null) {
        const imgFile = this.uploadUserInfo.imgFile
        const formData = new FormData()
        formData.append('image', imgFile)
        const headers = {
          'Content-Type': 'multipart/formdata;charset=utf-8',
          'X-CSRF-Token': window.localStorage.getItem('token')
        }
        const params = {
          userId: this.userId,
          username: this.userName
        }
        const url = API.port8085.saveUserInfo
        this.$store.commit('setLoadingShow', true)
        axiosPost(url, params, formData, headers)
          .then((res) => {
            if (res && res.code === 200) {
              this.clearUploadData()
            }
            this.$nextTick(() => {
              this.$store.commit('setBeforSubmit', false)
              this.$store.commit('setLoadingShow', false)
            })
          })
          .catch(() => {
            this.$store.commit('setBeforSubmit', false)
            this.$store.commit('setLoadingShow', false)
          })
      } else {
        console.log('请先拍照，再上传照片')
      }
    },
    showImage(img) {
      if (this.uploadUserInfo !== null) {
        ImagePreview([img])
      }
    },
    clearUploadData() {
      this.formInputs.map(item => {
        item.value = null
      })
      this.uploadUserInfo = null
      this.msgSrc = require('../../../assets/images/uploadCard.png')
    }
  },
  beforeDestroy() {
  }
}
</script>
<style lang="less">
.result-form {
  .van-popup-background{
    background: transparent!important;
    top:50%!important;
    height: 50%!important;
    /deep/ .van-icon{
      left: 45%;
      bottom: 12%;
    }
  }
  .tab-line {
    position: absolute;
    top: 115px;
    border-bottom: 1px solid white;
    width: 286px;
  }
  .van-tabs__line {
    width: 143px;
    height: 2px;
  }
  .van-tab {
    font-size: 17px!important;
  }
  .popup {
    top: 78px;
    width: 330px;
    height: 448px;
    .footer-text {
      color: #7FA2E9;
      width: 100%;
      position: absolute;
      bottom: 15px;
      font-size: 14px;
      text-align: center;
    }
  }
  .content {
    color: #fff;
    width: 287px;
    margin: 0 auto;
    p.title {
      width: 100%;
      text-align: center;
      margin-top: 25px;
      margin-bottom: 15px;
      font-size: 23px;
      font-weight: 700;
    }
    .vans-tabs {
      color: #fff;
      .form{
        margin-top: 26px;
        .van-field-box{
          font-size: 17px;
          font-family: PingFangSC-Regular;
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
            width: 315px;
            height: 55px;
            border:none;
            margin-left: -15px;
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
          margin: 21px auto 10px auto;
          text-align: center;
          img{
            width: 100%;
          }
          .img-preview{
            width: 35%;
          }
        }
        .footer-button{
          width: 108%;
          text-align: center;
          margin-left: -9px;
          .takephoto,.uploadphoto{
            position: relative;
            width: 50%;
            display: inline-block;
            img{
              width: 100%;
            }
          }
          .takephoto input[type="file"] {
            position: absolute;
            left: 0;
            top: 0;
            width: 90%;
            height: 70%;
            z-index: 9;
            opacity: 0;
          }
        }
      }
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
}
</style>
