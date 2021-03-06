// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import "core-js/stable";
import "regenerator-runtime/runtime";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 全局引入按需引入UI库 vant
import "@/plugins/vant";
// 引入全局样式
import "@/assets/css/index.scss";
import "@/assets/css/commonStyle.css";
// 移动端适配
import "lib-flexible/flexible.js";
// 300ms延迟插件
// import FastClick from '@/utils/fastclick.js'
// filters
import "./filters";
import "./utils/font.js";

// 引入audio
// import audio from 'vue-mobile-audio'

//  引入 vant组件
import {
  Icon,
  Swipe,
  SwipeItem,
  Sticky,
  Popup,
  Loading,
  Overlay,
  Image,
  Form,
  Field,
  Tab,
  Tabs,
  Uploader,
  Notify,
  Dialog
} from "vant";
Vue.use(Loading);
Vue.use(Popup);
Vue.use(Sticky);
Vue.use(Icon);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Overlay);
Vue.use(Image);
Vue.use(Form);
Vue.use(Field);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Uploader);
Vue.use(Notify);
Vue.use(Dialog);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  // to来自  from  去哪
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
