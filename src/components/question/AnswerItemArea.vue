<template>
  <div class="area-container">
    <p class="title">پاسخ تشریحی کامل بدهید</p>
    <textarea
      name="cutom-area"
      id="area"
      :value="answer"
      @change="onChanged($event)"
    ></textarea>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AnswerItemArea',
  props: {
    text: String,
  },
  methods: {
    onChanged(event) {
      this.$emit('change-option', event.target.value);
    },
  },
  computed: { ...mapState({ answer: state => state.answer.answer }) },
};
</script>

<style lang="scss" scoped>
.area-container {
  display: flex;
  flex-direction: column;
  justify-content: center;

  & .title {
    font-size: 1rem;
    line-height: 1.38;
    letter-spacing: -0.16px;
    text-align: center;
    color: var(--second-text);
    margin-bottom: 60px;
  }

  textarea {
    resize: none;
    width: 626px;
    height: 204px;
    border-radius: 10px;
    background-color: var(--second-color);
    border: none;
    text-align: right;
    font-size: 0.875rem;
    line-height: 2;
    letter-spacing: -0.14px;
    text-align: right;
    color: var(--gray-text);
    padding: 15px;
    font-family: shabnam;
  }

  @media (max-width: 690px) {
    textarea {
      width: 500px;
    }
  }
  @media (max-width: 550px) {
    textarea {
      width: 350px;
    }
  }
}
</style>
