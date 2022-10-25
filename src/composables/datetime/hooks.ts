import { ref, watchEffect } from 'vue';

export const useDateTime = (
  stopped: boolean,
  initial?: number,
  emit?: (event: 'update', ...args: Array<any>) => void
) => {
  const initialTime = initial || Date.now();
  const millis = ref(initialTime);
  const frame = ref(0);

  const tick = () => {
    const ms = Date.now();

    millis.value = ms;
    frame.value = requestAnimationFrame(tick);

    if (emit) {
      emit('update', new Date(ms));
    }
  };

  watchEffect((onCleanup) => {
    if (stopped) {
      cancelAnimationFrame(frame.value);
    } else {
      frame.value = requestAnimationFrame(tick);
    }

    onCleanup(() => cancelAnimationFrame(frame.value));
  });

  return { millis };
};
