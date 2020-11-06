// const port8085 = "http://172.31.201.38:8081";
const port8085 = process.env.VUE_APP_API_URL;

export default {
  port8085: {
    sendTextUrl: port8085 + "/dp_xiaotian/inference/text", // 文字发送接口
    uploadImgUrl: port8085 + "/dp_xiaotian/inference/pic", // 图片上传打卡
    getuploadImgResult: port8085 + "/dp_xiaotian/inference/getResult", // 打卡结果查询接口
    getCheckIconStatus: port8085 + "/getCheckIconStatus",
    getCount: port8085 + "/dp_xiaotian/inference/getCount",
    getGift: port8085 + "/dp_xiaotian/inference/getGift", //获取打卡结果
    saveUserInfo: port8085 + "/dp_xiaotian/inference/saveUserInfo", // result页 用户信息录入
    recorderUpload: port8085 + "/dp_xiaotian/inference/upload", // 音频上传
    recorderDownload: port8085 + "/dp_xiaotian/inference/download" // 音频下载
  }
};
