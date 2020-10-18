<template>
  <div class="container">
    <div class="labels">
      <slot />
      <label v-text="label"></label>
    </div>
    <input
      class="input"
      :type="type"
      :value="value"
      v-on:input="$emit('input', $event.target.value)"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  props: {
    placeholder: String,
    label: String,
    value: String,
    type: String,
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  background-color: var(--bg-primary);
  padding: 19px 19px 19px 15px;
  width: 375px;
  max-width: 375px;
  height: 68px;
  max-height: 68px;

  & .labels {
    display: flex;
    color: var(--second-text);
    justify-content: space-between;
    margin-bottom: 5px;
    font-size: 0.75rem;
  }

  & .input {
    height: 16px;
    text-align: right;
    font-size: 0.75rem;
    border: none;
    margin: 0;
    background-color: var(--bg-primary);
    color: var(--dark-text);
  }

  & .input::placeholder {
    color: var(--light-gray-text);
  }

  & .input:focus {
    outline: none;
  }
}
</style>
