<template>
  <div id="componentBody" :style="{'height': swipeHeight + 'px'}">
    <div class="drawerBody">
      <van-sticky class="top">
        <img class="top-img" src="@/assets/images/robot_top.png">
        <div class="top-block" v-for="(item, index) in imgIcon" :key="index" :class="{ 'z-index': item.zIndex }">
          <div class="top-number">
            <img class="number-img" :src="item.fireImgSrc">
            <span class="number-text">{{item.number}}</span>
          </div>
          <img
            class="top-point"
            @click="() => getInformation(item, index)"
            :src="item.isCheck && item.zIndex ? item.swipeShowChecked : item.src"
            alt=""
          />
        </div>
      </van-sticky>
      <div class="dialog-wrap" :style="{'height': swipeHeight - 100 - 135 + 'px'}">
        <div class="bodyDialog divScroll" :style="{'height': swipeHeight - 100 - 135 + 'px'}">
          <Chatbox :msgList="msgList" :allPhotoIscheck="allPhotoIscheck" @photoMsgClose="photoMsg"/>
        </div>
      </div>
      <div class="footer">
        <div class="common-question">
          <a
            v-for="(question, index) in commonQuestion"
            :key="index"
            @click="quickClick()"
            >
            {{ question }}
          </a>
        </div>
        <div class="bodyInput">
          <textarea
            class="inputArea"
            v-model="inputContent"
            @keydown.enter="pressEnter"
            v-show="!textSwitch"
            contenteditable="true"
            style="-webkit-user-select: auto;"
          />
          <div class="checkphotos">
            <img src="@/assets/images/checkPhotos.png" alt="拍照打卡" />
            <Photograph class="check-button" :msgList="msgList" @photoMsg="photoMsg" />
          </div>
        </div>
      </div>
    </div>
    <Loading v-if="LoadingShow" />
    <Popupinfo
      :msgList="msgList"
      @photoMsg="photoMsg"
      :allPhotoIscheck="allPhotoIscheck"
      :imgIcon="imgIcon"
      :swipeToNum='swipeToNum'
      @swipeLoop='swipeLoop'
    />
  </div>
