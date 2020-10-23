
const port8085 = '/port8085'
const port9101 = '/port9101'

export default {
  port8085: {
    dialogUrl: port8085 + '/chatxx.php',
    getCheckInInformationUrl: port8085 + '/getCheckInInformationUrl',
    sendVoiceUrl: port8085 + '/sendVoiceUrl',
    uploadImgUrl: port8085 + '/uploadImgUrl'
  },
  port9101: {
    addUrl: port9101 + '/dangwu?op=add'
  }
}
