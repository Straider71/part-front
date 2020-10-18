<template>
  <div class="home">
    <div class="circle"></div>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from '../components/global/Navbar';

export default {
  name: 'Home',
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
  overflow: auto;

  .circle {
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
}
</style>
