<template>
  <div class="navbar-title">
    <p>‌{{ questionnaireTitle }}</p>
  </div>
</template>

<script>
import { SET_QUESTIONNAIRE_TITLE } from '@/store/mutations.type.js';
import { mapState } from 'vuex';

export default {
  name: 'PageTitle',
  computed: {
    ...mapState({
      questionnaireTitle: state => state.questionnaire.questionnaireTitle,
    }),
  },

  watch: {
    $route(to) {
      if (to.fullPath == '/') {
        this.$store.commit(SET_QUESTIONNAIRE_TITLE, 'لیست پرسشنامه‌ها');
      }
      if (to.fullPath == '/profile') {
        this.$store.commit(SET_QUESTIONNAIRE_TITLE, 'پروفایل');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar-title {
  font-size: 20px;
  font-weight: 700;
  flex-shrink: 0;
  color: var(--primary-color);
}

@media (max-width: 576px) {
  .navbar-title {
    flex-shrink: 1;
    flex-basis: 50%;
    text-align: right;
  }
}
@media (max-width: 415px) {
  .navbar-title {
    flex-shrink: 1;
    flex-basis: 70%;
  }
}
</style>
