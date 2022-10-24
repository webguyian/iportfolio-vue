import { ref, watchEffect } from 'vue';

export const useDateTime = (stopped: boolean, initial?: number) => {
  const initialTime = initial || Date.now();
  const millis = ref(initialTime);
  const frame = ref(0);

  const tick = () => {
    const ms = Date.now();

    millis.value = ms;
    frame.value = requestAnimationFrame(tick);
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
