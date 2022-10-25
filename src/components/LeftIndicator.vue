<template>
  <span v-if="indexRoute" class="device-time-label">IMAC</span>
  <span v-else class="device-time-label">
    <DateTime />
    <UIButton :icon="iconName" @click="handleRedirect">Unlocked</UIButton>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DateTime from './DateTime.vue';
import UIButton from './UIButton.vue';

const route = useRoute();
const router = useRouter();
const iconName = computed(() =>
  route.path === '/home' ? 'lock-open' : 'home'
);
const indexRoute = computed(() => route.path === '/');

const handleRedirect = () => {
  const route = iconName.value === 'home' ? '/home' : '/';

  router.push(route);
};
</script>

<style lang="scss">
.device-time-label {
  display: flex;

  > .ui-btn {
    color: $white;
    margin-left: 6px;
    transform: translateY(-1px);
  }
}
</style>
