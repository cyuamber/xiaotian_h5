const state = {
  userName: '',
  maskShow: false,
  talkText: ''
}
const mutations = {
  SET_USER_NAME(state, name) {
    state.userName = name
  },
  setMaskShow(state, maskShow) {
    state.maskShow = maskShow
  },
  setTalkText(state, talkText) {
    state.talkText = talkText
  }
}
const actions = {
  // 设置name
  setUserName({ commit }, name) {
    commit('SET_USER_NAME', name)
  }
}
export default {
  state,
  mutations,
  actions
}
