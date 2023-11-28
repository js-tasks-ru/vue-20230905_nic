<template>
  <button @click="$emit('update:count', counter = counter+1)">
    {{ counter }}
  </button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      counter: null,
    };
  },

  emits: ['update:count'],

  watch: {
    count: {
      immediate: true,
      handler(value) {
        this.counter = value;
      },
    },
  },
};
</script>
