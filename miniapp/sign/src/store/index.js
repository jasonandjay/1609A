import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

// 挂载modules
import index from './modules/index'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    index
  },
  plugins: [createLogger()]
})
