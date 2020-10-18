<template>
  <div class="overview">
    <div class="top">
      <div class="right">
        <Chart
          width="500"
          height="400"
          id="chart1"
          title="# of Votes"
          type="doughnut"
          :labels="[' پاسخ داده شده', ' پاسخ داده نشده']"
          :data="[finishStat, unFinishStat]"
          :background-color="[
            'rgba(214, 224, 240, 0.75)',
            'rgba(141, 147, 171, 0.75)',
          ]"
        ></Chart>
      </div>
      <div class="left">
        <Chart
          width="500"
          height="400"
          id="chart3"
          title="# of Votes"
          type="polarArea"
          :labels="['چهار گزینه ای', 'دو گزینه ای', 'تشریحی']"
          :data="[fourQuestionType, twoQuestionType, desQuestionType]"
          :background-color="[
            'rgba(5, 102, 116, 0.75)',
            'rgba(102, 191, 191, 0.75)',
            'rgba(78, 137, 174, 0.75)',
          ]"
        ></Chart>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/global/Chart';
import { GET_STATS } from '@/store/actions.type.js';
import { SET_QUESTIONNAIRE_TITLE } from '@/store/mutations.type.js';
import { mapGetters } from 'vuex';

export default {
  name: 'Overview',
  components: {
    Chart,
  },
  computed: {
    ...mapGetters([
      'finishStat',
      'unFinishStat',
      'fourQuestionType',
      'twoQuestionType',
      'desQuestionType',
    ]),
  },

  created() {
    this.$store.commit(SET_QUESTIONNAIRE_TITLE, 'پنل ادمین');
    this.$store.dispatch(GET_STATS);
  },
};
</script>

<style lang="scss" scoped>
.overview {
  width: 80%;
  height: 75vh;
  // background-color: #fff;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .top {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & .left {
    // background-color: #fff;
    border-radius: 5px;
  }
  & .right {
    // background-color: #fff;

    border-radius: 5px;
  }
}

@media (max-width: 900px) {
  .top {
    flex-direction: column;
  }
}
</style>
