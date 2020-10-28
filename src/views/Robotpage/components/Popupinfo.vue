<template>
 <van-popup
          v-model="toppPointmodelShow"
          :style="{ width: '80%', height: '50%', 'border-radius':'15px' }"
        >
          <van-swipe
            class="my-swipe"
            indicator-color="#3F57F1"
            style="height: 100%"
            ref="swipe"
            :initial-swipe='swipeToNumber'
          >
            <van-swipe-item v-for="(item, index) in popupInfoImg" :key="index">
              <div class="info">
                <div class="title">
                    <img
                    :src="item.popupinfoIconSrc"
                    alt="">
                    <p class="title-text">
                      {{item.popupinfoTitleEn}}<br/>{{item.popupinfoTitleCH}}
                    </p>
                </div>
                <p class="info-content">
                  {{item.infoContent}}
                </p>
                <div class="check_button">
                  <img
                  v-if="allPhotoIschecked"
                  @click="hrefRobotTestBtn()"
                  :src="require('../../../assets/images/viewResults.png')"
                  alt="查看结果">
                  <img
                  v-if="!allPhotoIschecked"
                  :src="item.isCheck ?require('../../../assets/images/Popupinfo_button_checked.png'):require('../../../assets/images/Popupinfo_button_unchecked.png')"
                  >
                  <Photograph v-if="!item.isCheck" :msgList="msgLists" @photoMsg='photoMsg'/>
                </div>
              </div>
            </van-swipe-item>
          </van-swipe>
  </van-popup>
</template>
<style lang="less" scoped>
  .info{
    width: 100%;
    height: 100%;
    background-image: linear-gradient(rgba(32,44,238,0.9), rgba(20,24,113,1));
    color: #6888FD;
    .title{
      width: 60%;
      margin: 0 auto;
      text-align: center;
      padding-top: 30px;
      img{
        width: 25%;
        border-radius: 50%;
        display: inline-block;
        vertical-align: top;
      }
      .title-text{
        display: inline-block;
        margin: 0;
        text-align: left;
        font-size: 16px;
        font-weight: 700;
        padding: 0 10px;
        line-height: 0.6rem;
      }
    }
    .info-content{
      width: 80%;
      height: auto;
      margin: 10px auto;
      text-align: center;
      font-size: 14px;
      line-height: 19px;
    }
    .check_button{
      width: 80%;
      height: auto;
      position: absolute;
      bottom: 18%;
      left: 50%;
      margin-left: -40%;
      img{
        width: 100%;
        height: auto;
      }
    }
  }
</style>
<script>
import { IMGICON } from '../../../const/constant'
import Photograph from './Photograph'
export default {
  name: 'Popupinfo',
  components: {
    Photograph
  },
  props: ['msgList', 'swipeToNum', 'allPhotoIscheck'],
  data() {
    return {
      popupInfoImg: IMGICON,
      msgLists: this.msgList,
      swipeToNumber: this.swipeToNum,
      allPhotoIschecked: this.allPhotoIscheck
    }
  },
  computed: {
    toppPointmodelShow: {
      get() {
        return this.$store.state.app.toppPointmodelShow
      },
      set(val) {
        this.$store.commit('setToppPointmodelShow', false)
        this.popupInfoImg.map(item => {
          item.zIndex = false
        })
      }
    }
  },
  watch: {
    swipeToNum(newVal, oldVal) {
      this.swipeToNumber = newVal
    },
    allPhotoIscheck(newVal, oldVal) {
      this.allPhotoIschecked = newVal
    }
  },
  methods: {
    photoMsg(data) {
      this.msgLists = [...this.msgLists]
      this.$emit('photoMsgClose', this.msgLists)
    },
    hrefRobotTestBtn() {
      this.$store.commit('setToppPointmodelShow', false)
      this.$router.replace({ path: '/result' })
    }
  }
}
</script>
