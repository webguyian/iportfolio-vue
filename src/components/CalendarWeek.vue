<template>
  <ul class="ui-week-list">
    <li
      v-for="(weekday, index) in days"
      :key="index"
      :class="['ui-day', weekday && weekday.isToday && 'ui-day--today']"
    >
      <UIText v-if="weekday" class="ui-day-text">
        {{ weekday.day }}
      </UIText>
    </li>
  </ul>
</template>

<script setup lang="ts">
import UIText from './UIText.vue';
import type { Month } from '@/composables/calendar/types';

defineProps<{ days: Month }>();
</script>
