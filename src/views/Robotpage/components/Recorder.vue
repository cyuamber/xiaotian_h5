<template>
  <van-overlay :show="maskShow">
    <div class="wrapper">
      <div class="canvas" id="canvas">
        <canvas class="visualizer" width="100" height="0"></canvas>
        <canvas
          class="visualizers"
          width="100"
          height="0"
          style="transform: rotateX(180deg);"
        ></canvas>
      </div>
      <input type="hidden" id="visual" value="frequencybars" />
      <div class="recorder-img">
        <p>松手即可发送10秒内语音</p>
        <div class="imshar"></div>
        <img src="@/assets/images/recorder.png" alt="语音录制" width="100%">
      </div>
    </div>
  </van-overlay>
</template>
<script>
import { mapState } from 'vuex'
import { HZRecorder } from './HZRecorder'
export default {
  name: 'Recorder',
  data() {
    return {
      leftDataList: [],
      audioContext: null,
      // mediaNode, jsNode
      recorder: null,
      mediaStream: null,
      videoEnabled: false,
      analyser: null,
      distortion: null,
      gainNode: null,
      biquadFilter: null,
      convolver: null,
      canvas: null,
      canvaT: null,
      canvasCtx: null,
      canvasCtxT: null,
      visualSelect: null,
      drawVisual: null,
      savecount: 0,
      time: new Date('2019/1/10').getTime(),
      timeD: null,
      millisecond: null,
      second: null,
      minute: null,
      hour: null,
      file_num_current: 0, // 二次转写数据当前位置
      int: null,
      z: false,
      key: 1,
      readTransferContentkey: 1,
      chunks: [],
      tmpChunks: [],
      ajaxUrl: 1,
      file_num: 1,
      end: null,
      reader: null,
      canvasWidth: 100,
      canvasHeight: 40,
      talkMsgs: {
        talkMsg: '前端mock数据',
        audioUrl: 'http://sc1.111ttt.cn/2018/1/03/13/396131232171.mp3'
      }
      // audio :document.createElement('audio'),
      // voicetext:null,
      // audio :document.querySelector('.progress_bar_audio')

    }
  },
  computed: {
    ...mapState({
      maskShow: state => state.app.maskShow,
      talkText: state => state.app.talkText
    })
  },
  watch: {
    maskShow(val) {
      if (val) {
        this.startRecorder()
      } else {
        this.stopRecorder()
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({
            audio: {
              sampleRate: 16000,
              sampleBits: 16,
              channelCount: 1,
              volume: 1.0
            }
          })
          .then(function(stream) {
            console.log(123)
          })
          .catch(function(error) {
            switch (error.code || error.name) {
              case 'PERMISSION_DENIED':
              case 'PermissionDeniedError':
                HZRecorder.throwError('用户拒绝提供信息。')
                break
              case 'NOT_SUPPORTED_ERROR':
              case 'NotSupportedError':
                HZRecorder.throwError('浏览器不支持硬件设备。')
                break
              case 'MANDATORY_UNSATISFIED_ERROR':
              case 'MandatoryUnsatisfiedError':
                HZRecorder.throwError('无法发现指定的硬件设备。')
                break
              default:
                HZRecorder.throwError('无法打开麦克风。异常信息:' + error.code + '信息：' + error.name + '内容：' + error.message)
                break
            }
          })
      } else if (navigator.getUserMedia) {
        navigator.getUserMedia(
          { audio: true, video: false },
          function(stream) {
            console.log(456)
          },
          function(error) {
            switch (error.code || error.name) {
              case 'PERMISSION_DENIED':
              case 'PermissionDeniedError':
                HZRecorder.throwError('用户拒绝提供信息。')
                break
              case 'NOT_SUPPORTED_ERROR':
              case 'NotSupportedError':
                HZRecorder.throwError('浏览器不支持硬件设备。')
                break
              case 'MANDATORY_UNSATISFIED_ERROR':
              case 'MandatoryUnsatisfiedError':
                HZRecorder.throwError('无法发现指定的硬件设备。')
                break
              default:
                HZRecorder.throwError('无法打开麦克风。异常信息:' + error.code + '信息：' + error.name + '内容：' + error.message)
                break
            }
          }
        )
      } else {
        HZRecorder.throwError('当前浏览器不支持录音功能。')
        return
      }

      this.canvas = document.querySelector('.visualizer')
      this.canvaT = document.querySelector('.visualizers')
      this.canvasCtx = this.canvas.getContext('2d')
      this.canvasCtxT = this.canvaT.getContext('2d')

      this.canvas.setAttribute('width', 100)
      this.canvaT.setAttribute('width', 100)

      this.visualSelect = document.getElementById('visual')

      // var drawVisual
      // var sendWav

      this.savecount = 0
      this.time = new Date('2019/1/10').getTime()
      this.timeD = new Date().getTime() - this.time
      this.millisecond = new Date(this.time).getMilliseconds()
      this.second = new Date(this.time).getSeconds()
      this.minute = new Date(this.time).getMinutes()
      this.hour = new Date(this.time).getHours()
      this.file_num_current = 0 // 二次转写数据当前位置
      // this.int
      this.z = false
      // this.recorder = null
      this.key = 1
      this.readTransferContentkey = 1

      // 开始录音
      // this.start()
      // 停止录音
      localStorage.setItem('recorderFlage', 1)

      this.chunks = []
      this.tmpChunks = []
      this.ajaxUrl = 1
      this.file_num = 1
      // this.end
      // this.reader
      // 录制短语音
      // function startRecord(enableVideo) {
      //   this.videoEnabled = enableVideo
      //   MediaUtils.getUserMedia(enableVideo, true, function(err, stream) {
      //     if (err) {
      //       throw err
      //     } else {
      //       document.getElementById('lading').style.display = 'none'
      //       document.getElementById('stop').disabled = false
      //       this.beginRecord(stream)
      //       this.visualize()
      //     }
      //   })
      // }
      // 获取媒体流

      // var audio = document.createElement('audio')
      // var voicetext
      // var audio = document.querySelector('.progress_bar_audio')
    },
    startRecorder() {
      localStorage.setItem('start', 1)
      // this.clearCanvas()
      this.canvas = document.querySelector('.visualizer')
      this.canvaT = document.querySelector('.visualizers')
      this.canvasCtx = this.canvas.getContext('2d')
      this.canvasCtxT = this.canvaT.getContext('2d')
      // this.savecount = 0
      // this.canvas.setAttribute('width', 100)
      // this.canvaT.setAttribute('width', 100)
      this.canvas.setAttribute('height', 40)
      this.canvaT.setAttribute('height', 40)
      // startRecord(true);
      HZRecorder.get(
        (rec, stream) => {
          console.log(rec, '----rec')
          this.recorder = rec
          this.recorder.start()
          this.beginRecord(stream)
          this.visualize()
        },
        {
          sampleBits: 16,
          sampleRate: 16000
        }
      )

      // document.getElementById('stop').disabled = false
      var full_stop = 0
      var file_keys = 1
      var keys = 1
      var recorder_key = 1
    },
    stopRecorder() {
      // function stop() {
      this.end = 'end'
      this.disvisualize()
      this.recorder.stop()
      this.canvas.setAttribute('height', 0)
      this.canvaT.setAttribute('height', 0)
      this.start = 0
      var recorderFlage = 0
      localStorage.setItem('start', this.start)
      localStorage.setItem('recorderFlage', recorderFlage)
      // this.$store.commit('setTalkText', '')
      this.$emit('sendTalkMsg', this.talkMsgs)
    },
    beginRecord(mediaStream) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      this.analyser = this.audioContext.createAnalyser()
      this.analyser.minDecibels = -90
      this.analyser.maxDecibels = -10
      this.analyser.smoothingTimeConstant = 0.85
      this.distortion = this.audioContext.createWaveShaper()
      this.gainNode = this.audioContext.createGain()
      this.biquadFilter = this.audioContext.createBiquadFilter()
      this.convolver = this.audioContext.createConvolver()
      this.source = this.audioContext.createMediaStreamSource(mediaStream)
      this.source.connect(this.analyser)
      this.analyser.connect(this.distortion)
      this.distortion.connect(this.biquadFilter)
      this.biquadFilter.connect(this.convolver)
      this.convolver.connect(this.gainNode)
      this.gainNode.connect(this.audioContext.destination)
    },
    // canvas 音波
    visualize() {
      this.canvasWidth = 100
      this.canvasHeight = 40
      var visualSetting = this.visualSelect.value
      console.log(visualSetting)
      if (visualSetting === 'frequencybars') {
        // this.analyser.fftSize = 256;
        this.analyser.fftSize = 2048
        var bufferLengthAlt = this.analyser.frequencyBinCount
        console.log('bufferLengthAlt ' + bufferLengthAlt)
        var dataArrayAlt = new Uint8Array(bufferLengthAlt)

        this.canvasCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
        this.canvasCtxT.clearRect(0, 0, this.canvasWidth, this.canvasHeight)

        var drawAlt = () => {
          this.drawVisual = requestAnimationFrame(drawAlt)
          this.analyser.getByteFrequencyData(dataArrayAlt)
          this.canvasCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
          this.canvasCtx.fillStyle = 'rgba(0, 0, 0, 0)' // 'rgb(57, 201, 238)';
          this.canvasCtx.fillRect(10, 10, this.canvasWidth, this.canvasHeight)
          this.canvasCtxT.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
          this.canvasCtxT.fillStyle = 'rgba(0, 0, 0, 0)' // 'rgb(57, 201, 238)';
          this.canvasCtxT.fillRect(10, 10, this.canvasWidth, this.canvasHeight)

          var barWidth = (this.canvasWidth / bufferLengthAlt) * 10.5
          var barHeight
          var x = 0

          for (var i = 0; i < bufferLengthAlt; i++) {
            barHeight = dataArrayAlt[i]
            this.canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',255,255)' // 'rgb(255,255,255)';//'rgb(' + (barHeight+100) + ',255,255)';
            this.canvasCtx.fillRect(x, this.canvasHeight - barHeight / 4, barWidth, barHeight / 4)
            this.canvasCtxT.fillStyle = 'rgb(' + (barHeight + 100) + ',255,255)' // 'rgb(255,255,255)';//'rgb(' + (barHeight+100) + ',255,255)';
            this.canvasCtxT.fillRect(x, this.canvasHeight - barHeight / 4, barWidth, barHeight / 4)

            x += barWidth + 3
          }
        }
        drawAlt()
      }
    },
    disvisualize() {
      this.canvasWidth = 400 // canvas.width;
      this.canvasHeight = 100 // canvas.height;

      // var visualSetting = this.visualSelect.value
      this.analyser.fftSize = 2048
      this.canvasCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      this.canvasCtxT.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    }

  }
}
</script>

<style  lang="less" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .canvas{
    width: 400px;
    height: 100px;
    margin: 0 auto;
    text-align: center;
  }
  .recorder-img{
    position: absolute;
    bottom: 0;
    text-align: center;
    p{
      color:#3f78eb;
      font-size: 14px;
    }
    .imshar{
      position: absolute;
      z-index: 100;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      opacity: 0;
    }
  }
}
</style>
