<template>
  <HomeScreen />
  <LockScreen v-if="isLockScreen" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import HomeScreen from '@/components/HomeScreen.vue';
import LockScreen from '@/components/LockScreen.vue';

const route = useRoute();
const isLockScreen = computed(() => route.path === '/');
</script>
