<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button class="calendar-view__control-left" type="button" aria-label="Previous month" @click="selectMonth('prev')"></button>
        <div class="calendar-view__date">{{ currentDate }}</div>
        <button class="calendar-view__control-right" type="button" aria-label="Next month" @click="selectMonth('next')"></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div v-for="item in grid" class="calendar-view__cell" :class="{'calendar-view__cell_inactive': !item.active}" :tabindex="(!item.active)?'0':''">
        <div class="calendar-view__cell-day">{{ item.day }}</div>
        <div class="calendar-view__cell-content">
          <a v-for="meetup in item.meetups" :href="`/meetups/${meetup.id}`" class="calendar-event">{{ meetup.title }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetupsCalendar',
  data() {
    return {
      date: new Date(),
      grid: []
    }
  },
  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },
  computed: {
    currentDate() {
      return this.date.toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric'
      });
    },
    currentMonth() {
      return parseInt(this.date.toLocaleDateString(navigator.language,{
        month: 'numeric'
      }))-1;
    }
  },
  methods: {
    selectMonth(direction) {
      const offset = (direction === 'prev') ? -1 : 1;
      const targetMonth = this.currentMonth + offset;
      let targetYear = parseInt(this.date.toLocaleDateString(navigator.language,{year: 'numeric'}));
      this.date = new Date(targetYear, targetMonth, 1, 0, 0, 0, 0);
      this.renderCalendar();
    },
    renderCalendar() {
      this.grid = [];
      const dayOfWeek = new Date(this.date.setDate(1)).getDay();
      const copyDate = new Date(this.date);
      const nextMonth = new Date(copyDate.setMonth(this.currentMonth+1));
      const lastDayOfMonth =  new Date(nextMonth.setDate(0)).getDate();
      const prevMonth = new Date(this.date.setMonth(this.currentMonth)).setDate(0);
      const lastDayOfPrevMonth = new Date(prevMonth).getDate();
      const prevMonthDaysCount = (dayOfWeek === 0) ? 6 : dayOfWeek - 1;
      const gridFinalElemCount = ((lastDayOfMonth + prevMonthDaysCount) > 35) ? 6*7 : (lastDayOfMonth + prevMonthDaysCount > 28) ? 5*7 : 4*7;
      const nextMonthDays = gridFinalElemCount - (lastDayOfMonth + prevMonthDaysCount);
      if (dayOfWeek !== 1) {
        let prevMonthDay = lastDayOfPrevMonth - prevMonthDaysCount;
        for (let i = 0; i < prevMonthDaysCount; i++) {
          this.grid.push({'day': ++prevMonthDay, 'active': false});
        }
      }
      let day = 1;
      for (let j = 1; j <= lastDayOfMonth; j++) {
        const currentDay = new Date(this.date).setDate(day);
        let meetups = [];
        for (let l=0; l < this.meetups.length; l++) {
          if (this.convertingDate(this.meetups[l].date) === this.convertingDate(currentDay)) {
            meetups.push({'id': this.meetups[l].id, 'title': this.meetups[l].title});
          }
        }
        this.grid.push({'day':day++, 'active': true, 'meetups': meetups});
      }
      if (nextMonthDays > 0) {
        let nextMonthDay = 1;
        for (let k = 1; k <= nextMonthDays; k++) {
          this.grid.push({'day': nextMonthDay++, 'active': false});
        }
      }
    },
    convertingDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleDateString(navigator.language, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      })
    }
  },
  created() {
    this.renderCalendar();
  }
};
</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
