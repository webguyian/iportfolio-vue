import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useLocalStorage } from '@/composables/browser/hooks';
import type { Photo } from '@/composables/camera/types';
import { getCreatedDate } from './helpers';

export const usePhotos = () => {
  const route = useRoute();
  const favoritesOnly = computed(() => route.name === 'favorites');
  const { storedValue, setValue } = useLocalStorage('photos', []);
  const allPhotos = computed(() =>
    storedValue.value
      .slice(0)
      .sort((a: Photo, b: Photo) => getCreatedDate(a) - getCreatedDate(b))
  );
  const photos = computed(() =>
    favoritesOnly.value
      ? allPhotos.value.filter((photo: Photo) => photo.metadata.favorited)
      : allPhotos.value
  );
  const pathType = computed(() =>
    favoritesOnly.value ? 'favorites' : 'gallery'
  );
  const title = computed(() => (favoritesOnly.value ? 'Favorites' : 'Photos'));
  const message = computed(() =>
    favoritesOnly.value
      ? 'Tap the heart to favorite some of your photos.'
      : 'Take snapshots from the Camera app.'
  );

  return { photos, setValue, pathType, title, message };
};

export const usePhoto = (id: number) => {
  const { photos, setValue } = usePhotos();
  const currentPhoto = computed(() =>
    photos.value.find((photo: Photo) => photo.metadata.dateCreated === id)
  );
  const showControls = ref(false);
  const onFavorite = () => {
    const updatedPhotos = photos.value.map((photo: Photo) => {
      return currentPhoto.value === photo
        ? {
            ...photo,
            metadata: {
              ...photo.metadata,
              favorited: photo.metadata.favorited ? false : true,
              dateUpdated: Number(new Date())
            }
          }
        : photo;
    });

    setValue(updatedPhotos);
  };

  const actions = {
    onFavorite
  };

  return { actions, photo: currentPhoto, showControls };
};
