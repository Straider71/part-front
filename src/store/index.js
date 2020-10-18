import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import questionnaire from './modules/questionnaire.module.js';
import question from './modules/question.module.js';
import answer from './modules/answer.module.js';
import user from './modules/user.module.js';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  namespaced: true,

  modules: {
    answer,
    question,
    questionnaire,
    user,
  },
});
