<template>
  <div class="sign-up-container">
    <div class="info">
      <div class="theme">
        <button @click="darkThemeSwitch">تغییر تم</button>

        <p>انتخاب تم</p>
      </div>

      <p class="sub-header">اطلاعات کاربری</p>
      <form class="input-list-top" @submit.prevent="onSubmitName">
        <custom-input
          class="round-top-border"
          placeholder="نام و نام خانوادگی خود را وارد کنید"
          label="نام و نام خانوادگی"
          v-model.lazy.trim="name"
        >
          <img src="../assets/input-img/user.svg" />
        </custom-input>
        <custom-input
          placeholder="ایمیل خود را وارد کنید"
          label="ایمیل"
          v-model.lazy.trim="email"
          type="email"
        >
          <img src="../assets/input-img/mail.svg" />
        </custom-input>
        <div class="buttons">
          <CustomButton class="custom-button">
            <p>بروزرسانی اطلاعات کاربری</p>
          </CustomButton>
        </div>
      </form>
    </div>

    <div class="avatar"><Avatar /></div>
    <div class="password">
      <p class="sub-header">رمز عبور کاربر</p>
      <form class="input-list" @submit.prevent="onSubmitPass">
        <custom-input
          placeholder="رمز عبور کنونی خود را وارد کنید"
          label="رمز عبور کنونی"
          v-model="currentPassword"
          type="password"
        >
          <img src="../assets/input-img/lock.svg" />
        </custom-input>
        <custom-input
          placeholder="رمز عبور جدید خود را وارد کنید"
          label="رمز عبور جدید"
          v-model="password"
          type="password"
        >
          <img src="../assets/input-img/lock.svg" />
        </custom-input>

        <custom-input
          class="round-bottom-border"
          placeholder="رمز عبور جدید خود را مجدد وارد کنید"
          label="تکرار رمز عبور جدید"
          v-model="checkPassword"
          type="password"
        >
          <img src="../assets/input-img/lock.svg" />
        </custom-input>
        <div class="buttons">
          <CustomButton class="custom-button">
            <p>بروزرسانی رمز عبور</p>
          </CustomButton>
        </div>
      </form>
    </div>
    <div class="chart">
      <Chart
        width="1000"
        height="700"
        id="chart1"
        title="پرسشنامه‌ها"
        type="doughnut"
        :labels="[' پاسخ داده شده', ' پاسخ داده نشده']"
        :data="[completeQuestionnaires, questionCount - completeQuestionnaires]"
        :background-color="[
          'rgba(40, 223, 153, 0.75)',
          'rgba(67, 101, 139, 0.75)',
        ]"
      ></Chart>
    </div>
  </div>
</template>

<script>
import CustomInput from '../components/global/CustomInput';
import CustomButton from '../components/global/CustomButton';
import Avatar from '../components/global/Avatar';
import Chart from '../components/global/Chart';
import {
  UPDATE_ME,
  NEW_PASSWORD,
  COMPLETE_QUESTIONNAIRE,
} from '@/store/actions.type.js';
import { SET_USER_DATA } from '@/store/mutations.type.js';
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex';

