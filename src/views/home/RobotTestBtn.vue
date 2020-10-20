<template>
  <div id="componentBody">
    <div class="drawerBody">
      <van-sticky class="top">
        <span
                class="top-point"
                :class="{ 'ischeck': item.isCheck === true}"
                v-for="(item, index) in clockInPoint"
                :key="index"
                @click="(() => getInformation(item))">
                {{item.title}}
            </span>
            <van-popup v-model="toppPointmodelShow" :style="{ width:'80%',height: '80%' }">
              <van-swipe class="my-swipe"  indicator-color="#6A6A6A"  style="height:95%;">
                <van-swipe-item v-for="(item, index) in pointInfo" :key="index" >
                  <img src="@/assets/xiaotian.png" width="60%" alt="小天机器人" />
                   <p class="point-information">
                      {{ item.info }}
                    </p>
                    <span class="top-point point-model">
                        {{item.key}}
                    </span>
                </van-swipe-item>
              </van-swipe>
            </van-popup>
      </van-sticky>
      <div class="bodyDialog divScroll">
        <div class="robotMsg-box">
            <img src="@/assets/xiaotian.png" width="20%" alt="小天机器人"/>
            <div class="robotMsg">
              您好，欢迎来到中国移动合作伙伴大会，我是移动“融智”战略下诞生的智能机器人小天。接下来请跟随我一起游览展台、拍照打卡、领取礼品、吧~见到我的立牌就拍照上传吧~
                <br/><a class='hot-issue' style='color: #337DFF' @click="hotClick()">如何打卡</a>
                <br/><a class='hot-issue' style='color: #337DFF' @click="hotClick()">获取打卡地图</a>
            </div>
          </div>
        <div v-for="(msg, index) in msgList" :key="index">
          <div v-if="msg.type === 'robot'" class="robotMsg-box">
            <img src="@/assets/xiaotian.png" width="20%" alt="小天机器人"/>
            <div class="robotMsg" v-html="msg.msg"></div>
          </div>
          <div class="userMsg-box" v-if="msg.type === 'user' && !msg.addnew">
            <van-icon class="user-icon" name="friends" color="#ffffff" size="30" />
            <div class="userMsg">
              <span>{{ msg.oldform.question }}</span>
            </div>
          </div>
          <div style="text-align:center;margin-bottom:16px" v-if="msg.type === 'addAndupdate'">
            <span class="addupdateMsg">{{ msg.msg }}</span>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="common-question">
          <span v-for="(question, index) in commonQuestion" :key="index" @click="hotClick()">
            {{ question }}
          </span>
        </div>
        <div class="bodyInput">
          <van-icon class="footer-icon" name="add-o" size="0.8rem" style="margin-right:0.2rem" v-show="!textSwitch" @click="textButtonSwitch()"/>
          <van-icon class="footer-icon" name="volume-o"  size="0.8rem" style="margin-right:0.2rem" v-show="textSwitch" @click="textButtonSwitch()"/>
          <textarea class="inputArea" placeholder="请在此填写问题" v-model="inputContent" @keydown.enter="pressEnter" />
          <van-icon class="footer-icon" name="sign" size="0.8rem" />
        </div>
      </div>
    </div>
    <Loading  v-if="LoadingShow"/>
  </div>
