<template>
  <div class="avatar">
    <img
      :src="userPhoto ? `http://127.0.0.1:3000/${userPhoto}` : defaultPhoto"
      alt="avatar"
    />
    <input
      type="file"
      accept="image/*"
      @change="onFileSelected"
      style="display: none"
      ref="fileInput"
    />
    <div class="two">
      <CustomButton class="custom-button" @click.native="removePic">
        <p>پاک کردن عکس</p>
      </CustomButton>
      <CustomButton
        class="custom-button"
        @click.native="$refs.fileInput.click()"
      >
        <p>انتخاب عکس</p>
      </CustomButton>
    </div>
  </div>
</template>

<script>
import CustomButton from '@/components/global/CustomButton';
import { REMOVE_USER_PHOTO } from '@/store/mutations.type.js';
import { PROFILE_PIC } from '@/store/actions.type.js';
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Avatar',
  components: {
    CustomButton,
  },
  data() {
    return {
      selectedFile: null,
      defaultPhoto: `http://127.0.0.1:3000/server/image/users/avatar@3x.png`,
    };
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
    ...mapGetters(['userPhoto']),
  },

  methods: {
    ...mapMutations(['REMOVE_USER_PHOTO']),
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      if (event.target.files[0].size >= 1000000) {
        return this.$toasted.error('حجم عکس از 1 مگابایت نباید بیشتر باشد');
      }

      const fd = new FormData();
      fd.append('image', this.selectedFile);
      this.$store.dispatch(PROFILE_PIC, fd);
    },
    removePic() {
      this.REMOVE_USER_PHOTO();
    },
  },
};
</script>

<style scoped lang="scss">
.avatar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;

  & img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  & .two {
    display: flex;
    justify-content: space-between;
    width: 375px;

    & .custom-button::v-deep .button {
      height: 45px;
      width: 185px;
      font-size: 1rem;
      border-radius: 5px;
      margin-top: 38px;
    }
  }
}
</style>
