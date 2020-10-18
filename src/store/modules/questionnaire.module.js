import Vue from 'vue';
import EventService from '@/services/EventService.js';
import {
  FETCH_QUESTIONNAIRES,
  COMPLETE_QUESTIONNAIRE,
  GET_ALL_ADMIN_QUESTIONNAIRE,
  CREATE_QUESTIONNARE,
  CREATE_QUESTION_0,
  CREATE_QUESTION_1,
  CREATE_QUESTION_2,
  DELETE_QUESTIONNAIRE,
  GET_STATS,
} from '../actions.type.js';
import {
  SET_QUESTIONNAIRES,
  SET_QUESTION_COUNT,
  SET_TOTAL_PAGE,
  SET_NO_QUESTION,
  SET_QUESTIONNAIRE_TITLE,
  SET_ORDER,
  SET_PAGE_NUMBER,
  SET_COMPLETE,
  SET_ALL_ADMIN_QUESTIONNAIRE,
  SET_CREATE_ID,
  SET_STATS,
} from '../mutations.type.js';

const state = {
  questionnaires: [],
  questionCount: 0,
  noQuestion: true,
  totalPageNumber: null,
  orderType: 'new_created',
  questionnaireTitle: 'لیست پرسشنامه‌ها',
  pageNumber: 1,
  completeQuestionnaires: [],
  adminQuestionnaires: [],
  adminQuestionnaireId: null,
  stats: {},
};

const mutations = {
  [SET_QUESTIONNAIRES](state, questionnaires) {
    state.questionnaires = questionnaires;
  },
  [SET_QUESTION_COUNT](state, questionCount) {
    state.questionCount = questionCount;
  },
  [SET_NO_QUESTION](state, noQuestion) {
    state.noQuestion = noQuestion;
  },
  [SET_TOTAL_PAGE](state, totoalpage) {
    state.totalPageNumber = totoalpage;
  },
  [SET_QUESTIONNAIRE_TITLE](state, title) {
    state.questionnaireTitle = title;
  },
  [SET_ORDER](state, order) {
    state.orderType = order;
  },
  [SET_PAGE_NUMBER](state, page) {
    state.pageNumber = page;
  },
  [SET_COMPLETE](state, body) {
    state.completeQuestionnaires = body;
  },
  [SET_ALL_ADMIN_QUESTIONNAIRE](state, body) {
    state.adminQuestionnaires = body;
  },
  [SET_CREATE_ID](state, id) {
    state.adminQuestionnaireId = id;
  },
  [SET_STATS](state, stats) {
    state.stats = stats;
  },
};

const actions = {
  async [FETCH_QUESTIONNAIRES]({ commit }, payload) {
    try {
      const res = await EventService.getQuestionnaires(
        payload.order,
        payload.page
      );

      commit(SET_QUESTIONNAIRES, res.data.questionnaire);
      commit(SET_QUESTION_COUNT, res.data.result_number);
      commit(SET_TOTAL_PAGE, res.data.total_page_number);
      commit(SET_NO_QUESTION, true);

      if (res.data.questionnaire.length == 0) commit(SET_NO_QUESTION, false);
    } catch (error) {
      Vue.toasted.error(error.response.data.message);
    }
  },
  async [COMPLETE_QUESTIONNAIRE]({ commit }) {
    try {
      const res = await EventService.completeQuestionnaire();
      commit(SET_COMPLETE, res.data.data.questionnaire_finish_number.count);
    } catch (error) {
      Vue.toasted.error(error.response.data.message);
    }
  },
  async [GET_ALL_ADMIN_QUESTIONNAIRE]({ commit }) {
    try {
      const res = await EventService.getAllAdminQuestionnaire();
      commit(SET_ALL_ADMIN_QUESTIONNAIRE, res.data.data.questionnaires);
    } catch (error) {
      Vue.toasted.error(error.response.data.message);
    }
  },
  async [CREATE_QUESTIONNARE]({ commit }, title) {
    try {
      const data = {
        title,
        allow_all_users: true,
      };
      await EventService.createQuestionnare(data);

      Vue.toasted.success('پرسشنامه شما با موفقیت ایجاد گردید');
    } catch (error) {
      Vue.toasted.error(error.response.data.message);
    }
  },
  async [CREATE_QUESTION_0]({ commit }, payload) {
    try {
      const questionData = {
        title: payload.title,
        type: '2',
        questionnaireId: payload.id,
      };

      await EventService.createQuestion(questionData);

      Vue.toasted.success('سوال شما با موفقیت ایجاد گردید');
    } catch (error) {
      Vue.toasted.error(error.message);
    }
  },
  async [CREATE_QUESTION_1]({ commit }, payload) {
    try {
      const questionData = {
        title: payload.title,
        correctOption: payload.correctOption,
        incorrectOptions: [payload.incorrectOptions],
        type: '1',
        questionnaireId: payload.id,
      };

      await EventService.createQuestion(questionData);

      Vue.toasted.success('سوال شما با موفقیت ایجاد گردید');
    } catch (error) {
      // Vue.toasted.error(error.response.data.message);
    }
  },
  async [CREATE_QUESTION_2]({ commit }, payload) {
    try {
      const questionData = {
        title: payload.title,
        type: '0',
        correctOption: payload.correctOption,
        incorrectOptions: payload.incorrectOptions,
        questionnaireId: payload.id,
      };

      await EventService.createQuestion(questionData);

      Vue.toasted.success('سوال شما با موفقیت ایجاد گردید');
    } catch (error) {
      // Vue.toasted.error(error.response.data.message);
    }
  },
  async [DELETE_QUESTIONNAIRE]({ commit }, id) {
    try {
      await EventService.deleteQuestionnaire(id);
      Vue.toasted.success('پرسشنامه شما با موفقیت حذف گردید');
    } catch (error) {
      Vue.toasted.error(error.response.data.message);
    }
  },
  async [GET_STATS]({ commit }) {
    try {
      const res = await EventService.getStats();
      commit(SET_STATS, res.data.data);
    } catch (error) {
      Vue.toasted.error(error.response.data.message);
    }
  },
};

const getters = {
  orderTypeState: state => state.orderType,
  pageNumberState: state => state.pageNumber,
  finishStat: state => state.stats.answeredQuestionnaireStat[1].count,
  unFinishStat: state => state.stats.answeredQuestionnaireStat[0].count,
  fourQuestionType: state => state.stats.questionTypeStat[0].count,
  twoQuestionType: state => state.stats.questionTypeStat[1].count,
  desQuestionType: state => state.stats.questionTypeStat[2].count,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
