export default {
  port8085: {
    sendTextUrl: "/dp_xiaotian/inference/text", // 文字发送接口
    uploadImgUrl: "/dp_xiaotian/inference/pic", // 图片上传打卡
    getuploadImgResult: "/dp_xiaotian/inference/getResult", // 打卡结果查询接口
    getCheckIconStatus: "/getCheckIconStatus",
    getCount: "/dp_xiaotian/inference/getCount",
    getGift: "/dp_xiaotian/inference/getGift", //获取打卡结果
    saveUserInfo: "/dp_xiaotian/inference/saveUserInfo" // result页 用户信息录入
  },
  port8080: {
    getMaskRes: "http://172.29.168.163/ivr/v1/mask" // 获得口罩识别结果接口
  }
};
