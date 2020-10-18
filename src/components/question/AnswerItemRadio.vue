<template>
  <label class="radio">
    <input
      type="radio"
      name="r"
      :value="text"
      @change="onChanged($event)"
      :checked="text == answer"
    />
    <span>{{ text }}</span>
  </label>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'CustomRadio',
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
$radioSize: 19px;
$radioBorder: #d1d7e3;
$radioActive: #5d9bfb;
.radio {
  margin: 0;
  width: 413px;
  min-height: 55px;
  direction: rtl;
  text-align: justify;
  text-justify: inter-word;
  border-radius: 10px;
  background-color: #e6e9ef;
  cursor: pointer;
  @media screen and (max-width: 844px) {
    width: 350px;
    min-height: 30px;
  }
  @media screen and (max-width: 450px) {
    width: 80%;
  }
  input {
    display: none;
    & + span {
      font-size: 16px;
      padding-top: 14px;
      padding-bottom: 14px;
      color: #4b5a9f;
      background-color: #e6e9ef;
      border-radius: 10px;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      direction: rtl;
      padding-right: 56px;
      position: relative;
      @media screen and (max-width: 450px) {
        font-size: 13px;
        padding-right: 35px;
      }
      &:not(:empty) {
        padding-left: $radioSize + 8;
      }
      &:before,
      &:after {
        content: '';
        width: $radioSize;
        height: $radioSize;
        display: block;
        border-radius: 50%;
        border: solid 2px #4b5a9f;
        right: 22px;
        @media screen and (max-width: 450px) {
          right: 10px;
          width: 15px;
          height: 15px;
        }
        top: 0;
        bottom: 0;
        margin-top: auto;
        margin-bottom: auto;
        text-align: center;
        position: absolute;
      }
      &:before {
        transition: background 0.2s ease,
          transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 2);
      }
    }
    &:checked + span {
      background-color: #95d7a4;
      color: #286d3e;
      &:before {
        border-color: #286d3e;
      }
      &:after {
        border-color: #286d3e;
        background-color: #286d3e;
        transform: scale(0.6);
        transition: transform 0.3s ease;
      }
    }
  }
  &:hover {
    & span:hover {
      background-color: rgba(202, 198, 198, 0.69);
    }
  }
}
</style>
