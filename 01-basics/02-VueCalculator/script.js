import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const vm = createApp({
  data() {
    return {
      number1: 0,
      number2: 0,
      operator: "sum",
      array: {
        "sum": "+",
        "subtract": "-",
        "multiply": "*",
        "divide": "/"
      }
    };
  },
  computed: {
    result() {
      return eval(this.number1 + this.array[this.operator] + this.number2);
    }
  },
}).mount('#app');
