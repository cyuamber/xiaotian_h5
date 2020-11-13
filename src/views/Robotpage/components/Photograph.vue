<template>
 <div>
   <input ref="photoref" type="file" accept="image/*" @change="Photograph()" capture="camera"/>
 </div>
</template>
<style lang="less" scoped>
  input[type="file"] {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    opacity: 0;
  }
</style>
<script>
import API from '../../../utils/api'
import { axiosPost } from '../../../utils/http.js'
import { Notify } from 'vant'
export default {
  name: 'Photograph',
  data() {
    return {
      msgLists: this.msgList,
      msgSrcs: this.msgSrc,
      base64ImgData: null,
      userId: localStorage.getItem('userId')
    }
  },
  props: ['msgList', 'msgSrc'],
  methods: {
    /**
     * 获取用户拍照的图片信息
     */
    async Photograph() {
      const imgFile = this.$refs.photoref.files[0]
      this.base64ImgData = await this.FileReader(imgFile)
      const formData = new FormData()
      formData.append('image', imgFile)
      const headers = {
        'Content-Type': 'multipart/formdata;charset=utf-8',
        'X-CSRF-Token': window.localStorage.getItem('token')
      }
      let url = ''
      const params = {
        userId: this.userId
      }
      const userMsg = {}
      const robotMsg = {}
      if (this.msgList !== undefined) {
        url = API.port8085.uploadImgUrl
        // this.$emit('photoMsg', this.msgLists)
        this.checkPhoto(url, params, formData, headers, userMsg, robotMsg)
      } else {
        console.log('???')
        url = API.port8085.saveUserInfo
        this.msgSrcs = this.base64ImgData
        this.uploadUserInfo = {
          msgPreviewSrc: this.base64ImgData,
          imgFile: imgFile,
          takePhoto: true
        }
        // this.$emit('photoMsg', this.uploadUserInfo)
      }
    },
    /**
     * 返回用户拍照图片的base64
     */
    FileReader(FileInfo) {
      const reader = new FileReader()
      reader.readAsDataURL(FileInfo)
      // 监听读取操作结束
      /* eslint-disable */
      return new Promise(resolve => reader.onloadend = () => resolve(reader.result))
    },
     checkPhoto(url, params, formData, headers, userMsg, robotMsg ) {
       console.log('push')
      userMsg = {
        type: 'user',
        imgUrl: this.base64ImgData,
        updateold: false
      }
      this.msgLists.push(userMsg)
      setTimeout(function() {
        const div = document.getElementsByClassName('divScroll')
        div[0].scrollTop = div[0].scrollHeight
      }, 0)
      
      // const step1_add_userMsg = {
      //   msgLists: this.msgLists,
      //   step1: true
      // }
      // this.$emit('photoMsg', step1_add_userMsg)
      robotMsg = {
        idx: this.msgList.length - 1,
        owner: 'robot',
        msg: [
          {
            type: 'text',
            content: '',
            code: null
          }
        ]
      }
      this.$store.commit('setLoadingShow', true)
      console.log('pic接口')
      axiosPost(url, params, formData, headers)
        .then((res) => {
          if (res && res.msg.length>0 ) {
            robotMsg.owner = 'robot'
            robotMsg.msg[0].code = Number(res.code)
            robotMsg.msg[0].content = res.msg
              .replace(/\n\r/g, '<br/>')
              .replace(/\n/g, '<br/>')
          }
          // this.msgLists.push(robotMsg)
          // this.$emit('photoMsg', this.msgLists)
          this.$nextTick(() => {
            console.log('photo')
            this.msgLists.push(robotMsg)
            console.log('chufa', this.msgLists)
            this.$emit('photoMsg', this.msgLists) // 调起result和count的获取
            setTimeout(function() {
              const div = document.getElementsByClassName('divScroll')
              div[0].scrollTop = div[0].scrollHeight
            }, 0)
          })
          this.$store.commit('setLoadingShow', false)
          this.$refs.photoref.value = ''
          // this.$store.commit('setToppPointmodelShow', false)
        })
        .catch((err) => {
          this.$store.commit('setLoadingShow', false)
          console.log(err)
          Notify('网络超时，图片打卡数据返回失败');
          this.$store.commit('setToppPointmodelShow', false)
          // this.$emit('photoMsg', this.msgLists)
          // setTimeout(function(){location.reload()},1000);
        })
    }
  },
  components: { }
}
</script>
