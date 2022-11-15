<template>
  <div class="photos-app">
    <TabNavigation :showNav="isMainRoute" :tabs="tabs" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import TabNavigation from '@/components/TabNavigation.vue';
const route = useRoute();
const isMainRoute = computed(
  () => route.name === 'gallery' || route.name === 'favorites'
);
const tabs = [
  {
    icon: 'images',
    label: 'Photos',
    path: '/photos/gallery'
  },
  {
    icon: 'heart',
    label: 'Favorites',
    path: '/photos/favorites'
  }
];
</script>

<style lang="scss">
.photos-app {
  @include stretch-column-nowrap;

  .ui-tab-navigation-link--active {
    > .ui-icon,
    > .ui-tab-navigation-link-label {
      color: $blue;
    }
  }
}
</style>
