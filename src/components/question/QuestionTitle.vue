<template>
  <p class="question-title" v-text="text"></p>
</template>

<script>
export default {
  name: 'QuestionTitle',
  props: {
    text: String,
  },
};
</script>

<style scoped lang="scss">
.question-title {
  max-width: 800px;
  text-align: justify;
  direction: rtl;
  text-justify: inter-word;
  font-size: 1.375rem;
  color: var(--primary-text);
  margin-bottom: 15px;
  margin-top: 130px;

  @media screen and (max-width: 844px) {
    margin-bottom: 10px;
    padding: 17px;
    font-size: 1.125rem;
  }

  @media screen and (max-width: 450px) {
    margin-bottom: 5px;
    padding: 11px;
    font-size: 0.875rem;
  }
}
</style>
