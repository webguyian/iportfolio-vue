<template>
  <div class="music-app">
    <TabNavigation :tabs="tabs" />
  </div>
</template>

<script setup lang="ts">
import TabNavigation from '@/components/TabNavigation.vue';

const tabs = [
  {
    path: '/music/library',
    icon: 'music',
    label: 'Library'
  },
  {
    path: '/music/player',
    icon: 'play-circle',
    label: 'Player'
  }
];
</script>

<style lang="scss">
.music-app {
  @include stretch-column-nowrap;
  padding-top: $gutter;

  .ui-tab-navigation-link--active {
    > .ui-icon,
    > .ui-tab-navigation-link-label {
      color: $pink;
    }
  }
}
</style>
