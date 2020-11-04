<template>
 <van-popup
          v-model="toppPointmodelShow"
          :style="{ width: '90%', 'background':'transparent', 'position': 'absolute', 'left': '50%', 'transform': 'translate(-50%)'}"
          position="top"
          class="popup"
          close-icon="close"
          close-icon-position="bottom"
          closeable
        >
          <van-swipe
            class="my-swipe"
            indicator-color="#ffffff"
            style="background: transparent"
            ref="swipe"
            :width="swipeWidth"
            :initial-swipe='swipeToNumber'
            @change="onChange"
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
                <div :class="{'check_button':true, 'checked_button':item.isCheck}">
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
<style lang="less">
  .popup {
    top: 116px;
    height: 388px;
    .van-icon{
      left: 45%;
      bottom: 1%;
      font-size: 34px;
      background: url("../../../assets/images/close.png") no-repeat;
      background-size: 34px 34px;
    }
    .van-icon-close::before {
      color: transparent;
    }
    .my-swipe {
      height: 342px;
      border-radius: 15px;
    }
    .info{
      width: 100%;
      height: 100%;
      background-image: linear-gradient(-74deg, #2c47bf 1%, 	#2e5acf 26%, 	#307eef 76%, 	#318fff 100%), linear-gradient(	#000, #000);
      color: rgb(255, 255, 255, 0.8);
      .title{
        padding-top: 30px;
        margin: 0 0px 16px 93px;
        img{
          width: 101px;
          height: 129px;
          position: absolute;
          top: 0;
          left: 0px;
          top: -8px;
        }
        .title-text{
          display: inline-block;
          text-align: left;
          font-family: PingFangSC-Semibold;
          line-height: 29px;
          .title-eng {
            font-size: 26px;
          }
          .title-ch {
            font-size: 20px;
          }
        }
      }
      .info-content{
        width: 261px;
        margin: 10px auto;
        text-align: center;
        font-size: 17px;
        line-height: 24px;
        font-family: PingFangSC-Regular;
        font-weight: normal;
        font-stretch: normal;
        color: rgba(255, 255, 255, 0.8);
      }
      .checked_button {
        width: 241px!important;
        height: 44px!important;
      }
      .check_button{
        width: 273px;
        height: 50px;
        position: absolute;
        bottom: 52px;
        left: 50%;
        transform: translate(-50%);
        img{
          width: 100%;
          height: auto;
        }
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
  props: ['msgList', 'swipeToNum', 'allPhotoIscheck', 'imgIcon'],
  data() {
    return {
      swipeWidth: 372,
      popupInfoImg: IMGICON,
      msgLists: this.msgList,
      swipeToNumber: this.swipeToNum,
      allPhotoIschecked: this.allPhotoIscheck,
      imgIcons: this.imgIcon
    }
  },
  computed: {
    toppPointmodelShow: {
      get() {
        return this.$store.state.app.toppPointmodelShow
      },
      set(val) {
        this.$store.commit('setToppPointmodelShow', false)
        this.imgIcons.map(item => {
          item.zIndex = false
        })
        this.$emit('swipeLoop', this.imgIcons)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.swipeWidth = Math.floor(window.innerWidth * 0.9) + 1
    })
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
      this.$emit('photoMsg', data)
    },
    hrefRobotTestBtn() {
      this.$store.commit('setToppPointmodelShow', false)
      this.$router.replace({ path: '/result' })
    },
    onChange(index) {
      this.imgIcons.map(item => {
        item.zIndex = false
      })
      this.imgIcons[index].zIndex = true
      this.$emit('swipeLoop', this.imgIcons)
    }
  }
}
</script>
