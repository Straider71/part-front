<template>
  <nav class="navbar">
    <UserInfo />
    <PageTitle />
    <Logo />
  </nav>
</template>

<script>
import Logo from './Logo';
import PageTitle from './PageTitle';
import UserInfo from './UserInfo';

export default {
  name: 'Navbar',
  components: {
    Logo,
    PageTitle,
    UserInfo,
  },
};
</script>

<style scoped lang="scss">
.navbar {
  display: flex;
  height: auto;
  padding: 23px 45px;
  align-items: center;

  .navbar-logo {
    flex-shrink: 1;
    flex-basis: 50%;
    width: 80.2px;
    display: flex;
    justify-content: flex-end;
  }
}

@media (max-width: 576px) {
  .navbar .navbar-logo {
    display: none;
  }
}
</style>
