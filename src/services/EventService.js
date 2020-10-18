import axios from 'axios';
import Nprogress from 'nprogress';

axios.defaults.headers['Accept'] = 'application/json';
axios.defaults.headers['Content-Type'] = 'application/json';
// axios.defaults.timeout = 1000;

axios.interceptors.request.use(config => {
  Nprogress.start();
  return config;
});

axios.interceptors.response.use(
  response => {
    Nprogress.done();
    return response;
  },
  error => {
    Nprogress.done();
    return Promise.reject(error);
  }
);

export default {
  async getQuestionnaires(order, page) {
    return await axios.get(
      `/questionnaire/?order_by=${order}&page=${page}&limit=4`
    );
  },
  async getAllQuestions(id) {
    const url = `/questions/?questionnaire_id=${id}`;
    return await axios.get(url);
  },
  async getQuestion(id) {
    const url = `/questions/?question_id=${id}`;
    // return await axios.get(url);
    const res = await axios.get(url);
    console.log(res);

    return res;
  },
  async answer(body) {
    const url = `/answers/`;
    return await axios.post(url, body);
  },
  async signIn(credentials) {
    return await axios.post('/users/sign-in/', credentials);
  },
  async signUp(credentials) {
    return await axios.post('/users/sign-up/', credentials);
  },
  async signOut() {
    return await axios.get('/users/sign-out/');
  },
  async sendEmail(email) {
    return await axios.post('/users/forget-password/', email);
  },
  async updatePass(password, token) {
    const url = `/users/reset-password/?token=${token}`;
    return await axios.post(url, { password });
  },
  async updateMe(body) {
    const url = `/users/me/`;
    return await axios.put(url, body);
  },
  async newPassword(body) {
    const url = `/users/update-password/`;
    return await axios.post(url, body);
  },
  async profilePic(body) {
    const url = `/users/change-profile-photo/`;
    return await axios.post(url, body);
  },
  async getAnswer(id) {
    const url = `/answers/?question_id=${id}`;
    return await axios.get(url);
  },
  async validateEmail(token) {
    const url = `/users/validate-email/?token=${token}`;
    return await axios.get(url);
  },
  async completeQuestionnaire() {
    const url = `/questionnaire/get-answered-number/`;
    return await axios.get(url);
  },
  async getAllAdminQuestionnaire() {
    const url = `/questionnaire/get-all-questionnaire/`;
    return await axios.get(url);
  },
  async createQuestionnare(body) {
    const url = `/questionnaire/`;
    return await axios.post(url, body);
  },
  async createQuestion(body) {
    const url = `/questions/`;
    return await axios.post(url, body);
  },
  async deleteQuestionnaire(id) {
    const url = `/questionnaire/?questionnaireId=${id}`;
    return await axios.delete(url);
  },

  async getStats() {
    const url = `/questionnaire/stats/`;
    return await axios.get(url);
  },
};
