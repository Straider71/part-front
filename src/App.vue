<template>
  <div id="app" class="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    let theme = localStorage.getItem('theme');

    if (theme == 'dark') {
      let darkThemeLinkEl = document.createElement('link');
      darkThemeLinkEl.setAttribute('rel', 'stylesheet');
      darkThemeLinkEl.setAttribute('href', 'dark.css');
      darkThemeLinkEl.setAttribute('id', 'dark-theme-style');

      let docHead = document.querySelector('head');
      docHead.append(darkThemeLinkEl);
    } else {
      let darkThemeLinkEl = document.querySelector('#dark-theme-style');
      let parentNode = darkThemeLinkEl.parentNode;
      parentNode.removeChild(darkThemeLinkEl);
    }
  },
};
</script>

<style lang="scss">
:root {
  --primary-color: #4570f5;
  --second-color: #e6e9ef;
  --bg-primary: #ffffff;
  --bg-second: #f3f4f8;

  --primary-shadow: 0 5px 10px 0 #f1f1f2;
  --blue-shadow: 0 2px 5px 0 rgba(69, 112, 245, 0.6);

  --primary-text: #2a3774;
  --second-text: #7f86aa;
  --white-text: #ffffff;
  --green-text: #05d667;
  --dark-text: #4b5a94;
  --gray-text: #747474;
  --light-gray-text: #c3c6d5;
}

@font-face {
  font-family: shabnam;
  src: url('./assets/fonts/Shabnam-FD.woff');
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  text-align: center;
  color: #2c3e50;
  font-family: shabnam;
}
.app {
  font-family: shabnam;
}
</style>
