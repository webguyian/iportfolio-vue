import {
  computed,
  onMounted,
  ref,
  watch,
  type ComputedRef,
  type Ref
} from 'vue';
import { useLocalStorage, useStorageCache } from '@/composables/browser/hooks';
import { initialLaps, initialValues } from './constants';
import { getExpiration, getExpirationValues, getSeconds } from './helpers';
import type { Duration } from './types';

export const useCountdown = (h = 0, m = 0, s = 0) => {
  const seconds = ref(s);
  const minutes = ref(m);
  const hours = ref(h);
  const allSeconds = computed(() =>
    getSeconds({
      hours: hours.value,
      minutes: minutes.value,
      seconds: seconds.value
    })
  );

  const subtractHour = () => {
    if (hours.value === 0) {
      hours.value = 23;
    } else if (hours.value > 0) {
      hours.value = hours.value - 1;
    } else {
      hours.value = 0;
    }
  };

  const subtractMinute = () => {
    if (minutes.value === 0) {
      subtractHour();
      minutes.value = 59;
    } else if (minutes.value > 0) {
      minutes.value = minutes.value - 1;
    } else {
      minutes.value = 0;
    }
  };

  const subtractSecond = () => {
    if (seconds.value === 0) {
      subtractMinute();
      seconds.value = 59;
    } else if (seconds.value > 0) {
      seconds.value = seconds.value - 1;
    } else {
      seconds.value = 0;
    }
  };

  const setCountdown = (values: Duration | null) => {
    if (!values) {
      hours.value = 0;
      minutes.value = 0;
      seconds.value = 0;
      return;
    }

    hours.value = values.hours;
    minutes.value = values.minutes;
    seconds.value = values.seconds;
  };

  return {
    allSeconds,
    hours,
    minutes,
    seconds,
    setCountdown,
    subtractSecond
  };
};

export const useDuration = () => {
  const values = ref<Duration>(initialValues);
  const cache = useStorageCache('duration', values);
  const setDuration = (key: string, value: number) => {
    if (values.value) {
      values.value[key as keyof Duration] = value;
    }
  };
  const duration = computed(() =>
    values.value ? getSeconds(values.value) : 0
  );

  onMounted(() => {
    if (cache && cache.value) {
      // Set values from local storage
      values.value = cache.value;
    }
  });

  return { duration, setDuration, values };
};

export const useLaps = (timer: Ref<number>, timerRunning: Ref<boolean>) => {
  const laps = ref(initialLaps);
  const hasLaps = computed(() => laps.value.some((lap) => lap > 0));
  const value = ref({
    laps,
    timer,
    timerRunning
  });
  const cache = useStorageCache(
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
    if (cache && cache.value) {
      laps.value = cache.value.laps;
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

export const useRadialOffset = (
  allSeconds: Ref<number>,
  duration: Ref<number>,
  radius: number
) => {
  const circumference = (2 * radius * 22) / 7;
  const initialSeconds = ref(allSeconds.value);
  const offset = ref(0);

  watch([allSeconds, duration, offset], () => {
    if (!offset.value) {
      const initialOffset = (allSeconds.value / duration.value) * circumference;
      const updatedOffset = circumference - Math.round(initialOffset);

      if (updatedOffset === circumference || updatedOffset < 0) {
        // Exit early
        return;
      }

      offset.value = updatedOffset;
    }
  });

  return { initialSeconds, offset };
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

export const useTimer = (duration: ComputedRef<number>) => {
  const started = ref(false);
  const running = ref(false);
  const { allSeconds, hours, minutes, seconds, setCountdown, subtractSecond } =
    useCountdown();
  const intervalRef = ref();
  const values = ref({
    allSeconds,
    hours,
    minutes,
    seconds,
    duration,
    running,
    started
  });
  const storage = useStorageCache(
    'timer',
    values,
    (storedValue) => storedValue.allSeconds < 1
  );

  const pause = () => {
    if (intervalRef.value) {
      running.value = false;
      clearInterval(intervalRef.value);
      intervalRef.value = undefined;
    }
  };

  const reset = () => {
    pause();
    setCountdown(null);
    started.value = false;
  };

  const calculateExpiration = (expiration: Date) => {
    const distance = +expiration - Date.now();
    const expirationValues = getExpirationValues(distance);

    if (allSeconds.value < 0) {
      reset();
    } else {
      setCountdown(expirationValues);
    }

    return expirationValues;
  };

  const start = (expiration: Date) => {
    if (expiration && !intervalRef.value) {
      calculateExpiration(expiration);
    }
  };

  const resume = () => {
    if (!intervalRef.value) {
      started.value = true;
      running.value = true;
      intervalRef.value = setInterval(subtractSecond, 1000);
    }
  };

  const restart = () => {
    const expiration = getExpiration(duration.value);

    reset();
    start(expiration);
  };

  const toggle = () => {
    if (!intervalRef.value) {
      resume();
    } else {
      pause();
    }
  };

  watch(duration, (durationValue) => {
    const expiration = getExpiration(durationValue, storage);

    start(expiration);

    if (storage) {
      if (storage.running) {
        resume();
      } else if (storage.started) {
        started.value = true;
      }

      if (duration !== storage.duration) {
        // Remove timer from local storage
        window.localStorage.removeItem('timer');
      }
    }

    return pause;
  });

  return {
    allSeconds,
    hours,
    minutes,
    seconds,
    duration,
    start,
    started,
    pause,
    reset,
    resume,
    restart,
    running,
    toggle
  };
};
