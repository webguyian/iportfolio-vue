<template>
  <div class="ui-year" :id="id">
    <UIText v-if="isYearView" class="ui-year-title" type="display" element="h1">
      {{ year }}
    </UIText>
    <ul class="ui-year-list">
      <li v-for="(month, index) in months" :key="index">
        <CalendarMonth
          :month="month"
          :isYearView="isYearView"
          @toggle:view="$emit('toggle:view', $event)"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import CalendarMonth from './CalendarMonth.vue';
import UIText from './UIText.vue';
import type { Day, Month } from '@/composables/calendar/types';

const props = defineProps<{
  isYearView: boolean;
  months: Array<Month>;
}>();

defineEmits(['toggle:view']);

const { months } = toRefs(props);
const [firstDay] = months.value[0];
const year = (firstDay as Day).year;
const id = `year-${year}`;
</script>

<style lang="scss">
.ui-year {
  margin-bottom: $gutter;

  &-title {
    margin: 0 $gutter $gutter-s;
    padding: $gutter-s 0 4px;
    border-bottom: 1px solid $gray-dark;
    color: $red;
  }

  &-list {
    @include unstyled-list;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    justify-content: center;
    height: 100%;

    > li {
      width: 100%;

      .calendar-app--year-view & {
        width: 33%;
      }
    }
  }
}
</style>