</template>
<style lang="less" scoped>
.top {
  width: 100%;
  height: 100px;
  text-align: center;
  .top-img {
    width: 100%;
    height: 116px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .top-block {
    position:relative;
    display: inline-block;
    // margin: 18px 15px 0 15px;
    width: 22%;
    margin: 10px 1%;
    position: relative;
    align-items: center;
    text-align: center;
    z-index: 3;
    .top-number {
      text-align: center;
    }
    .number-img {
      height: 12.5px;
      width: 10px;
      display: inline-block;
      margin-right: 3px;
    }
    .number-text {
      font-size: 12px;
      color: rgb(181,196,252);
    }
    .top-point {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      line-height: 75px;
      margin-top: 6px;
    }
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
  background-color: #DFE7EE;
  -webkit-overflow-scrolling: touch;
  overflow: hidden;
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
  opacity: 0.2;
}
.divScroll::-webkit-scrollbar-track {
  background: transparent;
}
.dialog-wrap {
  width: 99%;
  margin: 0 20px 0 0;
  overflow: hidden;
}
.bodyDialog {
  width: 102%;
  display: flex;
  flex-flow: column;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.footer {
  width: 100%;
  background-color: #DFE7EE;
  color: #fff;
  .common-question {
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    margin: 13px 0 13px 0;
    a {
      display: inline-block;
      padding: 9px;
      margin: 0 5px 0px 5px;
      background-color: #ffffff;
      border-radius: 25px;
      color: #10164e;
      opacity: 0.7;
      font-size: 15px;
      border: solid 1px #ffffff;
    }
    a:active {
      border: solid 1px #097de9;
      color: #097de9;
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
  margin: 0 auto;
  display: flex;
  overflow: hidden;
  .footer-icon {
    display: inline-block;
    width: 18px;
    height: 24px;
    // margin: 0 0.3rem;
    position: absolute;
    top: 10px;
    left: 25px;
    img {
      width: 100%;
      height: auto;
    }
  }
  .checkphotos {
    display: inline-block;
    margin-top: -10%;
    width: 36%;
    position: relative;
    .check-button {
      position: absolute;
      width: 70%;
      top: 40%;
      height: 40%;
      left: 20%;
    }
    img {   
      width: 100%;
      height: auto;
      margin-top: 2px;
    }
    input[type="file"] {
      z-index: 9;
      opacity: 0;
    }
  }
}
.inputArea{
  resize: none;
  width: 60%;
  overflow: auto;
  background-color: #ffffff;
  border-style: none;
  font-size: 17px;
  font-weight: 400;
  color: #10164e;
  padding: 0;
  border-style: none;
  box-shadow: none;
  margin: 0 0 0 4%;
  height: 44px;
  line-height: 44px;
  border-radius: 25px;
  text-indent: 0.5rem;
}
</style>

<script>
import { mapState } from 'vuex'
import { axiosGet } from '../../utils/http.js'
import API from '../../utils/api'
import { get_UserName } from '../../utils/index.js'
import {
  POINTINFO,
  COMMONQUESTION,
  IMGICON,
  FIREIMG
} from '../../const/constant'
import Loading from '../../components/Loading'
import Chatbox from './components/Chatbox'
import { Notify } from 'vant'
const Popupinfo = () => import('./components/Popupinfo')
const Photograph = () => import('./components/Photograph')

export default {
  name: 'RobotTestBtn',
  components: {
    Loading,
    Chatbox,
    Popupinfo,
    Photograph
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
      phonenum: '',
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
      userId: localStorage.getItem('userId'),
      swipeToNum: 0,
      allPhotoIscheck: false,
      countInterval: 60000,
      timer: null,
      getRecorderTimer: null,
      setTalkTimer: null,
      swipeHeight: 730,
      firekeys: ['1','2','3','4']
      // questionStyle: ''
    }
  },
  mounted() {
    if (localStorage.getItem('userId') === undefined || localStorage.getItem('userId') === null) {
      this.userId = localStorage.setItem('userId', get_UserName(32))
    }
    this.getuploadImgResults()
    this.$nextTick(() => {
      this.swipeHeight = window.innerHeight
    })
  },
  beforeDestroy() {
    this.endPoll()
  },
  methods: {
    startPoll() {
      this.getCount()
      this.timer = setInterval(this.getCount, this.countInterval)
    },
    endPoll() {
      clearInterval(this.timer)
    },
    getCount() {
      const url = API.port8085.getCount
      axiosGet(url)
        .then((res) => {
          if (res.code === 200 && res.data !== undefined) {
            const info = res.data
            let fireNumbers = []
            this.firekeys.map(item => {
              if (Object.keys(info).indexOf(item) > -1) {
                fireNumbers.push({
                  num: info[item],
                  src: '',
                  key: item
                })
              } else {
                fireNumbers.push({
                  num: 0,
                  src: '',
                  key: item
                })
              }
            })
            fireNumbers = fireNumbers.sort(function(a,b){
              return Number(a.num)-Number(b.num)
            })
            fireNumbers.map((item, index) => {
              item.src = FIREIMG[index]
            })
            fireNumbers.map((item, index) => {
              if (fireNumbers[index+1] !== undefined && fireNumbers[index+1].num === fireNumbers[0].num) {
                fireNumbers[index+1].src = fireNumbers[index].src
              }
            })
            this.imgIcon.map((item, index) => {
              fireNumbers.map(items => {
                if(item.key === items.key){
                  item.fireImgSrc = items.src,
                  item.number = items.num
                }
              })
            })
          } else {
            console.log(res.msg) // 报错
          }
        })
        .catch((err) => {
          console.log(err)
          // 错误处理
        })
    },
    getuploadImgResults(photocheck) {
      console.log('result')
      const url = API.port8085.getuploadImgResult
      this.userId = this.userId === null || this.userId === undefined ? localStorage.getItem('userId') : this.userId
      const params = {
        userId: this.userId
      }
      this.$store.commit('setLoadingShow', true)
      axiosGet(url, params)
        .then((res) => {
          this.$store.commit('setLoadingShow', false)
          this.$store.commit('setToppPointmodelShow', false)
          if (res && res.data.length > 0 && typeof res.data[0] === 'object') {
            this.getCheckIconStatus = res.data
            this.filterCheckIconStatus(this.getCheckIconStatus)
            this.getCount()
          } else {
            Notify('打卡数据返回失败');
          }
        })
        .catch((err) => {
          console.log(err)
          Notify('打卡数据返回失败');
          this.$store.commit('setToppPointmodelShow', false)
          this.$store.commit('setLoadingShow', false)
        })
    },
    photoMsg(data) {
      console.log('触发成功')
      // if(data.step1 !== undefined && data.step1){
      //   console.log('step1')
      //   this.msgList = [...data.msgLists]
      //   this.$nextTick(() => {
      //       setTimeout(function() {
      //         const div = document.getElementsByClassName('divScroll')
      //         div[0].scrollTop = div[0].scrollHeight
      //       }, 0)
      //     })
      // } else {
        // console.log('other')
        // console.log(this.msgList, 'older')
        // console.log(data, 'new')
        // this.msgList = [...data]
        const photocheck = true
        this.getuploadImgResults(photocheck)
      // }
    },
    swipeLoop(data) {
      this.imgIcon = [...data]
    },
    filterCheckIconStatus(data) {
      this.imgIcon.map((item, index) => {
        data.map((items, ind) => {
          if (items.title === item.title) {
            item.isCheck = items.isCheck
            item.src = items.isCheck ? item.checked : item.unchecked
            item.popupinfoIconSrc = items.isCheck
              ? item.popupinfoChecked
              : item.popupinfoUnchecked
          }
        })
      })
      this.imgIcon = [...this.imgIcon]
      const statusAll = []
      data.map((items) => {
        statusAll.push(items.isCheck)
      })
      if (!statusAll.includes(false)) {
        this.allPhotoIscheck = true
      }
    },
    showDrawer() {
      this.msgList = []
      const robotMsg = {
        owner: 'robot',
        type: 'text',
        init: true,
        msg: [
          {
            type: 'text',
            content:
              '欢迎来到2020年中国移动全球合作伙伴大会，我是智能导览员小天，快来跟随我一起去探索大会～找到小天形象的立牌就赶快拍照上传赢取盲盒吧~'
          }
        ]
      }
      this.msgList.push(robotMsg)
    },
    // TODO:这个地方需要抽离成一个公共的vuex action，在各个组件调用时，直接调取此方法
    quickClick(word) {
      const e = window.event
      const question =
        e.target.innerHTML && e.target.innerHTML !== ''
          ? e.target.innerHTML
          : word
      const userMsg = {
        type: 'user',
        oldform: {
          question: question,
          answer: '',
          source: ''
        },
        updateold: false
      }
      this.getAnswer(userMsg)
      e.preventDefault()
    },
    getAnswer(questions) {
      const params = {
        userId: this.userId,
        text: questions.oldform.question
      }
      const url = API.port8085.sendTextUrl
      this.msgList.push(questions)
      this.$nextTick(() => {
            setTimeout(function() {
              const div = document.getElementsByClassName('divScroll')
              div[0].scrollTop = div[0].scrollHeight
            }, 0)
      })
      const robotMsg = {
        idx: this.msgList.length - 1,
        owner: 'robot',
        msg: [
          {
            type: 'text',
            content: ''
          }
        ]
      }
      this.inputContent = ''
      this.$store.commit('setLoadingShow', true)
      axiosGet(url, params)
        .then((res) => {
          if (res &&
            res.data &&
            typeof res.data === 'object' &&
            res.data.length === 1
          ) {
            robotMsg.owner = 'robot'
            robotMsg.msg[0].content = res.data[0].content
              .replace(/\n\r/g, '<br/>')
              .replace(/\n/g, '<br/>')
          } else if (
            res &&
            res.data &&
            typeof res.data === 'object' &&
            res.data.length > 1
          ) {
            robotMsg.msg = []
            robotMsg.msg = res.data
          }
          this.$nextTick(() => {
            if ( res && res.data && res.data.length > 0) {
              this.msgList.push(robotMsg)
            }
            setTimeout(() => {
              const div = document.getElementsByClassName('divScroll')
              div[0].scrollTop = div[0].scrollHeight
            }, 0)
          })
          this.$store.commit('setLoadingShow', false)
        })
        .catch((error) => {
          console.log(error, '=====err')
          if(error.code === 'ECONNABORTED' || error.message === 'Network Error' || error.message.includes('timeout')){
            Notify('网络超时');
          }
          this.$store.commit('setLoadingShow', false)
        })
    },
    countDowns() {
      this.count = 10
      this.count--
      if (this.count <= 0 && this.longPress === true) {
        clearInterval(this.countDownTimes)
        this.$store.commit('setMaskShow', false)
      }
    },
    getInformation(item, index) {
      this.quickClick(item.title) // 点击图标时自动发送对应文字
      this.imgIcon.map((item) => {
        item.zIndex = false
      })
      this.imgIcon[index].zIndex = true
      this.swipeToNum = index
      this.$store.commit('setToppPointmodelShow', true)
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
    }
  },
  computed: {
    robotId() {
      return this.$store.state.robotInfo.robotId
    },
    isAdd() {
      return !(
        this.newform.question &&
        this.newform.answer &&
        this.newform.source
      )
    },
    ...mapState({
      robotSkeleton: (state) => state.app.robotSkeleton,
      talkText: (state) => state.app.talkText,
      LoadingShow: (state) => state.app.LoadingShow
    })
  },
  created() {
    this.showDrawer()
    this.startPoll()
  }
}
</script>
