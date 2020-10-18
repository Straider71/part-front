<template>
  <div class="sign-in-container">
    <p class="sub-header">
      چنانچه دارای حساب کاربری نیستید، لطفا ابتدا ثبت نام کنید
    </p>
    <form class="input-list" @submit.prevent="onSubmit">
      <div class="inputs">
        <custom-input
          class="round-top-border"
          placeholder="ایمیل خود را وارد کنید"
          label="ایمیل"
          type="email"
          v-model.lazy.trim="email"
        >
          <img src="../assets/input-img/mail.svg" />
        </custom-input>
        <custom-input
          class="round-bottom-border"
          placeholder="رمز عبور خود را وارد کنید"
          label="رمز عبور"
          type="password"
          v-model="password"
        >
          <img src="../assets/input-img/lock.svg" />
        </custom-input>
      </div>

      <div class="remember-forget">
        <router-link to="forgot-password">
          <div class="forget-pass-link">
            <a>رمز عبور را فراموش کرده‌اید؟</a>
          </div>
        </router-link>
        <div class="remember-me">
          <CustomCheckBox text="مرا به خاطر داشته باش" />
        </div>
      </div>
      <div class="buttons">
        <router-link to="sign-up" class="link">
          <CustomButton class="custom-button">
            <p>ثبت نام</p>
          </CustomButton>
        </router-link>
        <CustomButton class="custom-button">
          <p>ورود</p>
        </CustomButton>
      </div>
    </form>
  </div>
</template>

<script>
import CustomInput from '../components/global/CustomInput';
import CustomCheckBox from '../components/global/CustomCheckBox';
import CustomButton from '../components/global/CustomButton';
import { mapActions } from 'vuex';
import { SIGNIN } from '@/store/actions.type.js';

export default {
  name: 'SignIn',
  components: { CustomInput, CustomCheckBox, CustomButton },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      if (!this.email || !this.password) {
        this.$toasted.error('ایمیل و رمز عبور خود را وارد فرمایید');
      } else {
        const userData = {
          email: this.email,
          password: this.password,
        };
        this.$store.dispatch(SIGNIN, userData).then(() => {
          this.$router.push({ name: 'QuestionnaireListPage' });
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sign-in-container {
  width: 375px;
  max-width: 375px;
  height: 267px;
  display: flex;
  flex-direction: column;

  & .sub-header {
    text-align: right;
    color: #7f86aa;
    font-size: 14px;
    line-height: 1.36;
    letter-spacing: -0.14px;
    margin-bottom: 35px;
    margin-top: 10px;
  }

  .input-list {
    & .inputs {
      box-shadow: 10px 8px 6px 0 #edeef5;
    }
    & > * {
      margin-top: 1px;
    }

    & .round-top-border {
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
    }

    & .round-bottom-border {
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
      margin-bottom: 33px;
    }
  }

  & .remember-forget {
    width: 100%;
    color: #7f86aa;
    display: flex;
    position: relative;

    & .forget-pass-link {
      position: absolute;
      font-size: 14px;
      text-decoration: underline;
      cursor: pointer;
    }

    & .remember-me {
      font-size: 12px;
    }
  }

  & .buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0;
    margin: 0;

    & .link {
      text-decoration: none;
    }

    & .custom-button::v-deep .button {
      height: 45px;
      width: 183px;
      font-size: 16px;
      border-radius: 5px;
    }

    & .custom-button:first-child::v-deep .button {
      background-color: #f3f4f8;
      color: #929db3;
      box-shadow: none;
      border: solid 1px #d1d1d2;
    }

    & .custom-button::v-deep .button:hover {
      background-color: #4570f5;
      opacity: 0.9;
      color: white;
    }

    & .custom-button::v-deep .button:focus {
      outline: none;
    }
  }
}
</style>
