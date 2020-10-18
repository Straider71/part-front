import Vue from 'vue';
import axios from 'axios';
import EventService from '@/services/EventService.js';

import {
  SIGNIN,
  SIGNUP,
  LOGOUT,
  SEND_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_ME,
  NEW_PASSWORD,
  PROFILE_PIC,
  VALIDATE_EMAIL,
} from '../actions.type.js';
import {
  SET_USER_DATA,
  CLEAR_USER_DATA,
  SET_USER_PHOTO,
  REMOVE_USER_PHOTO,
} from '../mutations.type.js';

const state = {
  user: null,
};

const mutations = {
  [SET_USER_DATA](state, userData) {
    state.user = userData;
    localStorage.setItem('user', JSON.stringify(userData));
    axios.defaults.headers['Authorization'] = `Bearer ${userData.token}`;
  },

  [CLEAR_USER_DATA]() {
    localStorage.removeItem('user');
    localStorage.removeItem('vuex');

    location.reload();
  },
  [SET_USER_PHOTO](state, url) {
    state.user.photo = url;
  },
  [REMOVE_USER_PHOTO](state) {
    const res = 'server/image/users/avatar@3x.png';
    state.user.photo = res;
    let user = JSON.parse(localStorage.getItem('user'));
    user.photo = res;
    localStorage.setItem('user', JSON.stringify(user));
    Vue.toasted.success('عکس شما پاک شد');
  },
};

const actions = {
  async [SIGNUP]({ commit }, credentials) {
    try {
      const res = await EventService.signUp(credentials);
      commit(SET_USER_DATA, {
        token: res.data.token,
        username: res.data.data.user.name,
        email: credentials.email,
      });

      Vue.toasted.success('اطلاعات شما با موفقیت ثبت گردید');
      Vue.toasted.success('ابتدا ایمیل خود را تایید فرمایید');
    } catch (error) {
      Vue.toasted.error(error.response.data.message);
    }
  },
  async [SIGNIN]({ commit }, credentials) {
    try {
      const res = await EventService.signIn(credentials);
      console.log(res);
      commit(SET_USER_DATA, {
        token: res.data.token,
        username: res.data.data.name,
        email: credentials.email,
        photo: res.data.data.photo,
        role: res.data.data.role,
      });
      Vue.toasted.success('شما با موفقیت وارد شدید');
    } catch (error) {
      Vue.toasted.error(error.response.data.message);
    }
  },
  async [LOGOUT]({ commit }) {
    await EventService.signOut();
    commit(CLEAR_USER_DATA);
    localStorage.removeItem('theme');
  },
  async [SEND_EMAIL]({ commit }, email) {
    try {
      EventService.sendEmail(email);

      Vue.toasted.success('ایمیل با موفقیت ارسال شد');
    } catch (error) {
      Vue.toasted.error(error.response.data.message);
    }
  },
  async [UPDATE_PASSWORD]({ commit }, payload) {
    try {
      await EventService.updatePass(payload.password, payload.token);
      Vue.toasted.success('رمز عبور با موفقیت تغییر کرد');
    } catch (error) {
      Vue.toasted.error(error.response.data.message);
    }
  },
  async [UPDATE_ME]({ commit }, payload) {
    try {
      await EventService.updateMe(payload);
      let user = JSON.parse(localStorage.getItem('user'));
      user.username = payload.name;
      user.email = payload.email;
      localStorage.setItem('user', JSON.stringify(user));
      Vue.toasted.success('اطلاعات شما با موفقیت ثبت گردید');
    } catch (error) {
      Vue.toasted.error(error.response.data.message);
    }
  },
  async [NEW_PASSWORD]({ commit }, payload) {
    try {
      await EventService.newPassword(payload);
      Vue.toasted.success('اطلاعات شما با موفقیت ثبت گردید');
    } catch (error) {
      Vue.toasted.error(error.response.data.message);
    }
  },
  async [PROFILE_PIC]({ commit }, payload) {
    try {
      const res = await EventService.profilePic(payload);
      commit(SET_USER_PHOTO, res.data.data.photo);
      let user = JSON.parse(localStorage.getItem('user'));
      user.photo = res.data.data.photo;
      localStorage.setItem('user', JSON.stringify(user));
      Vue.toasted.success('اطلاعات شما با موفقیت ثبت گردید');
    } catch (error) {
      Vue.toasted.error(error.response.data.message);
    }
  },
  async [VALIDATE_EMAIL]({ commit }, token) {
    // try {
    await EventService.validateEmail(token);
    // } catch (error) {
    //   Vue.toasted.error(error.response.data.message);
    // }
  },
};
``;

const getters = {
  userPhoto: state => state.user.photo,
  userRole: state => state.user.role,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
