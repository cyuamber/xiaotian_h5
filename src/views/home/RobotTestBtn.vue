<template>
    <div id="componentBody">
            <div class="drawerBody">
                <div class="bodyDialog divScroll">
                    <div v-for="(msg,index) in msgList" :key="index">
                        <div v-if="msg.type === 'robot'" class="robotMsg-box">
                            <img src="@/assets/xiaotian.png" width="20%" />
                            <div class="robotMsg" v-html='msg.msg' @click="hotClick(msg.idx)"></div>
                        </div>
                        <div class="userMsg-box" v-if="msg.type === 'user' && !msg.addnew">
                            <van-icon class="user-icon" name="friends" size="20" />
                            <div class="userMsg">
                                <span>{{msg.oldform.question}}</span>
                            </div>
                        </div>
                        <div style='text-align:center;margin-bottom:16px' v-if="msg.type === 'addAndupdate'"> 
                            <span class="addupdateMsg">{{msg.msg}}</span>
                        </div>
                    </div>
                </div>
                <div class="bodyInput">
                    <button style="width: 88px; height: 32px; padding-left: 10px;"  @click="reset">
                        <span class="icon iconfont iconshuaxin">发送</span>
                    </button>
                    <textarea class="inputArea" placeholder="在此体验技能，按enter键可直接发送" v-model="inputContent" @keydown.enter="pressEnter" />
                </div>
            </div>
    </div>
</template>
<style>
.ant-drawer-title {
    text-align: left!important;
    color: #fff;
}
.ant-drawer-close {
    width: 50px;
    height: 50px;
    line-height: 50px;
}
</style>
<style lang="less" scoped>

#componentBody {
    width: 100%;
    height: 100vh;
    background-color: #143558;
}
.drawerBody {
    overflow: hidden;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    background: #fff;
}
.divScroll::-webkit-scrollbar {
    width: 6px;
}
.divScroll::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: #D9D9D9;
    opacity: 0.2;
}
.divScroll::-webkit-scrollbar-track {
    background: transparent;
}
.bodyDialog {
    width: 100%;
    height: calc(100% - 200px);
    border-bottom: 1px solid #D9D9D9;
    padding: 20px 20px 20px 0;
    display: flex;
    flex-flow: column;
    overflow: auto;
}
.bodyInput {
    width: 100%;
    height: 200px;
    padding-left: 21px;
    padding-right: 21px;
    padding-top: 8px;
}
.inputArea {
    resize: none;
    margin-top: 9px;
    max-height: 120px;
    min-height: 120px;
    overflow: auto;
    background: transparent;
    border-style: none;
    font-size: 12px;
    font-weight: 400;
    color: #555555;
    line-height: 18px;
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
    background: #FFFFFF;
    border-radius: 0px 24px 24px 24px;
    padding: 13px 16px 13px 16px;
    font-size: 12px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 18px;
    margin-bottom: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,.15);
}
.userMsg {
    float: right;
    width: fit-content;
    max-width: 344px;
    background: #f2f2f2;
    border-radius: 24px 0px 24px 24px;
    padding: 13px 16px 13px 16px;
    margin-right: 10px;
    font-size: 12px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 18px;
    margin-bottom: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,.15);
}
.user-icon{
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
    background:#3F96C4;
}
.noclick {
    background: #aaa;
}
.noclick:hover {
    background: #aaa;
}
</style>

