<template>
  <div class="toasts">
    <UiToast v-for="toast in toasts" :key="toast.message" :toast="toast.message" :type="toast.type"/>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiToast from './UiToast.vue';

export default {
  name: 'TheToaster',
  data() {
    return {
      toasts: [],
    }
  },
  components: { UiIcon, UiToast },
  methods: {
    error(message) {
      this.toasts.push({'message': message, 'type': 'error', 'time': new Date()});
      setTimeout(() => this.removeToast(),5000);
    },
    success(message) {
      this.toasts.push({'message': message, 'type': 'success', 'time': new Date()});
      setTimeout(() => this.removeToast(),5000);
    },
    removeToast() {
      this.toasts.shift();
    }
  }
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
