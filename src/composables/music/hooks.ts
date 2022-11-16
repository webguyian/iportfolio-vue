import { onMounted, ref, watch } from 'vue';
import { useFetchAndCache, useStorageCache } from '@/composables/browser/hooks';
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

export const usePlayer = () => {
  const playing = ref(false);
  const track = ref<MusicTrack | null>(null);
  const volume = ref(0.2);
  const audioRef = ref<HTMLAudioElement | null>(null);
  const tracks = useMusic();
  const savedTrack = useStorageCache('music-player', track, (t) => !t);
  const player = {
    playing,
    volume,
    ref: audioRef,
    track: track.value ? track : savedTrack
  };
  const actions = {
    prev: () => {
      const index = tracks.value.indexOf(track.value as MusicTrack);
      const prev = index === 0 ? tracks.value.length - 1 : index - 1;

      playing.value = false;
      track.value = tracks.value[prev];
    },
    next: () => {
      const index = tracks.value.indexOf(track.value as MusicTrack);
      const next = index === tracks.value.length - 1 ? 0 : index + 1;

      playing.value = false;
      track.value = tracks.value[next];
    },
    toggle: () => (playing.value = !playing.value),
    changeVolume: (event: Event) => {
      const target = event.target as HTMLInputElement;
      const value = Number(target.value);

      volume.value = value;
    }
  };

  const handleEnd = () => {
    playing.value = false;
  };

  onMounted(() => {
    if (!tracks.value || !tracks.value.length) {
      // Exit early
      return;
    }

    if (audioRef.value) {
      audioRef.value.volume = volume.value;
      audioRef.value.addEventListener('ended', handleEnd);
    }

    const selected = window.history.state && window.history.state.selected;

    // Set track based on selected index
    if (typeof selected !== 'undefined') {
      track.value = tracks.value[selected];
    }
  });

  watch(playing, () => {
    if (!audioRef.value) {
      return;
    }

    if (playing.value) {
      audioRef.value.play();
    } else {
      audioRef.value.pause();
    }
  });

  watch(track, () => {
    // Load audio when track changes
    if (audioRef.value) {
      audioRef.value.load();
    }
  });

  watch(volume, (value) => {
    // Change audio volume
    if (audioRef.value) {
      audioRef.value.volume = value;
    }
  });

  return { actions, player };
};
