<template>
  <figure class="figure-hand-image">
    <!-- <div class="before"></div> -->
    <img alt="hand writing image" src="../../assets/34shndow.png" />
    <!-- <div class="after"></div> -->
  </figure>
</template>

<script>
export default {
  name: 'HandImage',
};
</script>

<style lang="scss" scoped>
.figure-hand-image {
  width: 413px;
  height: 413px;
  position: relative;
  top: -50px;

  & img {
    position: relative;
    z-index: 2;
  }

  &:after {
    content: '';
    width: 108px;
    height: 108px;
    border-radius: 50%;
    background-image: linear-gradient(#8fa9f6, #4570f5);
    position: absolute;
    left: 320px;
    top: 300px;
    z-index: 3;
    box-shadow: 10px 10px 26px 0 rgba(0, 0, 0, 0.16);
  }

  &:before {
    content: '';
    width: 247px;
    height: 247px;
    border-radius: 50%;
    border: solid 15px #edeef5;
    position: absolute;
    left: -40px;
    top: -40px;
    z-index: 1;
  }
}
</style>
