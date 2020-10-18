<template>
  <div class="sort-list">
    <div class="select-box">
      <div class="select-box__current" tabindex="1">
        <div class="select-box__value">
          <input
            class="select-box__input"
            type="radio"
            id="0"
            value="not_answered"
            name="Ben"
            checked="checked"
            @click="getOrder"
          />
          <p class="select-box__input-text">پاسخ داده نشده</p>
        </div>
        <div class="select-box__value">
          <input
            class="select-box__input"
            type="radio"
            id="1"
            value="answered"
            name="Ben"
            checked="checked"
            @click="getOrder"
          />
          <p class="select-box__input-text">پاسخ داده شده</p>
        </div>
        <div class="select-box__value">
          <input
            class="select-box__input"
            type="radio"
            id="2"
            value="min_question"
            name="Ben"
            checked="checked"
            @click="getOrder"
          />
          <p class="select-box__input-text">کمترین تعداد سوال</p>
        </div>
        <div class="select-box__value">
          <input
            class="select-box__input"
            type="radio"
            id="3"
            value="max_question"
            name="Ben"
            checked="checked"
            @click="getOrder"
          />
          <p class="select-box__input-text">بیشترین تعداد سوال</p>
        </div>
        <div class="select-box__value">
          <input
            class="select-box__input"
            type="radio"
            id="4"
            value="old_created"
            name="Ben"
            checked="checked"
            @click="getOrder"
          />
          <p class="select-box__input-text">قدیمی ترین</p>
        </div>
        <div class="select-box__value">
          <input
            class="select-box__input"
            type="radio"
            id="5"
            value="new_created"
            name="Ben"
            checked="checked"
            @click="getOrder"
          />
          <p class="select-box__input-text">جدید ترین</p>
        </div>

        <img
          class="select-box__icon"
          src="../../assets/arrow.svg"
          alt="Arrow Icon"
          aria-hidden="true"
        />
      </div>

      <ul class="select-box__list">
        <li>
          <label class="select-box__option" for="0" aria-hidden="aria-hidden"
            >پاسخ داده نشده</label
          >
        </li>
        <li>
          <label class="select-box__option" for="1" aria-hidden="aria-hidden"
            >پاسخ داده شده</label
          >
        </li>
        <li>
          <label class="select-box__option" for="2" aria-hidden="aria-hidden"
            >کمترین تعداد سوال</label
          >
        </li>
        <li>
          <label class="select-box__option" for="3" aria-hidden="aria-hidden"
            >بیشترین تعداد سوال</label
          >
        </li>
        <li>
          <label class="select-box__option" for="4" aria-hidden="aria-hidden"
            >قدیمی ترین</label
          >
        </li>
        <li>
          <label class="select-box__option" for="5" aria-hidden="aria-hidden"
            >جدید ترین</label
          >
        </li>
      </ul>
    </div>

    <p class="text">مرتب‌سازی براساس</p>
  </div>
</template>

<script>
import { FETCH_QUESTIONNAIRES } from '@/store/actions.type.js';
import { SET_ORDER } from '@/store/mutations.type.js';

import { mapState } from 'vuex';

export default {
  name: 'QuestionnaireSort',

  data() {
    return {
      orderSelected: null,
    };
  },

  methods: {
    getOrder(event) {
      this.orderSelected = event.target.value;
      this.$store.commit(SET_ORDER, this.orderSelected);
      this.$store.dispatch(FETCH_QUESTIONNAIRES, {
        order: this.orderSelected,
        page: this.pageNumber,
      });
    },
  },

  computed: {
    ...mapState({
      questionnaires: state => state.questionnaire.questionnaires,
      orderType: state => state.questionnaire.orderType,
      pageNumber: state => state.questionnaire.pageNumber,
    }),
  },
};
</script>

<style lang="scss" scoped>
.sort-list {
  display: flex;
  justify-content: space-between;
  align-items: center;

  & .text {
    margin-left: 5px;
    font-size: 14px;
    line-height: 1.36;
    letter-spacing: -0.14px;
    color: #7f86aa;
  }

  & .select-box {
    position: relative;
    display: block;
    width: auto;
    margin: 0 auto;
    font-size: 14px;
    color: #aeaeae;
    border-radius: 10px;

    &__current {
      position: relative;
      box-shadow: 0 15px 30px -10px transparentize(#000, 0.9);
      cursor: pointer;
      outline: none;
      width: auto;

      &:focus {
        & + .select-box__list {
          opacity: 1;
          background-color: var(--bg-primary);
          animation-name: none;
          z-index: 5;

          .select-box__option {
            cursor: pointer;
          }
        }

        .select-box__icon {
          width: 10px;
          height: 6px;
          transform: translateY(-50%) rotate(180deg);
        }
      }
    }

    &__icon {
      position: absolute;
      top: 50%;
      left: 30px;
      transform: translateY(-50%);
      opacity: 0.3;
      transition: 0.2s ease;
      width: 10px;
      height: 6px;
    }

    &__value {
      display: flex;
    }

    &__input {
      display: none;

      &:checked + .select-box__input-text {
        display: block;
        border-radius: 10px;
        padding-left: 50px;
      }
    }

    &__input-text {
      display: none;
      width: auto;
      margin: 0;
      padding: 10px 8px;
      background-color: var(--bg-primary);
    }

    &__list {
      position: absolute;
      width: 100%;
      padding: 0;
      list-style: none;
      opacity: 0;

      animation-name: HideList;
      animation-duration: 0.5s;
      animation-delay: 0.5s;
      animation-fill-mode: forwards;
      animation-timing-function: step-start;
      box-shadow: 0 15px 30px -10px transparentize(#000, 0.9);
    }

    &__option {
      display: block;
      padding: 15px;
      background-color: var(--bg-primary);

      &:hover,
      &:focus {
        color: #546c84;
        background-color: #fbfbfb;
      }
    }
  }

  @keyframes HideList {
    from {
      transform: scaleY(1);
    }
    to {
      transform: scaleY(0);
    }
  }
}
</style>
