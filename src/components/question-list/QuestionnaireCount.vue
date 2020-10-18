<template>
  <div class="list-count">
    <p>{{ count }} پرسشنامه</p>
  </div>
</template>

<script>
export default {
  name: 'QuestionnaireCount',
  props: {
    count: String,
  },
};
</script>

<style lang="scss" scoped>
.list-count {
  font-size: 14px;
  line-height: 1.36;
  letter-spacing: -0.14px;
  color: var(--second-text);
  text-align: right;
  direction: rtl;
}
</style>
