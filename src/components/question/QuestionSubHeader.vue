<template>
  <p class="question-sub-header" v-text="text"></p>
</template>

<script>
export default {
  name: 'QuestionSubHeader',
  props: {
    text: String,
  },
};
</script>

<style scoped lang="scss">
.question-sub-header {
  color: var(--second-text);
  font-size: 1rem;
  margin-bottom: 48.5px;

  @media screen and (max-width: 844px) {
    font-size: 0.875rem;
    margin-bottom: 33px;
  }

  @media screen and (max-width: 450px) {
    margin-bottom: 20px;
    font-size: 0.6875rem;
  }
}
</style>
