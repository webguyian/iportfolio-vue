<template>
  <div class="stopwatch">
    <UIText class="stopwatch-text">
      <DateTime
        v-if="timer"
        :format="timeFormat"
        :fromDate="timerDisplay"
        stopped
      />
      <span v-else>{{ defaultTimeDisplay }}</span>
    </UIText>
    <TimerControls
      :disabled="disabled"
      :hasLaps="hasLaps"
      :timerRunning="timerRunning"
      @action:primary="toggleTimer"
      @action:secondary="handleLaps"
    />
    <StopwatchLaps :laps="laps" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import DateTime from './DateTime.vue';
import StopwatchLaps from './StopwatchLaps.vue';
import TimerControls from './TimerControls.vue';
import UIText from './UIText.vue';
import { defaultTimeDisplay, timeFormat } from '@/composables/clock/constants';
import { getTimeDisplay } from '@/composables/clock/helpers';
import { useLaps, useStopwatch } from '@/composables/clock/hooks';

const { timer, timerRunning, toggleTimer, resetTimer } = useStopwatch();
const { hasLaps, laps, updateLaps } = useLaps(timer, timerRunning);

const timerDisplay = computed(() => getTimeDisplay(timer.value));
const disabled = false;
const handleLaps = () => {
  if (!timerRunning.value) {
    // Reset timer and exit
    resetTimer();
  }

  updateLaps();
};
</script>
