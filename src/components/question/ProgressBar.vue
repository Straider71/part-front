<template>
  <div class="progress-bar">
    <div @click="makeProgress($event)">
      <CustomButton class="deep-left">
        <img src="../../assets/arrow-white.svg" alt="arrow" />
        <p v-text="textChange"></p>
      </CustomButton>
    </div>

    <div class="gray">
      <div class="blue-circle" data-text="progress">
        <div class="before"></div>
        <div class="after">
          <div class="number">
            سوال {{ questionnaire.length }} / {{ number }}
          </div>
          <div class="percent">{{ progress + '%' }} تکمیل شده</div>
        </div>
      </div>
      <div class="blue" :style="{ width: progress + '%' }"></div>
    </div>

    <div @click="minusProgress($event)">
      <CustomButton class="deep-right">
        <img src="../../assets/arrow-back.svg" alt="arrow" />
      </CustomButton>
    </div>
  </div>
</template>

<script>
import CustomButton from '../global/CustomButton';
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'ProgressBar',
  components: {
    CustomButton,
  },
  data() {
    return {
      progress: 0,
      number: 1,
    };
  },
  computed: {
    ...mapGetters(['questionnaire']),
    textChange() {
      if (this.number === this.questionnaire.length) {
        return 'پایان';
      } else return 'سوال بعدی';
    },
  },

  methods: {
    makeProgress(event) {
      if (this.number < this.questionnaire.length + 1) {
        this.number += 1;
        this.progress = Math.floor(
          (this.number / this.questionnaire.length) * 100
        );
        this.$emit('clicked', event);
      }
    },
    minusProgress() {
      if (this.progress > 0 && this.number > 1) {
        this.number -= 1;
        this.progress = Math.floor(
          (this.number / this.questionnaire.length) * 100
        );
        if (this.number === 1) this.progress = 0;
        this.$emit('backclicked', event);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.progress-bar {
  width: 80%;
  height: 70px;
  box-shadow: var(--primary-shadow);
  background-color: var(--bg-primary);
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  & .deep-left::v-deep .button {
    width: 151px;
    height: 50px;
    border-radius: 10px;
    background-color: var(--primary-color);
    box-shadow: 0 2px 5px 0 rgba(69, 112, 245, 0.6);

    & p {
      font-size: 1rem;
      line-height: 1.38;
      letter-spacing: -0.16px;
      color: var(--white-text);
      padding: 0 0 6px 10px;
      margin-bottom: -3px;
    }
  }

  & .deep-right::v-deep .button {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    background-color: var(--second-color);
    box-shadow: none;
  }

  & .gray {
    width: 60%;
    height: 5px;
    border-radius: 10px;
    background-color: #e6e9ef;
    display: flex;
    justify-content: flex-end;

    & .blue {
      // width: 290px;
      height: 5px;
      border-radius: 10px;
      background-color: var(--primary-color);
    }

    & .blue-circle {
      width: 12px;
      height: 12px;
      background-color: var(--primary-color);
      border-radius: 50%;
      top: -3px;
      position: relative;

      & {
        & .after {
          bottom: 1.35em;
          color: var(--white-text);
          display: flex;
          direction: rtl;
          justify-content: space-between;
          align-items: center;
          position: absolute;
          white-space: nowrap;
          z-index: 98;
          left: -105px;
          width: 214px;
          height: 38px;
          border-radius: 3px;
          background-color: #2e3133;
          font-size: 14px;
          line-height: 2;
          letter-spacing: -0.14px;
          padding-top: 2px;
          padding: 0 25px;

          & .number {
            color: #fcb833;
          }
        }

        & .before {
          border: solid;
          border-color: #111 transparent;
          border-color: rgba(0, 0, 0, 0.8) transparent;
          border-width: 0.4em 0.4em 0 0.4em;
          bottom: 1em;
          content: '';
          display: block;
          // left: 105px;
          position: absolute;
          z-index: 99;
        }
      }
    }
  }
}

@media (max-width: 750px) {
  .progress-bar {
    & .deep-left::v-deep .button {
      width: 50px;
      height: 50px;

      & p {
        display: none;
      }
    }
  }
}
</style>
