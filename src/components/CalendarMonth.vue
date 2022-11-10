<template>
  <UIButton
    v-if="isYearView"
    :class="['ui-month', currentMonth && 'ui-month--current']"
    :id="id"
    @click="$emit('toggle:view', $event)"
  >
    <UIText
      :class="['ui-month-title', offsetClass]"
      element="h2"
      modifier="bold"
    >
      {{ monthAbbr }}
    </UIText>
    <ul class="ui-month-list">
      <li v-for="(week, index) in weeks" :key="index">
        <CalendarWeek :days="week" />
      </li>
    </ul>
  </UIButton>
  <div
    v-else
    :class="['ui-month', currentMonth && 'ui-month--current']"
    :id="id"
  >
    <UIText
      :class="['ui-month-title', offsetClass]"
      element="h2"
      modifier="bold"
    >
      {{ monthAbbr }}
    </UIText>
    <ul class="ui-month-list">
      <li v-for="(week, index) in weeks" :key="index">
        <CalendarWeek :days="week" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import CalendarWeek from './CalendarWeek.vue';
import UIButton from './UIButton.vue';
import UIText from './UIText.vue';
import { isCurrentMonth, getWeeks } from '@/composables/calendar/helpers';
import type { Day, Month } from '@/composables/calendar/types';
import { toRefs } from 'vue';

const props = defineProps<{ month: Month; isYearView: boolean }>();

defineEmits(['toggle:view']);

const { month } = toRefs(props);
const { monthAbbr, offset, year } = month.value[0] as Day;
const currentMonth = isCurrentMonth(month.value);
const weeks = getWeeks(month.value);
const offsetClass = `ui-month-title--offset-${offset}`;
const id = `${monthAbbr.toLowerCase()}-${year}`;
</script>

<style lang="scss">
$month-size: 48px;

.ui-month {
  width: 100%;
  padding: 0 20px;
  color: $white;
  text-align: left;

  &-title {
    margin: 0;
    padding: $gutter-s 0 $gutter-m;
    font-size: $font-size-l;

    .ui-month--current & {
      color: $red;
    }

    &--offset-2 {
      margin-left: $month-size * 2;
    }

    &--offset-3 {
      margin-left: $month-size * 3;
    }

    &--offset-4 {
      margin-left: $month-size * 4;
    }

    &--offset-5 {
      margin-left: $month-size * 5;
    }

    &--offset-6 {
      margin-left: $month-size * 6;
    }
  }

  &-list {
    @include unstyled-list;
  }

  .calendar-app--year-view & {
    min-height: 127px;
    padding: 0 $gutter-s;

    .ui-month-title {
      margin-left: 0;
      padding-bottom: $gutter-s;
      font-size: $font-size-m;
    }
  }
}

.ui-week-list {
  @include unstyled-list;
  display: flex;
  flex-flow: row nowrap;

  > li:first-child,
  > li:last-child {
    color: $gray;

    .calendar-app--year-view & {
      color: $white;
    }
  }
}

.ui-day {
  width: 100%;
  height: 40px;
  text-align: center;

  &--today {
    position: relative;

    &::after {
      @include circle(34px);
      z-index: 1;
      position: absolute;
      top: -7px;
      left: 7px;
      background-color: $red;
      content: '';
    }

    > .ui-text {
      z-index: 2;
      position: relative;
      color: $white;
    }
  }

  .calendar-app--year-view & {
    height: 15px;

    &-text {
      font-size: $font-size-xs;
    }

    &--today {
      position: relative;

      &::after {
        @include circle(15px);
        top: 0;
        left: 0;
      }
    }
  }
}
</style>
