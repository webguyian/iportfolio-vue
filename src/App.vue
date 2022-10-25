<template>
  <div class="root">
    <div class="iportfolio-app">
      <DeviceFrame>
        <RouterView />
      </DeviceFrame>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import DeviceFrame from '@/components/DeviceFrame.vue';
</script>

<style lang="scss">
#app,
.root {
  height: 100%;
}

.root {
  scrollbar-width: thin;
  scrollbar-color: $black-dark rgba($black, 0.1);

  &::-webkit-scrollbar {
    max-width: $border-radius-m;
    max-height: $border-radius-m;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: $border-radius-m;
    background-color: $black-dark;
  }

  &::-webkit-scrollbar-track {
    border-radius: $border-radius-m;
    box-shadow: inset 0 4px 12px rgba($black, 0.15);
  }

  &::-webkit-scrollbar-button,
  &::-webkit-scrollbar-corner {
    display: none;
  }
}

.iportfolio-app {
  position: relative;
  height: 100%;
  text-align: center;

  @include responsive($width-medium) {
    height: auto;
    margin-top: 5vh;
  }

  &-view {
    height: 100%;
    padding-top: $gutter-m;

    &--no-padding {
      padding-top: 0;
    }
  }
}
</style>
