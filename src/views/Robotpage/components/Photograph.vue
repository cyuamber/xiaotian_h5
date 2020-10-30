<template>
 <input ref="photoref" type="file" accept="image/*" @change="Photograph()" capture="camera"/>
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
export default {
  name: 'Photograph',
  data() {
    return {
      msgLists: this.msgList,
      msgSrcs: this.msgSrc,
      base64ImgData: null,
      userName: localStorage.getItem('userName'),
      userId: localStorage.getItem('userId')
    }
  },
  props: ['msgList', 'msgSrc'],
  computed: {
    robotId() {
      return this.$store.state.robotInfo.robotId
    },
    isAdd() {
      return !(this.newform.question && this.newform.answer && this.newform.source)
    }
  },
  methods: {
    /**
     * 获取用户拍照的图片信息
     */
    async Photograph() {
      const imgFile = this.$refs.photoref.files[0]
      console.log(imgFile, '----imgFile')
      this.base64ImgData = await this.FileReader(imgFile)
      const formData = new FormData()
      formData.append('image', imgFile)
      const headers = {
        'Content-Type': 'multipart/formdata;charset=utf-8',
        'X-CSRF-Token': window.localStorage.getItem('token')
      }
      let url = ''
      const params = {
        userId: this.userId,
        username: this.userName
      }
      const userMsg = {}
      const robotMsg = {}
      this.$store.commit('setLoadingShow', true)
      if (this.msgList !== undefined) {
        url = API.port8085.uploadImgUrl
        this.checkPhoto(userMsg, robotMsg, url, params, formData, headers)
      } else {
        url = API.port8085.saveUserInfo
        this.msgSrcs = this.base64ImgData
        this.$emit('photoMsg', this.msgSrcs)
        this.reaultUploadPhoto(url, params, formData, headers)
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
     checkPhoto(userMsg, robotMsg, url, params, formData, headers) {
      userMsg = {
        type: 'user',
        imgUrl: this.base64ImgData,
        updateold: false
      }
      this.msgLists.push(userMsg)
      this.$emit('photoMsg', this.msgLists)
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
      axiosPost(url, params, formData, headers)
        .then((res) => {
          if (res && res.msg.length>0 ) {
            robotMsg.owner = 'robot'
            robotMsg.msg[0].code = res.code
            robotMsg.msg[0].content = res.msg
              .replace(/\n\r/g, '<br/>')
              .replace(/\n/g, '<br/>')
          }
          this.$nextTick(() => {
            this.msgLists.push(robotMsg)
            this.$emit('photoMsg', this.msgLists)
            setTimeout(function() {
              const div = document.getElementsByClassName('divScroll')
              div[0].scrollTop = div[0].scrollHeight
            }, 0)
          })
          this.$store.commit('setLoadingShow', false)
          this.$store.commit('setToppPointmodelShow', false)
        })
        .catch(() => {
          this.$store.commit('setLoadingShow', false)
          this.$store.commit('setToppPointmodelShow', false)
        })
    },
    reaultUploadPhoto(url, params, formData, headers) {

    }
  },
  components: { }
}
</script>
