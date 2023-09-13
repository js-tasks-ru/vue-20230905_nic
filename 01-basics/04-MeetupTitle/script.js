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
createApp({
  data() {
    return {
      id: 0,
      meetup: {},
      title: "MEETUP_TITLE"
    };
  },
  watch: {
    id: async function () {
      this.meetup = await fetchMeetupById (this.id);
      this.title = this.meetup.title;
    },
  },
}).mount('#app');
