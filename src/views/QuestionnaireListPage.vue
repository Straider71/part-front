<template>
  <div class="list">
    <QuestionnaireList />
  </div>
</template>

<script>
import QuestionnaireList from '../components/question-list/QuestionnaireList.vue';
import { SET_QUESTIONNAIRE_TITLE } from '@/store/mutations.type.js';
export default {
  name: 'Home',
  components: {
    QuestionnaireList,
  },
  created() {
    this.$store.commit(SET_QUESTIONNAIRE_TITLE, 'لیست پرسشنامه‌ها');
  },
};
</script>

<style scoped lang="scss">
.list {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 150px;
  z-index: 100;
}

@media (max-width: 640px) {
  .list {
    top: 100px;
  }
}
</style>
