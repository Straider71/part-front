<template>
  <transition name="v-fade-fast" @after-enter="show = true" appear>
    <div class="modal-backdrop" role="dialog" @click.self="show = false">
      <transition name="v-modal" @after-leave="$emit('close')">
        <div
          ref="modal"
          v-if="show"
          class="modal"
          role="dialog"
          aria-describedby="modalDescription"
        >
          <section class="modal-body" id="modalDescription">
            <slot></slot>
          </section>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style lang="scss" scoped>
$easing: (
  'easeInOutCirc': cubic-bezier(0.77, 0.2, 0.05, 1),
  'easeOutBack': cubic-bezier(0.175, 0.885, 0.32, 1.275),
);

[v-cloak] {
  display: none;
}

.modal-backdrop {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1030;
  // border-radius: 10px;
}

.modal {
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}

.v-modal-enter-active {
  animation: scale 120ms map-get($easing, 'easeOutBack'); // bounce effect
}

.v-modal-leave-active {
  animation: scale 80ms map-get($easing, 'easeInOutCirc') reverse;
}

.v-fade-fast-enter-active {
  animation: fade 80ms map-get($easing, 'easeInOutCirc');
}

.v-fade-fast-leave-active {
  animation: fade 80ms map-get($easing, 'easeInOutCirc') reverse;
}

@keyframes fade {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes scale {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}
</style>
