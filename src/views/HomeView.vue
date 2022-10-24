<template>
  <div class="iportfolio-app">
    <DeviceFrame>
      <UIText className="welcome" element="h1" modifier="light">Welcome</UIText>
      <LockScreen v-if="isLockScreen" />
    </DeviceFrame>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import DeviceFrame from '@/components/DeviceFrame.vue';
import LockScreen from '@/components/LockScreen.vue';
import UIText from '@/components/UIText.vue';

const route = useRoute();
const isLockScreen = computed(() => route.path === '/');
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

.welcome {
  margin-top: 50vh;
  font-size: $font-size-xl;
}
</style>
