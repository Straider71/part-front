<template>
  <div class="container">
    <div v-if="noQuestion">
      <ListTitle :questionCount="questionCount" />
    </div>
    <div class="question-list" v-if="noQuestion">
      <div v-for="(questionnaire, idx) in questionnaires" :key="idx">
        <QuestionnaireItem
          :count="questionnaire.question_num.toString()"
          :title="questionnaire.title"
          :status="questionnaire.state"
          :id="questionnaires[idx].questionnaire_id"
        />
      </div>
    </div>
    <div v-else>
      <NoQuestionnaire />
    </div>
    <div v-if="totalPageNumber !== 1">
      <Paginate />
    </div>
  </div>
</template>

<script>
import QuestionnaireItem from './QuestionnaireItem.vue';
import ListTitle from './ListTitle';
import NoQuestionnaire from './NoQuestionnaire';
import Paginate from './Paginate';

import { FETCH_QUESTIONNAIRES } from '@/store/actions.type.js';
import { SET_PAGE_NUMBER } from '@/store/mutations.type.js';
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';

export default {
  name: 'QuestionnaireList',
  components: {
    QuestionnaireItem,
    ListTitle,
    NoQuestionnaire,
    Paginate,
  },

  created() {
    this.$store.dispatch(FETCH_QUESTIONNAIRES, {
      order: this.orderTypeState,
      page: this.pageNumberState,
    });
  },

  computed: {
    ...mapGetters(['orderTypeState', 'pageNumberState']),
    ...mapState({
      questionnaires: state => state.questionnaire.questionnaires,
      // orderType: state => state.questionnaire.orderType,
      // pageNumber: state => state.questionnaire.pageNumber,
      totalPageNumber: state => state.questionnaire.totalPageNumber,
      noQuestion: state => state.questionnaire.noQuestion,
      questionCount: state => state.questionnaire.questionCount,
    }),
  },
};
</script>

<style scoped lang="scss">
.question-list {
  max-height: 535px;
}
@media (max-width: 890px) {
  .container {
    width: 100%;
    // overflow: auto;

    & .question-list {
      max-height: 80vh;
    }
  }
}
</style>
