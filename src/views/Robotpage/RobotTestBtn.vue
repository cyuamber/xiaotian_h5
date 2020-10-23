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
          <div class="footer-icon" @click="textButtonSwitch()">
            <van-icon
              name="add-o"
              size="0.7rem"
              v-show="!textSwitch"
              color="rgba(40,89,253,1)"
            />
             <!-- <img v-show="!textSwitch" src="@/assets/images/talk-icon.png" alt="语音"> -->
            <img v-show="textSwitch" src="@/assets/images/talk-icon.png" alt="语音">
          </div>
          <textarea
            class="inputArea"
            v-model="inputContent"
            @keydown.enter="pressEnter"
            v-show="!textSwitch"
          />
          <button class="talk-button" v-show="textSwitch" @touchstart="talkStart" @touchend="talkEndClear"></button>
          <div class="checkphotos">
            <img src="@/assets/images/checkPhotos.png" alt="拍照打卡">
            <input ref="photoref" type="file" accept="image/*" @change="Photograph()" capture="camera"/>
          </div>
        </div>
      </div>
    </div>

    <Loading v-if="LoadingShow" />
    <Recorder @sendTalkMsg='sendTalkMsg'/>
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
/* img{
   pointer-events:none;
} */
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
  background-color: rgba(13,12,81,0.596);
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
  background: url('../../assets/images/background_img.png') no-repeat 100% 100%;
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
      background: rgba(38,28,176,0.8);
      border-radius: 25px;
      color: rgba(166,180,241,0.8);
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
    img{
      width: 100%;
      height: auto;
    }
  }
  .checkphotos{
    width: 20%;
    height: auto;
    display: inline-block;
    position: relative;
    img{
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
.inputArea, .talk-button{
  resize: none;
  width: 70%;
  overflow: auto;
  background: rgba(28,22,145,0.8);
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
  text-indent: 0.4rem;
}
.inputArea{
  width: 56%;
  margin: 0 3% 0 16%;
}
</style>

<script>
import { mapState } from 'vuex'
import { axiosGet, axiosPost } from '../../utils/http.js'
import { POINTINFO, COMMONQUESTION, GETANSWERRES } from '../../const/constant'
import Loading from '../../components/Loading'
import Chatbox from './components/Chatbox'
import Recorder from './components/Recorder'
import API from '../../utils/api'
export default {
  name: 'RobotTestBtn',
  components: {
    Loading,
    Chatbox,
    Recorder
  },

  data() {
    return {
      inputContent: '',
      msgList: [],
      width: document.body.clientWidth,
      newform: {
        question: '',
        answer: '',
        source: ''
      },
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
      textSwitch: false,
      timeOutEvent: 0,
      count: 10,
      countDownTimes: null,
      longPress: false,
      base64ImgData: null
    }
  },
  methods: {
    showDrawer() {
      this.msgList = []
      const robotMsg = {
        owner: 'robot',
        type: 'text',
        init: true,
        msg: [
          {
            type: 'text',
            value:
              '您好，欢迎来到中国移动合作伙伴大会，我是移动“融智”战略下诞生的智能机器人小天。接下来请跟随我一起游览展台、拍照打卡、领取礼品、吧~见到我的立牌就拍照上传吧~'
          }
        ]
      }
      this.msgList.push(robotMsg)
    },
    // TODO:这个地方需要抽离成一个公共的vuex action，在各个组件调用时，直接调取此方法
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
      this.getAnswer(userMsg)
      e.preventDefault()
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
        owner: 'robot',
        msg: ''
      }
      this.inputContent = ''
      this.LoadingShow = true
      axiosGet(url, params, headers)
        .then((res) => {
          if (res && res.a.length > 0 && res.a[0].a) {
            robotMsg.owner = 'robot'
            robotMsg.msg = res.a[0].a
              .replace(/\n\r/g, '<br/>')
              .replace(/\n/g, '<br/>')
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
          robotMsg.msg = GETANSWERRES
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

    textButtonSwitch() {
      if (this.textSwitch) {
        this.textSwitch = false
        this.inputContent = ''
      } else {
        this.textSwitch = true
      }
    },
    countDowns() {
      this.count--
      if (this.count <= 0 && this.longPress === true) {
        clearInterval(this.countDownTimes)
        this.$store.commit('setMaskShow', false)
      }
    },
    talkEndClear(e) {
      e.stopPropagation()
      clearTimeout(this.timeOutEvent)
      if (this.timeOutEvent !== 0) {
        console.log('你这是点击，不是长按')
      } else {
        this.longPress = false
        clearInterval(this.countDownTimes)
        // this.$store.commit('setMaskShow', false)
      }
      return false
    },
    talkStart(e) {
      e.stopPropagation()
      this.timeOutEvent = setTimeout(() => {
        this.timeOutEvent = 0
        this.longPress = true
        // 真正长按后应该执行的内容
        this.$store.commit('setMaskShow', true)
        this.countDownTimes = setInterval(this.countDowns, 1000)
      }, 500)
      return false
    },
    sendTalkMsg(data) {
      const params = {
        talkText: data
      }
      const url = API.port8085.sendVoiceUrl
      this.LoadingShow = true
      axiosPost(url, params)
        .then((res) => {
          const userMsg = {
            type: 'user',
            voiceUrl: res.url,
            updateold: false
          }
          this.msgList.push(userMsg)
          this.LoadingShow = false
        })
        .catch(() => {
          const userMsg = {
            type: 'user',
            voiceUrl: 'http://sc1.111ttt.cn/2018/1/03/13/396131232171.mp3',
            updateold: false
          }
          this.msgList.push(userMsg)
          this.LoadingShow = false
          // this.$router.push({ path: '/home' })
        })
    },
    getInformation(item) {
      this.toppPointmodelShow = true
      const params = {
        key: item.title
      }
      const url = API.port8085.getCheckInInformationUrl
      this.LoadingShow = true
      axiosGet(url, params)
        .then((res) => {
          this.pointInfo = res
          this.LoadingShow = false
        })
        .catch(() => {
          this.pointInfo = POINTINFO
          this.LoadingShow = false
        })
    },

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
    /**
     * 获取用户拍照的图片信息
     */
    async Photograph() {
      const imgFile = this.$refs.photoref.files[0]
      this.base64ImgData = await this.FileReader(imgFile)
      const formData = new FormData()
      formData.append('image', imgFile)
      const headers = {
        'Content-Type': 'multipart/formdata',
        'X-CSRF-Token': window.localStorage.getItem('token')
      }
      const url = API.port8085.uploadImgUrl
      this.LoadingShow = true
      axiosPost(url, formData, formData, headers)
        .then((res) => {
          const userMsg = {
            type: 'user',
            imgUrl: res.url,
            updateold: false
          }
          this.msgList.push(userMsg)
          this.LoadingShow = false
        })
        .catch(() => {
          const userMsg = {
            type: 'user',
            imgUrl: this.base64ImgData,
            updateold: false
          }
          this.msgList.push(userMsg)
          this.LoadingShow = false
        })
      // 获取图片base64 代码，并存放到 base64ImgData 中
      console.log(this.base64ImgData, '--------base64ImgData__')
    },
    /**
     * 返回用户拍照图片的base64
     */
    FileReader(FileInfo) {
      // FileReader 方法参考地址：https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
      const reader = new FileReader()
      // readAsDataURL 方法参考地址：https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsDataURL
      reader.readAsDataURL(FileInfo)
      // 监听读取操作结束
      /* eslint-disable */
      return new Promise(resolve => reader.onloadend = () => resolve(reader.result))
    }
  },
  computed: {
    userId() {
      return this.$store.state.userId
    },
    robotId() {
      return this.$store.state.robotInfo.robotId
    },
    isAdd() {
      return !(this.newform.question && this.newform.answer && this.newform.source)
    },
    ...mapState({
      talkText: state => state.app.talkText
    })
  },
  created() {
    this.showDrawer()
    this.username = this.$route.query.username
    this.phonenum = this.$route.query.phonenum
  }
}
</script>
