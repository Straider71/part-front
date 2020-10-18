<template>
  <div class="finish">
    <figure>
      <img src="../../assets/Group.svg" alt="finish page" />
    </figure>
    <p>شما با <span class="green">موفقیت</span> پرسشنامه را به اتمام رساندید</p>
    <router-link to="/">
      <CustomButton class="deep">
        <img src="../../assets/arrow-white.svg" alt="arrow" />
        <a href="#">مشاهده پرسشنامه‌ها</a>
      </CustomButton>
    </router-link>
  </div>
</template>

<script>
import CustomButton from '../global/CustomButton';

export default {
  name: 'FinishPage',
  components: {
    CustomButton,
  },
};
</script>

<style lang="scss" scoped>
.finish {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & a {
    text-decoration: none;
  }

  & figure {
    margin: 100px 0 60px 0;
  }

  & p {
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.4;
    letter-spacing: -0.2px;
    text-align: center;
    color: var(--primary-text);
    margin-bottom: 60px;

    & .green {
      color: var(--green-text);
    }
  }

  .deep::v-deep .button {
    width: 209px;
    height: 50px;
    border-radius: 10px;
    box-shadow: 0 2px 5px 0 rgba(69, 112, 245, 0.6);
    background-color: var(--primary-color);

    & a {
      text-decoration: none;
      font-size: 1rem;
      line-height: 1.38;
      letter-spacing: -0.16px;
      color: var(--white-text);
      padding: 0 0 1px 10px;
    }
  }
}
</style>
