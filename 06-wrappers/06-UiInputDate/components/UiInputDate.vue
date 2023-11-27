<template>
  <UiInput :model-value="modelValueProxy" :type="type" :step="step" @input="handleInput">
    <template v-for="slot in Object.keys($slots)" #[slot]>
      <slot :name="slot" />
    </template>
  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';

export default {
  name: 'UiInputDate',
  components: { UiInput },

  props: {
    modelValue: {
      type: Number,
      default: null
    },
    type: {
      type: String,
      default: 'date'
    },
    step: Number
  },
  computed: {
    localDatetime() {
      const dateISO = new Date(this.modelValue).toISOString();
      if (this.type === 'date') {
        return dateISO.slice(0, 10);
      }
      if (this.type === 'time') {
        return dateISO.slice(11, 16);
      }
      return dateISO.slice(0, 16);
    },
    modelValueProxy: {
      get() {
        return this.modelValue ? this.localDatetime : '';
      },
    },
  },
  methods: {
    handleInput(event) {
      this.$emit('update:modelValue', event.target.valueAsNumber);
    },
  },
  emits: ['update:modelValue'],
};
</script>
