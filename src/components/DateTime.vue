<script setup lang="ts">
import { computed } from 'vue';
import { format as formatDate, isToday, isYesterday } from 'date-fns';
import { useDateTime } from '@/composables/datetime/hooks';

const props = withDefaults(
  defineProps<{
    format?: string;
    fromDate?: Date;
    fromNow?: boolean;
    initial?: number;
    relativeFormat?: string;
    stopped?: boolean;
  }>(),
  {
    format: 'h:mm',
    fromNow: false,
    relativeFormat: 'M/d/yy',
    stopped: false
  }
);

const emit = defineEmits(['update']);

const { millis } = useDateTime(props.stopped, props.initial, emit);
const date = new Date(millis.value);
const datetime = computed(() =>
  props.fromDate
    ? formatDate(props.fromDate, props.format)
    : formatDate(millis.value, props.format)
);
const dateFromNow = computed(() =>
  isToday(date)
    ? formatDate(date, props.format)
    : formatDate(date, props.relativeFormat)
);
</script>

<template>
  <template v-if="fromNow">
    <template v-if="isYesterday(date)">Yesterday</template>
    <template v-else>{{ dateFromNow }}</template>
  </template>
  <template v-else>
    {{ datetime }}
  </template>
</template>
