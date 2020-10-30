
// 兼容
window.URL = window.URL || window.webkitURL
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
var chunk = []; var chunkData = []; var chunkSlice = []
var chunkSliceStart = 0; var chunkSliceStop = 3200
var view
var end
var v2
var websocket = null
var ws = null
var startWebsocket = 0
var webSocstate = 0
var n = 1
var state = 0
var dataFlage = 1
var wsEnd = 0
var saveSecondkey = 0
var frameList = []
var ark_key = 0
var forbid_key = 1
var forbid
var saveContent = ''
function webS() {
  if (startWebsocket === 1) {
    if ('WebSocket' in window) {
      // 一次转写端口
      websocket = new WebSocket('wss://172.31.201.38:443')
      // websocket.binaryType = "arraybuffer";
    } else {
      websocket = new WebSocket('wss://172.31.201.38:443')
      // alert('当前浏览器 Not support websocket')
    }
    console.log(123456)
    // 一次链接发生错误的回调ssss
    websocket.onerror = function() {
      console.log('WebSocket连接发生错误')
    }

    // 连接成功建立的回调方法
    websocket.onopen = function() {
      console.log('WebSocket连接成功')
      recorder()
    }
    websocket.onclose = function(e) {
      console.log('websocket连接已关闭:::', e)
    }
    var z = 1
    var divFlage = 1
    // 一次数据
    var date = ''
    websocket.onmessage = function(event) {
      // var ds = document.querySelector('.num_'+dataFlage);
      date = date + JSON.parse(event.data)
      console.log(date, 'websocket---date-----')
      if (date.end === 1) {
        this.$store.commit('setTalkText', date)
        websocket.close()
      }
    }
  } else {
    setTimeout(webS, 100)
  }
}
webS()
var recorder = function() {
  // console.log(111111);
  var _this = this
  var flage = Number(localStorage.getItem('recorderFlage'))
  if (chunkSliceStop < chunk.length) {
    chunkSlice = chunk.slice(chunkSliceStart, chunkSliceStop)
    var binary = ''
    var bytes = new Uint8Array(chunkSlice)
    for (var len = bytes.byteLength, i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    var audio = window.btoa(binary)
    if (n == 1) {
      state = 1
    } else {
      state = 2
    }

    var messageObj = { 'uid': 'audioId', 'state': state, 'chunk': n, 'audio': audio }
    var messageJson = JSON.stringify(messageObj)
    websocket.send(messageJson)
    chunkSliceStart += 3200
    chunkSliceStop += 3200
    n += 1
    recorder()
  } else if (chunkSliceStop >= chunk.length && flage !== 0) {
    setTimeout(recorder, 1000)
  } else {
    n += 1
    var messageObj = { 'uid': 'audioId', 'state': 3, 'chunk': n, 'audio': '' }
    var messageJson = JSON.stringify(messageObj)
    setTimeout(() => {
      websocket.send(messageJson)
    }, 50)
    // clickContent()
    return
  }
}
// 播放转写对应音频
var wav_key
function clickContent() {
  $('#text div').on('click', function() {
    wav_key = Number(this.dataset.key)
    if (wav_key !== 0) {
      wav_key = wav_key - 1
    }
    console.log(wav_key)
    var params = {
      'id': ID,
      'wav_key': wav_key
    }
    $.post('../transfer-realtime/click-content-audio-wav', params, function(dataAjax) {
      $('.progress_bar_audio').attr('src', dataAjax.path)
    }, 'json')
  })
}
export function HZRecorder(stream, config) {
  var _this = this
  var starts = 0; var stops = 10880
  var receive_key = 0
  config = config || {}
  config.sampleBits = config.sampleBits || 8 // 采样数位 8, 16
  config.sampleRate = config.sampleRate || (44100 / 6) // 采样率(1/6 44100)

  var context = new (window.webkitAudioContext || window.AudioContext)()
  var audioInput = context.createMediaStreamSource(stream)
  var createScript = context.createScriptProcessor || context.createJavaScriptNode
  var recorder = createScript.apply(context, [16384, 1, 1])

  var audioData = {
    size: 0, // 录音文件长度
    buffer: [], // 录音缓存
    inputSampleRate: context.sampleRate, // 输入采样率
    inputSampleBits: 16, // 输入采样数位 8, 16
    outputSampleRate: config.sampleRate, // 输出采样率
    oututSampleBits: config.sampleBits, // 输出采样数位 8, 16
    input: function(data) {
      this.buffer.push(new Float32Array(data))
      this.size += data.length
    },
    compress: function() { // 合并压缩
      // 合并
      var data = new Float32Array(this.size)
      var offset = 0
      for (var i = 0; i < this.buffer.length; i++) {
        data.set(this.buffer[i], offset)
        offset += this.buffer[i].length
      }
      // 压缩
      var compression = parseInt(this.inputSampleRate / this.outputSampleRate)
      var length = data.length / compression
      var result = new Float32Array(length)
      var index = 0; var j = 0
      while (index < length) {
        result[index] = data[j]
        j += compression
        index++
      }
      return result
    },
    encodeWAV: function() {
      var sampleRate = Math.min(this.inputSampleRate, this.outputSampleRate)
      var sampleBits = Math.min(this.inputSampleBits, this.oututSampleBits)
      var bytes = this.compress()
      var dataLength = bytes.length * (sampleBits / 8)
      var buffer = new ArrayBuffer(dataLength)
      var data = new DataView(buffer)
      var channelCount = 1// 单声道
      var offset = 0
      var writeString = function(str) {
        for (var i = 0; i < str.length; i++) {
          data.setUint8(offset + i, str.charCodeAt(i))
        }
      }
      // 写入采样数据
      if (sampleBits === 8) {
        for (var i = 0; i < bytes.length; i++, offset++) {
          var s = Math.max(-1, Math.min(1, bytes[i]))
          var val = s < 0 ? s * 0x8000 : s * 0x7FFF
          val = parseInt(255 / (65535 / (val + 32768)))
          data.setInt8(offset, val, true)
        }
      } else {
        for (var i = 0; i < bytes.length; i++, offset += 2) {
          var s = Math.max(-1, Math.min(1, bytes[i]))
          data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true)
        }
      }
      view = new Int8Array(data.buffer)
      chunk = view
      chunkData = view.slice(starts, stops)
      var blob = new Blob([chunkData], { type: 'audio/wav' })
      receive_key += 1
      starts += 10880
      stops += 10880
    }
  }

  // 开始录音
  this.start = function() {
    chunk = []
    chunkData = []
    chunkSliceStart = 0
    chunkSliceStop = 3200
    audioInput.connect(recorder)
    recorder.connect(context.destination)
    startWebsocket = 1
  }

  // 暂停
  this.pause = function() {
    recorder.disconnect()
  }
  // 恢复
  this.resume = function() {
    recorder.connect(context.destination)
  }

  // 停止
  this.stop = function() {
    recorder.disconnect()
    webSocstate = 1
    // recorderAudioData();
  }
  function recorderAudioData() {
    console.log('chunkData.length::::::', chunkData.length)
    var date = new FormData()
    chunkData = chunk.slice(starts, stops)
    if (chunkData.length < 10880) {
      console.log('chunkData.lengthchunkData.length：', chunkData.length)
      end = 'end'
    }
    // console.log('splicechunkData.length::::', chunkData.length);
    receive_key += 1
    var blob = new Blob([chunkData], { type: 'audio/wav' })
    date.append('userfile', chunkData)
    date.append('blob', blob)
    date.append('end', end)
    date.append('id', ID)
    date.append('receive_key', receive_key)
    var req = new XMLHttpRequest()
    var async = true
    req.open('POST', '../test/receive', async)
    res = req.send(date)
    // console.log('chunk::::::', chunk);
    // console.log('chunk.length::::::', chunk.length);
    // console.log('start::::::', starts);
    // console.log('stops::::::', stops);
    if (stops < chunk.length) {
      starts += 10880
      stops += 10880
      setTimeout(recorderAudioData, 10)
    }
  }
  // 获取音频文件
  this.getBlob = function() {
    return audioData.encodeWAV()
  }

  // 回放
  this.play = function(audio) {
    console.log(audio)
    audio.src = window.URL.createObjectURL(this.getBlob())
  }

  // 音频采集
  recorder.onaudioprocess = function(e) {
    audioData.input(e.inputBuffer.getChannelData(0))
    return audioData.encodeWAV()
  }
}
// 抛出异常
HZRecorder.throwError = function(message) {
  alert(message)
  throw new function() { this.toString = function() { return message } }()
}
// 是否支持录音
HZRecorder.canRecording = (navigator.getUserMedia != null)
// 获取录音机
HZRecorder.get = function(callback, config) {
  if (callback) {
    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        { audio: true } // 只启用音频
        , function(stream) {
          var rec = new HZRecorder(stream, config)
          callback(rec, stream)
        }
        , function(error) {
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
              HZRecorder.throwError('无法打开麦克风。异常信息:' + (error.code || error.name))
              break
          }
        })
    } else {
      // HZRecorder.throwErr('当前浏览器不支持录音功能。'); return;
      console.log('。。。。')
    }
  }
}

