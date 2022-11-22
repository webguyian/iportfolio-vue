<template>
  <div class="timer">
    <TimerPicker
      v-if="!showCountdown"
      :values="values"
      @update:duration="setDuration"
    />
    <TimerCountdown v-if="showCountdown" v-bind="timer" />
    <TimerControls
      :disabled="!showCountdown"
      secondary-label="Cancel"
      :start-label="startLabel"
      stop-label="Pause"
      :timer-running="timer.running.value"
      @action:primary="handleToggle"
      @action:secondary="handleCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import TimerControls from './TimerControls.vue';
import TimerCountdown from './TimerCountdown.vue';
import TimerPicker from './TimerPicker.vue';
import { useDuration, useTimer } from '@/composables/clock/hooks';

const { duration, values, setDuration } = useDuration();
const timer = useTimer(duration);
const showCountdown = ref(timer.started.value);
const startLabel = computed(() => (timer.started.value ? 'Resume' : 'Start'));

const handleToggle = () => {
  timer.toggle();

  if (timer.started.value) {
    showCountdown.value = true;
  }
};

const handleCancel = () => {
  timer.restart();

  showCountdown.value = false;
};

watch(timer.started, (hasStarted) => {
  if (!showCountdown.value && hasStarted) {
    // Timer started, show countdown
    showCountdown.value = true;
  }
});

watch([timer.running, timer.allSeconds], () => {
  if (timer.running.value && timer.allSeconds.value === 0) {
    handleCancel();
  }
});
</script>
