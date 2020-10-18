<template>
  <div class="home">
    <div class="circle"></div>
    <div class="response">
      {{ validate }}
    </div>
  </div>
</template>

<script>
import { VALIDATE_EMAIL } from '@/store/actions.type.js';
export default {
  name: 'EmailValidation',
  data() {
    return {
      validate: '',
    };
  },

  async created() {
    try {
      console.log(this.$route.params.token);
      const res = await this.$store.dispatch(
        VALIDATE_EMAIL,
        this.$route.params.token
      );
      this.validate = 'ایمیل شما با موفقیت تایید شد';
      console.log(res);
    } catch (error) {
      this.$toasted.error(error.response.data.message);
      this.validate = 'در تایید ایمیل شما مشکلی بوجود امده است';
    }
  },
};
</script>

<style scoped lang="scss">
.home {
  background-color: #f3f4f8;
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: -2;
  overflow: hidden;

  .circle {
    z-index: -1;
    width: 1209px;
    height: 1209px;
    opacity: 0.3;
    background-color: #ffffff;
    border-radius: 50%;
    border: 0px solid transparent;
    border-top: none;
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .response {
    margin-top: 300px;
    font-size: 40px;
    color: rgb(104, 97, 97);
  }
}
</style>
