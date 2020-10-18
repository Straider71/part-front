<template>
  <div class="status">
    <div class="answerDiv">
      <p class="answer">
        وضعیت: <span :class="answerClass()">{{ statusString }}</span>
      </p>
    </div>
    <div class="countDiv">
      <p class="count">تعداد پرسش: {{ count }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionnaireStatus',
  data() {
    return {
      statusString: 'سیب',
    };
  },
  props: {
    count: String,
    status: String,
  },
  methods: {
    answerClass() {
      let answerClass = '';
      if (this.status === '0') {
        this.statusString = 'پاسخ داده نشده';
      }
      if (this.status === '1') {
        answerClass += 'answer-status-one';
        this.statusString = 'ادامه';
      }
      if (this.status === '2') {
        answerClass += 'answer-status-two';
        this.statusString = 'پاسخ داده شده';
      }
      return answerClass;
    },
  },
};
</script>

<style lang="scss" scoped>
.status {
  display: flex;
  justify-content: space-between;
  margin-right: 40px;

  .answerDiv {
    width: 60%;
  }

  .countDiv {
    width: 40%;
  }
  .answer {
    font-size: 0.875rem;
    line-height: 1.36;
    letter-spacing: -0.14px;
    margin-right: 50px;
    color: var(--second-text);
    text-align: right;

    .answer-status-one {
      color: lightblue;
    }

    .answer-status-two {
      color: var(--green-text);
    }
  }

  .count {
    font-size: 0.875rem;
    line-height: 1.36;
    letter-spacing: -0.14px;
    color: var(--second-text);
  }
}

@media (max-width: 640px) {
  .status {
    margin-top: 10px;
  }
}
</style>
