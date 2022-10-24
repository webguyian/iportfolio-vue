import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getMobileOperatingSystem } from '@/composables/browser/helpers';

export const useLockscreen = () => {
  const unlocked = ref(false);
  const router = useRouter();
  const handleToggle = () => {
    unlocked.value = true;
  };
  const handleUnlock = (event: Event) => {
    if (event.target === event.currentTarget) {
      router.push('/home');
    }
  };

  onMounted(() => {
    const os = getMobileOperatingSystem();

    if (os === 'iOS') {
      // Hide iOS URL address bar
      window.scrollTo(0, 1);
    }
  });

  return { unlocked, handleToggle, handleUnlock };
};
