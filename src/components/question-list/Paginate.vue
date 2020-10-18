<template>
  <div class="paginate">
    <span class="next">
      <img src="@/assets/nextarrow.svg" alt="arrow" @click="nextPage" />
    </span>
    <ul class="pages">
      <li
        v-for="(page, idx) in totalPageNumber"
        :key="idx"
        class="page"
        :class="{ active: page === pageNumber }"
        @click="loadPage(page)"
      >
        {{ page }}
      </li>
    </ul>
    <span class="back">
      <img src="@/assets/backarrow.svg" alt="arrow" @click="prevPage" />
    </span>
  </div>
</template>

<script>
import { FETCH_QUESTIONNAIRES } from '@/store/actions.type.js';
import { SET_PAGE_NUMBER } from '@/store/mutations.type.js';

import { mapState } from 'vuex';

export default {
  name: 'Paginate',

  methods: {
    nextPage() {
      if (this.pageNumber <= this.totalPageNumber - 1) {
        let page = this.pageNumber + 1;
        this.$store.commit(SET_PAGE_NUMBER, page);

        this.$store.dispatch(FETCH_QUESTIONNAIRES, {
          order: this.orderType,
          page,
        });
      }
    },

    loadPage(page) {
      this.$store.commit(SET_PAGE_NUMBER, page);

      this.$store.dispatch(FETCH_QUESTIONNAIRES, {
        order: this.orderType,
        page,
      });
    },

    prevPage() {
      if (this.pageNumber > 1) {
        let page = this.pageNumber - 1;
        this.$store.commit(SET_PAGE_NUMBER, page);

        this.$store.dispatch(FETCH_QUESTIONNAIRES, {
          order: this.orderType,
          page,
        });
      }
    },
  },
  computed: {
    ...mapState({
      orderType: state => state.questionnaire.orderType,
      pageNumber: state => state.questionnaire.pageNumber,
      totalPageNumber: state => state.questionnaire.totalPageNumber,
    }),
  },
};
</script>

<style lang="scss" scoped>
.paginate {
  width: auto;
  height: 49px;
  border-radius: 10px;
  box-shadow: var(--primary-shadow);
  background-color: var(--bg-primary);
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;

  & .next {
    margin-left: 10px;
    margin-top: 6px;
    cursor: pointer;
  }

  & .back {
    margin-right: 10px;
    margin-top: 6px;
    cursor: pointer;
  }

  & .pages {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row-reverse;
    width: auto;
    margin-left: 10px;
    margin-right: 10px;

    & .page {
      height: 30px;
      width: 30px;
      font-size: 1rem;
      line-height: 1.38;
      color: #aeaeae;
      cursor: pointer;
      margin-right: 5px;
      border-radius: 50%;
      list-style: none;
      padding: 5px;

      &:focus,
      &:hover,
      &:active,
      &.active {
        background-color: var(--primary-color);
        color: var(--white-text);
      }
    }
  }
}
</style>
