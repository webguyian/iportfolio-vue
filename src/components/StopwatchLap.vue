<template>
  <div v-if="time" class="lap">
    <UIText class="lap-label"> Lap {{ index }} </UIText>
    <UIText class="lap-time">
      <DateTime :format="timeFormat" :fromDate="fromDate" stopped />
    </UIText>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import DateTime from './DateTime.vue';
import UIText from './UIText.vue';
import { timeFormat } from '@/composables/clock/constants';
import { getTimeDisplay } from '@/composables/clock/helpers';

const props = defineProps<{
  index: number;
  time: number;
}>();

const fromDate = computed(() => getTimeDisplay(props.time));
</script>

<style lang="scss"></style>
