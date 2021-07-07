const state = {
  maskShow: false,
  talkText: "",
  toppPointmodelShow: false,
  LoadingShow: false,
  formModelShow: false,
  beforSubmit: true,
  swipeToNum: 0,
  swipeToShow: true,
  successToast: false,
  failToast: false
};
const mutations = {
  setToastStatus(state, status) {
    state.successToast = status;
    state.failToast = !status;
  },

  setLoadingShow(state, LoadingShow) {
    state.LoadingShow = LoadingShow;
  },
  setFormModelShow(state, formModelShow) {
    state.formModelShow = formModelShow;
  },
  setBeforSubmit(state, beforSubmit) {
    state.beforSubmit = beforSubmit;
  }
};
const actions = {};
export default {
  state,
  mutations,
  actions
};
