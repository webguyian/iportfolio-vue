<template>
  <div class="photo-gallery">
    <UIText element="h1" type="display">
      {{ title }}
    </UIText>
    <div v-if="photos.length" class="photo-gallery-grid">
      <UIButton
        v-for="(photo, index) in photos"
        :key="index"
        :to="`/photos/${pathType}/${index}`"
        :class="[
          'photo-gallery-photo-frame',
          photo.metadata.favorited && 'photo-gallery-photo-frame--favorite'
        ]"
        @click="showPhoto(photo)"
      >
        <img
          class="photo-gallery-photo"
          :alt="`Photo taken ${formatCreatedDate(photo)}`"
          :src="photo.image"
        />
      </UIButton>
    </div>
    <div v-else class="photo-gallery-empty">
      <UIText class="photo-gallery-empty-message" element="p" modifier="bold">
        No {{ title.toLowerCase() }} found.
      </UIText>
      <UIText class="photo-gallery-empty-message" element="p">
        {{ message }}
      </UIText>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import UIButton from './UIButton.vue';
import UIText from './UIText.vue';
import {
  formatCreatedDate,
  getCreatedDate
} from '@/composables/photos/helpers';
import { usePhotos } from '@/composables/photos/hooks';
import type { Photo } from '@/composables/camera/types';

const router = useRouter();
const { photos, pathType, title, message } = usePhotos();
const showPhoto = (photo: Photo) => {
  router.push({
    name: 'photo',
    params: {
      id: getCreatedDate(photo)
    },
    state: {
      theme: 'black-dark'
    }
  });
};
</script>

<style lang="scss">
.photo-gallery {
  @include stretch-column-nowrap;
  max-height: 700px;
  overflow-y: auto;

  > .ui-text--display {
    @include type-title;
  }

  &-grid {
    display: grid;
    padding: 0 $gutter;
    grid-template-columns: repeat(3, auto);
    grid-gap: $gutter;
  }

  &-photo-frame {
    max-width: 185px;
    animation: loading-scale-in 0.4s cubic-bezier(0.39, 0.58, 0.57, 1);

    &--favorite {
      @include type-icon('\f004');
      max-width: 185px;
      animation: loading-scale-in 0.4s cubic-bezier(0.39, 0.58, 0.57, 1);
      color: $white;

      &::after {
        position: absolute;
        bottom: 8px;
        left: 8px;
      }
    }
  }

  &-photo {
    max-width: 100%;
  }

  &-empty {
    margin: auto $gutter-m;
  }

  &-empty-message {
    margin-bottom: $gutter;
    font-size: $font-size-l;
    text-align: center;
  }
}

@keyframes loading-scale-in {
  from {
    transform: scale(0.25);
  }
}
</style>
