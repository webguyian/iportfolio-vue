<template>
  <h2>{{ routeName }}</h2>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const routeName = computed(() => route.path.slice(1).toUpperCase());
</script>

<style lang="scss" scoped>
h2 {
  margin-top: 50vh;
  font-size: $font-size-xl;
}
</style>
