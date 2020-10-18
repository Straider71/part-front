<template>
  <div class="container">
    <CustomButton
      v-if="this.status != 2"
      @click.native="goRoute($event)"
      :id="id"
    >
      <img src="../../assets/arrow-white.svg" alt="arrow" class="arrow" />
      <p>شروع</p>
    </CustomButton>

    <CustomButton v-else @click.native="goRoute($event)" :id="id">
      <img src="../../assets/arrow-white.svg" alt="arrow" class="arrow" />
      <p>مشاهده</p>
    </CustomButton>

    <div class="status">
      <QuestionnaireStatus :count="count" :status="status" />
    </div>

    <div class="title">
      <QuestionnaireTitle :title="title" />
    </div>
  </div>
</template>

<script>
import CustomButton from '../global/CustomButton';
import QuestionnaireTitle from './QuestionnaireTitle';
import QuestionnaireStatus from './QuestionnaireStatus';
import EventService from '@/services/EventService.js';
import { FETCH_QUESTIONS } from '@/store/actions.type.js';
import {
  SET_QUESTIONNAIRE_TITLE,
  SET_NO_QUESTION,
  GET_ANSWERs,
  SET_QUESTION_INDEX,
  SET_QUESTION,
} from '@/store/mutations.type.js';
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'QuestionnaireItem',
  data() {
    return {
      questionsArray: null,
    };
  },
  components: {
    CustomButton,
    QuestionnaireTitle,
    QuestionnaireStatus,
  },
  props: {
    status: String,
    title: String,
    count: String,
    id: Number,
  },
  computed: {
    ...mapGetters(['questionaireLength']),
  },
  methods: {
    customButtonDisabled() {
      return this.status === '2';
    },

    async goRoute(event) {
      if (this.count == 0) this.$toasted.error('پرسشنامه خالی است');
      else if (this.count != 0) {
        this.$store.commit(SET_QUESTIONNAIRE_TITLE, this.title);
        const userData = {
          id: this.id,
          status: this.status,
        };
        await this.$store.dispatch(FETCH_QUESTIONS, userData);
        this.$store.commit(SET_QUESTION_INDEX, 0);
        this.$store.commit(SET_QUESTION, []);
        this.$store.commit(GET_ANSWERs, null);

        this.$router.push({
          name: 'Question',
          params: { id: this.id },
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  width: 845px;
  height: 85px;
  border-radius: 10px;
  box-shadow: var(--primary-shadow);
  background-color: var(--bg-primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 0 10px;
  margin-right: 5px;

  & a {
    text-decoration: none;
  }

  & .status {
    width: 350px;
  }

  & .title {
    width: 150px;
  }

  & .arrow {
    width: 25px;
    height: 13.3px;
    padding-right: 10px;
  }

  & p {
    padding-bottom: 5px;
  }
}
@media (max-width: 640px) {
  .container {
    flex-direction: column-reverse;
    height: auto;
    padding: 15px 0px;
  }
}
</style>
