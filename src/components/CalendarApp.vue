<template>
  <div :class="['calendar-app', yearView && 'calendar-app--year-view']">
    <div v-if="!yearView" class="calendar-app-top-bar">
      <UIButton :id="id" @click="toggleView" icon="chevron-left" withLabel>{{
        scrollId
      }}</UIButton>
      <ul class="calendar-app-weekdays">
        <li v-for="weekday in weekdays" :key="weekday.name">
          <abbr class="ui-weekday" :title="weekday.name">
            {{ weekday.abbr }}
          </abbr>
        </li>
      </ul>
    </div>
    <ul class="ui-years-list" ref="yearRef">
      <li v-for="(year, index) in calendar" :key="index">
        <CalendarYear
          :months="year"
          :isYearView="yearView"
          @toggle:view="toggleView"
        />
      </li>
    </ul>
    <div class="calendar-app-bottom-bar">
      <UIButton @click="scrollToToday">Today</UIButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import CalendarYear from './CalendarYear.vue';
import UIButton from './UIButton.vue';
import { weekdays } from '@/composables/calendar/constants';
import { useCalendar, useGoToToday } from '@/composables/calendar/hooks';
import { computed } from 'vue';

const { calendar, scrollId, toggleView, yearRef, yearView } = useCalendar();
const scrollToToday = useGoToToday(yearView);

const id = computed(() => `goto-${scrollId.value}`);
</script>

<style lang="scss">
.calendar-app {
  @include stretch-column-nowrap;

  &-top-bar,
  &-bottom-bar {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    padding: 8px $gutter;

    > .ui-btn {
      color: $red;
      font-size: $font-size-m;

      > .ui-btn-label {
        font-size: $font-size-m;
      }
    }
  }

  &-top-bar {
    > .ui-btn {
      max-width: 75px;
    }
  }

  &-bottom-bar {
    justify-content: center;
    margin-top: auto;

    > .ui-btn {
      position: relative;
      top: 5px;
      line-height: 1;
    }
  }

  &-weekdays {
    @include unstyled-list;
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: 4px;

    > li:first-child,
    > li:last-child {
      color: $gray;
    }

    .ui-weekday {
      font-size: $font-size-s;
      text-decoration: none;
    }
  }
}

.ui-years-list {
  @include unstyled-list;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  justify-content: center;
  height: 100%;
  background-color: $black-darker;
  overflow: auto;

  > li {
    width: 100%;
  }
}
</style>
