<template>
  <div id="tabs" class="container">
    <div class="tabs">
      <a
        v-on:click="activetab = 1"
        v-bind:class="[activetab === 1 ? 'active' : '']"
        >‌تشریحی‌</a
      >
      <a
        v-on:click="activetab = 2"
        v-bind:class="[activetab === 2 ? 'active' : '']"
        >‌دو‌گزینه‌ای</a
      >
      <a
        v-on:click="activetab = 3"
        v-bind:class="[activetab === 3 ? 'active' : '']"
        >‌چهار‌گزینه‌ای</a
      >
    </div>

    <div class="content">
      <form
        v-if="activetab === 1"
        class="tabcontent"
        @submit.prevent="onSubmit0"
      >
        <custom-input
          class="round-top-border custominput"
          placeholder="صورت سوال را وارد فرمایید"
          label="صورت سوال"
          v-model.lazy.trim="title"
        >
          <img src="@/assets/input-img/mail.svg" />
        </custom-input>
        <CustomButton class="custom-button">
          <p>ثبت سوال</p>
        </CustomButton>
      </form>
      <form
        v-if="activetab === 2"
        class="tabcontent"
        @submit.prevent="onSubmit1"
      >
        <custom-input
          class="round-top-border custominput"
          placeholder="صورت سوال را وارد فرمایید"
          label="صورت سوال"
          v-model.lazy.trim="title"
        >
          <img src="@/assets/input-img/mail.svg" />
        </custom-input>
        <div class="options">
          <custom-input
            class="round-top-border custominput2"
            placeholder="گزینه دوم را وارد فرمایید"
            label="گزینه دوم"
            v-model.lazy.trim="option_2"
          >
            <img src="@/assets/input-img/mail.svg" />
          </custom-input>
          <custom-input
            class="round-top-border custominput2"
            placeholder="گزینه اول را وارد فرمایید"
            label="گزینه اول"
            v-model.lazy.trim="option_1"
          >
            <img src="@/assets/input-img/mail.svg" />
          </custom-input>
        </div>

        <CustomButton class="custom-button">
          <p>ثبت سوال</p>
        </CustomButton>
      </form>
      <form
        v-if="activetab === 3"
        class="tabcontent"
        @submit.prevent="onSubmit2"
      >
        <custom-input
          class="round-top-border custominput"
          placeholder="صورت سوال را وارد فرمایید"
          label="صورت سوال"
          v-model.lazy.trim="title"
        >
          <img src="@/assets/input-img/mail.svg" />
        </custom-input>
        <div class="options">
          <custom-input
            class="round-top-border custominput2"
            placeholder="گزینه دوم را وارد فرمایید"
            label="گزینه دوم"
            v-model.lazy.trim="option_2"
          >
            <img src="@/assets/input-img/mail.svg" />
          </custom-input>
          <custom-input
            class="round-top-border custominput2"
            placeholder="گزینه اول را وارد فرمایید"
            label="گزینه اول"
            v-model.lazy.trim="option_1"
          >
            <img src="@/assets/input-img/mail.svg" />
          </custom-input>

          <custom-input
            class="round-top-border custominput2"
            placeholder="گزینه چهارم را وارد فرمایید"
            label="گزینه چهارم"
            v-model.lazy.trim="option_4"
          >
            <img src="@/assets/input-img/mail.svg" />
          </custom-input>
          <custom-input
            class="round-top-border custominput2"
            placeholder="گزینه سوم را وارد فرمایید"
            label="گزینه سوم"
            v-model.lazy.trim="option_3"
          >
            <img src="@/assets/input-img/mail.svg" />
          </custom-input>
        </div>

        <CustomButton class="custom-button">
          <p>ثبت سوال</p>
        </CustomButton>
      </form>
    </div>
  </div>
</template>

<script>
import CustomInput from '@/components/global/CustomInput.vue';
import CustomButton from '@/components/global/CustomButton.vue';
import {
  CREATE_QUESTION_0,
  CREATE_QUESTION_1,
  CREATE_QUESTION_2,
} from '@/store/actions.type.js';
import { mapState } from 'vuex';

export default {
  name: 'createQuestion',
  components: {
    CustomInput,
    CustomButton,
  },
  data() {
    return {
      activetab: 1,
      title: '',
      option_1: '',
      option_2: '',
      option_3: '',
      option_4: '',
    };
  },
  methods: {
    onSubmit0() {
      if (!this.title) {
        this.$toasted.error('صورت سوال را وارد فرمایید');
      } else {
        const data = {
          title: this.title,
          id: this.adminQuestionnaireId,
        };
        this.$store.dispatch(CREATE_QUESTION_0, data);
        this.title = '';
      }
    },
    onSubmit1() {
      if (!this.title || !this.option_1 || !this.option_2) {
        this.$toasted.error('تمام گزینه ها باید وارد شود');
      } else {
        const data = {
          title: this.title,
          correctOption: this.option_1,
          incorrectOptions: this.option_2,
          id: this.adminQuestionnaireId,
        };
        this.$store.dispatch(CREATE_QUESTION_1, data);
        this.title = '';
        this.option_1 = '';
        this.option_2 = '';
      }
    },
    onSubmit2() {
      if (
        !this.title ||
        !this.option_1 ||
        !this.option_2 ||
        !this.option_3 ||
        !this.option_4
      ) {
        this.$toasted.error('تمام گزینه ها باید وارد شود');
      } else {
        const data = {
          title: this.title,
          correctOption: this.option_1,
          incorrectOptions: [this.option_2, this.option_3, this.option_4],
          id: this.adminQuestionnaireId,
        };
        this.$store.dispatch(CREATE_QUESTION_2, data);
        this.title = '';
        this.option_1 = '';
        this.option_2 = '';
        this.option_3 = '';
        this.option_4 = '';
      }
    },
  },
  computed: {
    ...mapState({
      adminQuestionnaireId: state => state.questionnaire.adminQuestionnaireId,
    }),
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 80%;
  height: 75vh;
  margin: 40px auto;
  color: #888;
}

.tabs {
  overflow: hidden;
  margin-bottom: -2px;
  padding: 30px;
  height: 30px;
}

.tabs ul {
  list-style-type: none;
  margin-right: 20px;
}

.tabs a {
  cursor: pointer;
  padding: 12px 24px;
  border: 1px solid #ccc;
  font-family: shabnam;
  background-color: #f1f1f1;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
  width: auto;
  text-decoration: none;
}
.tabs a:last-child {
  border-right: 1px solid #ccc;
}

.tabs a:hover {
  background-color: #aaa;
  color: #fff;
}

.tabs a.active {
  background-color: #fff;
  color: #484848;
  border-bottom: 2px solid #fff;
  cursor: default;
}

.tabcontent {
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 3px 3px 6px #e1e1e1;
  height: 500px;
  display: flex;
  flex-direction: column;

  & .custominput {
    max-width: 800px;
    border-radius: 10px;
    margin-top: 50px;
  }
  & .options {
    display: flex;
    width: 650px;
    margin-left: auto;
    margin-right: auto;
    flex-wrap: wrap;

    & .custominput2 {
      max-width: 300px;
      border-radius: 10px;
      margin-top: -20px;
    }
  }

  & .custom-button::v-deep .button {
    height: 45px;
    width: 123px;
    font-size: 14px;
    border-radius: 5px;
    background-color: #65c1eb;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
