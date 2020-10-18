<template>
  <div class="list-title">
    <QuestionnaireSort />
    <QuestionnaireCount :count="questionCount.toString()" />
  </div>
</template>

<script>
import QuestionnaireCount from './QuestionnaireCount';
import QuestionnaireSort from './QuestionnaireSort';

export default {
  name: 'ListTitle',
  components: {
    QuestionnaireCount,
    QuestionnaireSort,
  },
  props: {
    questionCount: Number,
  },
};
</script>

<style lang="scss" scoped>
.list-title {
  width: 845px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 890px) {
  .list-title {
    width: 100%;

    padding: 0px 10px;
  }
}
</style>
