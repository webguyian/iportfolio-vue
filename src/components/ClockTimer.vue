<template>
  <div class="timer">
    <TimerPicker :values="values" @update:duration="setDuration" />
    <TimerControls
      secondary-label="Cancel"
      stop-label="Pause"
      :timer-running="timer.running.value"
      @action:primary="timer.toggle"
      @action:secondary="timer.restart"
    />
    {{ timer.allSeconds }}
  </div>
</template>

<script setup lang="ts">
import TimerControls from './TimerControls.vue';
import TimerPicker from './TimerPicker.vue';
import { useDuration, useTimer } from '@/composables/clock/hooks';

const { duration, values, setDuration } = useDuration();
const timer = useTimer(duration);
</script>
