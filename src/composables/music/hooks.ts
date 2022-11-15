import { onMounted, ref, watch } from 'vue';
import { useFetchAndCache } from '@/composables/browser/hooks';
import { API_MUSIC } from './constants';
import type { MusicTrack } from './types';

export const useMusic = () => {
  const tracks = ref<Array<MusicTrack>>([]);
  const response = useFetchAndCache(API_MUSIC, 'music', '1D');
  const setTracks = (data: any) => {
    if (!data || !data.tracks) {
      return;
    }

    tracks.value = data.tracks;
  };

  onMounted(() => {
    setTracks(response.value);
  });

  watch(response, (data) => {
    setTracks(data);
  });

  return tracks;
};
