<template>
  <UIButton class="ui-btn--rounded" v-bind="$attrs">
    <slot />
  </UIButton>
</template>

<script setup lang="ts">
import UIButton from './UIButton.vue';
</script>
