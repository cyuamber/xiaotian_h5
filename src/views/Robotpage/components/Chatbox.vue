<template>
  <div class="chatbox">
    <div v-for="(msg, index) in msgList" :key="index">
      <div v-if="msg.owner === 'robot'" class="msg-box">
        <div class="robot-img">
          <img src="@/assets/images/robotavator.png" alt="小天机器人" />
        </div>
        <div class="robotMsg">
          <div v-for="(dialogue, i) in msg.msg" :key="i">
            <div v-if="dialogue.type === 'text'">{{ dialogue.value }}</div>
            <!-- <img
              v-else-if="dialogue.type === 'img'"
              @click="showImage(dialogue.value)"
              :src="dialogue.value"
              alt="小天机器人"
            /> -->
          </div>
          <div v-if="msg.init">
            <span class="hot-issue" @click="quickClick()">如何打卡?</span>
            <span class="hot-issue" @click="quickClick()">打卡地图</span>
          </div>
        </div>
      </div>
      <div class="msg-box users-box" v-if="msg.type === 'user'">
        <div class="robot-img">
          <img src="@/assets/images/useravator.png" alt="用户头像" />
        </div>
        <div class="userMsg" :class="{'userMsg_width': msg.imgUrl !=undefined }">
          <span v-if="msg.oldform !=undefined && msg.voiceUrl === undefined">{{ msg.oldform.question }}</span>
          <m-audio v-if="msg.voiceUrl !=undefined" :src="msg.voiceUrl" text='' :showDuration='true'></m-audio>
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
export default {
  name: 'Chatbox',
  props: {
    // eslint-disable-next-line vue/require-prop-type-constructor
    msgList: ''
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
      // this.showPic = true
      // this.picLink = img
      ImagePreview([img])
      console.log(img)
    }
  }
}
</script>

<style lang="less" scoped>
.chatbox {
  .picHolder {
    width: 80%;
    display: flex;
    align-items: center;
  }
  .msg-box {
    display: flex;
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
      width: 60%;
      max-width: 344px;
      background: white;
      border-radius: 0 24px 24px 24px;
      padding: 13px 16px 13px 16px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: 	#10164e;
      line-height: 18px;
      margin-bottom: 16px;
      .hot-issue {
        color: #337dff;
        display: inline-block;
        padding: 5px 10px 0 0;
      }
      img {
        width: 100%;
      }
    }
    .userMsg {
      float: right;
      width: fit-content;
      max-width: 344px;
      background-image: linear-gradient(-74deg, #2c47bf 0%, #2e5acf 26%, #307eef 76%, #318fff 100%), linear-gradient(#1d1588, #1d1588);
      border-radius: 24px 0px 24px 24px;
      padding: 13px 16px 13px 16px;
      margin-right: 10px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #C3D3FF;
      line-height: 18px;
      margin-bottom: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
    .userMsg_width{
      width: 20%;
    }
  }
  .users-box {
    flex-direction: row-reverse;
  }
}
</style>
