<template>
  <div id="componentBody">
    <div class="drawerBody">
      <van-sticky class="top">
        <span
          class="top-point"
          :class="{ ischeck: item.isCheck === true }"
          v-for="(item, index) in clockInPoint"
          :key="index"
          @click="() => getInformation(item)"
        >
          {{ item.title }}
        </span>
        <van-popup
          v-model="toppPointmodelShow"
          :style="{ width: '80%', height: '80%' }"
        >
          <van-swipe
            class="my-swipe"
            indicator-color="#6A6A6A"
            style="height: 95%"
          >
            <van-swipe-item v-for="(item, index) in pointInfo" :key="index">
              <img src="@/assets/xiaotian.png" width="60%" alt="小天机器人" />
              <p class="point-information">
                {{ item.info }}
              </p>
              <span class="top-point point-model">
                {{ item.key }}
              </span>
            </van-swipe-item>
          </van-swipe>
        </van-popup>
      </van-sticky>
      <div class="bodyDialog divScroll">
        <Chatbox :msgList="msgList" />
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
          <van-icon
            class="footer-icon"
            name="add-o"
            size="0.8rem"
            style="margin-right: 0.2rem"
            v-show="!textSwitch"
            @click="textButtonSwitch()"
          />
          <van-icon
            class="footer-icon"
            name="volume-o"
            size="0.8rem"
            style="margin-right: 0.2rem"
            v-show="textSwitch"
            @click="textButtonSwitch()"
          />
          <textarea
            class="inputArea"
            placeholder="请在此填写问题"
            v-model="inputContent"
            @keydown.enter="pressEnter"
            v-show="!textSwitch"
          />
          <button class="talk" v-show="textSwitch">
            <van-icon
              name="chat-o"
              size="15"
              style="margin-right: 5px"
            />按住说话
          </button>
          <van-icon class="footer-icon" name="sign" size="0.8rem" />
        </div>
      </div>
    </div>

    <Loading v-if="LoadingShow" />
  </div>
</template>

<style>
body {
  -webkit-touch-callout: none; /*系统默认菜单被禁用*/
  -webkit-user-select: none; /*webkit浏览器*/
  -khtml-user-select: none; /*早起浏览器*/
  -moz-user-select: none; /*火狐浏览器*/
  -ms-user-select: none; /*IE浏览器*/
  user-select: none; /*用户是否能够选中文本*/
}
input,
select {
  -webkit-user-select: auto;
  user-select: auto;
}
.ant-drawer-title {
  text-align: left !important;
  color: #fff;
}
.ant-drawer-close {
  width: 50px;
  height: 50px;
  line-height: 50px;
}
</style>
<style lang="less" scoped>
.top {
  width: 100%;
  height: 100px;
  background-color: rgba(243, 243, 243, 0.596);
  text-align: center;
  .top-point {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    line-height: 1.5rem;
    margin: 20px 10px;
    text-align: center;
    background-color: #fff;
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
  height: calc(100% - 4rem);
  border-bottom: 1px solid #d9d9d9;
  padding: 20px 20px 20px 0;
  display: flex;
  flex-flow: column;
  overflow: auto;
}
.footer {
  width: 100%;
  background-color: #ffffff;
  .common-question {
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    margin: 10px 0;
    span {
      display: inline-block;
      padding: 0.2rem;
      margin: 0 5px 15px 5px;
      border: 1px gainsboro solid;
      border-radius: 5px;
    }
  }
  .common-question::-webkit-scrollbar {
    width: 0 !important;
    display: none;
  }
}
.bodyInput {
  width: 100%;
  height: 50px;
  margin: 0 auto;
  margin-bottom: 0.1rem;
  .footer-icon {
    margin-left: 0.2rem;
  }
}
.inputArea {
  resize: none;
  width: 75%;
  overflow: auto;
  background: transparent;
  border-style: none;
  font-size: 12px;
  font-weight: 400;
  color: #555555;
  padding: 0;
  border-style: none;
  box-shadow: none;
}
.talk {
  display: inline-block;
  width: 75%;
  resize: none;
  line-height: 1rem;
  vertical-align: bottom;
  border-radius: 25px;
  border: 1px #d4d1d1 solid;
  background-color: #fff;
}
</style>

<script>
import { mapState } from "vuex";
import { axiosGet, axiosPost } from "../../utils/http.js";
import { POINTINFO, COMMONQUESTION, GETANSWERRES } from "../../const/constant";
import Loading from "../../components/Loading";
import Chatbox from "./components/Chatbox";
import API from "../../utils/api";
export default {
  name: "RobotTestBtn",
  components: {
    Loading,
    Chatbox,
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
      clockInPoint: [
        {
          key: "",
          title: "C",
          isCheck: false,
        },
        {
          key: "",
          title: "H",
          isCheck: false,
        },
        {
          key: "",
          title: "B",
          isCheck: false,
        },
        {
          key: "",
          title: "N",
          isCheck: true,
        },
      ],
      toppPointmodelShow: false,
      pointInfo: [],
      LoadingShow: false,
      textSwitch: false,
    };
  },
  methods: {
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
      this.getAnswer(userMsg);
      e.preventDefault();
    },
    getAnswer(question) {
      const params = {
        uid: this.userId,
        l: 100,
        c: this.$route.query.c,
        q: question.oldform.question,
      };
      const url = API.port8085.dialogUrl;

      const headers = {
        userid: this.userId,
      };
      this.msgList.push(question);
      const robotMsg = {
        idx: this.msgList.length - 1,
        owner: "robot",
        msg: "",
      };
      this.inputContent = "";
      this.LoadingShow = true;
      axiosGet(url, params, headers)
        .then((res) => {
          if (res && res.a.length > 0 && res.a[0].a) {
            robotMsg.owner = "robot";
            robotMsg.msg = res.a[0].a
              .replace(/\n\r/g, "<br/>")
              .replace(/\n/g, "<br/>");
          }
          this.$nextTick(() => {
            this.msgList.push(robotMsg);
            setTimeout(function () {
              const div = document.getElementsByClassName("divScroll");
              div[0].scrollTop = div[0].scrollHeight;
            }, 0);
          });
          this.LoadingShow = false;
        })
        .catch(() => {
          this.LoadingShow = false;
          robotMsg.msg = GETANSWERRES;
          this.$nextTick(() => {
            this.msgList.push(robotMsg);
            setTimeout(function () {
              const div = document.getElementsByClassName("divScroll");
              div[0].scrollTop = div[0].scrollHeight;
            }, 0);
          });
          // ------------------
        });
    },

    textButtonSwitch() {
      if (this.textSwitch) {
        this.textSwitch = false;
      } else {
        this.textSwitch = true;
      }
    },
    getInformation(item) {
      this.toppPointmodelShow = true;
      const params = {
        key: item.title,
      };
      const url = API.port8085.getCheckInInformationUrl;
      this.LoadingShow = true;
      axiosGet(url, params)
        .then((res) => {
          this.pointInfo = res;
          this.LoadingShow = false;
        })
        .catch(() => {
          this.pointInfo = POINTINFO;
          this.LoadingShow = false;
        });
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
    ...mapState(["channelno"]),
    userId() {
      return this.$store.state.userId;
    },
    robotId() {
      return this.$store.state.robotInfo.robotId;
    },
    isAdd() {
      return this.newform.question && this.newform.answer && this.newform.source
        ? false
        : true;
    },
  },
  created() {
    this.showDrawer();
    this.username = this.$route.query.username;
    this.phonenum = this.$route.query.phonenum;
  },
};
</script>
