<template>
  <div class="camera-app">
    <div class="camera-app-top-bar">
      <UIButton
        :class="[controlClass, getControlStateClass('flash').value]"
        :disabled="isDisabled(controls.flash)"
        @click="actions.onControl('flash')"
        icon="bolt"
        size="2x"
      >
        Set flash
      </UIButton>
      <UIButton
        :class="[controlClass, getControlStateClass('timer').value]"
        :disabled="isDisabled(controls.timer)"
        @click="actions.onControl('timer')"
        icon="history"
        size="2x"
      >
        Set timer
      </UIButton>
      <UIButton
        :class="[controlClass, getControlStateClass('filter').value]"
        :disabled="isDisabled(controls.filter)"
        @click="actions.onControl('filter')"
        icon="swatchbook"
        size="2x"
      >
        Set filter
      </UIButton>
    </div>
    <div class="camera-app-video-container">
      <canvas
        class="camera-app-canvas"
        :ref="elements.canvas"
        width="375"
        height="425"
      ></canvas>
      <canvas
        class="camera-app-canvas-overlay"
        :ref="elements.overlay"
        width="375"
        height="425"
      ></canvas>
      <video
        class="camera-app-video"
        :ref="elements.video"
        autoplay
        playsinline
        @play="actions.onPlay"
      ></video>
    </div>
    <CameraFilters
      v-show="controls.filter === 'active'"
      :active-filter="elements.activeFilter.value"
      :filters="elements.filters.value"
      @update:filter="actions.onFilter"
    />
    <div class="camera-app-bottom-bar">
      <UILink v-if="hasPhoto" to="/">
        <img class="camera-app-image" :src="elements.photo.value?.image" />
      </UILink>
      <UILink v-else to="/">
        <div class="camera-app-image-placeholder" />
      </UILink>
      <RoundedButton
        :disabled="isDisabled(controls.button)"
        @click="actions.onCapture"
      >
        <UIText type="accessible">Capture snapshot</UIText>
      </RoundedButton>
      <UIButton
        :disabled="isDisabled(controls.swap)"
        @click="actions.onControl('swap')"
        icon="sync"
        size="3x"
      >
        Reverse camera
      </UIButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CameraFilters from './CameraFilters.vue';
import RoundedButton from './RoundedButton.vue';
import UIButton from './UIButton.vue';
import UILink from './UILink.vue';
import UIText from './UIText.vue';

import { useCamera } from '@/composables/camera/hooks';
import type {
  CameraControl,
  CameraControlState
} from '@/composables/camera/types';

const { actions, controls, elements } = useCamera();
const controlClass = 'camera-app-control';
const getControlStateClass = (control: CameraControl) =>
  computed(() => `${controlClass}--${controls[control]}`);
const isDisabled = (controlState: CameraControlState) =>
  controlState === 'disabled';
const hasPhoto = computed(() => Boolean(elements.photo.value));
</script>

<style lang="scss">
.camera-app {
  @include stretch-column-nowrap;

  &-top-bar,
  &-bottom-bar {
    @include flex-bar;

    .ui-icon {
      transition: all 0.4s;
      color: $white;
    }
  }

  &-control {
    &--active {
      > .ui-icon {
        color: $orange;
      }
    }
  }

  &-video-container {
    display: flex;
    position: relative;
    flex-flow: column wrap;
    margin-bottom: $gutter;
  }

  &-canvas-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &-video {
    display: none;
  }

  &-label {
    @include type-display;
    margin: $gutter;
    text-align: center;
  }

  &-bottom-bar {
    margin: auto 0 0;
  }

  &-image,
  &-image-placeholder {
    width: 70px;
    height: 70px;
    background-color: $gray-dark;
  }

  .ui-btn--rounded {
    @include circle(80px);
    @include inner-circle(60px, $white, $gray-dark);
    margin: 0;
    transition: background-color 0.3s;
    background-color: $white;

    &:hover,
    &:focus {
      background-color: $gray;

      &::after {
        background-color: $gray;
      }
    }

    &:focus {
      outline: 0;
    }

    &[disabled] {
      background-color: $gray-medium;

      &::after {
        background-color: $gray-medium;
      }
    }

    &::after {
      &:hover,
      &:focus {
        background-color: $gray;
      }
    }
  }

  .ui-btn--with-icon[disabled] {
    > .ui-icon {
      color: $gray-medium;
    }
  }
}
</style>
