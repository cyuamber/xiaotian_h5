<template>
  <div class="chatbox">
    <div class="msg-box-wrap" v-for="(msg, index) in msgList" :key="index">
      <div v-if="msg.owner === 'robot'" class="msg-box">
        <div class="robot-img">
          <img src="@/assets/images/robotavator.png" alt="小天机器人" />
        </div>
        <div class="robotMsg" :class="{'singleImg': msg.msg.length ===1 && msg.msg[0].type === 'image'}">
          <div v-for="(dialogue, i) in msg.msg" :key="i">
            <div v-if="dialogue.type === 'text'">
                <!-- {{ dialogue.content }}<br> -->
                <div v-html="dialogue.content" style="word-break: break-word"></div>
                <span
                v-if="Number(dialogue.code) === 402 || Number(dialogue.code) === 405"
                class="hot-issue reclock-button"
                >
                  重新打卡
                  <Photograph :msgList="msgList" @photoMsg='photoMsg' />
                </span>
                <span
                v-if="Number(dialogue.code) === 200 && !allPhotoIscheck"
                class="hot-issue reclock-button"
                >
                  继续打卡
                  <Photograph :msgList="msgList" @photoMsg='photoMsg' />
                </span>
                <span
                v-if="Number(dialogue.code) === 200 && allPhotoIscheck"
                class="hot-issue reclock-button"
                @click="hrefRobotTestBtn()">
                  立即查看「记忆界面」
                </span>
              </div>
              <img
              v-if="dialogue.type === 'image'"
              @click="showImage(dialogue.content)"
              :src="dialogue.content"
              alt=""
            />
          </div>
          <div v-if="msg.init">
            <span class="hot-issue" @click="quickClick()">如何打卡</span>
            <span class="hot-issue" @click="quickClick()">打卡指引地图</span>
          </div>
        </div>
      </div>
      <div class="msg-box users-box" v-if="msg.type === 'user'">
        <div class="robot-img">
          <img src="@/assets/images/useravator.png" alt="用户头像" />
        </div>
        <div class="userMsg" :class="{'userMsg_width': msg.imgUrl !=undefined }">
          <span v-if="msg.oldform !=undefined">{{ msg.oldform.question }}</span>
           <div class="preview" v-if="msg.imgUrl !=undefined">
            <img :src="msg.imgUrl" alt="" width="100%" @click="showImage(msg.imgUrl)"/>
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model="showPic" class="picHolder">
      <van-image width="100%" :src="picLink" />
    </van-popup>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import Photograph from './Photograph'
export default {
  name: 'Chatbox',
  components: {
    Photograph
  },
  props: {
    // eslint-disable-next-line vue/require-prop-type-constructor
    msgList: '',
    // eslint-disable-next-line vue/require-prop-type-constructor
    allPhotoIscheck: ''
  },

  data() {
    return {
      showPic: false,
      picLink: ''
    }
  },
  methods: {
    quickClick() {
      const e = window.event
      const userMsg = {
        type: 'user',
        oldform: {
          question: e.target.innerHTML,
          answer: '',
          source: ''
        },
        updateold: false
      }
      this.$parent.getAnswer(userMsg)
      e.preventDefault()
    },
    showImage(img) {
      ImagePreview([img])
    },
    photoMsg(data) {
      // this.msgList = [...this.msgList]
      this.$emit('photoMsgClose', this.msgList)
    },
    hrefRobotTestBtn() {
      this.$router.replace({ path: '/result' })
    }
  }
}
</script>

<style lang="less" scoped>
.chatbox {
  margin-top: 20px;
  cursor: pointer;
  .picHolder {
    width: 80%;
    display: flex;
    align-items: center;
  }
  .msg-box-wrap:first-child {
    margin-top: 20px;
  }
  .msg-box {
    display: flex;
    cursor: pointer;
    .robot-img {
      width: 40px;
      height: 40px;
      margin: 0 10px;
      img {
        width: 100%;
      }
    }
    .robotMsg {
      float: left;
      max-width: 213px;
      background: white;
      border-radius: 0 30px 30px 30px;
      padding: 15px 19px 15px 19px;
      font-size: 17px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: 	#10164e;
      line-height: 24px;
      margin-bottom: 16px;
      cursor: pointer;
      .hot-issue {
        color: #097de9;
        display: inline-block;
        padding: 20px 25px 0 0;
      }
      .reclock-button{
        width: 100%;
        display: inline-block;
        padding: 5px 0;
        position: relative;
      }
      img {
        width: 100%;
      }
    }
    .singleImg{
      background: transparent;
      padding: 0;
      img{
        border-radius: 0 30px 30px 30px;
      }
    }
    .userMsg {
      float: right;
      width: fit-content;
      max-width: 213px;
      background-image: linear-gradient(-74deg, #2c47bf 0%, #2e5acf 26%, #307eef 76%, #318fff 100%), linear-gradient(#1d1588, #1d1588);
      border-radius: 20px 0px 20px 20px;
      padding: 13px 19px 13px 19px;
      margin-right: 10px;
      font-size: 17px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #C3D3FF;
      line-height: 24px;
      margin-bottom: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      cursor: pointer;
    }
    .userMsg_width{
      width: 30%;
      padding: 0;
      background: transparent;
      box-shadow: none;
      img{
        border-radius: 20px 0px 20px 20px;
      }
    }
  }
  .users-box {
    flex-direction: row-reverse;
    cursor: pointer;
  }
}
</style>
