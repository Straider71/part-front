<template>
  <div class="container">
    <form class="title" @submit.prevent="onSubmit">
      <CustomButton class="custom-button">
        <p>ثبت</p>
      </CustomButton>
      <custom-input
        class="round-top-border custominput"
        placeholder="نام پرسشنامه را وارد کنید"
        label="نام پرسشنامه"
        v-model.lazy.trim="title"
      >
        <img src="@/assets/input-img/mail.svg" />
      </custom-input>
    </form>

    <div class="questionnares">
      <div v-for="(questionnaire, idx) in adminQuestionnaires" :key="idx">
        <div class="item">
          <Modal
            v-if="showModal"
            @close="showModal = false"
            v-cloak
            :index="idx"
          >
            <div class="modal">
              <p>آیا با پاک کردن این پرسشنامه موافقید ؟</p>

              <div class="button">
                <CustomButton
                  class="custom-button-yes"
                  @click.native="
                    deleteQuestionnaire(
                      adminQuestionnaires[idx].questionnaire_id
                    )
                  "
                >
                  <p>بلی</p>
                </CustomButton>
                <CustomButton
                  class="custom-button-no"
                  @click.native="showModal = false"
                >
                  <p>خیر</p>
                </CustomButton>
              </div>
            </div>
          </Modal>
          <div class="buttons">
            <CustomButton
              class="custom-button-delete"
              @click.native="showModal = true"
            >
              <p>حذف پرسشنامه</p>
            </CustomButton>
            <CustomButton
              class="custom-button"
              @click.native="
                goQuestion(adminQuestionnaires[idx].questionnaire_id)
              "
            >
              <p>اضافه کردن سوال</p>
            </CustomButton>
          </div>
          <div class="number">
            تعداد سوال : {{ questionnaire.question_num }}
          </div>
          <div class="title">
            {{ questionnaire.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomInput from '@/components/global/CustomInput.vue';
import CustomButton from '@/components/global/CustomButton.vue';
import Modal from '@/components/global/Modal.vue';
import {
  GET_ALL_ADMIN_QUESTIONNAIRE,
  CREATE_QUESTIONNARE,
  DELETE_QUESTIONNAIRE,
} from '@/store/actions.type.js';
import { SET_CREATE_ID } from '@/store/mutations.type.js';
import { mapState } from 'vuex';
export default {
  name: 'createQuestionnare',
  components: {
    CustomInput,
    CustomButton,
    Modal,
  },
  data() {
    return {
      title: '',
      showModal: false,
    };
  },
  computed: {
    ...mapState({
      adminQuestionnaires: state => state.questionnaire.adminQuestionnaires,
    }),
  },
  created() {
    console.log(this.adminQuestionnaires);
    this.$store.dispatch(GET_ALL_ADMIN_QUESTIONNAIRE);
  },

  methods: {
    onSubmit() {
      if (!this.title) {
        this.$toasted.error('نام پرسشنامه را وراد فرمایید');
      } else {
        this.$store.dispatch(CREATE_QUESTIONNARE, this.title);
        this.title = '';
        location.reload();
      }
    },
    goQuestion(id) {
      this.$store.commit(SET_CREATE_ID, id);
      this.$router.push({
        name: 'createQuestion',
      });
    },
    deleteQuestionnaire(id) {
      this.$store.dispatch(DELETE_QUESTIONNAIRE, id);
      this.showModal = false;
      location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  width: 350px;
  height: 150px;
  padding: 15px;
  border-radius: 10px;

  p {
    font-size: 1.25rem;
    color: var(--primary-text);
  }

  .button {
    margin-top: 50px;
    display: flex;
    justify-content: space-around;

    & .custom-button-yes::v-deep .button p {
      color: #fff;
    }

    & .custom-button-no::v-deep .button {
      background-color: #ff4b5c;

      p {
        color: #fff;
      }
    }
  }
}
.container {
  width: 80%;
  height: 75vh;
  // background-color: #fff;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;

  .title {
    display: flex;
    // justify-content: space-around;
    align-items: center;

    & .custominput {
      max-width: 800px;
      border-radius: 10px;
      margin-top: 0;
    }

    & .custom-button {
      margin-right: -50px;
      margin-left: auto;
    }
  }

  .questionnares {
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
    max-height: 550px;
    overflow-y: auto;

    scrollbar-color: #4570f5 rgba(0, 0, 0, 0.1);
    scrollbar-width: thin;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    }

    &::-webkit-scrollbar-thumb {
      background-color: #4570f5;
      // outline: 1px solid rgb(72, 117, 161);
    }

    & .item {
      display: flex;
      justify-content: space-around;
      flex-direction: row-reverse;
      align-items: center;
      height: 70px;
      max-height: 600px;
      background-color: #fff;
      border-radius: 10px;
      padding: 5px;
      margin-top: 10px;
      direction: rtl;
      box-shadow: 10px 8px 6px 0 #edeef5;

      & .title {
        color: #2a3774;
        width: 100px;
        text-align: right;
        max-width: 150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      & .number {
        color: #7f86aa;
      }

      & .buttons {
        display: flex;
        flex-direction: row-reverse;

        & .custom-button-delete::v-deep .button {
          height: 45px;
          width: 123px;
          font-size: 14px;
          border-radius: 5px;
          background-color: #ff4b5c;
          margin-right: 5px;
        }

        & .custom-button::v-deep .button {
          height: 45px;
          width: 123px;
          font-size: 14px;
          border-radius: 5px;
          background-color: #4e89ae;
        }
      }
    }
  }
}

@media (max-width: 1330px) {
  .custominput {
    width: 600px;
  }
}

@media (max-width: 1075px) {
  .custominput {
    width: 400px;
  }
}
@media (max-width: 820px) {
  .title {
    flex-direction: column-reverse;

    & .custom-button {
      margin-right: auto !important;
      margin-left: auto !important;
      margin-top: 10px;
    }
  }
  .custominput {
    width: 80%;
  }
  .questionnares {
    margin-top: 0 !important;
    width: 80%;
  }
  .item {
    flex-direction: column-reverse !important;
    height: 100px !important;
    width: 80%;
  }
}
</style>
