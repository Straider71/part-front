import EventService from '@/services/EventService.js';
import { GET_ANSWER, SEND_ANSWER } from '../actions.type.js';
import { GET_ANSWERs } from '../mutations.type.js';

const state = {
  answer: null,
};

const mutations = {
  [GET_ANSWERs](state, answer) {
    state.answer = answer;
  },
};

const actions = {
  async [GET_ANSWER]({ commit }, id) {
    try {
      return await EventService.getAnswer(id);
    } catch (error) {
      // Vue.toasted.error(error.response.data.message);
    }
  },
  async [SEND_ANSWER]({ commit }, body) {
    await EventService.answer(body);
  },
};

export default {
  state,
  mutations,
  actions,
};
