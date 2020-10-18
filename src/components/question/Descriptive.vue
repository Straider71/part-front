<template>
  <div class="answer-container">
    <p class="title">
      <QuestionTitle :text="question" />
    </p>
    <AnswerItemArea @change-option="onChange($event)" />
  </div>
</template>

<script>
import AnswerItemArea from './AnswerItemArea';
import QuestionTitle from './QuestionTitle';

import {
  FETCH_QUESTION,
  GET_ANSWER,
  SEND_ANSWER,
} from '@/store/actions.type.js';
import { GET_ANSWERs } from '@/store/mutations.type.js';

import { mapState } from 'vuex';

export default {
  name: 'Descriptive',
  components: {
    AnswerItemArea,
    QuestionTitle,
  },
  props: {
    question: String,
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

    this.$store.commit(GET_ANSWERs, res.data.data.answer.text);
  },
};
</script>

<style lang="scss" scoped>
.answer-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
