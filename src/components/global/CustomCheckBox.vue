<template>
  <!--  <div class="container" :text="text">-->
  <div class="custom-check-box-container" :text="text">
    <input class="inp-cbx" id="morning" type="checkbox" />
    <label class="cbx" for="morning">
      <span>
        <svg width="11px" height="10px">
          <use xlink:href="#check"></use>
        </svg>
      </span>
      <span>{{ text }}</span>
    </label>
    <svg class="inline-svg">
      <symbol id="check">
        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
      </symbol>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'CustomCheckBox',
  props: {
    text: String,
  },
};
</script>

<style lang="scss" scoped>
.custom-check-box-container {
  margin-bottom: 33px;
  display: flex;
  height: 20px;

  .cbx {
    position: absolute;
    right: 0;

    -webkit-user-select: none;
    user-select: none;
    cursor: pointer;
    padding: 3px 4px;
    border-radius: 6px;
    overflow: hidden;
    transition: all 0.2s ease;
    &:hover {
      span {
        &:last-child {
          border-color: var(--primary-color);
        }
      }
    }
    span {
      float: right;
      vertical-align: middle;
      &:first-child {
        position: relative;
        width: 20px;
        height: 20px;
        border-radius: 5px;
        border: 1px solid #cccfdb;
        transition: all 0.2s ease;
        box-shadow: 0 1px 1px rgba(0, 16, 75, 0.05);
        svg {
          position: absolute;
          top: 4px;
          left: 3px;
          fill: none;
          stroke: #fff;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 16px;
          stroke-dashoffset: 16px;
          transition: all 0.3s ease;
          transition-delay: 0.1s;
          transform: translate3d(0, 0, 0);
        }
      }
      &:last-child {
        padding-right: 9px;
        padding-top: 2px;
        /*line-height: 18px;*/
      }
    }
  }
  .inp-cbx {
    position: absolute;
    visibility: hidden;
    &:checked {
      + {
        .cbx {
          span {
            &:first-child {
              background: var(--primary-color);
              border-color: var(--primary-color);
              animation: wave 0.4s ease;
              svg {
                stroke-dashoffset: 0;
              }
            }
          }
        }
      }
    }
  }

  .inline-svg {
    position: absolute;
    width: 0;
    height: 0;
    pointer-events: none;
    user-select: none;
  }
  @media screen and (max-width: 640px) {
    .cbx {
      width: 100%;
      margin-bottom: 4px;
      display: inline-block;
    }
  }
  @-moz-keyframes wave {
    50% {
      transform: scale(0.9);
    }
  }
  @-webkit-keyframes wave {
    50% {
      transform: scale(0.9);
    }
  }
  @-o-keyframes wave {
    50% {
      transform: scale(0.9);
    }
  }
  @keyframes wave {
    50% {
      transform: scale(0.9);
    }
  }
}
</style>
