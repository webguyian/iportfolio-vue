import { onMounted, onUnmounted, ref } from 'vue';

export const useBreakpoint = (breakpoint: number) => {
  const matchesBreakpoint = ref(true);
  const mediaQuery = `(max-width: ${breakpoint}px)`;

  const handleResize = () => {
    const matches = window.matchMedia(mediaQuery).matches;

    matchesBreakpoint.value = matches;
  };

  onMounted(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });

  return matchesBreakpoint;
};
