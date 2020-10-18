<template>
  <div class="navbar-username">
    <div class="arrow">
      <a href="#">
        <img
          src="../../assets/arrow.svg"
          alt="arrow"
          class="navbar-username-arrow"
        />
      </a>
      <ul class="menu">
        <li class="list">
          <router-link to="/admin" v-if="userRole == 'admin'">
            <p class="link">پنل</p>
          </router-link>
          <router-link to="/profile" v-else>
            <p class="link">پروفایل</p>
          </router-link>
        </li>
        <li class="list">
          <a href="#" class="link" @click="logout">خروج</a>
        </li>
      </ul>
    </div>
    <p class="navbar-username-text">{{ user.username }}, خوش آمدید</p>

    <img
      :src="userPhoto ? `http://127.0.0.1:3000/${userPhoto}` : defaultPhoto"
      alt="avatar"
      class="navbar-username-avatar"
    />
  </div>
</template>

<script>
import { LOGOUT } from '@/store/actions.type.js';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'UserInfo',

  data() {
    return {
      showDropDown: false,
      defaultPhoto: `http://127.0.0.1:3000/server/image/users/avatar.png`,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT);
    },
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
    ...mapGetters(['userPhoto', 'userRole']),
  },
};
</script>

<style lang="scss" scoped>
.navbar-username {
  display: flex;
  align-items: center;
  flex-shrink: 1;
  flex-basis: 50%;

  &-avatar {
    width: 26px;
    height: 26px;
    border-radius: 50%;
  }

  &-text {
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: -0.14px;
    color: var(--dark-text);
    padding: 5px;
  }

  &-arrow {
    width: 12.1px;
    height: 6.9px;
  }

  & .arrow {
    position: relative;

    &:focus-within .menu {
      display: block;
    }
  }

  & .menu {
    list-style: none;
    position: absolute;
    top: 30px;
    display: none;

    & .list {
      margin-top: 3px;
      background-color: var(--primary-color);
      padding: 3px 25px;
      border-radius: 5px;
      border: none;

      a {
        text-decoration: none;
        color: var(--bg-primary);
      }
    }
  }

  @media (max-width: 815px) {
    .navbar-username-text {
      display: none;
      flex-basis: 30%;
    }
  }
}
</style>
