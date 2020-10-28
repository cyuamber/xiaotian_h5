
const port8085 = 'https://172.31.201.38:8081'
const port9101 = '/port9101'

export default {
  port8085: {
    getCheckInInformationUrl: port8085 + '/getCheckInInformationUrl',
    sendTextUrl: port8085 + '/dp_xiaotian/inference/text', // 文字发送接口
    uploadImgUrl: port8085 + '/dp_xiaotian/inference/pic', // 图片上传打卡
    getuploadImgResult: port8085 + '/dp_xiaotian/inference/getResult', // 打卡结果查询接口
    getCheckIconStatus: port8085 + '/getCheckIconStatus'
  },
  port9101: {
    addUrl: port9101 + '/dangwu?op=add'
  }
}
