<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="handleRemove">
      <UiIcon icon="trash" />
    </button>

    <UiFormGroup>
      <UiDropdown title="Тип" :options="$options.agendaItemTypeOptions" name="type" v-model="internalAgendaItem.type"/>
    </UiFormGroup>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <UiFormGroup label="Начало">
          <UiInput type="time" placeholder="00:00" name="startsAt" v-model="internalAgendaItem.startsAt" @input="changeStartsAt($event.target.value)"/>
        </UiFormGroup>
      </div>
      <div class="agenda-item-form__col">
        <UiFormGroup label="Окончание">
          <UiInput type="time" placeholder="00:00" name="endsAt" v-model="internalAgendaItem.endsAt"/>
        </UiFormGroup>
      </div>
    </div>

    <UiFormGroup :label="inputTitle">
      <UiInput name="title" v-model="internalAgendaItem.title" />
    </UiFormGroup>
    <UiFormGroup label="Докладчик" v-if="internalAgendaItem.type === 'talk'">
      <UiInput name="speaker" v-model="internalAgendaItem.speaker" />
    </UiFormGroup>
    <UiFormGroup label="Описание" v-if="internalAgendaItem.type === 'talk' || internalAgendaItem.type === 'other'">
      <UiInput multiline name="description" v-model="internalAgendaItem.description" />
    </UiFormGroup>
    <UiFormGroup label="Язык" v-if="internalAgendaItem.type === 'talk'">
      <UiDropdown title="Язык" :options="$options.talkLanguageOptions" name="language" v-model="internalAgendaItem.language" />
    </UiFormGroup>
  </fieldset>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiFormGroup from './UiFormGroup.vue';
import UiInput from './UiInput.vue';
import UiDropdown from './UiDropdown.vue';

const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',

  agendaItemTypeOptions,
  talkLanguageOptions,

  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      internalAgendaItem: {...this.agendaItem},
    };
  },
  emits: ['remove', 'update:agendaItem'],
  watch: {
    internalAgendaItem: {
      deep: true,
      handler() {
        this.$emit('update:agendaItem', {...this.internalAgendaItem});
      },
    },
  },

  computed: {
    inputTitle() {
      switch (this.internalAgendaItem.type) {
        case 'talk':
          return 'Тема';
        case 'other':
          return 'Заголовок';
        default:
          return 'Нестандартный текст (необязательно)';
      }
    },
    hoursDifference() {
      const startsAtHours = parseInt(this.internalAgendaItem.startsAt.split(':')[0]);
      const endsAtHours = parseInt(this.internalAgendaItem.endsAt.split(':')[0]);
      return endsAtHours - startsAtHours;
    },
  },
  methods: {
    handleRemove() {
      this.$emit('remove');
      this.internalAgendaItem = {...this.agendaItem};
    },
    changeStartsAt(value) {
      const startTime = value.split(':');
      const summaryHours = parseInt(startTime[0]) + this.hoursDifference;
      const resultHours = (summaryHours >= 24) ? summaryHours - 24 : (summaryHours >= 0) ? summaryHours: 24 + summaryHours;
      const formattedHours = (resultHours.toString().length < 2) ? `0${resultHours}` : resultHours;
      this.internalAgendaItem.endsAt = `${formattedHours}:${startTime[1]}`;
    },
  },
};
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
