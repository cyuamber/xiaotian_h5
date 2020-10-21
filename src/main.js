// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import "core-js/stable";
import "regenerator-runtime/runtime";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 设置 js中可以访问 $cdn
import { $cdn } from "@/config";
Vue.prototype.$cdn = $cdn;

// 全局引入按需引入UI库 vant
import "@/plugins/vant";
// 引入全局样式
import "@/assets/css/index.scss";
// 移动端适配
import "lib-flexible/flexible.js";

// filters
import "./filters";

//  引入 vant组件
import { Icon, Swipe, SwipeItem, Sticky, Popup, Loading, Image } from "vant";

Vue.use(Loading);
Vue.use(Popup);
Vue.use(Sticky);
Vue.use(Icon);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Image);
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
