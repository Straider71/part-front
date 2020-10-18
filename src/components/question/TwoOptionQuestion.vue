<template>
  <div class="two-choice-question-container">
    <QuestionTitle :text="question" />
    <QuestionSubHeader text="صحیح یا غلط بودن را مشخص کنید" />
    <form class="options" action="#">
      <AnswerItemRadio :text="option_1" @change-option="onChange($event)" />
      <AnswerItemRadio :text="option_2" @change-option="onChange($event)" />
    </form>
  </div>
</template>

<script>
import AnswerItemRadio from './AnswerItemRadio';
import QuestionTitle from './QuestionTitle';
import QuestionSubHeader from './QuestionSubHeader';
import {
  FETCH_QUESTION,
  GET_ANSWER,
  SEND_ANSWER,
} from '@/store/actions.type.js';
import { GET_ANSWERs } from '@/store/mutations.type.js';
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  name: 'TwoOptionQuestion',
  components: { QuestionTitle, AnswerItemRadio, QuestionSubHeader },
  props: {
    question: String,
    option_1: String,
    option_2: String,
  },
  methods: {
    onChange(event) {
      this.$emit('get-value', event);
    },
  },
  computed: {
    ...mapState({
      questionnaire: state => state.question.questionnaire,
      questionIndex: state => state.question.questionIndex,
    }),
  },

  async created() {
    this.$store.commit(GET_ANSWERs, null);
    const res = await this.$store.dispatch(
      GET_ANSWER,
      this.questionnaire[this.questionIndex]
    );
    console.log(res);
    this.$store.commit(GET_ANSWERs, res.data.data.answer.text);
  },
};
</script>

<style scoped lang="scss">
.two-choice-question-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & .options {
    height: 67.5px;
    max-height: 67.5px;
    width: 856px;
    max-width: 950px;
    display: flex;
    flex-flow: row-reverse wrap;

    @media screen and (max-width: 844px) {
      height: 100%;
      width: auto;
      align-items: center;
      justify-content: center;
    }

    @media screen and (max-width: 450px) {
      height: auto;
      width: 100%;
      max-width: 100%;
      align-items: center;
      flex-flow: column nowrap;
    }

    & > * {
      max-width: 413px;
      margin: 7.5px;
      @media screen and (max-width: 450px) {
        margin: 18px;
      }
    }
  }
}
</style>
