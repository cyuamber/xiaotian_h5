<!-- home -->
<template>
  <div class="result-form">
    <div :class="{ popup: true, 'van-popup-background': !beforSubmit }">
      <div :class="{ wrap: true, 'wrap-submit': !beforSubmit }">
        <div class="content">
          <div class="vans-tabs">
            <van-form
              @submit="onSubmit"
              class="form"
              validate-trigger="onSubmit"
            >
              <van-field
                class="van-field-box"
                v-for="(item, index) in formInputs"
                :key="index"
                v-model="item.value"
                :label="item.lable"
                :name="item.name"
                :type="item.type"
                :center="true"
                :border="false"
                :label-width="item.type === 'interest' ? '4.5em' : '3em'"
                label-class="lable"
                maxlength="20"
                :rules="[
                  {
                    required: true,
                    validator: item.type === 'digit' ? telPhoneValidator : null,
                    message: item.message,
                  },
                ]"
              >
                <template #button>
                  <div class="dividing-line"></div>
                </template>
              </van-field>
              <div class="submit">
                <van-button
                  type="info"
                  native-type="submit"
                  class="van-submit-button"
                ></van-button>
              </div>
            </van-form>
          </div>
        </div>
        <div class="submit-success" v-if="!beforSubmit">
          <img src="@/assets/images/submit-success.png" alt="提交成功" />
        </div>
        <Loading v-if="LoadingShow" />
        <div class="footer-text" v-if="beforSubmit">
          *可通过手动填写或上传名片来录入您的信息
          <a href="https://mp.weixin.qq.com/s/aJlCaxkdTGMAAuUTmrvTwQ">点击</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { AIFORMINPUTS } from "../../const/constant";
import Loading from "../../components/Loading";
import API from "../../utils/api";
import { axiosPost } from "../../utils/http.js";
import { Notify } from "vant";
const Photograph = () => import("../Robotpage/components/Photograph");
export default {
  name: "AiResult",
  components: {
    Loading,
    Photograph,
  },
  data() {
    return {
      userId: localStorage.getItem("userId"),
      formInputs: AIFORMINPUTS,
      msgSrc: require("../../assets/images/uploadCard.png"),
      uploadUserInfo: null,
      phoneValidator:
        /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/,
    };
  },
  computed: {
    formModelShow: {
      get() {
        return this.$store.state.app.formModelShow;
      },
      set(val) {
        this.$store.commit("setFormModelShow", false);
        this.clearUploadData();
      },
    },
    ...mapState({
      LoadingShow: (state) => state.app.LoadingShow,
      beforSubmit: (state) => state.app.beforSubmit,
    }),
  },
  mounted() {},
  methods: {
    onSubmit(values) {
      const url = API.port8085.saveUserInfo;
      let params = {
        // userId: this.userId,
      };
      params = Object.assign(params, values);
      this.$store.commit("setLoadingShow", true);
      console.log(params, "===>请求参数");
      Notify({
        type: "success",
        message:
          "提交反馈：AI大礼包已预定成功，专属客服将会助您开启数智探索之旅！",
      });
      axiosPost(url, params, params)
        .then((res) => {
          console.log(res);
          if (res && res.code === 200) {
            this.clearUploadData();
            Notify({ type: "success", message: "提交成功" });
          }
          this.$nextTick(() => {
            this.$store.commit("setBeforSubmit", false);
            this.$store.commit("setLoadingShow", false);
          });
        })
        .catch((error) => {
          if (
            error.code === "ECONNABORTED" ||
            error.message === "Network Error" ||
            error.message.includes("timeout")
          ) {
            Notify("网络超时");
          }
          this.formInputs.map((item) => {
            item.value = null;
          });
          this.$store.commit("setLoadingShow", false);
        });
    },
    telPhoneValidator(val) {
      const validatorResult = this.phoneValidator.test(val);
      if (!validatorResult) {
        this.formInputs.map((item) => {
          if (item.name === "phone") {
            item.message = "请输入正确的手机号";
            item.value = null;
          }
        });
        return false;
      }
    },
    closed() {
      this.$store.commit("setBeforSubmit", true);
    },
    photoMsg(uploadUserInfo) {
      console.log(uploadUserInfo);
      this.uploadUserInfo = uploadUserInfo;
      this.msgSrc = uploadUserInfo.msgPreviewSrc;
    },

    clearUploadData() {
      this.formInputs.map((item) => {
        item.value = null;
      });
      this.uploadUserInfo = null;
      this.msgSrc = require("../../assets/images/uploadCard.png");
    },
  },
  beforeDestroy() {},
};
</script>
<style lang="less">
.result-form {
  .van-popup-background {
    top: 175px !important;
    height: 253px !important;
    width: 191px !important;
  }
  .wrap-submit {
    height: 191px !important;
    width: 191px !important;
  }

  .popup {
    top: 78px;
    width: 300px;
    height: 510px;
    background: transparent;
  }
  .wrap {
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(
      rgba(49, 141, 253, 0.9),
      rgba(45, 91, 209, 1)
    );
    position: absolute;
    top: 0;
    .footer-text {
      color: #7fa2e9;
      width: 100%;
      position: absolute;
      bottom: 33px;
      font-size: 14px;
      text-align: center;
    }
  }
  .content {
    color: #fff;
    width: 257px;
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
      .form {
        padding-top: 13px;
        border-top: 1px solid rgba(255, 255, 255, 0.4);
        margin-top: -1px;
        .van-field-box {
          font-size: 17px;
          font-family: PingFangSC-Regular;
          width: 100%;
          color: #ffffff !important;
          background: transparent;
          border-radius: 10px;
          margin: 15px auto;
          border: 1px solid #cfe3ff;
          .van-field__label,
          .van-field__control {
            position: relative;
            color: #ffffff !important;
            z-index: 1;
          }
          .van-field__value {
            .van-field__body {
              input {
                letter-spacing: 2px !important;
              }
            }
          }
          .van-field__error-message {
            position: absolute;
            top: 0;
            z-index: 0;
            color: #fff;
          }
          .dividing-line {
            width: 1px;
            height: 100%;
            border-right: 1px solid #cfe3ff;
            position: absolute;
            left: -13%;
            top: 0;
          }
        }
        .submit {
          .van-submit-button {
            background: url("../../assets/images/formSubmit.png") no-repeat;
            background-size: cover;
            width: 280px;
            height: 55px;
            border: none;
            margin-left: -15px;
          }
          .van-button::before {
            background: transparent;
          }
        }
      }
      .card-upload-content {
        .preview {
          box-sizing: content-box;
          width: 100%;
          height: 163px;
          padding-top: 21px;
          padding-bottom: 10px;
          margin: -1px auto 0 auto;
          border-top: 1px solid rgba(255, 255, 255, 0.4);
          text-align: center;
          img {
            width: 100%;
          }
          .img-preview {
            width: 35%;
          }
        }
        .footer-button {
          width: 108%;
          text-align: center;
          margin-left: -9px;
          .takephoto,
          .uploadphoto {
            position: relative;
            width: 50%;
            display: inline-block;
            img {
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
  .submit-success {
    width: 100%;
    height: auto;
    text-align: center;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
}
</style>
