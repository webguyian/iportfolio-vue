<template>
  <div class="iportfolio-app">
    <DeviceFrame>
      <LockScreen />
    </DeviceFrame>
  </div>
</template>

<script setup lang="ts">
import DeviceFrame from '@/components/DeviceFrame.vue';
import LockScreen from '@/components/LockScreen.vue';
</script>

<style lang="scss">
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