export default {
  name: 'Profile',
  components: { CustomInput, CustomButton, Avatar, Chart },
  data() {
    return {
      name: `${this.$store.state.user.user.username}`,
      email: `${this.$store.state.user.user.email}`,
      password: '',
      checkPassword: '',
      currentPassword: '',
    };
  },
  computed: {
    ...mapState({
      questionCount: state => state.questionnaire.questionCount,
      completeQuestionnaires: state =>
        state.questionnaire.completeQuestionnaires,
    }),
  },
  async created() {
    this.$store.dispatch(COMPLETE_QUESTIONNAIRE);
  },
  methods: {
    async onSubmitName() {
      if (!this.name || !this.email) {
        this.$toasted.error('وارد کردن تمام فیلدها اجباری است');
      }
      //  else if (!this.validEmail(this.email)) {
      //   this.$toasted.error('ایمیل معتبر وارد کنید');
      // }
      else {
        const userData = {
          name: this.name,
          email: this.email,
        };
        const res = await this.$store.dispatch(UPDATE_ME, userData);
      }
    },
    async onSubmitPass() {
      if (!this.password || !this.checkPassword || !this.currentPassword) {
        this.$toasted.error('وارد کردن تمام فیلدها اجباری است');
      } else if (this.password !== this.checkPassword) {
        this.$toasted.error('رمز عبور خود را دوباره وارد فرمایید');
      } else if (this.password == this.currentPassword) {
        this.$toasted.error('رمز عبور جدید نباید تکراری باشد ');
      } else {
        const userData = {
          current_password: this.currentPassword,
          new_password: this.password,
        };

        await this.$store.dispatch(NEW_PASSWORD, userData);
      }

      this.password = '';
      this.checkPassword = '';
      this.currentPassword = '';
    },

    _addDarkTheme() {
      let darkThemeLinkEl = document.createElement('link');
      darkThemeLinkEl.setAttribute('rel', 'stylesheet');
      darkThemeLinkEl.setAttribute('href', 'dark.css');
      darkThemeLinkEl.setAttribute('id', 'dark-theme-style');

      let docHead = document.querySelector('head');
      docHead.append(darkThemeLinkEl);
      localStorage.setItem('theme', 'dark');
    },
    _removeDarkTheme() {
      let darkThemeLinkEl = document.querySelector('#dark-theme-style');
      let parentNode = darkThemeLinkEl.parentNode;
      parentNode.removeChild(darkThemeLinkEl);
      localStorage.setItem('theme', 'light');
    },
    darkThemeSwitch() {
      let darkThemeLinkEl = document.querySelector('#dark-theme-style');
      if (!darkThemeLinkEl) {
        this._addDarkTheme();
      } else {
        this._removeDarkTheme();
      }
    },
  },

  validEmail: function(email) {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },
};
</script>

<style scoped lang="scss">
.sign-up-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  grid-auto-flow: column;
  grid-template-rows: 1fr 1fr;
  grid-gap: 3rem;
  grid-template-areas:
    'avatar info '
    'summery password ';

  max-width: 1075px;
  height: 267px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 80px;

  & .sub-header {
    text-align: center;
    color: #7f86aa;
    font-size: 16px;
    line-height: 1.36;
    letter-spacing: -0.14px;
    font-weight: bold;
    margin-top: 10px;
    width: 375px;
  }
  .input-list {
    // box-shadow: 10px 8px 6px 0 #edeef5;
    width: 375px;
    height: 136px;
    margin-top: 20px;

    & > * {
      margin-top: 10px;
    }

    & .round-top-border {
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
    }

    & .round-bottom-border {
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
    }

    & .buttons {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0;
      margin-top: 20px;

      & .link {
        text-decoration: none;
      }

      & .custom-button::v-deep .button {
        height: 45px;
        width: 375px;
        font-size: 16px;
        border-radius: 5px;
      }
    }
  }

  .input-list-top {
    // box-shadow: 10px 8px 6px 0 #edeef5;
    // width: 375px;
    // height: 136px;
    margin-top: 20px;

    & > * {
      margin-top: 10px;
    }

    & .round-top-border {
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
    }

    & .round-bottom-border {
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
    }

    & .buttons {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0;
      margin-top: 20px;

      & .custom-button::v-deep .button {
        height: 45px;
        width: 375px;
        font-size: 16px;
        border-radius: 5px;
      }
    }
  }
}

.info {
  grid-area: info;
  margin-left: auto;
  margin-right: auto;

  & .theme {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;

    p {
      color: var(--gray-text);
    }

    button {
      width: 100px;
      background-color: #bccdfd;
      border: none;
      border-radius: 10px;
    }
  }
}

.avatar {
  grid-area: avatar;
}

.password {
  grid-area: password;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 1046px) {
  .sign-up-container {
    width: 80%;
    margin-right: 190px;
  }
}

@media (max-width: 950px) {
  .chart {
    display: none;
  }
  .sign-up-container {
    display: flex;
    flex-direction: column;
    width: 80%;
    // margin-right: 190px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0;
    overflow-y: scroll;
    height: 89vh;

    &::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
    scrollbar-width: none;
  }
}
</style>
