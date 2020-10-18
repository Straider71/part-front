<template>
  <div class="auth">
    <div class="hand-image">
      <HandImage />
    </div>
    <div class="right-div">
      <Logo />
      <div class="title">
        <p class="head">به سیستم پرسشنامه آنلاین خوش آمدید</p>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import Logo from '../components/global/Logo';
import HandImage from '@/components/global/HandImage.vue';

export default {
  name: 'Authenticate',
  components: {
    Logo,
    HandImage,
  },
};
</script>

<style lang="scss" scoped>
.navbar-logo {
  width: 98px;
  height: 45px;
  object-fit: contain;
}

.auth {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: var(--bg-second);
  overflow: hidden;

  & .hand-image {
    width: 50٪;
    height: 500px;
    margin-top: 230px;
  }

  & .right-div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    height: 720px;
    width: 50%;
    padding-right: 190px;
    padding-top: 50px;

    & .title {
      text-align: right;
      margin-top: 50px;

      & .head {
        font-weight: bold;
        color: var(--primary-text);
        font-size: 1.625rem;
        line-height: 1.35;
      }

      & .subhead {
        color: var(--second-text);
        font-size: 0.875rem;
        line-height: 1.36;
        letter-spacing: -0.14px;
        margin-top: 15px;
      }
    }
  }
}

@media (max-width: 1270px) {
  .auth {
    & .right-div {
      padding-right: 130px;
      & .title {
        & .head {
          font-size: 1.375rem;
        }
      }
    }

    & .hand-image {
      margin-right: 50px;
    }
  }
}
@media (max-width: 1130px) {
  .auth {
    & .right-div {
      & .title {
        & .head {
          font-size: 1.25rem;
        }
      }
    }
  }
}

@media (max-width: 1010px) {
  .auth {
    & .hand-image {
      display: none;
    }

    & .right-div {
      align-items: center;
      height: 500px;
      width: 100%;
      padding: 0;
      padding-top: -50px;
    }
  }
}

@media (max-width: 576px) {
  .navbar-logo {
    display: block;
    padding-top: -50px;
  }
}
</style>
