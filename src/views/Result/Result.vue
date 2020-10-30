<template>
    <div class="result-container">
        <img class="result-bg" src="@/assets/images/result-background.png"  />
        <div class="back-button" @click="backToRobot">
            <img src="@/assets/images/back.png" />
        </div>
        <div class="result-greet">
            <div class="greet-text">
                <div>亲爱的{{name}},</div>
                <div>2020年{{month}}月{{day}}日{{hour}}时{{min}}分你来到会场</div>
                <div>你知道无论什么时候</div>
                <div>我都在等待与你相遇，一起去探索5G+AI的世界</div>
            </div>
        </div>
        <div class="result-visit">
            <div class="visit-title">
                你对这里充满了好奇
            </div>
            <div class="visit-item" v-for="(item, index) in visitList" :key=index>
                <div>{{item.hour}}时{{item.min}}分</div>
                <div>我们到达了{{item.place}}区域，探寻了{{item.project}}，感受到了{{item.feel}}</div>
            </div>
        </div>
        <!-- <div class="result-complete">
            <img class="complete-title" src="@/assets/images/complete.png">
            <div class="complete-content">
                <div class="complete-item" v-for="(item, index) in completeText" :key=index>
                    {{item}}
                </div>
            </div>
            <img class="complete-present" src="@/assets/images/present.png" />
        </div>
        -->
        <div class="toolbars">
            <div @click="resultRobotLogoShows()" style="height:100%">
                <transition name="van-slide-right" :duration='{ enter: 800, leave: 800 }'>
                    <img
                    style="width:85%"
                    :class="{'rotate':resultRobotLogoShow}"
                    src="@/assets/images/result_robot.png"
                    alt="小天机器人logo"
                    v-if="resultRobotLogoShow"
                    >
                </transition>
                <transition name="van-slide-right" :duration='{ enter: 800, leave: 800 }'>
                    <img
                    src="@/assets/images/result_robot_logo.png"
                    alt="小天机器人logo"
                    v-if="!resultRobotLogoShow"
                    style="top:1px"
                    >
                </transition>
            </div>
            <span @click="formModelShow()"></span>
        </div>
        <ResultForm/>
    </div>
</template>
<script>
import { GETPRESENT } from '../../const/constant'
import ResultForm from './components/ResultForm'

// const ResultForm = () => import('./components/ResultForm')
export default {
  name: 'Result',
  components: {
    ResultForm
  },
  data() {
    return {
      name: 'xx',
      month: 'x',
      day: 'x',
      hour: 'x',
      min: 'x',
      resultRobotLogoShow: true,
      num: 3,
      Timer: null,
      visitList: [
        {
          hour: 'X',
          min: 'X',
          place: 'X',
          project: 'XXXXXX',
          feel: 'XXX'
        },
        {
          hour: 'X',
          min: 'X',
          place: 'X',
          project: 'XXXXXX',
          feel: 'XXX'
        },
        {
          hour: 'X',
          min: 'X',
          place: 'XX',
          project: 'XXXXXX',
          feel: 'XXX'
        },
        {
          hour: 'X',
          min: 'X',
          place: 'XX',
          project: 'XXXXXX',
          feel: 'XXX'
        }
      ],
      completeText: GETPRESENT
    }
  },
  created() {
    this.getBasicInfo()
    this.getName()
  },
  methods: {
    getBasicInfo() {
      // 从后段获取month...
    },
    getName() {
      // 从微信获取名字
    },
    backToRobot() {
      this.$router.replace({ path: '/robotpage' })
    },
    formModelShow() {
      this.$store.commit('setFormModelShow', true)
    },
    resultRobotLogoShows() {
      if (this.resultRobotLogoShow) {
        this.resultRobotLogoShow = false
        this.Timer = setInterval(() => {
          this.num--
          if (this.num < 0) {
            this.resultRobotLogoShow = true
            this.num = 3
            clearInterval(this.Timer)
          }
        }, 1000)
      } else {
        clearInterval(this.Timer)
        this.resultRobotLogoShow = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
.result-container {
    position: relative;
    .toolbars{
        position: fixed;
        top: 50%;
        right: 0;
        height: 120px;
        width: 60px;
        background-color: transparent;
        z-index: 3;
        margin-top: -25px;
        img{
            width: 100%;
            height: auto;
            position: absolute;
            top: 0;
            right: 0;
        }
        .rotate{
            transform: rotate(1deg);
            transform-origin:0 450%;
        }
        span{
            position: absolute;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 25px;
            background: transparent;
            border: none;
            display: inline-block;
        }
    }
    height: 100vh;
    width: 100%;
    background-color: #123199;
    z-index: 2;
    .result-bg {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
    }
    .back-button {
        position: absolute;
        top: 20px;
        left: 15px;
        img {
            width: 20px;
            height: 20px;
        }
    }
    .result-greet {
        margin-left: 34px;
        padding-top: 51px;
       .greet-text {
           color: #d0e1fa;
           font-size: 15px;
           font-family: SourceHanSansCN-Medium;
           line-height: 24px;
           margin-bottom: 4px;
       }
    }
    .result-visit {
        margin-top: 37px;
        margin-left: 34px;
        .visit-title {
            margin-bottom: 3px;
            font-family: PingFangSC-Semibold;
            font-size: 24px;
            line-height: 24px;
            color: #d0e1fa;
        }
        .visit-item {
            font-size: 14px;
            color: #abd1ff;
            line-height: 20px;
            font-family: SourceHanSansCN-Regular;
            width: 272px;
            height: 54px;
            margin-top: 15px;
        }
    }
    // .result-complete {
    //     margin-top: 35px;
    //     margin-left: 33px;
    //     .complete-title {
    //         width: 95px;
    //         height: 23px;
    //         display: block;
    //     }
    //     .complete-content {
    //         float: left;
    //         .complete-item {
    //             font-family: SourceHanSansCN-Medium;
    //             font-size: 15px;
    //             color: #5a6ee1;
    //             line-height: 22px;
    //             height: 38px;
    //             width: 156px;
    //             padding-top: 18px;
    //         }
    //     }
    //     .complete-present {
    //         float: left;
    //         height: 153px;
    //         width: 107px;
    //         margin-left: 40px;
    //         margin-top: -35px;
    //     }
    // }
}
</style>
