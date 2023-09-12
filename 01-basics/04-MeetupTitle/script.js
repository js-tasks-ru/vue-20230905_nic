import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

async function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

// Требуется создать Vue приложение
const vm = createApp({
  data() {
    return {
      id: 1,
      meetup: {"title": "MEETUP_TITLE2"},
    };
  },
  methods: {
    async responseTitle() {
      this.meetup = await fetchMeetupById (this.id);
    },
  },
}).mount('#app');
