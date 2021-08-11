<template>
  <div class="mask-container">
    <Loading v-if="LoadingShow" />
    <img class="mask-top" src="@/assets/images/mask.jpg" />
    <div class="upload-button">
      <van-uploader :after-read="afterRead" :before-read="beforeRead">
        <van-button icon="plus" type="info" round style="width: 250px"
          >上传图片</van-button
        >
      </van-uploader>
    </div>
    <div
      class="mask-preview"
      :style="{ width: preWidth + 'px', height: preWidth + 'px' }"
    >
      <img
        :src="imgSrc"
        alt="预览"
        class="preview-img"
        :style="{ width: preWidth + 'px', height: preWidth + 'px' }"
        id="myImg"
      />
      <div v-if="showMask">
        <div v-for="(item, index) in maskShowData" :key="index">
          <div
            :style="{
              top: item.position.top + 'px',
              left: item.position.left + 'px',
              width: item.position.width + 'px',
              height: item.position.height + 'px',
              border:
                item.title === 'have_mask'
                  ? '2px solid #4a96fb'
                  : '2px solid red',
            }"
            class="mask-square"
          ></div>
          <div
            class="mask-title"
            :style="{
              'background-color':
                item.title === 'have_mask' ? '#4a96fb' : 'red',
              top: item.position.top - 17 + 'px',
              left: item.position.left + 'px',
            }"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
    <div class="mask-response">
      <div class="response-title">Response</div>
      <pre class="response-content">{{ maskRes }}</pre>
    </div>
  </div>
</template>
<script>
import API from "../../utils/api";
import { axiosPost } from "../../utils/http";
import Loading from "../../components/Loading";
import Compressor from "compressorjs";
import { Toast } from "vant";
export default {
  name: "Result",
  components: {
    Loading,
  },
  data() {
    return {
      imgSrc: require("@/assets/images/maskExample.jpg"),
      test: "hello",
      preWidth: 372,
      token: "559c02d1a4c4df151bc1db4bd6fefc0e.1601190044",
      LoadingShow: false,
      maskRes: {
        code: 200,
        msg: "成功",
        data: "have_mask,241,67,363,232",
      },
      maskData: "",
      maskShowData: [],
      showMask: false,
    };
  },
  mounted() {
    this.preWidth = window.innerWidth;
  },
  methods: {
    beforeRead(file) {
      // 前置处理，限制大小和类型
      if (
        file.type != "image/jpg" &&
        file.type != "image/png" &&
        file.type != "image/jpeg"
      ) {
        Toast("图片格式必须为jpg、png、jpeg中的一种");
        return false;
      }
      if (file.size / 1024 / 1024 > 10) {
        Toast("图片不能超过10M");
        return false;
      }
      return true;
    },

    async afterRead(file) {
      // 处理为base64
      let img64 = file.content;
      // 小于400k的图片不压缩
      if (file.file.size / 1024 < 400) {
        this.getResult(img64);
      } else {
        let compreeBolb = await this.imageCompress(file.file); // file压缩
        const formData = new FormData();
        formData.append("image", compreeBolb, compreeBolb.name); //压缩后的文件会自动转换成二进制文件流类型
      }
    },

    blobToDataURL(blob, callback) {
      let a = new FileReader();
      a.onload = function (e) {
        callback(e.target.result);
      };
      a.readAsDataURL(blob);
    },

    showPre(base64ImgData) {
      this.imgSrc = base64ImgData;
    },

    getResult(file) {
      // 上传图片的base64获得结果
      this.showPre(file); // 更新预览图为压缩后的图片
      file = file.split(",")[1];
      this.LoadingShow = true;
      const url = API.port8080.getMaskRes;
      const params = {
        access_token: this.token,
      };
      let fd = new FormData();
      fd.append("img", file);
      fd.append("name", "ad");
      this.showMask = false;
      axiosPost(url, params, fd).then((res) => {
        this.LoadingShow = false;
        this.maskRes = res;
        this.maskData = this.maskRes.data;
        if (this.maskData === "") {
          this.showMask = false;
        } else {
          this.getData(this.maskData.split(","));
          this.showMask = true;
        }
      });
    },

    imageCompress(file) {
      //异步
      let _this = this;
      return new Promise((resolve, reject) => {
        new Compressor(file, {
          quality: 0.3,
          success(result) {
            _this.blobToDataURL(result, _this.getResult); // bolb转base64后执行请求
            resolve(result);
          },
          error(err) {
            console.log(err.message);
          },
        });
      });
    },
    getPicZoom() {
      var zoom = {};
      var img = new Image();
      var myimage = document.getElementById("myImg");
      var rw = myimage.naturalWidth;
      var rh = myimage.naturalHeight;
      zoom.w = this.preWidth / rw;
      zoom.h = this.preWidth / rh;
      return zoom;
    },

    // 获取口罩的位置
    getData(data) {
      this.maskShowData = [];
      // 得到数据有几个框
      // 一维数组转二维数组
      let len = data.length;
      let n = 5; //假设每行显示5个
      let lineNum = len % 5 === 0 ? len / 5 : Math.floor(len / 5 + 1);
      let res = [];
      for (let i = 0; i < lineNum; i++) {
        // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
        let temp = data.slice(i * n, i * n + n);
        res.push(temp);
      }
      var _this = this;
      let obj = _this.getPicZoom();
      res.forEach((item, i) => {
        if (item[0] == "no_mask") {
          let top = item[2] * obj.h;
          let left = item[1] * obj.w;
          let widths = (item[3] - item[1]) * obj.w;
          let heights = (item[4] - item[2]) * obj.h;
          let biaoqing = item[0];
          this.maskShowData.push({
            title: biaoqing,
            position: {
              left: left,
              top: top,
              width: widths,
              height: heights,
            },
          });
        }
        if (item[0] == "have_mask") {
          let top = item[2] * obj.h;
          let left = item[1] * obj.w;
          let widths = (item[3] - item[1]) * obj.w;
          let heights = (item[4] - item[2]) * obj.h;
          let biaoqing = item[0];
          this.maskShowData.push({
            title: biaoqing,
            position: {
              left: left,
              top: top,
              width: widths,
              height: heights,
            },
          });
        }
      });
    },
  },
};
</script>
<style lang="less">
.mask-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background-color: #063399;
  .mask-top {
    width: 100%;
  }
  .upload-button {
    padding: 20px 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .mask-preview {
    width: 100%;
    position: relative;
    .mask-square {
      position: absolute;
      background-color: transparent;
      z-index: 100;
    }
    .mask-title {
      position: absolute;
      color: #fff;
      padding-left: 0px;
      height: 17px;
      font-size: 10px;
      padding-top: 0px;
    }
  }
  .mask-response {
    box-sizing: border-box;
    -moz-box-sizing: border-box; /* Firefox /
        -webkit-box-sizing:border-box; / Safari */
    padding: 10px 20px;
    background-color: #f2f2f2;
    min-height: 30vh;
    width: 100%;
    font: 14px Verdana, Helvetica, Arial, sans-serif;
    .response-title {
      padding-bottom: 10px;
      font-weight: bold;
    }
    .response-content {
      width: 100%;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }
}
</style>