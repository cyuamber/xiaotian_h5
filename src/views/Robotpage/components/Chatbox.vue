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
            <img
              v-else-if="dialogue.type === 'img'"
              @click="showImage(dialogue.value)"
              :src="dialogue.value"
              alt="小天机器人"
            />
          </div>
          <div v-if="msg.init">
            <p class="hot-issue" @click="quickClick()">如何打卡</p>
            <p class="hot-issue" @click="quickClick()">获取打卡地图</p>
          </div>
        </div>
      </div>
      <div class="msg-box users-box" v-if="msg.type === 'user'">
        <div class="robot-img">
          <img src="@/assets/images/useravator.png" alt="小天机器人" />
        </div>
        <div class="userMsg">
          <span>{{ msg.oldform.question }}</span>
        </div>
      </div>
    </div>
    <van-popup v-model="showPic" class="picHolder">
      <van-image width="100%" :src="picLink" />
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Chatbox",
  props: {
    msgList: "",
  },

  data() {
    return {
      showPic: false,
      picLink: "",
    };
  },
  methods: {
    quickClick() {
      const e = window.event;
      const userMsg = {
        type: "user",
        oldform: {
          question: e.target.innerHTML,
          answer: "",
          source: "",
        },
        updateold: false,
      };
      this.$parent.getAnswer(userMsg);
      e.preventDefault();
    },
    showImage(img) {
      this.showPic = true;
      this.picLink = img;
      console.log(img);
    },
  },
};
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
      background: #ffffff;
      border-radius: 24px 24px 24px 24px;
      padding: 13px 16px 13px 16px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 18px;
      margin-bottom: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      .hot-issue {
        color: #337dff;
      }
      img {
        width: 100%;
      }
    }
    .userMsg {
      float: right;
      width: fit-content;
      max-width: 344px;
      background: #e2fbff;
      border-radius: 24px 0px 24px 24px;
      padding: 13px 16px 13px 16px;
      margin-right: 10px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 18px;
      margin-bottom: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
  }
  .users-box {
    flex-direction: row-reverse;
  }
}
</style>
