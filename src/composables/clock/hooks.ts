import { computed, onMounted, ref, watch, type Ref } from 'vue';
import { useLocalStorage, useStorageCache } from '@/composables/browser/hooks';
import { initialLaps } from './constants';

export const useLaps = (timer: Ref<number>, timerRunning: Ref<boolean>) => {
  const laps = ref(initialLaps);
  const hasLaps = computed(() => laps.value.some((lap) => lap > 0));
  const value = ref({
    laps,
    timer,
    timerRunning
  });
  const storage = useStorageCache(
    'stopwatch',
    value,
    (storedValue) => storedValue.timer < 1
  );

  const updateLaps = () => {
    if (timerRunning.value) {
      const hasEmptyLaps = computed(() => laps.value.some((lap) => lap === 0));

      if (hasEmptyLaps.value) {
        laps.value = [0, ...laps.value.slice(0, laps.value.length - 1)];
      } else {
        laps.value = [0, ...laps.value];
      }
    } else {
      laps.value = initialLaps;
    }
  };

  onMounted(() => {
    if (storage && storage.value) {
      laps.value = storage.value.laps;
    }
  });

  watch([timer, timerRunning, hasLaps], () => {
    if (!timerRunning.value || !timer.value) {
      return;
    }

    const lapLength = laps.value.length;

    if (!hasLaps.value && timer.value > 10) {
      laps.value = [timer.value, ...laps.value];
    }

    if (lapLength > 5) {
      const updatedLaps = computed(() => {
        const truncatedLaps = laps.value.slice(1, lapLength);
        const offset = truncatedLaps.reduce((a, b) => a + b, 0);

        return [timer.value - offset, ...truncatedLaps];
      });
      laps.value = updatedLaps.value;
    }
  });

  return { laps, updateLaps, hasLaps };
};

export const useStopwatch = (startTime = 0, start = false) => {
  const timerRunning = ref(start);
  const interval = ref<number | null>(null);
  const offset = ref(0);
  const timer = ref(startTime);
  const { storedValue } = useLocalStorage('stopwatch');
  const toggleTimer = () => (timerRunning.value = !timerRunning.value);
  const resetTimer = () => {
    timer.value = 0;
    return timer.value;
  };
  const getUpdatedTime = (cache: any) => {
    const now = Date.now();
    const diff = now - cache.timestamp;

    return cache.timer + diff;
  };

  onMounted(() => {
    if (storedValue && storedValue.value) {
      // Get updated time from local storage
      if (storedValue.value.timerRunning) {
        timer.value = getUpdatedTime(storedValue.value);
        toggleTimer();
      } else {
        timer.value = storedValue.value.timer;
      }
    }
  });

  watch([timerRunning, timer, interval], () => {
    let localOffset = offset.value;

    if (timerRunning.value && !interval.value) {
      localOffset = Date.now();

      const getDelta = () => {
        const now = Date.now();
        const delta = now - localOffset;

        localOffset = now;

        offset.value = now;
        return delta;
      };

      const localInterval = window.setInterval(() => {
        timer.value += getDelta();
      }, 1);

      interval.value = localInterval;
    }

    if (!timerRunning.value && interval.value) {
      window.clearInterval(interval.value);
      interval.value = null;
    }
  });

  return {
    timer,
    timerRunning,
    toggleTimer,
    resetTimer
  };
};
