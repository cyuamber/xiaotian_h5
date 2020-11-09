<template>
 <div>
   <input ref="photoref" type="file" accept="image/*" @change="Photograph()" capture="camera"/>
  <canvas id="canvas" width="400" height="0" style="display:none"></canvas>
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
      let binaryData = null;
      const imgFile = this.$refs.photoref.files[0]
      this.base64ImgData = await this.FileReader(imgFile)
      const image = new Image(),
      canvas = document.getElementById("canvas"),
      ctx = canvas.getContext('2d');
      let data = null;
      image.src = this.base64ImgData;
      let w = image.naturalWidth,
          h = image.naturalHeight;
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(image, 0, 0, w, h, 0, 0, w, h);
      data = canvas.toDataURL("image/jpeg",0.5);
      data = data.split(',')[1];
      data = window.atob(data)
      let ia = new Uint8Array(data.length);
      for (var i = 0; i < data.length; i++) {
        ia[i] = data.charCodeAt(i); 
      };
      let blob = new Blob([ia], {
        type: "image/jpeg"
      }); 
      const formData = new FormData()
      formData.append('image', blob)
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
        this.$emit('photoMsg', this.uploadUserInfo)
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
      userMsg = {
        type: 'user',
        imgUrl: this.base64ImgData,
        updateold: false
      }
      this.msgLists.push(userMsg)
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
      axiosPost(url, params, formData, headers)
        .then((res) => {
          if (res && res.msg.length>0 ) {
            robotMsg.owner = 'robot'
            robotMsg.msg[0].code = Number(res.code)
            robotMsg.msg[0].content = res.msg
              .replace(/\n\r/g, '<br/>')
              .replace(/\n/g, '<br/>')
          }
          this.$nextTick(() => {
            this.msgLists.push(robotMsg)
            console.log(this.msgLists, '上传图片pic，随后出发photoMsg')
            this.$emit('photoMsg', this.msgLists) // 调起result和count的获取
            setTimeout(function() {
              const div = document.getElementsByClassName('divScroll')
              div[0].scrollTop = div[0].scrollHeight
            }, 0)
          })
          this.$store.commit('setLoadingShow', false)
          // this.$store.commit('setToppPointmodelShow', false)
        })
        .catch((err) => {
          this.$store.commit('setLoadingShow', false)
          Notify('图片打卡数据返回失败');
          console.log(err)
          // this.$store.commit('setToppPointmodelShow', false)
        })
    }
  },
  components: { }
}
</script>
