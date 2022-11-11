<template>
  <ul class="lap-list">
    <li
      v-for="(lap, index) in laps"
      :key="index"
      :class="[
        lapItemClass,
        lap === max && `${lapItemClass}--max`,
        lap === min && `${lapItemClass}--min`
      ]"
    >
      <StopwatchLap :index="getLapIndex(index, laps)" :time="lap" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import StopwatchLap from './StopwatchLap.vue';
import { getLapIndex } from '@/composables/clock/helpers';
const props = defineProps<{ laps: Array<number> }>();

const lapItemClass = 'lap-list-item';
const filteredLaps = computed(() =>
  props.laps.slice(1, props.laps.length).filter((lap) => lap > 0)
);
const min = computed(() => Math.min(...filteredLaps.value));
const max = computed(() => Math.max(...filteredLaps.value));
</script>

<style lang="scss">
.lap-list {
  width: 100%;
  height: 150px;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0;
  padding: $gutter $gutter 0;
  list-style: none;

  @include responsive($width-medium) {
    height: 200px;
  }

  &-item {
    min-height: 35px;
    padding: $gutter-s $gutter;
    border-top: 1px solid $gray-dark;

    &:first-child {
      border-top: 0;
    }
  }
}

.lap {
  display: flex;
  justify-content: space-between;

  &-label,
  &-time {
    .lap-list-item--max & {
      color: $red;
    }

    .lap-list-item--min & {
      color: $green-light;
    }
  }

  &-time {
    @include type-number-display($font-size-default);
  }
}
</style>
