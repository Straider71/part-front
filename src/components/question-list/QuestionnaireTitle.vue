<template>
  <div class="title">
    <p>{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: 'QuestionnaireTitle',
  props: {
    title: String,
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.38;
  letter-spacing: -0.16px;
  color: var(--primary-text);
  max-width: 150px;
  text-align: right;

  p {
    direction: rtl;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
