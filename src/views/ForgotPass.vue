<template>
  <div class="sign-in-container">
    <p class="sub-header">
      لطفا ایمیل خود را وارد فرمایید
    </p>
    <form class="input-list" @submit.prevent="onSubmit">
      <div class="inputs">
        <custom-input
          class="round-top-border"
          placeholder="ایمیل خود را وارد کنید"
          label="ایمیل"
          type="email"
          v-model="email"
        >
          <img src="../assets/input-img/mail.svg" />
        </custom-input>
      </div>

      <div class="buttons">
        <CustomButton class="send-button ">
          <p>ارسال</p>
        </CustomButton>
        <div class="two">
          <router-link to="sign-up" class="link">
            <CustomButton class="custom-button">
              <p>ثبت نام</p>
            </CustomButton>
          </router-link>
          <router-link to="sign-in" class="link">
            <CustomButton class="custom-button">
              <p>ورود</p>
            </CustomButton>
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import CustomInput from '../components/global/CustomInput';
import CustomCheckBox from '../components/global/CustomCheckBox';
import CustomButton from '../components/global/CustomButton';

import { SEND_EMAIL } from '@/store/actions.type.js';
export default {
  name: 'ForgotPass',
  components: { CustomInput, CustomCheckBox, CustomButton },
  data() {
    return {
      email: '',
    };
  },
  methods: {
    onSubmit() {
      const userData = {
        email: this.email,
      };
      this.$store.dispatch(SEND_EMAIL, userData).then(
        () => {
          this.$router.push({ name: 'sign-in' });
        },
        error => console.log(error)
      );
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
    /*display: flex;*/
    text-align: right;
    color: #7f86aa;
    font-size: 14px;
    line-height: 1.36;
    letter-spacing: -0.14px;
    margin-bottom: 35px;
    margin-top: 10px;
  }

  .input-list {
    // box-shadow: 10px 8px 6px 0 #edeef5;
    /*margin-bottom: 33px;*/

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

  & .buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 0;
    margin-top: 50px;

    & .send-button::v-deep .button {
      height: 45px;
      width: 375px;
      font-size: 16px;
      border-radius: 5px;
    }

    & .two {
      display: flex;
      margin-top: 10px;
      justify-content: space-between;

      & .custom-button::v-deep .button {
        height: 45px;
        width: 183px;
        font-size: 16px;
        border-radius: 5px;
      }
    }

    & .link {
      text-decoration: none;
    }

    /*& .custom-button .button{*/
    /*& .custom-button >>> button {*/
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
      /* opacity is my opinion*/
      opacity: 0.9;
      color: white;
    }

    & .custom-button::v-deep .button:focus {
      outline: none;
    }
  }
}
</style>
