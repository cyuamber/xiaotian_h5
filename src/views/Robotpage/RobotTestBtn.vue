<template>
  <div id="componentBody">
    <div class="drawerBody">
      <van-sticky class="top">
        <div>
          <img
            class="top-point"
            v-for="(item, index) in imgIcon"
            :key="index"
            @click="() => getInformation(item, index)"
            :src="item.src"
            alt=""
            :class="{ 'z-index': item.zIndex }"
          />
        </div>
      </van-sticky>
      <div class="bodyDialog divScroll">
        <Chatbox :msgList="msgList" :allPhotoIscheck="allPhotoIscheck" />
      </div>
      <div class="footer">
        <div class="common-question">
          <span
            v-for="(question, index) in commonQuestion"
            :key="index"
            @click="quickClick()"
          >
            {{ question }}
          </span>
        </div>
        <div class="bodyInput">
          <div class="footer-icon">
            <img
              v-show="!textSwitch"
              src="@/assets/images/talk-icon.png"
              alt="语音"
              @touchstart="talkStart"
              @touchend="talkEndClear"
            />
          </div>
          <textarea
            class="inputArea"
            v-model="inputContent"
            @keydown.enter="pressEnter"
            v-show="!textSwitch"
          />
          <div class="checkphotos">
            <img src="@/assets/images/checkPhotos.png" alt="拍照打卡" />
            <Photograph :msgList="msgList" @photoMsg="photoMsg" />
          </div>
        </div>
      </div>
    </div>
    <Loading v-if="LoadingShow" />
    <Recorder @sendTalkMsg="sendTalkMsg" />
    <Popupinfo
      :msgList="msgList"
      @photoMsg="photoMsg"
      :swipeToNum="swipeToNum"
      :allPhotoIscheck="allPhotoIscheck"
    />
  </div>
</template>
<style lang="less" scoped>
.top {
  width: 100%;
  height: 100px;
  background-color: rgba(13, 12, 81, 0.596);
  text-align: center;
  .top-point {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    line-height: 1.5rem;
    margin: 20px 10px;
    text-align: center;
    background-color: transparent;
    font-weight: bold;
    font-size: 0.35rem;
    position: relative;
  }
  .z-index {
    z-index: 100000;
  }
  .ischeck {
    background-color: #2fe376;
    color: #fff;
  }
  .point-information {
    width: 80%;
    margin: 0 auto;
    text-align: left !important;
    line-height: 0.6rem;
  }
  .point-model {
    background-color: #bebebe;
    color: #ffffff;
  }
}
#componentBody {
  width: 100%;
  height: 100vh;
  background: url("../../assets/images/background_img.png") no-repeat 100% 100%;
  background-size: 100% 100%;
}
.drawerBody {
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
}
.divScroll::-webkit-scrollbar {
  width: 6px;
}
.divScroll::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: #d9d9d9;
  opacity: 0.2;
}
.divScroll::-webkit-scrollbar-track {
  background: transparent;
}
.bodyDialog {
  width: 100%;
  height: calc(100% - 7.9rem);
  padding: 20px 20px 20px 0;
  display: flex;
  flex-flow: column;
  overflow: auto;
}
.footer {
  width: 100%;
  // background-color: #ffffff;
  color: #fff;
  .common-question {
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    margin: 10px 0;
    span {
      display: inline-block;
      padding: 0.3rem;
      margin: 0 5px 15px 5px;
      background: rgba(38, 28, 176, 0.8);
      border-radius: 25px;
      color: rgba(166, 180, 241, 0.8);
    }
  }
  .common-question::-webkit-scrollbar {
    width: 0 !important;
    display: none;
  }
}
.bodyInput {
  position: relative;
  width: 100%;
  height: 50px;
  margin: 0 auto;
  margin-bottom: 0.1rem;
  .footer-icon {
    display: inline-block;
    width: 0.45rem;
    height: auto;
    // margin: 0 0.3rem;
    position: absolute;
    top: 7px;
    left: 25px;
    img {
      width: 100%;
      height: auto;
    }
  }
  .checkphotos {
    width: 20%;
    height: auto;
    display: inline-block;
    position: relative;
    vertical-align: top;
    img {
      width: 100%;
      height: auto;
    }
    input[type="file"] {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 9;
      opacity: 0;
    }
  }
}
.inputArea,
.talk-button {
  resize: none;
  width: 70%;
  overflow: auto;
  background: rgba(28, 22, 145, 0.8);
  border-style: none;
  font-size: 12px;
  font-weight: 400;
  color: #fff;
  padding: 0;
  border-style: none;
  box-shadow: none;
  margin: 0 3%;
  height: 0.9rem;
  line-height: 0.9rem;
  border-radius: 25px;
  text-indent: 1rem;
}
// .inputArea{
//   width: 56%;
//   margin: 0 3% 0 16%;
// }
</style>

<script>
import { mapState } from "vuex";
import { axiosGet } from "../../utils/http.js";
import {
  POINTINFO,
  COMMONQUESTION,
  GETCHECKICONSTATUS,
  IMGICON,
} from "../../const/constant";
import Loading from "../../components/Loading";
import Chatbox from "./components/Chatbox";

