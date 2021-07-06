const state = {
  maskShow: false,
  talkText: "",
  toppPointmodelShow: false,
  LoadingShow: false,
  formModelShow: false,
  beforSubmit: true,
  swipeToNum: 0,
  swipeToShow: true
};
const mutations = {
  SET_USER_NAME(state, name) {
    state.userName = name;
  },
  setMaskShow(state, maskShow) {
    state.maskShow = maskShow;
  },
  setTalkText(state, talkText) {
    state.talkText = talkText;
  },
  setToppPointmodelShow(state, toppPointmodelShow) {
    state.toppPointmodelShow = toppPointmodelShow;
  },
  setLoadingShow(state, LoadingShow) {
    state.LoadingShow = LoadingShow;
  },
  setFormModelShow(state, formModelShow) {
    state.formModelShow = formModelShow;
  },
  setBeforSubmit(state, beforSubmit) {
    state.beforSubmit = beforSubmit;
  },
  changeSwipeToNum(state, swipeToNum) {
    state.swipeToNum = swipeToNum;
  },
  changeSwipeToShow(state, swipeToShow) {
    state.swipeToShow = swipeToShow;
  }
};
const actions = {
  // 设置name
  setUserName({ commit }, name) {
    commit("SET_USER_NAME", name);
  }
};
export default {
  state,
  mutations,
  actions
};