</template>
<style>
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
.top{
    // position: fixed;
    // top:0;
    width: 100%;
    height: 100px;
    background-color: rgba(243, 243, 243, 0.596);
    text-align: center;
    .top-point{
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
    .ischeck{
      background-color: #2FE376;
      color: #fff;
    }
    .point-information{
        width: 80%;
        margin: 0 auto;
        text-align: left!important;
        line-height: 0.6rem;
    }
    .point-model{
      background-color: #BEBEBE;
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
  background-color: #143558;
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
    overflow: auto;
    margin: 10px 0;
    span {
      display: inline-block;
      padding: 0.2rem;
      margin: 0 5px 15px 5px;
      border: 1px gainsboro solid;
      border-radius: 5px;
    }
  }
}
.bodyInput {
  width: 100%;
  height: 50px;
  // padding-left: 21px;
  // padding-right: 21px;
  margin: 0 auto;
  margin-bottom: 0.1rem;
  .footer-icon {
    margin-left: 0.2rem;
  }
}
.inputArea {
  resize: none;
  width: 75%;
  // margin-top: 9px;
  // max-height: 50px;
  // min-height: 50px;
  overflow: auto;
  background: transparent;
  border-style: none;
  font-size: 12px;
  font-weight: 400;
  color: #555555;
  // line-height: 18px;
  padding: 0;
  border-style: none;
  box-shadow: none;
}
.robotMsg-box img {
  float: left;
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
.user-icon {
  float: right;
}
.addupdateMsg {
  text-align: center;
  background: #999;
  color: #fff;
  padding: 2px 5px;
  border-radius: 4px;
}
.newqa {
  // /deep/.ant-input{
  //     resize: none;
  // }
  width: 150px;
}
.canclick {
  background: #3f96c4;
}
.noclick {
  background: #aaa;
}
.noclick:hover {
  background: #aaa;
}
</style>

<script>
import { mapState } from 'vuex'
import { axiosGet, axiosPost } from '../../utils/http.js'
import { POINTINFO, COMMONQUESTION } from '../../const/constant'
import Loading from '../../components/Loading'
import API from '../../utils/api'
export default {
  name: 'RobotTestBtn',
  components: {
    Loading
  },
  data() {
    return {
      inputContent: '',
      msgList: [],
      visible: false,
      title: '智慧党建问答助手',
      width: document.body.clientWidth,
      newform: {
        question: '',
        answer: '',
        source: ''
      },
      addnew: false,
      username: '',
      phonenum: '',
      commonQuestion: COMMONQUESTION,
      clockInPoint: [
        {
          key: '',
          title: 'C',
          isCheck: false
        },
        {
          key: '',
          title: 'H',
          isCheck: false
        },
        {
          key: '',
          title: 'B',
          isCheck: false
        },
        {
          key: '',
          title: 'N',
          isCheck: true
        }
      ],
      toppPointmodelShow: false,
      pointInfo: [],
      LoadingShow: false,
      textSwitch: false
    }
  },
  methods: {
    reset() {
      this.msgList = []
      this.showDrawer()
    },
    textButtonSwitch() {
      if (this.textSwitch) {
        this.textSwitch = false
      } else {
        this.textSwitch = true
      }
    },
    getInformation(item) {
      this.toppPointmodelShow = true
      const params = {
        key: item.title
      }
      const url = API.port8085.getCheckInInformationUrl
      this.LoadingShow = true
      axiosGet(url, params)
        .then(res => {
          this.pointInfo = res
          this.LoadingShow = false
        })
        .catch(() => {
          this.pointInfo = POINTINFO
          this.LoadingShow = false
        })
    },

    showDrawer() {
      this.msgList = []
      this.visible = true
      const robotMsg = {
        type: 'robot',
        msg:
          '您好，欢迎来到中国移动合作伙伴大会，我是移动“融智”战略下诞生的智能机器人小天。接下来请跟随我一起游览展台、拍照打卡、领取礼品、吧~见到我的立牌就拍照上传吧~'
      }
      robotMsg.msg =
        robotMsg.msg +
        `<br/><a class='hot-issue' style='color: #337DFF' @click="hotClick()">如何打卡</a>
         <br/><a class='hot-issue' style='color: #337DFF' @click="hotClick()">获取打卡地图</a>`
      this.msgList.push(robotMsg)
    },

    // onClose() {
    //     this.visible = false;
    // },
    pressEnter(e) {
      if (!this.inputContent.match(/^[ ]*$/)) {
        const userMsg = {
          type: 'user',
          oldform: {
            question: this.inputContent,
            answer: '',
            source: ''
          },
          updateold: false
        }
        this.getAnswer(userMsg)
      }
      e.preventDefault()
    },
    hotClick() {
      const e = window.event
      console.log(e.target.innerHTML)
      const userMsg = {
        type: 'user',
        oldform: {
          question: e.target.innerHTML,
          answer: '',
          source: ''
        },
        updateold: false
      }
      this.getAnswer(userMsg)
      e.preventDefault()
    },
    addandClose(index) {
      this.dangwu(this.newform).then(res => {
        if (res.errno == 0) {
          this.addnew = false
          this.msgList.splice(index, 1)
          const addupdateMsg = {
            type: 'addAndupdate',
            msg: '您已成功添加新问答'
          }
          this.msgList.push(addupdateMsg)
        }
      })
    },
    update(index) {
      this.msgList[index].oldform.answer = ''
      this.msgList[index].oldform.source = ''
      this.msgList[index].updateold = true
    },
    updateandClose(index) {
      this.dangwu(this.msgList[index].oldform).then(res => {
        if (res.errno === 0) {
          this.msgList[index].updateold = false
          const addupdateMsg = {
            type: 'addAndupdate',
            msg: '您已成功添加问题答案'
          }
          this.msgList.push(addupdateMsg)
        }
      })
    },
    dangwu(form) {
      const url = API.port9101.addUrl
      const headers = {
        userid: this.userId
      }
      const data = {
        question: form.question,
        answer: form.answer,
        source: form.source,
        username: this.username,
        tel: this.phonenum
      }
      return axiosPost(url, null, data, headers)
    },
    cancelold(index) {
      this.msgList[index].updateold = false
    },
    cancelnew(index) {
      this.addnew = false
      this.msgList.splice(index, 1)
    },
    getAnswer(question) {
      const params = {
        uid: this.userId,
        l: 100,
        c: this.$route.query.c,
        q: question.oldform.question
      }
      const url = API.port8085.dialogUrl

      const headers = {
        userid: this.userId
      }
      this.msgList.push(question)
      const robotMsg = {
        idx: this.msgList.length - 1,
        type: 'robot'
      }
      this.inputContent = ''
      this.LoadingShow = true
      axiosGet(url, params, headers)
        .then(res => {
          if (res && res.a.length > 0 && res.a[0].a) {
            robotMsg.type = 'robot'
            robotMsg.msg = res.a[0].a.replace(/\n\r/g, '<br/>').replace(/\n/g, '<br/>')
          }
          this.$nextTick(() => {
            this.msgList.push(robotMsg)
            setTimeout(function() {
              const div = document.getElementsByClassName('divScroll')
              div[0].scrollTop = div[0].scrollHeight
            }, 0)
          })
          this.LoadingShow = false
        })
        .catch(() => {
          this.LoadingShow = false
          // 本地mock,线上测试时，请注释以下这段代码------------------
          robotMsg.msg =
            '根据地图指引，在CHBN打卡点处拍照并上传，小天会自动判断是否打卡成功（每个类别有多个打卡点，只要打卡一次上传成功即可）'
          this.$nextTick(() => {
            this.msgList.push(robotMsg)
            setTimeout(function() {
              const div = document.getElementsByClassName('divScroll')
              div[0].scrollTop = div[0].scrollHeight
            }, 0)
          })
          // ------------------
        })
    },
    showErrorNotification(title, content) {
      this.$notification.open({
        message: title,
        description: '失败原因：' + content,
        icon: <jt-icon type='exclamation-circle' theme='filled' style='color:#F04134' />,
        duration: 0
      })
    }
  },
  computed: {
    ...mapState(['channelno']),
    userId() {
      return this.$store.state.userId
    },
    robotId() {
      return this.$store.state.robotInfo.robotId
    },
    isAdd() {
      return this.newform.question && this.newform.answer && this.newform.source ? false : true
    }
  },
  created() {
    // this.showDrawer()
    this.username = this.$route.query.username
    this.phonenum = this.$route.query.phonenum
  }
}
</script>
