<template>
  {{ datetime }}
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { format as formatDate } from 'date-fns';
import { useDateTime } from '@/composables/datetime/hooks';

const props = withDefaults(
  defineProps<{
    format?: string;
    fromDate?: Date;
    initial?: number;
    relativeFormat?: string;
    stopped?: boolean;
  }>(),
  {
    format: 'h:mm',
    relativeFormat: 'M/d/yy',
    stopped: false
  }
);

const emit = defineEmits(['update']);

const { millis } = useDateTime(props.stopped, props.initial, emit);
const datetime = computed(() =>
  props.fromDate
    ? formatDate(props.fromDate, props.format)
    : formatDate(millis.value, props.format)
);
</script>
