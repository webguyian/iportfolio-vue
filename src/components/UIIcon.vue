<template>
  <i
    :class="[
      'ui-icon',
      `ui-icon-${name}`,
      'fas',
      `fa-${name}`,
      size && `fa-${size}`
    ]"
    :title="label"
  />
</template>

<script setup lang="ts">
defineProps<{
  label?: string;
  name: string;
  size?: string;
}>();
</script>
