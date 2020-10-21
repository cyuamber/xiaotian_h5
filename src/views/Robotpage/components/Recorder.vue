<template>
  <van-overlay :show="maskShow">
    <div class="wrapper">
      <div class="canvas" id="canvas">
        <canvas class="visualizer" width="400" height="0"></canvas>
        <canvas class="visualizers" width="400" height="0" style="transform: rotateX(180deg);"></canvas>
        <!--<canvas class="visualizer" width="300" height="0"></canvas>-->
      </div>
      <input type="hidden" id="visual" value="frequencybars">
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
      leftDataList:[],
      audioContext:null,
      // mediaNode, jsNode
      recorder: null,
      mediaStream:null,
      videoEnabled:false,
      analyser:null,
      distortion:null,
      gainNode:null,
      biquadFilter:null,
      convolver:null,
      canvas:null,
      canvaT :null,
      canvasCtx :null,
      canvasCtxT :null,
      visualSelect :null,
      drawVisual:null,
      savecount:0,
      time :new Date('2019/1/10').getTime(),
      timeD :null,
      millisecond :null,
      second :null,
      minute :null,
      hour :null,
      file_num_current : 0, //二次转写数据当前位置
      int:null,
      z :false,
      key: 1,
      readTransferContentkey : 1,
      chunks: [],
      tmpChunks : [],
      ajaxUrl : 1,
      file_num: 1,
      end:null,
      reader:null,
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
        if(val){
            this.start()
        }else{
          this.stop()
        }
      }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let leftDataList = []
      // var audioContext, mediaNode, jsNode
      var MediaUtils = {
        /**
         * 获取用户媒体设备(处理兼容的问题)
         * @param videoEnable {boolean} - 是否启用摄像头
         * @param audioEnable {boolean} - 是否启用麦克风
         * @param callback {Function} - 处理回调
         */
        getUserMedia: function(videoEnable, audioEnable, callback) {
          navigator.getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia ||
            window.getUserMedia
          //var constraints = {video: videoEnable, audio: audioEnable};
          // var constraints = { audio: audioEnable };
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
                callback(false, stream)
              })
              ['catch'](function(err) {
                callback(err)
              })
          } else if (navigator.getUserMedia) {
            navigator.getUserMedia(
              constraints,
              function(stream) {
                callback(false, stream)
              },
              function(err) {
                callback(err)
              }
            )
          } else {
            callback(new Error('Not support userMedia'))
          }
        },

        /**
         * 关闭媒体流
         * @param stream {MediaStream} - 需要关闭的流
         */
        closeStream: function(stream) {
          if (typeof stream.stop === 'function') {
            stream.stop()
          } else {
            let trackList = [stream.getAudioTracks(), stream.getVideoTracks()]

            for (let i = 0; i < trackList.length; i++) {
              let tracks = trackList[i]
              if (tracks && tracks.length > 0) {
                for (let j = 0; j < tracks.length; j++) {
                  let track = tracks[j]
                  if (typeof track.stop === 'function') {
                    track.stop()
                  }
                }
              }
            }
          }
        }
      }
      // var before_num = 0
      // 用于存放 MediaRecorder 对象和音频Track，关闭录制和关闭媒体设备需要用到
      // var recorder, mediaStream
      // var data2 = new FormData()
      // var data = new FormData();
      // var n = 0
      // var num_cbody = 0
      // var file_keys = 1;

      // 获得系统时间用于文件输出名字
      // var timestamp

      // var timetext = document.getElementById('timetext')
      // 用于存放录制后的音频文件对象和录制结束回调
      // var recorderFile, stopRecordCallback

      // 用于存放是否开启了视频录制
      // var videoEnabled = false

      // var analyser

      // var distortion
      // var gainNode
      // var biquadFilter
      // var convolver
       this.canvas = document.querySelector('.visualizer')
       this.canvaT = document.querySelector('.visualizers')
      this.canvasCtx = this.canvas.getContext('2d')
      this.canvasCtxT = this.canvaT.getContext('2d')

      this.canvas.setAttribute('width', 400)
      this.canvaT.setAttribute('width', 400)

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
      this.file_num_current = 0 //二次转写数据当前位置
      // this.int
      this.z = false
      // this.recorder = null
      this.key = 1
      this.readTransferContentkey = 1

      //开始录音
      // this.start()
      //停止录音
      localStorage.setItem('recorderFlage', 1)

      this.chunks = []
      this.tmpChunks = []
      this.ajaxUrl = 1
      this.file_num = 1
      // this.end
      // this.reader
      // 录制短语音
      function startRecord(enableVideo) {
        this.videoEnabled = enableVideo
        MediaUtils.getUserMedia(enableVideo, true, function(err, stream) {
          if (err) {
            throw err
          } else {
            document.getElementById('lading').style.display = 'none'
            document.getElementById('stop').disabled = false
            this.beginRecord(stream)
            this.visualize()
          }
        })
      }
      //获取媒体流
      

      // var audio = document.createElement('audio')
      // var voicetext
      // var audio = document.querySelector('.progress_bar_audio')
      

      
    },
    start(savecount,canvas) {
        localStorage.setItem('start', 1)
        this.canvas = document.querySelector('.visualizer')
       this.canvaT = document.querySelector('.visualizers')
      this.canvasCtx = this.canvas.getContext('2d')
      this.canvasCtxT = this.canvaT.getContext('2d')
        this.savecount = 0
        // document.getElementById('lading').style.display = 'block';
        // document.getElementById('start').disabled = true
        // document.getElementById('start').style.background = '#ccc'
        this.canvas.setAttribute('height', 40)
        this.canvaT.setAttribute('height', 40)
        // startRecord(true);
        HZRecorder.get(
          (rec, stream)=>{
            console.log(rec,"----rec")
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
    stop() {
      // function stop() {
        this.end = 'end'
        this.disvisualize()
        this.recorder.stop()
        this.canvas.setAttribute('height', 0)
        this.canvaT.setAttribute('height', 0)
        this.start = 0
        var recorderFlage = 0
        localStorage.setItem('start', start)
        localStorage.setItem('recorderFlage', recorderFlage)
      // }
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
      //canvas 音波
       visualize() {
        this.canvas.width = 200 //canvas.width;
        this.canvas.height = 40 //canvas.height;
        var visualSetting = this.visualSelect.value
        console.log(visualSetting)
        if (visualSetting == 'frequencybars') {
          // this.analyser.fftSize = 256;
          this.analyser.fftSize = 2048
          var bufferLengthAlt = this.analyser.frequencyBinCount
          console.log('bufferLengthAlt ' + bufferLengthAlt)
          var dataArrayAlt = new Uint8Array(bufferLengthAlt)

          this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height)
          this.canvasCtxT.clearRect(0, 0, this.canvas.width, this.canvas.height)

          var drawAlt = ()=> {
            this.drawVisual = requestAnimationFrame(drawAlt)
            this.analyser.getByteFrequencyData(dataArrayAlt)
            this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.canvasCtx.fillStyle = 'rgba(0, 0, 0, 0)' //'rgb(57, 201, 238)';
            this.canvasCtx.fillRect(10, 10, this.canvas.width, this.canvas.height)
            this.canvasCtxT.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.canvasCtxT.fillStyle = 'rgba(0, 0, 0, 0)' //'rgb(57, 201, 238)';
            this.canvasCtxT.fillRect(10, 10, this.canvas.width, this.canvas.height)

            var barWidth = (this.canvas.width / bufferLengthAlt) * 10.5
            var barHeight
            var x = 0

            for (var i = 0; i < bufferLengthAlt; i++) {
              barHeight = dataArrayAlt[i]
              this.canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',255,255)' //'rgb(255,255,255)';//'rgb(' + (barHeight+100) + ',255,255)';
              this.canvasCtx.fillRect(x, this.canvas.height - barHeight / 2, barWidth, barHeight / 2)
              this.canvasCtxT.fillStyle = 'rgb(' + (barHeight + 100) + ',255,255)' //'rgb(255,255,255)';//'rgb(' + (barHeight+100) + ',255,255)';
              this.canvasCtxT.fillRect(x, this.canvas.height - barHeight / 2, barWidth, barHeight / 2)

              x += barWidth + 3
            }
          }
          drawAlt()
        }
      },
      disvisualize() {
        this.canvas.width = 100 //canvas.width;
        this.canvas.height = 100 // canvas.height;

        var visualSetting = visualSelect.value
        this.analyser.fftSize = 2048
        this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.canvasCtxT.clearRect(0, 0, this.canvas.width, this.canvas.height)
      }

  }
}
</script>

<style>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
