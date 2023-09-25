import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiAlert from './UiAlert.js';
import UiContainer from './UiContainer.js';
import MeetupDescription from '../../../02-components/02-MeetupDescription/components/MeetupDescription.js';
import MeetupCover from '../../../02-components/03-MeetupCover/components/MeetupCover.js';
import MeetupInfo from '../../../02-components/04-MeetupInfo/components/MeetupInfo.js';
import MeetupAgenda from '../../../02-components/05-MeetupAgenda/components/MeetupAgenda.js';
import MeetupAgendaItem from '../../../02-components/05-MeetupAgenda/components/MeetupAgendaItem.js';

export default defineComponent({
  name: 'MeetupView',

  components: {
    UiAlert,
    UiContainer,
    MeetupDescription,
    MeetupCover,
    MeetupInfo,
    MeetupAgenda,
    MeetupAgendaItem
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },
  computed: {
    title() {
      return this.meetup.title;
    },
    description() {
      return this.meetup.description;
    },
    image() {
      return this.meetup.image;
    },
    agenda() {
      return this.meetup.agenda;
    },
    organizer() {
      return this.meetup.organizer;
    },
    place() {
      return this.meetup.place;
    },
    date() {
      return this.meetup.date;
    },
  },

  template: `
    <div>
      <!-- meetup cover-->
      <MeetupCover :title="title" :image="image" />
      <UiContainer>
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <!-- meetup description -->
            <MeetupDescription :description="description" />

            <h3>Программа</h3>
            <!-- meetup agenda -->
            <MeetupAgenda v-if="agenda.length" :agenda="agenda" />
            <UiAlert v-else >Программа пока пуста...</UiAlert>
          </div>
          <div class="meetup__aside">
            <!-- meetup info -->
            <MeetupInfo
              :organizer="organizer"
              :place="place"
              :date="date"
            />
          </div>
        </div>
      </UiContainer>
    </div>`,
});
