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
import { mapState } from 'vuex'
import API from '../../../utils/api'
import { axiosPost } from '../../../utils/http.js'
export default {
  name: 'Photograph',
  data() {
    return {
      msgLists: this.msgList
    }
  },
  props: ['msgList'],
  computed: {
    robotId() {
      return this.$store.state.robotInfo.robotId
    },
    isAdd() {
      return !(this.newform.question && this.newform.answer && this.newform.source)
    },
    ...mapState({
      userId: state => state.app.userId,
      userName: state => state.app.userId
    })
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
      console.log(formData.get('image'), "-----formData.get('image')")
      const headers = {
        'Content-Type': 'multipart/formdata;charset=utf-8',
        'X-CSRF-Token': window.localStorage.getItem('token')
      }
      const url = API.port8085.uploadImgUrl
      this.$store.commit('setLoadingShow', true)
      const params = {
        userId: this.userId,
        username: this.userName
      }
      axiosPost(url, params, formData, headers)
        .then((res) => {
          console.log(res, 'res-----upload')
          const userMsg = {
            type: 'user',
            imgUrl: res.url,
            updateold: false
          }
          this.msgLists.push(userMsg)
          this.$store.commit('setLoadingShow', false)
          this.$store.commit('setToppPointmodelShow', false)
        })
        .catch(() => {
          const userMsg = {
            type: 'user',
            imgUrl: this.base64ImgData,
            updateold: false
          }
          this.msgLists.push(userMsg)
          this.$emit('photoMsg', this.msgLists)
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
