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
      base64ImgData: null,
      userName: localStorage.getItem('userName'),
      userId: localStorage.getItem('userId')
    }
  },
  props: ['msgList'],
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
      const url = API.port8085.uploadImgUrl
      this.$store.commit('setLoadingShow', true)
      const userMsg = {
        type: 'user',
        imgUrl: this.base64ImgData,
        updateold: false
      }
      this.msgLists.push(userMsg)
      this.$emit('photoMsg', this.msgLists)
      const params = {
        userId: this.userId,
        username: this.userName
      }
      const robotMsg = {
        idx: this.msgList.length - 1,
        owner: 'robot',
        msg: [
          {
            type: 'text',
            value: '',
            code: null
          }
        ]
      }
      axiosPost(url, params, formData, headers)
        .then((res) => {
          if (res && res.data) {
            robotMsg.owner = 'robot'
            robotMsg.msg[0].code = res.code
            robotMsg.msg[0].value = res.msg
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
      // 获取图片base64 代码，并存放到 base64ImgData 中
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
    }
  },
  components: { }
}
</script>
