<template>
  <div class="home">
    <div class="circle"></div>
    <Navbar />

    <div class="main">
      <div class="topbar">
        <div class="tabs">
          <router-link to="/admin"> <p>صفحه نخست</p></router-link>
        </div>
        <div class="tabs">
          <router-link to="/admin/questionnaire">
            <p>ایجاد پرسشنامه</p></router-link
          >
        </div>
        <div class="tabs">
          <router-link to="/admin/question"> <p>ایجاد سوال</p></router-link>
        </div>
      </div>

      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/global/Navbar';

import { SET_QUESTIONNAIRE_TITLE } from '@/store/mutations.type.js';

export default {
  name: 'AdminPage',
  components: {
    Navbar,
  },
};
</script>

<style scoped lang="scss">
.home {
  background-color: var(--bg-second);
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: -2;
  overflow: hidden;

  & .circle {
    z-index: -1;
    width: 1209px;
    height: 1209px;
    opacity: 0.3;
    background-color: var(--bg-primary);
    border-radius: 50%;
    border: 0px solid transparent;
    border-top: none;
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  & .main {
    & .topbar {
      width: 80%;
      height: 60px;
      background-color: var(--bg-primary);
      border-radius: 25px;
      margin-left: auto;
      margin-right: auto;
      margin-top: 10px;
      box-shadow: 0 0 6px #eeebeb;
      display: flex;
      flex-direction: row-reverse;
      justify-content: center;
      align-items: center;

      & a {
        text-decoration: none;

        &:visited {
          color: var(--primary-color);
        }
      }

      & .tabs {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-color);
        margin: 0 50px;
        width: auto;

        p:active,
        p:focus,
        p:hover {
          color: rgb(169, 205, 240);
        }
      }
    }
  }
}

@media (max-width: 900px) {
  .topbar {
    flex-wrap: wrap;
    height: 100px !important;
  }
}
</style>
