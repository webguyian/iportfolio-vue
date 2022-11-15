<template>
  <div v-if="photo" class="photo-view">
    <div class="photo-view-top-bar">
      <UILink to="" back />
      <UIText>{{ formatCreatedDateRelative(photo) }}</UIText>
      <UIButton class="ui-btn--edit" disabled> Edit </UIButton>
    </div>
    <div class="photo-view-image-wrapper">
      <img
        class="photo-view-image"
        :alt="`Photo taken ${formatCreatedDate(photo)}`"
        :src="photo.image"
      />
    </div>
    <div
      :class="[
        'photo-view-controls',
        showControls && 'photo-view-controls--show'
      ]"
    >
      <UIButton modifier="anchor-block" @click="actions.onDelete"
        >Delete Photo</UIButton
      >
      <UIButton modifier="anchor-block" @click="actions.onCancel"
        >Cancel</UIButton
      >
    </div>
    <div class="photo-view-bottom-bar">
      <UIButton icon="envelope" @click="actions.onShare">Share</UIButton>
      <UIButton v-if="isFavorite" @click="actions.onFavorite" icon="heart"
        >Unfavorite</UIButton
      >
      <UIButton v-if="!isFavorite" @click="actions.onFavorite">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="far"
          data-icon="heart"
          class="svg-inline--fa fa-heart fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"
          />
        </svg>
      </UIButton>
      <UIButton icon="trash-alt" @click="actions.onConfirmDelete"
        >Delete</UIButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import UIButton from './UIButton.vue';
import UILink from './UILink.vue';
import UIText from './UIText.vue';

import {
  formatCreatedDate,
  formatCreatedDateRelative
} from '@/composables/photos/helpers';
import { usePhoto } from '@/composables/photos/hooks';

const { params } = useRoute();
const { actions, photo, showControls } = usePhoto(Number(params.id));
const isFavorite = computed(() => photo.value.metadata.favorited);
</script>

<style lang="scss">
.photo-view {
  @include stretch-column-nowrap;
  position: relative;
  background-color: $black-darker;

  &-top-bar,
  &-bottom-bar {
    @include flex-bar;
    background-color: $black-dark;
  }

  &-top-bar {
    justify-content: space-between;
    padding: $gutter;

    > .ui-link--back,
    > .ui-btn {
      margin-right: 0;
      color: $blue;
      font-size: $font-size-m;
      cursor: pointer;
    }

    > .ui-link--back {
      &:hover,
      &:focus {
        color: lighten($blue, 10%);
      }
    }
  }

  &-bottom-bar {
    z-index: 2;
    position: relative;
    margin-top: auto;

    .ui-icon,
    .svg-inline--fa {
      width: 28px;
      height: 28px;
      color: $blue;
      font-size: 28px;
    }
  }

  &-image-wrapper {
    display: flex;
    justify-content: center;
  }

  &-image {
    pointer-events: none;
    user-select: none;
  }

  .ui-btn {
    &:hover,
    &:focus {
      > .ui-icon,
      > .svg-inline--fa {
        color: lighten($blue, 10%);
      }
    }

    &[disabled] {
      color: $gray-medium;
    }

    &--edit {
      padding: 0 $gutter;
    }
  }

  &-controls {
    position: absolute;
    bottom: 70px;
    width: 100%;
    padding: 0 8px;
    transform: translateY(calc(100% + 70px));
    transition: transform 0.4s;

    &--show {
      transform: translateY(0);
    }

    > .ui-btn--anchor-block {
      transition: background-color 0.2s;
      border-radius: $border-radius-l;
      background-color: $gray-dark;
      color: $blue;

      &:hover,
      &:focus {
        background-color: darken($gray-dark, 2%);
      }

      &:first-child {
        color: $red;
      }

      &:last-child {
        margin-top: 8px;
      }
    }
  }
}
</style>
