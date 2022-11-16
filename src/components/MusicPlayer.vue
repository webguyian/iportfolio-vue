<template>
  <div class="music-player">
    <div class="music-player-track-cover">
      <img
        v-if="track"
        class="music-player-track-cover-image"
        :alt="`${track.albumName} album cover`"
        :src="`${ALBUM_URL}/${track.albumId}/images/350x350.jpg`"
      />
      <UIIcon v-else name="music" size="10x" />
    </div>
    <div class="music-player-track-info">
      <UIText class="music-player-track-name" element="h1" modifier="bold">
        {{ trackName }}
      </UIText>
      <UIText class="music-player-track-artist" element="h2">
        {{ track && track.artistName }}
      </UIText>
    </div>
    <audio :ref="player.ref" class="music-player-track-audio">
      <source v-if="track" :src="track.previewURL" type="audio/mpeg" />
    </audio>
    <div class="music-player-controls">
      <UIButton
        class="music-player-control"
        :disabled="!track"
        icon="fast-backward"
        size="3x"
        @click="actions.prev"
      >
        Previous track
      </UIButton>
      <UIButton
        v-if="playing"
        :disabled="!track"
        class="music-player-control music-player-control--play"
        icon="pause"
        size="4x"
        @click="actions.toggle"
      >
        Pause
      </UIButton>
      <UIButton
        v-if="!playing"
        :disabled="!track"
        class="music-player-control music-player-control--play"
        icon="play"
        size="4x"
        @click="actions.toggle"
      >
        Play
      </UIButton>
      <UIButton
        class="music-player-control"
        :disabled="!track"
        icon="fast-forward"
        size="3x"
        @click="actions.next"
      >
        Next track
      </UIButton>
    </div>
    <div class="music-player-volume-control">
      <UIIcon name="volume-off" label="Volume off" />
      <input
        class="music-player-volume-control-slider"
        type="range"
        min="0"
        max="1"
        step="0.1"
        :disabled="!track"
        :value="player.volume.value"
        @change="actions.changeVolume"
      />
      <UIIcon name="volume-up" label="Volume up" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UIButton from './UIButton.vue';
import UIIcon from './UIIcon.vue';
import UIText from './UIText.vue';
import { ALBUM_URL } from '@/composables/music/constants';
import { usePlayer } from '@/composables/music/hooks';

const { actions, player } = usePlayer();
const { playing, track } = player;
const trackName = computed(() =>
  track.value ? track.value.name : 'Not Playing'
);
</script>

<style lang="scss">
.music-player {
  @include stretch-column-nowrap;
  align-items: center;
  padding: $gutter-m $gutter $gutter;

  &-track {
    &-cover,
    &-info {
      margin-bottom: $gutter-m;
    }

    &-cover {
      @include flex-center;
      width: 350px;
      height: 350px;
      border-radius: $border-radius-m;
      background-color: $gray-dark;
      color: $gray-medium;
    }

    &-info {
      width: 100%;
    }

    &-name,
    &-artist {
      font-size: $font-size-l;
    }

    &-artist {
      margin-top: $gutter-xs;
      color: $pink;
    }

    &-audio {
      margin-top: auto;
    }
  }

  &-controls {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin: $gutter $gutter $gutter-l;
  }

  &-control {
    @include circle(45px);
    z-index: 2;
    position: relative;
    color: $white;

    &::after {
      @include circle(45px);
      z-index: -1;
      position: absolute;
      transition: transform 0.4s, background-color 0.8s;
      content: '';
    }

    &--play,
    &--play::after {
      width: 55px;
      height: 55px;
    }

    &:hover:not([disabled]),
    &:focus:not([disabled]) {
      &::after {
        transform: scale(1.75);
        background-color: $gray-dark;
      }
    }

    &[disabled] {
      color: $gray-medium;
      cursor: not-allowed;
    }
  }

  &-volume-control {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;

    > .ui-icon {
      color: $gray;
    }
  }

  &-volume-control-slider {
    width: 80%;
    margin: $gutter-s 0;
    background-color: transparent;
    -webkit-appearance: none;

    &:focus {
      outline: none;

      &::-webkit-slider-thumb {
        outline: 2px solid $blue;
        background-color: $gray-light;
      }
    }

    &[disabled] {
      &::-webkit-slider-thumb {
        cursor: not-allowed;
      }

      &::-moz-range-thumb {
        cursor: not-allowed;
      }
    }
  }

  &-volume-control-slider::-webkit-slider-runnable-track {
    width: 100%;
    height: 8.4px;
    border: 0.2px solid $black;
    border-radius: 1.3px;
    background: $gray-dark;
    cursor: pointer;
  }

  &-volume-control-slider::-webkit-slider-thumb {
    width: 20px;
    height: 20px;
    margin-top: -6px;
    transition: color 0.4s;
    border: 2px solid $gray-dark;
    border-radius: 20px;
    background: $gray;
    cursor: pointer;
    -webkit-appearance: none;
  }

  &-volume-control-slider:focus::-webkit-slider-runnable-track {
    background: $gray-dark;
  }

  &-volume-control-slider::-moz-range-track {
    width: 100%;
    height: 8.4px;
    border: 0.2px solid $black;
    border-radius: 1.3px;
    background: $gray;
    cursor: pointer;
  }

  &-volume-control-slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    transition: color 0.4s;
    border: 2px solid $gray-dark;
    border-radius: 20px;
    background: $gray;
    cursor: pointer;
  }
}
</style>
