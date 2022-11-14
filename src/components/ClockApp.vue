<template>
  <div class="clock-app">
    <TabNavigation :tabs="tabs" />
  </div>
</template>

<script setup lang="ts">
import TabNavigation from '@/components/TabNavigation.vue';

const tabs = [
  {
    icon: 'stopwatch',
    label: 'Stopwatch',
    path: '/clock/stopwatch'
  },
  {
    icon: 'clock',
    label: 'Timer',
    path: '/clock/timer'
  }
];
</script>

<style lang="scss">
.clock-app,
.stopwatch {
  @include stretch-column;
}

.stopwatch {
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  height: auto;

  &-text {
    @include type-number-display;
    margin: auto 0 50px;
    text-align: center;

    @include responsive($width-medium) {
      margin-bottom: 100px;
    }
  }
}
</style>
