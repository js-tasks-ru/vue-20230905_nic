import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';
import MeetupView from '../../../02-components/06-MeetupView/components/MeetupView.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView
  },
  props: {
    meetupId: {
      type: Number,
      default: 1
    },
  },
  data() {
    return {
      meetup: null,
      error: false
    };
  },
  watch: {
    meetupId: async function () {
      this.meetup = null;
      try {
        this.meetup = await fetchMeetupById (this.meetupId);
        if (this.meetup) this.error = false;
      } catch (error) {
        this.error = error.message;
      }
    },
  },

  async mounted() {
    try {
      this.meetup = await fetchMeetupById (this.meetupId);
      if (this.meetup) this.error = false;
    } catch (error) {
      this.error = error.message;
    }
  },

  template: `
    <div class="page-meetup">
      <!-- meetup view -->
      <template v-if="!error">
        <MeetupView v-if="meetup" :meetup="meetup" />

        <UiContainer v-else>
          <UiAlert>Загрузка...</UiAlert>
        </UiContainer>
      </template>

      <UiContainer v-else>
        <UiAlert>{{ error }}</UiAlert>
      </UiContainer>
    </div>`,
});
