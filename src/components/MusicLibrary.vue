<template>
  <div class="music-library">
    <UIText class="music-library-title" element="h1" type="display">
      Library
    </UIText>
    <UIText class="music-library-subtitle" element="h2" type="display">
      Recently Added
    </UIText>
    <ul v-if="tracks.length" class="music-library-tracks">
      <li v-for="(track, index) in tracks" :key="track.id">
        <div class="music-library-track">
          <UILink :to="{ name: 'player', state: { selected: index } }">
            <img
              class="music-library-track-cover"
              :alt="`${track.albumName} album cover`"
              :src="`${ALBUM_URL}/${track.albumId}/images/160x160.jpg`"
            />
          </UILink>
          <UIText class="music-library-track-name" element="h3">
            {{ track.name }}
          </UIText>
          <UIText class="music-library-track-artist" element="h4">
            {{ track.artistName }}
          </UIText>
        </div>
      </li>
    </ul>
    <LoadingSpinner v-else label="Loading tracks..." />
  </div>
</template>

<script setup lang="ts">
import LoadingSpinner from './LoadingSpinner.vue';
import UILink from './UILink.vue';
import UIText from './UIText.vue';
import { ALBUM_URL } from '@/composables/music/constants';
import { useMusic } from '@/composables/music/hooks';

const tracks = useMusic();
</script>

<style lang="scss">
.music-library {
  @include stretch-column-nowrap;
  padding: 0 $gutter;
  overflow-y: auto;

  &-title,
  &-subtitle {
    margin-bottom: $gutter;
  }

  &-subtitle {
    color: $pink;
    font-size: $font-size-l;
  }

  &-tracks {
    @include unstyled-list;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }

  &-track {
    max-width: 160px;
    min-height: 200px;
    margin-bottom: $gutter-m;
    background-repeat: no-repeat;

    &-cover {
      display: block;
      width: 150px;
      height: 150px;
      border-radius: $border-radius-m;
      background-color: $gray-dark;
      text-align: center;
    }

    &-name,
    &-artist {
      margin: $gutter-s 0 0;
      font-size: $font-size-s;
    }

    &-artist {
      color: $gray;
    }
  }
}
</style>
