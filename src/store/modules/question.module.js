import Vue from 'vue';
import EventService from '@/services/EventService.js';
import { FETCH_QUESTIONS, FETCH_QUESTION } from '../actions.type.js';
import {
  SET_SELECTED_QUESTIONNARE,
  SET_QUESTION,
  SET_QUESTION_INDEX,
  SET_STATUS,
  // SET_COMPLETE_QUESTIONNARES,
} from '../mutations.type.js';

const state = {
  question: [],
  questionnaire: [],
  questionIndex: 0,
  questionStatus: 0,
  // completeQuestionnaires: 0,
};

const mutations = {
  [SET_QUESTION](state, question) {
    state.question = question;
  },
  [SET_SELECTED_QUESTIONNARE](state, questionReq) {
    state.questionnaire = questionReq;
  },
  [SET_QUESTION_INDEX](state, index) {
    state.questionIndex = index;
  },
  [SET_STATUS](state, status) {
    state.questionStatus = status;
  },
  // [SET_COMPLETE_QUESTIONNARES](state) {
  //   state.completeQuestionnaires += 1;
  // },
};

const actions = {
  async [FETCH_QUESTIONS]({ commit }, payload) {
    try {
      const res = await EventService.getAllQuestions(payload.id);
      commit(SET_SELECTED_QUESTIONNARE, res.data.data.question);
      commit(SET_STATUS, payload.status);
    } catch (error) {
      Vue.toasted.error(error.message);
      this.state.questionnaire = [];
      localStorage.removeItem('vuex');
    }
  },
  async [FETCH_QUESTION]({ commit }, id) {
    try {
      const res = await EventService.getQuestion(id);

      commit(SET_QUESTION, res.data.data.question);
    } catch (error) {
      // this.state.question = null;
      // Vue.toasted.error(error.response.data.message);
    }
  },
};
const getters = {
  plusIndex: state => state.questionIndex + 1,
  minusIndex: state => state.questionIndex - 1,
  questionIndex: state => state.questionIndex,
  questionnaire: state => state.questionnaire,
  questionaireLength: state => state.questionnaire.length,

  // completeQuestionnaires: state => state.completeQuestionnaires,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
