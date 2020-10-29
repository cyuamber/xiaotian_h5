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
                      <span class="title-eng">{{item.popupinfoTitleEn}}  </span><span class="title-ch">{{item.popupinfoTitleCH}}</span>
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
    background-image: linear-gradient(-74deg, #2c47bf 0%, 	#2e5acf 26%, 	#307eef 76%, 	#318fff 100%), linear-gradient(	#ffffff, #ffffff);
    color: rgb(255, 255, 255, 0.8);
    .title{
      padding-top: 30px;
      margin: 0 0px 16px 75px;
      img{
        width: 98px;
        position: absolute;
        top: 0;
        left: 0px;
        top: -8px;
      }
      .title-text{
        display: inline-block;
        text-align: left;
        font-family: PingFangSC-Semibold;
        padding: 0 10px;
        line-height: 0.6rem;
        .title-eng {
          font-size: 26px;
        }
        .title-ch {
          font-size: 20px;
        }
      }
    }
    .info-content{
      width: 80%;
      height: auto;
      margin: 10px auto;
      text-align: center;
      font-size: 17px;
      line-height: 24px;
      font-family: PingFangSC-Regular;
      color: rgb(255, 255, 255, 0.8);
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