<script>
import { mapState } from "vuex";
import { axiosGet,axiosPost } from "../../utils/http.js";
import API from '../../utils/api';
export default {
    name: "RobotTestBtn",
    data() {
        return {
            inputContent: "",
            msgList: [
            ],
            visible: false,
            title: '智慧党建问答助手',
            width:  document.body.clientWidth,
            newform: {
                question: '',
                answer: '',
                source: ''
            },
            addnew: false,
            username: '',
            phonenum: ''
        };
    },
    methods: {
        reset() {
            this.msgList = []
            this.showDrawer()
        },
        showDrawer() {
            this.msgList = []
            this.visible = true;
            const robotMsg = {
                type: 'robot',
                msg: '您好，欢迎来到中国移动合作伙伴大会，我是移动“融智”战略下诞生的智能机器人小天。接下来请跟随我一起游览展台、拍照打卡、领取礼品、吧~见到我的立牌就拍照上传吧~'
            };
            robotMsg.msg = robotMsg.msg + `<br/><a class='hot-issue' style='color: #337DFF'>如何打卡</a>
                                           <br/><a class='hot-issue' style='color: #337DFF'>获取打卡地图</a>`
            this.msgList.push(robotMsg);
        },

        // onClose() {
        //     this.visible = false;
        // },
        pressEnter(e) {
            if(!this.inputContent.match(/^[ ]*$/)){
                const userMsg = {
                    type: 'user',
                    oldform: {
                        question: this.inputContent,
                        answer: '',
                        source: ''
                    },
                    updateold: false,
                };
                this.getAnswer(userMsg)
            }
            e.preventDefault()
        },
        hotClick(idx) {
            const e = window.event
            if(e.target.innerHTML == '您可能需要：添加新问答' && !this.addnew) {
                this.addnew = true
                this.newform = {
                    question: '',
                    answer: '',
                    source: ''
                }
                const userMsg = {
                    type: 'user',
                    addnew: 'true'
                };
                this.msgList.push(userMsg);
                this.$nextTick(() => {
                    setTimeout(function(){ 
                        const div = document.getElementsByClassName('divScroll');
                        div[0].scrollTop = div[0].scrollHeight;
                    }, 0);
                })
            }else if(e.target.innerHTML == '答案是否满意？您可能需要：添加问题答案'){
                for(let i=0;i<this.msgList.length;i++) {
                    if(this.msgList[i].idx == idx) {
                        idx = i-1
                    }
                }
                this.msgList[idx].oldform.answer = ''
                this.msgList[idx].oldform.source = ''
                this.msgList[idx].updateold = true
            }
        },
        addandClose(index) {
            this.dangwu(this.newform).then((res) => {
                if(res.errno == 0) {
                    this.addnew = false
                    this.msgList.splice(index,1)
                    const addupdateMsg = {
                        type: 'addAndupdate',
                        msg: '您已成功添加新问答'
                    };
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
            this.dangwu(this.msgList[index].oldform).then((res) => {
                if(res.errno == 0) {
                    this.msgList[index].updateold = false
                    const addupdateMsg = {
                        type: 'addAndupdate',
                        msg: '您已成功添加问题答案'
                    };
                    this.msgList.push(addupdateMsg)
                }
            })
        },
        dangwu(form) {
            const url = API.port9101.addUrl
            const headers = {
                'userid': this.userId
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
            this.msgList.splice(index,1)
        },
        getAnswer(question) {
            const params = {
                'uid': this.userId,
                'l': 100,
                'c': this.$route.query.c,
                "q": question.oldform.question
            };
            const url = API.port8085.dialogUrl;
            
            const headers = {
                'userid': this.userId
            }
            this.msgList.push(question);
            const robotMsg = {
                idx: this.msgList.length - 1,
                type: "robot"
            }
            this.inputContent = '';

            

            axiosGet(url, params, headers).then((res)=>{
                if(res && res.a.length > 0 && res.a[0].a){
                    robotMsg.type = 'robot'
                    robotMsg.msg = res.a[0].a.replace(/\n\r/g,'<br/>').replace(/\n/g,'<br/>')
                }
                robotMsg.msg = robotMsg.msg + `<br/><a class='hot-issue' style='color: #337DFF'>答案是否满意？您可能需要：添加问题答案</a>`
                this.$nextTick(() => {
                    this.msgList.push(robotMsg);
                    setTimeout(function(){ 
                        const div = document.getElementsByClassName('divScroll');
                        div[0].scrollTop = div[0].scrollHeight;
                    }, 0);
                })
                this.$store.commit('hideLoading', {}, { root: true });
            }).catch(() => {
                this.$store.commit('hideLoading', {}, { root: true });

                // 本地mock,线上测试时，请注释以下这段代码------------------
                 robotMsg.msg = "根据地图指引，在CHBN打卡点处拍照并上传，小天会自动判断是否打卡成功（每个类别有多个打卡点，只要打卡一次上传成功即可）"
                this.$nextTick(() => {
                this.msgList.push(robotMsg);
                setTimeout(function(){ 
                    const div = document.getElementsByClassName('divScroll');
                    div[0].scrollTop = div[0].scrollHeight;
                }, 0);
                })
                // ------------------
            });
        },
        showErrorNotification(title, content) {
            this.$notification.open({
                message: title,
                description: "失败原因：" + content,
                icon: (<jt-icon type="exclamation-circle" theme="filled" style="color:#F04134"/>),
                duration: 0
            });
        },
    },
    computed: {
        ...mapState(["channelno"]),
        userId() {
            return this.$store.state.userId
        },
        robotId() {
            return this.$store.state.robotInfo.robotId
        },
        isAdd() {
            return this.newform.question && this.newform.answer && this.newform.source?false:true
        }

    },
    created() {
        this.showDrawer()
        this.username = this.$route.query.username
        this.phonenum = this.$route.query.phonenum
    }
};
</script>
