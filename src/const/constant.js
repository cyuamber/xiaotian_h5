export const POINTINFO = [
  {
    key: 'C',
    info: '1. 在大会现场找到中移九天公众号二维码并通过微信扫描，打开推送链接'
  },
  {
    key: 'H',
    info: `2. 根据地图指引，在CHBN打卡点处拍照并上传，小天会自动判断是否打卡成功（每个类别有多个打卡点，只要打卡一次上传成功即可）`
  },
  {
    key: 'B',
    info: `3. 集齐CHBN共4个类别的打卡点，获取小天为您准备的大会独家记忆`
  },
  {
    key: 'N',
    info: `4. 凭本人记忆页面展示给工作人员，即可领取盲盒`
  }
]

export const COMMONQUESTION = [
  '如何打卡',
  '打卡指引地图',
  '中国移动CHBN的含义',
  '能介绍下中移九天人工智能平台吗',
  '2020中国移动全球合作伙伴大会简介'
]

export const GETANSWERRES = [
  {
    type: 'text',
    content: '根据地图指引，在CHBN打卡点处拍照并上传，小天会自动判断是否打卡成功（每个类别有多个打卡点，只要打卡一次上传成功即可）'
  },
  {
    type: 'image',
    content: 'http://img01.jituwang.com/171110/256775-1G11021324561.jpg'
  }
]
export const IMGICON = [
  {
    title: 'C',
    unchecked: require('../assets/images/icon_C_unchecked.png'),
    checked: require('../assets/images/icon_C_checked.png'),
    popupinfoUnchecked: require('../assets/images/uncheck_c.png'),
    popupinfoChecked: require('../assets/images/check_c.png'),
    swipeShowChecked:require('../assets/images/c.png'),
    src: require('../assets/images/icon_C_unchecked.png'),
    popupinfoIconSrc: require('../assets/images/uncheck_c.png'),
    popupinfoTitleEn: 'Customer',
    popupinfoTitleCH: '个人市场',
    infoContent: '指在境内面向个人客户提供的各类通信及信息服务。 5G时代，中国移动推出“五新”业务，通过AI赋能AR/VR、视频剪辑、智能通话，实现“新看法、新听法、新玩法、新拍法、新用法”，让广大个人用户沉浸娱乐新体验。',
    number: 0,
    key: '1', // 后端的id
    fireImgSrc:require('../assets/images/fire1.png')
  },
  {
    title: 'H',
    unchecked: require('../assets/images/icon_H_unchecked.png'),
    checked: require('../assets/images/icon_H_checked.png'),
    popupinfoUnchecked: require('../assets/images/uncheck_h.png'),
    popupinfoChecked: require('../assets/images/check_h.png'),
    swipeShowChecked:require('../assets/images/h.png'),
    src: require('../assets/images/icon_H_unchecked.png'),
    popupinfoIconSrc: require('../assets/images/uncheck_h.png'),
    popupinfoTitleEn: 'Home',
    popupinfoTitleCH: '家庭市场',
    infoContent: '指在境内面向家庭客户提供的各类通信及信息服务。 中国移动推出智慧家庭、打造智慧社区，通过“极速+”“娱乐+”“智享+”“安全+”的“4+”智慧产品，让亿万家庭畅享智慧安居新生活。',
    number: 0,
    key: '2',
    fireImgSrc:require('../assets/images/fire1.png')

  },
  {
    title: 'B',
    unchecked: require('../assets/images/icon_B_unchecked.png'),
    checked: require('../assets/images/icon_B_checked.png'),
    popupinfoUnchecked: require('../assets/images/uncheck_b.png'),
    popupinfoChecked: require('../assets/images/check_b.png'),
    swipeShowChecked:require('../assets/images/b.png'),
    src: require('../assets/images/icon_B_unchecked.png'),
    popupinfoIconSrc: require('../assets/images/uncheck_b.png'),
    popupinfoTitleEn: 'Business',
    popupinfoTitleCH: '政企市场',
    infoContent: '指在境内面向政企客户提供的各类通信及信息服务。中国移动正在打造5G+AI行业智能化解决方案，赋能千行百业数字化、智能化转型。',
    number: 0,
    key: '3',
    fireImgSrc:require('../assets/images/fire1.png')
  },
  {
    title: 'N',
    unchecked: require('../assets/images/icon_N_unchecked.png'),
    checked: require('../assets/images/icon_N_checked.png'),
    popupinfoUnchecked: require('../assets/images/uncheck_n.png'),
    popupinfoChecked: require('../assets/images/check_n.png'),
    swipeShowChecked:require('../assets/images/n.png'),
    src: require('../assets/images/icon_N_unchecked.png'),
    popupinfoIconSrc: require('../assets/images/uncheck_n.png'),
    popupinfoTitleEn: 'New',
    popupinfoTitleCH: '新兴市场',
    infoContent: '指独立于境内传统业务的新兴业务板块。中国移动通过布局的产业投资，促进智慧金融等新技术应用，拓展新空间,畅达新未来。',
    number: 0,
    key: '4',
    fireImgSrc:require('../assets/images/fire1.png')
  }
]
export const GETCHECKICONSTATUS = [
  {
    key: '',
    title: 'C',
    isCheck: true
  },
  {
    key: '',
    title: 'B',
    isCheck: true
  },
  {
    key: '',
    title: 'N',
    isCheck: true
  },
  {
    key: '',
    title: 'H',
    isCheck: true
  }
]

export const GETPRESENT = [
  '快去中移九天展区领取我为你准备的礼物吧',
  '期待与你下次的相遇AI\'ll be waiting for you'
]

export const FORMINPUTS = [
  {
    type: 'text',
    lable: '姓名',
    name: 'username',
    message: '请输入姓名',
    value: null
  },
  {
    type: 'text',
    lable: '公司',
    name: 'company',
    message: '请输入公司',
    value: null
  },
  {
    type: 'digit',
    lable: '手机',
    name: 'phone',
    message: '请输入手机号',
    value: null
  }
]

export const CHECKRULES = ['在大会现场找到中移九天公众号二维码并通过微信扫描，打开推送链接',
  '根据打卡地图指引，在CHBN打卡点处拍照并上传，小天会自动判断是否打卡成功',
  '集齐CHBN共4个类别的打卡点，获取小天为您准备的大会独家记忆',
  '将本人记忆页面展示给工作人员，即可领取盲盒'
]

export const FIREIMG = [
  require('../assets/images/fire1.png'),
  require('../assets/images/fire2.png'),
  require('../assets/images/fire2.png'),
  require('../assets/images/fire3.png'),
]

