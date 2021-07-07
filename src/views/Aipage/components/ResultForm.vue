<!-- home -->
<template>
  <div class="result-form">
    <van-popup
      v-model="formModelShow"
      @closed="closed()"
      class="popup"
      position="top"
    >
      <div
        :class="{
          'popup-container': true,
          'sumbit-container': beforSubmit,
          'note-container': !beforSubmit,
        }"
      >
        <div class="content" v-if="beforSubmit">
          <p class="title">提交信息</p>
          <p class="subtitle">领取特别礼包</p>
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
                label-width="3em"
                label-class="lable"
                maxlength="20"
                :rules="[
                  {
                    required: item.type === 'company' ? false : true,
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

        <div class="submit-success" v-if="!beforSubmit && successToast">
          <img src="@/assets/images/aiforum-success.png" alt="提交成功" />
        </div>
        <div class="submit-success" v-if="!beforSubmit && failToast">
          <img src="@/assets/images/aiforum-fail.png" alt="提交失败" />
        </div>
      </div>

      <div class="popup-icon" @click="closeNote()">
        <img src="@/assets/images/close.png" />
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { AIFORMINPUTS } from "../../../const/constant";
import Loading from "../../../components/Loading";
import API from "../../../utils/api";
import { axiosPost } from "../../../utils/http.js";
import { Notify } from "vant";
export default {
  name: "ResultForm",
  components: {
    Loading,
  },
  data() {
    return {
      showSuccess: false,
      showFaild: false,
      formInputs: AIFORMINPUTS,
      uploadUserInfo: null,
      phoneValidator:
        /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/,
    };
  },

  computed: {
    ...mapState({
      beforSubmit: (state) => state.aiforum.beforSubmit,
      failToast: (state) => state.aiforum.failToast,
      successToast: (state) => state.aiforum.successToast,
    }),
    formModelShow: {
      get() {
        return this.$store.state.aiforum.formModelShow;
      },
      set(val) {
        this.$store.commit("setFormModelShow", false);
        this.clearUploadData();
      },
    },
  },

  methods: {
    onSubmit(values) {
      const url = API.port8085.saveUserInfo;
      const params = Object.assign({}, values);
      axiosPost(url, params, params)
        .then((res) => {
          if (res && res.code === 200) {
            this.$store.commit("setBeforSubmit", false);
            this.clearUploadData();
            this.$store.commit("setToastStatus", {
              success: true,
              fail: false,
            });
          } else {
            this.$store.commit("setBeforSubmit", false);
            this.$store.commit("setToastStatus", {
              success: false,
              fail: true,
            });
          }
        })
        .catch((error) => {
          if (
            +error.code !== 200 ||
            error.message === "Network Error" ||
            error.message.includes("timeout")
          ) {
            Notify("网络超时");
          }
          this.formInputs.map((item) => {
            item.value = null;
          });
          this.$store.commit("setToastStatus", {
            success: false,
            fail: true,
          });
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
      console.log("---close");
      this.$store.commit("setBeforSubmit", true);
      this.$store.commit("setToastStatus", { success: false, fail: false });
      this.clearUploadData();
    },
    closeNote() {
      console.log("---closeNote");
      this.$store.commit("setFormModelShow", false);
    },

    clearUploadData() {
      this.formInputs.map((item) => {
        item.value = null;
      });
    },
  },
  beforeDestroy() {},
};
</script>
<style lang="less">
.result-form {
  .van-overlay {
    background-color: rgba(0, 0, 0, 0.8);
  }
  .popup {
    width: 300px;
    position: fixed;
    left: 50%;
    top: 49%;
    transform: translate(-50%, -50%);
    background: transparent;
    .note-container {
      background: transparents;
    }
    .sumbit-container {
      background-image: linear-gradient(
        rgba(49, 141, 253, 0.9),
        rgba(45, 91, 209, 1)
      );
    }
    .popup-container {
      border-radius: 15px;

      .content {
        color: #fff;
        width: 257px;
        margin: 0 auto;
        padding-top: 15px;
        p.title {
          width: 100%;
          text-align: center;
          margin-bottom: 8px;
          font-size: 20px;
          font-weight: 700;
        }
        p.subtitle {
          width: 100%;
          text-align: center;
          margin: 0;
          font-size: 18px;
          color: #c3dcfe;
        }
        .vans-tabs {
          color: #fff;
          .form {
            margin-top: -1px;
            .van-field-box {
              font-size: 17px;
              font-family: PingFangSC-Regular;
              width: 100%;
              color: #ffffff !important;
              background: transparent;
              border-radius: 10px;
              margin: 15px auto;
              border: 1px solid rgba(255, 255, 255, 0.6);
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
                background: url("../../../assets/images/aiforum-submit-button.png")
                  no-repeat;
                background-size: cover;
                width: 280px;
                height: 55px;
                border: none;
                margin-left: -15px;
                margin-bottom: 20px;
              }
              .van-button::before {
                background: transparent;
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
          width: 90%;
        }
      }
      .close-icon {
        color: #fff;
        position: absolute;
        left: 45%;

        z-index: 1000000;
        img {
          width: 30px;
        }
      }
    }
    .popup-icon {
      text-align: center;
      img {
        width: 35px;
        margin-top: 10px;
      }
    }
  }
}
</style>
