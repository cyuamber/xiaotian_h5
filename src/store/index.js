import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import app from "./modules/app";
import aiforum from "./modules/aiforum";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    aiforum
  },
  getters
});

export default store;