const Recorder = () => import("./components/Recorder");
const Popupinfo = () => import("./components/Popupinfo");
const Photograph = () => import("./components/Photograph");

import API from "../../utils/api";
export default {
  name: "RobotTestBtn",
  components: {
    Loading,
    Chatbox,
    Popupinfo,
    Photograph,
    Recorder
  },

  data() {
    return {
      inputContent: "",
      msgList: [],
      width: document.body.clientWidth,
      newform: {
        question: "",
        answer: "",
        source: "",
      },
      username: "",
      phonenum: "",
      commonQuestion: COMMONQUESTION,
      getCheckIconStatus: [],
      imgIcon: IMGICON,
      pointInfo: POINTINFO,
      // LoadingShow: false,
      textSwitch: false,
      timeOutEvent: 0,
      count: 10,
      countDownTimes: null,
      longPress: false,
      base64ImgData: null,
      userName: localStorage.getItem("userName"),
      userId: localStorage.getItem("userId"),
      swipeToNum: 0,
      allPhotoIscheck: false,
    };
  },
  mounted() {
    this.getuploadImgResults();
  },
  methods: {
    getuploadImgResults(photocheck) {
      const url = API.port8085.getuploadImgResult;
      const params = {
        userId: this.userId,
      };
      this.$store.commit("setLoadingShow", true);
      axiosGet(url, params)
        .then((res) => {
          this.$store.commit("setLoadingShow", false);
          if (res && res.data.length > 0 && typeof res.data[0] === "object") {
            this.getCheckIconStatus = res.data
            this.filterCheckIconStatus(this.getCheckIconStatus);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("setLoadingShow", false);
        });
    },
    photoMsg(data) {
      this.msgList = [...data];
      const photocheck = true;
      this.getuploadImgResults(photocheck);
    },
    filterCheckIconStatus(data) {
      this.imgIcon.map((item, index) => {
        data.map((items, ind) => {
          if (items.title === item.title) {
            item.isCheck = items.isCheck;
            item.src = items.isCheck ? item.checked : item.unchecked;
            item.popupinfoIconSrc = items.isCheck
              ? item.popupinfoChecked
              : item.popupinfoUnchecked;
          }
        });
      });
      const statusAll = [];
      data.map((items) => {
        statusAll.push(items.isCheck);
      });
      if (!statusAll.includes(false)) {
        this.allPhotoIscheck = true;
      }
    },
    showDrawer() {
      this.msgList = [];
      const robotMsg = {
        owner: "robot",
        type: "text",
        init: true,
        msg: [
          {
            type: "text",
            value:
              "您好，欢迎来到中国移动合作伙伴大会，我是移动“融智”战略下诞生的智能机器人小天。接下来请跟随我一起游览展台、拍照打卡、领取礼品、吧~见到我的立牌就拍照上传吧~",
          },
        ],
      };
      this.msgList.push(robotMsg);
    },
    // TODO:这个地方需要抽离成一个公共的vuex action，在各个组件调用时，直接调取此方法
    quickClick(word) {
      const e = window.event;
      const question =
        e.target.innerHTML && e.target.innerHTML !== ""
          ? e.target.innerHTML
          : word;
      const userMsg = {
        type: "user",
        oldform: {
          question: question,
          answer: "",
          source: "",
        },
        updateold: false,
      };
      this.getAnswer(userMsg);
      e.preventDefault();
    },
    getAnswer(questions) {
      const params = {
        text: questions.oldform.question,
      };
      const url = API.port8085.sendTextUrl;
      this.msgList.push(questions);
      const robotMsg = {
        idx: this.msgList.length - 1,
        owner: "robot",
        msg: [
          {
            type: "text",
            value: "",
          },
        ],
      };
      this.inputContent = "";
      this.$store.commit("setLoadingShow", true);
      axiosGet(url, params)
        .then((res) => {
          console.log(typeof res.msg);
          if (res && res.msg && typeof res.msg === "string") {
            robotMsg.owner = "robot";
            robotMsg.msg[0].value = res.msg
              .replace(/\n\r/g, "<br/>")
              .replace(/\n/g, "<br/>");
          } else if (
            res &&
            res.msg &&
            typeof res.msg === "object" &&
            res.msg.length > 0
          ) {
            robotMsg.msg = [];
            robotMsg.msg = res.msg;
          }
          this.$nextTick(() => {
            this.msgList.push(robotMsg);
            this.msgList = [...this.msgList];
            setTimeout(() => {
              const div = document.getElementsByClassName("divScroll");
              div[0].scrollTop = div[0].scrollHeight;
            }, 0);
          });
          this.$store.commit("setLoadingShow", false);
        })
        .catch((err) => {
          console.log(err, "=====err");
          this.$store.commit("setLoadingShow", false);
        });
    },
    countDowns() {
      this.count--;
      if (this.count <= 0 && this.longPress === true) {
        clearInterval(this.countDownTimes);
        this.$store.commit("setMaskShow", false);
      }
    },
    talkEndClear(e) {
      e.stopPropagation();
      clearTimeout(this.timeOutEvent);
      if (this.timeOutEvent !== 0) {
        console.log("你这是点击，不是长按");
      } else {
        this.longPress = false;
        clearInterval(this.countDownTimes);
        this.$store.commit("setMaskShow", false);
      }
      return false;
    },
    talkStart(e) {
      e.stopPropagation();
      this.timeOutEvent = setTimeout(() => {
        this.timeOutEvent = 0;
        this.longPress = true;
        this.$store.commit("setMaskShow", true);
        this.countDownTimes = setInterval(this.countDowns, 1000);
      }, 500);
      return false;
    },
    sendTalkMsg(talkMsgs) {
      console.log(talkMsgs, "---sendTalkMsg");
      const userMsg = {
        type: "user",
        oldform: {
          question: talkMsgs.talkMsg,
          answer: "",
          source: "",
        },
        voiceUrl: talkMsgs.audioUrl,
        updateold: false,
      };
      this.msgList.push(userMsg);
      this.getAnswer(userMsg);
    },
    getInformation(item, index) {
      console.log(item.title, "---item");
      this.quickClick(item.title); // 点击图标时自动发送对应文字
      this.imgIcon.map((item) => {
        item.zIndex = false;
      });
      this.imgIcon[index].zIndex = true;
      this.swipeToNum = index;
      this.$store.commit("setToppPointmodelShow", true);
    },

    pressEnter(e) {
      if (!this.inputContent.match(/^[ ]*$/)) {
        const userMsg = {
          type: "user",
          oldform: {
            question: this.inputContent,
            answer: "",
            source: "",
          },
          updateold: false,
        };
        this.getAnswer(userMsg);
      }
      e.preventDefault();
    },
  },
  computed: {
    robotId() {
      return this.$store.state.robotInfo.robotId;
    },
    isAdd() {
      return !(
        this.newform.question &&
        this.newform.answer &&
        this.newform.source
      );
    },
    ...mapState({
      robotSkeleton: (state) => state.app.robotSkeleton,
      talkText: (state) => state.app.talkText,
      LoadingShow: (state) => state.app.LoadingShow,
    }),
  },
  created() {
    this.showDrawer();
  },
};
</script>
<style lang="less" scoped>
.top {
  width: 100%;
  height: 100px;
  background-color: rgba(13, 12, 81, 0.596);
  text-align: center;
  .top-point {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    line-height: 1.5rem;
    margin: 20px 10px;
    text-align: center;
    background-color: transparent;
    font-weight: bold;
    font-size: 0.35rem;
  }
  .ischeck {
    background-color: #2fe376;
    color: #fff;
  }
  .point-information {
    width: 80%;
    margin: 0 auto;
    text-align: left !important;
    line-height: 0.6rem;
  }
  .point-model {
    background-color: #bebebe;
    color: #ffffff;
  }
}
#componentBody {
  width: 100%;
  height: 100vh;
  background: url("../../assets/images/background_img.png") no-repeat 100% 100%;
  background-size: 100% 100%;
}
.drawerBody {
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
}
.divScroll::-webkit-scrollbar {
  width: 6px;
}
.divScroll::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: #d9d9d9;
  opacity: 0.2;
}
.divScroll::-webkit-scrollbar-track {
  background: transparent;
}
.bodyDialog {
  width: 100%;
  height: calc(100% - 7.9rem);
  padding: 20px 20px 20px 0;
  display: flex;
  flex-flow: column;
  overflow: auto;
}
.footer {
  width: 100%;
  // background-color: #ffffff;
  color: #fff;
  .common-question {
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    margin: 10px 0;
    span {
      display: inline-block;
      padding: 0.3rem;
      margin: 0 5px 15px 5px;
      background: rgba(38, 28, 176, 0.8);
      border-radius: 25px;
      color: rgba(166, 180, 241, 0.8);
    }
  }
  .common-question::-webkit-scrollbar {
    width: 0 !important;
    display: none;
  }
}
.bodyInput {
  position: relative;
  width: 100%;
  height: 50px;
  margin: 0 auto;
  margin-bottom: 0.1rem;
  .footer-icon {
    display: inline-block;
    width: 0.45rem;
    height: auto;
    // margin: 0 0.3rem;
    position: absolute;
    top: 7px;
    left: 25px;
    img {
      width: 100%;
      height: auto;
    }
  }
  .checkphotos {
    width: 20%;
    height: auto;
    display: inline-block;
    position: relative;
    vertical-align: top;
    img {
      width: 100%;
      height: auto;
    }
    input[type="file"] {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 9;
      opacity: 0;
    }
  }
}
.inputArea,
.talk-button {
  resize: none;
  width: 70%;
  overflow: auto;
  background: rgba(28, 22, 145, 0.8);
  border-style: none;
  font-size: 12px;
  font-weight: 400;
  color: #fff;
  padding: 0;
  border-style: none;
  box-shadow: none;
  margin: 0 3%;
  height: 0.9rem;
  line-height: 0.9rem;
  border-radius: 25px;
  text-indent: 1rem;
}
// .inputArea{
//   width: 56%;
//   margin: 0 3% 0 16%;
// }
</style>
