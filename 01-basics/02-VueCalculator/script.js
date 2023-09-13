import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const vm = createApp({
  data() {
    return {
      number1: 0,
      number2: 0,
      operator: "sum",
      functions: {
        "sum": (n1, n2) => n1 + n2,
        "subtract": (n1, n2) => n1 - n2,
        "multiply": (n1, n2) => n1 * n2,
        "divide": (n1, n2) => n2 ? n1 / n2 : 'Error',
      }
    };
  },
  computed: {
    result() {
      return (this.functions[this.operator](this.number1, this.number2));
    }
  },
}).mount('#app');
