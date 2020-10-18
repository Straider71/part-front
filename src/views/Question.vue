<template>
  <!-- <transition name="fade"> -->
  <div class="question">
    <template v-if="questionIndex < questionnaire.length">
      <multiple-choice-question
        v-if="question.type === '0'"
        :question="question.title"
        :options="[
          question.correct_option,
          question.incorrect_options[0],
          question.incorrect_options[1],
          question.incorrect_options[2],
        ]"
        @get-value="getSelectedValue($event)"
      />
      <two-option-question
        v-else-if="question.type === '1'"
        :question="question.title"
        :option_1="question.correct_option"
        :option_2="question.incorrect_options[0]"
        @get-value="getSelectedValue($event)"
      />
      <Descriptive
        v-if="question.type === '2'"
        :question="question.title"
        @get-value="getSelectedValue($event)"
      />

      <ProgressBar @clicked="nexyQuestion()" @backclicked="backQuestion()" />
    </template>
    <!-- <template v-else-if="questionnaire.length == 0">
      <NoQuestionnaire />
    </template> -->
    <template v-else>
      <FinishPage />
    </template>
  </div>
  <!-- </transition> -->
</template>

<script>
import Descriptive from '../components/question/Descriptive';
import ProgressBar from '../components/question/ProgressBar';
import TwoOptionQuestion from '../components/question/TwoOptionQuestion';
import MultipleChoiceQuestion from '../components/question/MultipleChoiceQuestion';
import FinishPage from '../components/question-list/FinishPage';
// import NoQuestionnaire from '@/components/question-list/NoQuestionnaire.vue';
import {
  FETCH_QUESTION,
  SEND_ANSWER,
  GET_ANSWER,
} from '@/store/actions.type.js';
import {
  GET_ANSWERs,
  SET_QUESTION_INDEX,
  // SET_COMPLETE_QUESTIONNARES,
} from '@/store/mutations.type.js';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Question',
  components: {
    Descriptive,
    ProgressBar,
    MultipleChoiceQuestion,
    TwoOptionQuestion,
    FinishPage,
    // NoQuestionnaire,
  },
  data() {
    return {
      selectedValue: '',
    };
  },
  methods: {
    nexyQuestion() {
      if (this.questionStatus == 2 && this.selectedValue) {
        this.$toasted.error('جواب را نمیتوانید تغییر بدهید');
        this.selectedValue = '';
      }
      if (this.selectedValue) {
        if (this.questionIndex === this.questionnaire.length - 1) {
          this.$store.dispatch(SEND_ANSWER, {
            text: this.selectedValue,
            questionId: this.questionnaire[this.questionIndex],
            status: '2',
          });
          // this.$store.commit(SET_COMPLETE_QUESTIONNARES);
          // this.$store.commit(GET_ANSWERs, null);
        } else {
          this.$store.dispatch(SEND_ANSWER, {
            text: this.selectedValue,
            questionId: this.questionnaire[this.questionIndex],
            status: '1',
          });
        }
      }

      // this.questionIndex += 1;

      let index = this.plusIndex;
      this.$store.commit(SET_QUESTION_INDEX, index);
      this.$store.dispatch(
        FETCH_QUESTION,
        this.questionnaire[this.questionIndex]
      );
    },
    backQuestion() {
      // this.questionIndex -= 1;
      let index = this.minusIndex;
      this.$store.commit(SET_QUESTION_INDEX, index);
      this.$store.dispatch(
        FETCH_QUESTION,
        this.questionnaire[this.questionIndex]
      );
    },
    getSelectedValue($event) {
      this.selectedValue = event.target.value;
    },
  },
  computed: {
    ...mapState({
      question: state => state.question.question,
      Questionnaire: state => state.question.questionnaire,
      questionStatus: state => state.question.questionStatus,
      // QuestionIndex: state => state.question.questionIndex,
    }),
    ...mapGetters([
      'plusIndex',
      'minusIndex',
      'questionIndex',
      'questionnaire',
    ]),
  },

  created() {
    this.$store.dispatch(
      FETCH_QUESTION,
      this.questionnaire[this.questionIndex]
    );
  },
};
</script>

<style scoped>
.question {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80vh;
}

/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
} */
</style>
