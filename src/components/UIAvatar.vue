<template>
  <div class="ui-avatar">
    <img v-if="src" class="ui-avatar-image" :alt="alt" :src="src" />
    <UIText v-if="text" class="ui-avatar-text" modifier="light">{{
      text
    }}</UIText>
  </div>
</template>

<script setup lang="ts">
import UIText from './UIText.vue';

defineProps<{
  alt?: string;
  src?: string;
  text?: string;
}>();
</script>

<style lang="scss">
.ui-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: $border-radius-round;
  background-color: $gray-medium;
  text-align: center;

  &-image {
    border-radius: $border-radius-round;
  }

  &-text {
    margin: 0;
    font-size: 60px;
  }
}
</style>
